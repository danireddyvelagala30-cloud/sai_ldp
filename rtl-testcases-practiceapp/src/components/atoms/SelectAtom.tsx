interface SelectOption {
  label: string;
  value: string;
}

interface SelectAtomProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const SelectAtom = ({
  label,
  options,
  value = "",
  disabled = false,
  onChange,
}: SelectAtomProps) => {
  return (
    <div>
      {label && (
        <label htmlFor="select-field">
          {label}
        </label>
      )}

      <select
        id="select-field"
        value={value}
        disabled={disabled}
        onChange={onChange}
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAtom;