import type { MetaFunction } from "@remix-run/node";
import { useAuth } from "~/routes/_auth";

export const meta: MetaFunction = () => {
  return [{ title: "Home - Remix Cognito Auth" }];
};

export default function Index() {
  const auth = useAuth();

  console.log(auth);

  return <div>Authenticated!</div>;
}
