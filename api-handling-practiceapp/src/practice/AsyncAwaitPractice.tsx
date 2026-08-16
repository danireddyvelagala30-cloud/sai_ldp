import { useState } from "react";

const AsyncAwaitPractice = () => {
  const [message, setMessage] = useState("");

  const getData = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data received using Promise!");
      }, 2000);
    });
  };

  const handleAsync = async () => {
    setMessage("Loading...");

    try {
      const result = await getData();

      setMessage(result);
    } catch (error) {
      console.error(error);
      setMessage("Error occurred");
    }
  };

  return (
    <div>
      <h1>Async / Await Practice</h1>

      <button onClick={handleAsync}>
        Run Async/Await
      </button>

      <p>{message}</p>
    </div>
  );
};

export default AsyncAwaitPractice;