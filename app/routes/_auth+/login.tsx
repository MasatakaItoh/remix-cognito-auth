import { SubmissionResult } from "@conform-to/dom";
import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { jsonWithError } from "remix-toast";
import { InputField, PasswordField } from "~/components";
import { authenticator } from "~/lib/auth";
import { LoginSchema } from "./schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: LoginSchema,
  });

  if (submission.status !== "success") {
    return jsonWithError<SubmissionResult>(
      submission.reply(),
      "パラメータが不正です",
      { status: 400 },
    );
  }

  return await authenticator.authenticate("login", request, {
    successRedirect: "/",
  });
}

export default function Login() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    constraint: getZodConstraint(LoginSchema),
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: LoginSchema }),
    shouldRevalidate: "onBlur",
  });

  return (
    <Form method="post" className={"grid gap-4 p-10"} {...getFormProps(form)}>
      <InputField field={fields.email} label={"メールアドレス"} />
      <PasswordField field={fields.password} label={"パスワード"} />
      <div>
        <button type={"submit"}>ログイン</button>
      </div>
      <p>
        <Link to={"/forgot-password"}>パスワードを忘れた方はこちら</Link>
      </p>
    </Form>
  );
}
