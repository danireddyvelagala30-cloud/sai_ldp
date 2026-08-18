interface RadioAtomProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const RadioAtom = ({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
}: RadioAtomProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />

      {label}
    </label>
  );
};

export default RadioAtom;