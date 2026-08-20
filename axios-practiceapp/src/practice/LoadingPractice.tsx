import { useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const LoadingPractice = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get<Student[]>(
        "http://localhost:3001/students"
      );

      setMessage(`Received ${response.data.length} students`);
    } catch (error) {
      console.error(error);
      setMessage("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Loading Practice (Axios)</h1>

      <button onClick={fetchData}>
        Fetch Data with Axios
      </button>

      {loading && <p>Loading...</p>}

      {!loading && <p>{message}</p>}
    </div>
  );
};

export default LoadingPractice;