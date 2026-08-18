interface ButtonAtomProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtonAtom = ({
  children,
  onClick,
  disabled = false,
  type = "button",
}: ButtonAtomProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;