import useToggle from "../hooks/useToggle";

const ToggleMessage = () => {
  const { value, toggle } = useToggle(false);

  return (
    <section>
      <h2>Custom Hook - useToggle</h2>

      <button onClick={toggle}>
        {value ? "Hide" : "Show"}
      </button>

      {value && (
        <p>
          This message is controlled by a custom hook.
        </p>
      )}
    </section>
  );
};

export default ToggleMessage;