const Sidebar = () => {
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#0F172A",
        color: "white",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "24px" }}>LOGO</h3>
      <nav>
        <div style={{ padding: "10px 0", cursor: "pointer" }}>Dashboard</div>
        <div style={{ padding: "10px 0", cursor: "pointer", fontWeight: "bold" }}>Candidates</div>
        <div style={{ padding: "10px 0", cursor: "pointer" }}>Adjudication</div>
        <div style={{ padding: "10px 0", cursor: "pointer" }}>Reports</div>
        <div style={{ padding: "10px 0", cursor: "pointer" }}>Settings</div>
      </nav>
    </aside>
  );
};

export default Sidebar;