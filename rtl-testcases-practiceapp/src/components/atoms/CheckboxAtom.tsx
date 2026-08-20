interface CheckboxAtomProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const CheckboxAtom = ({
  label,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxAtomProps) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />

      {label}
    </label>
  );
};

export default CheckboxAtom;