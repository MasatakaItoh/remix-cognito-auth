import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import { createUser } from "~/lib/auth";
import { EmailSchema } from "~/lib/form";

const CreateUserSchema = z.object({
  email: EmailSchema,
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: CreateUserSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), { status: 400 });
  }

  const { email } = submission.value;
  return await createUser(email);
}
