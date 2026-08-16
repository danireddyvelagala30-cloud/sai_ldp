import { useState } from "react";

const PutPractice = () => {
  const [message, setMessage] = useState("");

  const updateStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/students/1",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: "Sai Updated",
            email: "sai.updated@example.com",
            course: "Advanced React",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const data = await response.json();

      setMessage(`Updated: ID ${data.id} - ${data.name}`);
    } catch (error) {
      console.error(error);
      setMessage("Update failed");
    }
  };

  return (
    <div>
      <h1>PUT Practice</h1>

      <button onClick={updateStudent}>
        Update Student
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PutPractice;