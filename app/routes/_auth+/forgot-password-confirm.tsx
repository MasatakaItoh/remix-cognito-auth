import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { InputField, PasswordField } from "~/components";
import { confirmResetPassword } from "~/lib/auth";
import { ForgotPasswordConfirmSchema } from "./schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ForgotPasswordConfirmSchema,
  });

  if (submission.status !== "success") {
    return jsonWithError(submission.reply(), "パラメータが不正です", {
      status: 400,
    });
  }

  const { email, password, code } = submission.value;
  await confirmResetPassword(email, password, code);

  throw await redirectWithSuccess("/login", "メールに認証コードを送信しました");
}

export default function ForgotPasswordConfirm() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    constraint: getZodConstraint(ForgotPasswordConfirmSchema),
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: ForgotPasswordConfirmSchema }),
    shouldRevalidate: "onBlur",
  });

  return (
    <Form method="post" className={"grid gap-4 p-10"} {...getFormProps(form)}>
      <InputField field={fields.email} label={"メールアドレス"} />
      <PasswordField field={fields.password} label={"新しいパスワード"} />
      <InputField field={fields.code} label={"認証コード"} />
      <div>
        <button type={"submit"}>パスワードを変更する</button>
      </div>
    </Form>
  );
}
