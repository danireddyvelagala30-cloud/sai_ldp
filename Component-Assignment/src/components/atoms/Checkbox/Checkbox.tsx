interface CheckboxProps {
  label: string;
  checked?: boolean;
}

const Checkbox = ({ label, checked = false }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={checked} readOnly />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
