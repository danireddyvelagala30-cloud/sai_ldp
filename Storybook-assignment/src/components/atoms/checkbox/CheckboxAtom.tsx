import type { ChangeEvent } from "react";

interface CheckboxAtomProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxAtom = ({
  checked = false,
  disabled = false,
  onChange,
}: CheckboxAtomProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
      aria-label="checkbox atom"
    />
  );
};

export default CheckboxAtom;
