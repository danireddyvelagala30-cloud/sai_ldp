import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

function HooksDemo() {
  // useState
  const [count, setCount] = useState(0);

  
  // useEffect
  useEffect(() => {
    console.log("Component Loaded");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  // useRef
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // useMemo
  const square = useMemo(() => {
    console.log("Calculating...");
    return count * count;
  }, [count]);

  // useCallback
  const showMessage = useCallback(() => {
    alert("Hello from useCallback");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Hooks Practice</h1>

      <hr />

      <h2>1. useState</h2>

      <h3>Count : {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <hr />

      <h2>2. useEffect</h2>

      <p>
        Open the browser console.
      </p>

      <hr />

      <h2>3. useRef</h2>

      <input
        ref={inputRef}
        placeholder="Enter text"
      />

      <button onClick={focusInput}>
        Focus Input
      </button>

      <hr />

      <h2>4. useMemo</h2>

      <h3>Square : {square}</h3>

      <hr />

      <h2>5. useCallback</h2>

      <button onClick={showMessage}>
        Show Message
      </button>
    </div>
  );
}

export default HooksDemo;