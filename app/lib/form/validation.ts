import { z } from "zod";

const EmailSchema = z
  .string({ required_error: "必須項目です" })
  .email({ message: "メールアドレスの形式で入力してください" });

const PasswordSchema = z
  .string({ required_error: "必須項目です" })
  .min(8, { message: "パスワードの形式が正しくありません" })
  .max(100, { message: "パスワードの形式が正しくありません" });

export { EmailSchema, PasswordSchema };
