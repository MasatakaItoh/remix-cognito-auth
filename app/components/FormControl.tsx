import { FieldMetadata } from "@conform-to/react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  field: FieldMetadata;
  label: string;
}>;

export const FormControl = ({ children, field, label }: Props) => {
  const errors = Object.entries(field.allErrors)?.flatMap(([, x]) => x);

  return (
    <div className={"grid gap-1"}>
      <label htmlFor={field.id}>{label}</label>
      {children}
      {errors?.map((x) => (
        <p key={x} className={"text-red-500"}>
          {x}
        </p>
      ))}
    </div>
  );
};
