import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const GetPractice = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const getStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/students"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>GET Practice</h1>

      <button onClick={getStudents}>
        Get Students
      </button>

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