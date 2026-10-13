interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, type = "button" }: ButtonProps) => {
  return <button type={type}>{label}</button>;
};

export default Button;
