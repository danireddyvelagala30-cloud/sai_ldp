import { Button as MuiButton } from "@mui/material";
import { styles } from "./styles";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "contained" | "outlined";
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  variant = "contained",
  disabled = false,
}: ButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      color="primary"
      disabled={disabled}
      onClick={onClick}
      sx={styles.root}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
