import type { ChangeEvent } from "react";

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox = ({
  checked = false,
  disabled = false,
  onChange,
  className = "",
}: CheckboxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
      aria-label="checkbox"
      className={`atom-checkbox ${className}`.trim()}
    />
  );
};

export default Checkbox;
