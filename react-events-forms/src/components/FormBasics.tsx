import { useState } from "react";

const FormBasics = () => {
  const [name, setName] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    alert(`Submitted name: ${name}`);
  };

  return (
    <section>
      <h2>Basic Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <button type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default FormBasics;