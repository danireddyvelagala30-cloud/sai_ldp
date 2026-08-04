interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search Candidate",
}: SearchInputProps) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      style={{
        width: "100%",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        padding: "8px 10px",
        fontSize: "14px",
      }}
    />
  );
};

export default SearchInput;