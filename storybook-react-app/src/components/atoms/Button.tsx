interface ButtonProps {
  text: string;
  disabled?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
}

const Button = ({
  text,
  disabled = false,
  backgroundColor = "#1976d2",
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor,
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;