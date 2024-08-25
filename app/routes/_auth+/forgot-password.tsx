import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { InputField } from "~/components";
import { resetPassword } from "~/lib/auth";
import { ForgotPasswordSchema } from "./schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ForgotPasswordSchema,
  });

  if (submission.status !== "success") {
    return jsonWithError(submission.reply(), "パラメータが不正です", {
      status: 400,
    });
  }

  const { email } = submission.value;
  await resetPassword(email);

  throw await redirectWithSuccess(
    "/forgot-password-confirm",
    "パスワードを変更しました",
  );
}

export default function ForgotPassword() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    constraint: getZodConstraint(ForgotPasswordSchema),
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: ForgotPasswordSchema }),
    shouldRevalidate: "onBlur",
  });

  return (
    <Form method="post" className={"grid gap-4 p-10"} {...getFormProps(form)}>
      <InputField field={fields.email} label={"メールアドレス"} />
      <div>
        <button type={"submit"}>メールを送信する</button>
      </div>
    </Form>
  );
}
