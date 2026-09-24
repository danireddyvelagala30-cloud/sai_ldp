import { TextField } from "@mui/material";

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
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      sx={{
        backgroundColor: "common.white",
        borderRadius: 1,
      }}
    />
  );
};

export default SearchInput;
