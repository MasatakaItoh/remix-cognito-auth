import { z } from "zod";
import { EmailSchema, PasswordSchema } from "~/lib/form";

const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

const ForgotPasswordConfirmSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  code: z.string({ required_error: "必須項目です" }),
});

export { LoginSchema, ForgotPasswordSchema, ForgotPasswordConfirmSchema };
