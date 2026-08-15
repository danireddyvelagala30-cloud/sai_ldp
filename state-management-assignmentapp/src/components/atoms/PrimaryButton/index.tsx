import "./styles.css";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "contained" | "outlined";
  disabled?: boolean;
}

const PrimaryButton = ({
  label,
  onClick,
  variant = "contained",
  disabled = false,
}: PrimaryButtonProps) => {
  const variantClass =
    variant === "outlined" ? "primary-btn--outlined" : "primary-btn--contained";

  return (
    <button
      type="button"
      className={`primary-btn ${variantClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
