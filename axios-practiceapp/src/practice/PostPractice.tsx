import { useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const PostPractice = () => {
  const [message, setMessage] = useState("");

  const createStudent = async () => {
    try {
      // 1. Fetch current students using axios.get to calculate next ID
      const getResponse = await axios.get<Student[]>("http://localhost:3001/students");
      const students = getResponse.data;

      const maxId = students.reduce((max: number, s: Student) => {
        const num = parseInt(s.id, 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);

      const nextId = String(maxId + 1);

      // 2. Post new student using axios.post (no need for JSON.stringify or manual headers)
      const response = await axios.post<Student>(
        "http://localhost:3001/students",
        {
          id: nextId,
          name: "Kiran",
          email: "kiran@example.com",
          course: "React",
        }
      );

      const data = response.data;

      setMessage(
        `Student created: ID ${data.id} - ${data.name}`
      );
    } catch (error) {
      console.error(error);
      setMessage("Failed to create student");
    }
  };

  return (
    <div>
      <h1>POST Practice (Axios)</h1>

      <button onClick={createStudent}>
        Add Student
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PostPractice;