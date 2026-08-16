import { useState } from "react";

const DeletePractice = () => {
  const [message, setMessage] = useState("");

  const deleteStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/students/1",
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessage("Student deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage("Delete failed");
    }
  };

  return (
    <div>
      <h1>DELETE Practice</h1>

      <button onClick={deleteStudent}>
        Delete Student
      </button>

      <p>{message}</p>
    </div>
  );
};

export default DeletePractice;