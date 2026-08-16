import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/students"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        setStudents(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Students</h1>

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

export default Students;