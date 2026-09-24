import SearchInput from "../../atoms/SearchInput";
import Button from "../../atoms/Button";
import { APP_CONSTANTS } from "../../../utils/constants";
import "./styles.css";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  return (
    <div className="header-container">
      <h2 className="header-title">{APP_CONSTANTS.candidates}</h2>

      <div className="header-actions">
        <div className="header-search-box">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={APP_CONSTANTS.searchCandidate}
          />
        </div>

        <Button label={APP_CONSTANTS.filters} variant="outlined" />
        <Button label={APP_CONSTANTS.export} />
        <div className="header-avatar">A</div>
      </div>
    </div>
  );
};

export default Header;
