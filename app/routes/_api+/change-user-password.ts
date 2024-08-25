import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import { changeUserPassword } from "~/lib/auth";
import { EmailSchema, PasswordSchema } from "~/lib/form";

const ChangeUserPasswordSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ChangeUserPasswordSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), { status: 400 });
  }

  const { email, password } = submission.value;
  return await changeUserPassword(email, password);
}
