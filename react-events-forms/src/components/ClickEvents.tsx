import { useState } from "react";

const ClickEvents = () => {
  const [message, setMessage] = useState("Click the button");

  const handleClick = () => {
    setMessage("Button clicked!");
  };

  return (
    <section>
      <h2>Click Event</h2>

      <p>{message}</p>

      <button onClick={handleClick}>
        Click Me
      </button>
    </section>
  );
};

export default ClickEvents;