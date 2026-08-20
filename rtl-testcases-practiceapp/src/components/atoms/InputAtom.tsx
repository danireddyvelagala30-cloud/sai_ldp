interface InputAtomProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  value?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const InputAtom = ({
  label,
  placeholder,
  type = "text",
  value,
  disabled = false,
  onChange,
}: InputAtomProps) => {
  return (
    <div>
      {label && (
        <label htmlFor="input-field">
          {label}
        </label>
      )}

      <input
        id="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default InputAtom;