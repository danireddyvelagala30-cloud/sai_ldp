import { useTheme } from "../context/useTheme";

const Profile = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <section
      style={{
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: isDark ? "#222" : "#f5f5f5",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <h2>useContext Practice</h2>

      <p>Name: Sai</p>

      <p>Role: React Developer</p>

      <p>Current Theme: {theme}</p>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </section>
  );
};

export default Profile;