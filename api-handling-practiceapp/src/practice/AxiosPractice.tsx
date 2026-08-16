import { useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const AxiosPractice = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const getStudents = async () => {
    try {
      const response = await axios.get<Student[]>(
        "http://localhost:3001/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Axios Practice</h1>

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

export default AxiosPractice;