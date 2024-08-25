import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/lib/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: "/login",
  });
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: "/login",
  });
}
