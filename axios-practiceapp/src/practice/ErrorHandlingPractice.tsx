import { useState } from "react";
import axios from "axios";

const ErrorHandlingPractice = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      setMessage("");

      // With Axios, HTTP 4xx/5xx errors automatically reject and enter catch block
      const response = await axios.get(
        "http://localhost:3001/wrong-url"
      );

      setMessage(JSON.stringify(response.data));
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with a status code other than 2xx
          setError(`Axios Error (${err.response.status}): ${err.response.statusText || "Resource Not Found"}`);
        } else if (err.request) {
          // Request was made but no response was received (Network error/Server down)
          setError("Network Error: No response received from server.");
        } else {
          // Something happened setting up the request
          setError(`Request Setup Error: ${err.message}`);
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h1>Error Handling Practice (Axios)</h1>

      <button onClick={fetchData}>
        Test Error (Axios)
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ErrorHandlingPractice;