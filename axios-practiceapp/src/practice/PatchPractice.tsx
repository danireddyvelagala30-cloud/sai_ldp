import { useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const PatchPractice = () => {
  const [message, setMessage] = useState("");

  const updateCourse = async () => {
    try {
      // axios.patch partially updates the entity
      const response = await axios.patch<Student>(
        "http://localhost:3001/students/1",
        {
          course: "TypeScript",
        }
      );

      const data = response.data;
      setMessage(`Course updated to: ${data.course}`);
    } catch (error) {
      console.error(error);
      setMessage("Patch failed");
    }
  };

  return (
    <div>
      <h1>PATCH Practice (Axios)</h1>

      <button onClick={updateCourse}>
        Update Course
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PatchPractice;