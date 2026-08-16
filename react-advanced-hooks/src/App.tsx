import Counter from "./components/Counter";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import SearchInput from "./components/SearchInput";
import AddProduct from "./components/AddProduct";
import ToggleMessage from "./components/ToggleMessage";

const App = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Advanced React Hooks Practice</h1>

      <p>
        Practice useContext, useMemo, useCallback,
        useRef and Custom Hooks.
      </p>

      <hr />

      <Profile />

      <hr />

      <Counter />

      <hr />

      <ProductList />

      <hr />

      <AddProduct />

      <hr />

      <SearchInput />

      <hr />

      <ToggleMessage />
    </div>
  );
};

export default App;