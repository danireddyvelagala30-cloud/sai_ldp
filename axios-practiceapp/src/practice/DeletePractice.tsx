import { useState } from "react";
import axios from "axios";

const DeletePractice = () => {
  const [message, setMessage] = useState("");

  const deleteStudent = async () => {
    try {
      // axios.delete automatically throws an error if status >= 400
      await axios.delete("http://localhost:3001/students/1");

      setMessage("Student deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage("Delete failed");
    }
  };

  return (
    <div>
      <h1>DELETE Practice (Axios)</h1>

      <button onClick={deleteStudent}>
        Delete Student
      </button>

      <p>{message}</p>
    </div>
  );
};

export default DeletePractice;