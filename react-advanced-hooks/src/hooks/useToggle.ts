import { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((previousValue) => !previousValue);
  };

  return {
    value,
    toggle,
  };
};

export default useToggle;