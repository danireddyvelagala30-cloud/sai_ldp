import { useState } from "react";

const ErrorHandlingPractice = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        "http://localhost:3001/wrong-url"
      );

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      const data = await response.json();

      setMessage(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setError("Something went wrong while fetching data.");
    }
  };

  return (
    <div>
      <h1>Error Handling Practice</h1>

      <button onClick={fetchData}>
        Test Error
      </button>

      {error && <p>{error}</p>}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ErrorHandlingPractice;