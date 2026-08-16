import { useState } from "react";

const LoadingPractice = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/students"
      );

      const data = await response.json();

      setMessage(`Received ${data.length} students`);
    } catch (error) {
      console.error(error);
      setMessage("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Loading Practice</h1>

      <button onClick={fetchData}>
        Fetch Data
      </button>

      {loading && <p>Loading...</p>}

      {!loading && <p>{message}</p>}
    </div>
  );
};

export default LoadingPractice;