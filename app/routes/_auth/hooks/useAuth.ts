import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/routes/_auth/route";

export const useAuth = () => {
  return useRouteLoaderData<typeof loader>("routes/_auth");
};
