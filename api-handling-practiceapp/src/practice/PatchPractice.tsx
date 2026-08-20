import { useState } from "react";

const PatchPractice = () => {
  const [message, setMessage] = useState("");

  const updateCourse = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/students/1",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            course: "TypeScript",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Patch failed");
      }

      const data = await response.json();

      setMessage(`Course updated to: ${data.course}`);
    } catch (error) {
      console.error(error);
      setMessage("Patch failed");
    }
  };

  return (
    <div>
      <h1>PATCH Practice</h1>

      <button onClick={updateCourse}>
        Update Course
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PatchPractice;