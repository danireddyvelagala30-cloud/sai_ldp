import useCounter from "../hooks/useCounter";

const Counter = () => {
  const {
    count,
    increment,
    decrement,
    reset,
  } = useCounter(0);

  return (
    <section>
      <h2>Custom Hook - useCounter</h2>

      <h3>Count: {count}</h3>

      <button onClick={increment}>
        +
      </button>

      <button onClick={decrement}>
        -
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </section>
  );
};

export default Counter;