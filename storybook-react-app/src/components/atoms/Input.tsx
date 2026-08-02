import type { ChangeEventHandler } from "react";

interface InputProps {
  placeholder: string;
  type?: "text" | "password" | "email";
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  placeholder,
  type = "text",
  disabled = false,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;