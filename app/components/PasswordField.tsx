import { getInputProps } from "@conform-to/react";
import { ComponentProps } from "react";
import { FormControl } from "./FormControl";

type Props = Omit<ComponentProps<typeof FormControl>, "children">;

export const PasswordField = (props: Props) => {
  return (
    <FormControl {...props}>
      <input
        className={"border"}
        {...getInputProps(props.field, { type: "password" })}
      />
    </FormControl>
  );
};
