import SearchInput from "../../atoms/SearchInput";
import PrimaryButton from "../../atoms/PrimaryButton";
import "./styles.css";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  return (
    <div className="header-container">
      <h2 className="header-title">Candidates</h2>

      <div className="header-actions">
        <div className="header-search-box">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <PrimaryButton label="Filter" variant="outlined" />
        <PrimaryButton label="Export" />
        <div className="header-avatar">A</div>
      </div>
    </div>
  );
};

export default Header;
