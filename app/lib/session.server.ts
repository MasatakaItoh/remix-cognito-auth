import { createCookieSessionStorage } from "@remix-run/node";
import { User } from "./auth";

const sessionSecret = process.env.SESSION_SECRET;

if (sessionSecret === undefined) {
  throw new Error("SESSION_SECRETを設定してください");
}

export const sessionStorage = createCookieSessionStorage<User>({
  cookie: {
    name: "session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
  },
});
