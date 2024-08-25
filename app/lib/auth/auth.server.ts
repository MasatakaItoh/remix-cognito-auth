import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { JWTPayload } from "jose";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "../session.server";
import {
  adminCreateUserCommand,
  adminInitiateAuthCommand,
  adminSetUserPasswordCommand,
  confirmForgotPasswordCommand,
  forgotPasswordCommand,
} from "./commands";
import { getCredentials } from "./utils";

type User = {
  idToken?: string;
  refreshToken?: string;
};

type IdTokenPayload = JWTPayload & {
  email: string;
};

const authenticator = new Authenticator<User>(sessionStorage);

const cognitoClient = new CognitoIdentityProviderClient({
  region: "ap-northeast-1",
  credentials: getCredentials(),
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    if (!email || !password) {
      throw new Error("メールアドレスとパスワードは必須項目です");
    }

    const { AuthenticationResult } = await login(email, password);
    if (!AuthenticationResult) throw new Error("ログインに失敗しました");

    return {
      refreshToken: AuthenticationResult.RefreshToken,
      idToken: AuthenticationResult.IdToken,
    };
  }),
  "login",
);

const login = async (email: string, password: string) => {
  const command = adminInitiateAuthCommand(email, password);
  return await cognitoClient.send(command);
};

const createUser = async (email: string) => {
  const command = adminCreateUserCommand(email);
  return await cognitoClient.send(command);
};

const changeUserPassword = async (email: string, password: string) => {
  const command = adminSetUserPasswordCommand(email, password);
  return await cognitoClient.send(command);
};

const resetPassword = async (email: string) => {
  const command = forgotPasswordCommand(email);
  return await cognitoClient.send(command);
};

const confirmResetPassword = async (
  email: string,
  password: string,
  code: string,
) => {
  const command = confirmForgotPasswordCommand(email, password, code);
  return await cognitoClient.send(command);
};

export {
  type User,
  type IdTokenPayload,
  authenticator,
  login,
  createUser,
  changeUserPassword,
  resetPassword,
  confirmResetPassword,
};
