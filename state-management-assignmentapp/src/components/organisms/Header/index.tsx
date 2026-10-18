import { Avatar, Box, Stack, Typography } from "@mui/material";

import SearchInput from "../../atoms/SearchInput";
import Button from "../../atoms/Button";
import { APP_CONSTANTS } from "../../../utils/constants";
import { styles } from "./styles";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} sx={styles.root}>
      <Typography variant="h5" component="h1">
        {APP_CONSTANTS.candidates}
      </Typography>

      <Stack direction="row" spacing={1.5} sx={styles.actions}>
        <Box sx={styles.search}>
          <SearchInput value={search} onChange={setSearch} />
        </Box>

        <Button label={APP_CONSTANTS.filters} variant="outlined" />
        <Button label={APP_CONSTANTS.export} />
        <Avatar sx={styles.avatar} aria-label={APP_CONSTANTS.profileAvatarAlt}>
          {APP_CONSTANTS.profileInitial}
        </Avatar>
      </Stack>
    </Stack>
  );
};

export default Header;
