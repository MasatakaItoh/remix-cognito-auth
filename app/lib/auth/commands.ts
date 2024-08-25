import {
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  AuthFlowType,
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { hashSecret } from "./utils";

const adminInitiateAuthCommand = (email: string, password: string) => {
  return new AdminInitiateAuthCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID ?? "",
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: hashSecret(email),
    },
  });
};

const adminCreateUserCommand = (email: string) => {
  return new AdminCreateUserCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID ?? "",
    Username: email,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "email_verified", Value: "true" },
    ],
  });
};

const adminSetUserPasswordCommand = (email: string, password: string) => {
  return new AdminSetUserPasswordCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID ?? "",
    Username: email,
    Password: password,
    Permanent: true,
  });
};

const forgotPasswordCommand = (email: string) => {
  return new ForgotPasswordCommand({
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    SecretHash: hashSecret(email),
    Username: email,
  });
};

const confirmForgotPasswordCommand = (
  email: string,
  password: string,
  code: string,
) => {
  return new ConfirmForgotPasswordCommand({
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    SecretHash: hashSecret(email),
    Username: email,
    ConfirmationCode: code,
    Password: password,
  });
};

export {
  adminInitiateAuthCommand,
  adminCreateUserCommand,
  adminSetUserPasswordCommand,
  forgotPasswordCommand,
  confirmForgotPasswordCommand,
};
