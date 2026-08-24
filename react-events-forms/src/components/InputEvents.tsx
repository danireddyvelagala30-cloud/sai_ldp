import { useState } from "react";

const InputEvents = () => {
  const [name, setName] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  return (
    <section>
      <h2>Input Change Event</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      />

      <p>Your name: {name}</p>
    </section>
  );
};

export default InputEvents;