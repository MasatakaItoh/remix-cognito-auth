import { redirect } from "@remix-run/node";
import { decodeJwt } from "jose";
import { authenticator, IdTokenPayload } from "./auth.server";

type Props = {
  request: Request;
  redirectTo?: string;
};

export const requireUser = async ({ request, redirectTo }: Props) => {
  const { idToken } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const sessionUser = idToken ? decodeJwt<IdTokenPayload>(idToken) : undefined;
  // ここでDBからユーザー情報を取得する
  const user = sessionUser;

  if (!user) {
    throw redirect(redirectTo ?? "/login");
  }
  return user;
};
