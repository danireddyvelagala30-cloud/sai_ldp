import { TextField } from "@mui/material";
import { APP_CONSTANTS } from "../../../data/constants";
import { styles } from "./styles";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = APP_CONSTANTS.searchCandidate,
}: SearchInputProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      label={APP_CONSTANTS.searchCandidate}
      inputProps={{ "aria-label": APP_CONSTANTS.searchCandidate }}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      sx={styles.root}
    />
  );
};

export default SearchInput;
