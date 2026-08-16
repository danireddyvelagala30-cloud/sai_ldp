import { useState } from "react";

const PostPractice = () => {
  const [message, setMessage] = useState("");

  const createStudent = async () => {
    try {
      const getResponse = await fetch("http://localhost:3001/students");
      const students = await getResponse.json();

      const maxId = students.reduce((max: number, s: { id: string }) => {
        const num = parseInt(s.id, 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);

      const nextId = String(maxId + 1);

      const response = await fetch(
        "http://localhost:3001/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: nextId,
            name: "Kiran",
            email: "kiran@example.com",
            course: "React",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create student");
      }

      const data = await response.json();

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
      <h1>POST Practice</h1>

      <button onClick={createStudent}>
        Add Student
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PostPractice;