import type { ChangeEvent } from "react";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({
  checked = false,
  disabled = false,
  onChange,
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
    />
  );
};

export default Checkbox;
