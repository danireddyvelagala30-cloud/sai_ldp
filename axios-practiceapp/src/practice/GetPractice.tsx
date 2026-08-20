import { useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const GetPractice = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStudents = async () => {
    try {
      setLoading(true);
      setError("");
      // axios.get automatically parses JSON and returns data in response.data
      const response = await axios.get<Student[]>(
        "http://localhost:3001/students"
      );

      setStudents(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>GET Practice (Axios)</h1>

      <button onClick={getStudents}>
        Get Students
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {students.map((student) => (
        <div key={student.id}>
          <h3>ID: {student.id} - {student.name}</h3>
          <p>Email: {student.email}</p>
          <p>Course: {student.course}</p>
        </div>
      ))}
    </div>
  );
};

export default GetPractice;