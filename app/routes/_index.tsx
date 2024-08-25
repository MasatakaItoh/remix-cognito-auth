import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireUser({ request });
}

export default function _index() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1>{`Welcome ${user.email}`}</h1>
      <p>
        <Link to={"/logout"}>ログアウト</Link>
      </p>
    </div>
  );
}
