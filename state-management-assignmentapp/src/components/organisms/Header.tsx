import SearchInput from "../atoms/SearchInput";
import PrimaryButton from "../atoms/PrimaryButton";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: HeaderProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        gap: "16px",
      }}
    >
      <h2 style={{ margin: 0 }}>Candidates</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "300px" }}>
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <PrimaryButton label="Filter" variant="outlined" />
        <PrimaryButton label="Export" />
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#dbeafe", display: "grid", placeItems: "center" }}>A</div>
      </div>
    </div>
  );
};

export default Header;