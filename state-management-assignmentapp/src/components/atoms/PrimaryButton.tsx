import Button from "@mui/material/Button";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "warning";
  disabled?: boolean;
}

const PrimaryButton = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;