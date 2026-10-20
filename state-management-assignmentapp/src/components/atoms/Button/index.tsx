import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  label?: string;
}

const Button = ({
  label,
  children,
  variant = "contained",
  color = "primary",
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled}
      {...rest}
    >
      {label ?? children}
    </MuiButton>
  );
};

export default Button;

