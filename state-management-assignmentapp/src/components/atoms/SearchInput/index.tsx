import { InputAdornment, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { APP_CONSTANTS } from "../../../utils/constants";

export interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = APP_CONSTANTS.searchCandidate,
  label = APP_CONSTANTS.searchCandidate,
  size = "small",
  fullWidth = true,
  variant = "outlined",
  ...rest
}: SearchInputProps) => {
  return (
    <TextField
      fullWidth={fullWidth}
      size={size}
      type="search"
      variant={variant}
      label={label}
      slotProps={{
        htmlInput: { "aria-label": label ?? APP_CONSTANTS.searchCandidate },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      {...rest}
    />
  );
};

export default SearchInput;

