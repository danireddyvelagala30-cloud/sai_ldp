import { useRef } from "react";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <section>
      <h2>useRef Practice</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Enter something"
      />

      <br />
      <br />

      <button onClick={handleFocus}>
        Focus Input
      </button>

      <button onClick={handleClear}>
        Clear Input
      </button>
    </section>
  );
};

export default SearchInput;