import { useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const PutPractice = () => {
  const [message, setMessage] = useState("");

  const updateStudent = async () => {
    try {
      // axios.put sends request body directly as JS object
      const response = await axios.put<Student>(
        "http://localhost:3001/students/1",
        {
          name: "Sai Updated",
          email: "sai.updated@example.com",
          course: "Advanced React",
        }
      );

      const data = response.data;
      setMessage(`Updated: ID ${data.id} - ${data.name}`);
    } catch (error) {
      console.error(error);
      setMessage("Update failed");
    }
  };

  return (
    <div>
      <h1>PUT Practice (Axios)</h1>

      <button onClick={updateStudent}>
        Update Student
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PutPractice;