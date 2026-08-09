import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  course: string;
}

const TypeScriptPractice = () => {
  // Primitive Types
  const company: string = "ABC Technologies";
  const year: number = 2026;
  const isActive: boolean = true;

  // useState
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  // Array
  const colors: string[] = ["Red", "Blue", "Green", "Yellow"];

  // Object
  const student: Student = {
    id: 1,
    name: "John Smith",
    course: "React",
  };

  // Array of Objects
  const students: Student[] = [
    { id: 1, name: "John", course: "React" },
    { id: 2, name: "David", course: "Angular" },
    { id: 3, name: "Emma", course: "Vue" },
  ];

  // Function
  const greet = (user: string): void => {
    alert(`Welcome ${user}`);
  };

  useEffect(() => {
    console.log("Component Loaded");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React + TypeScript Practice</h1>

      <hr />

      <h2>Primitive Types</h2>
      <p>Company: {company}</p>
      <p>Year: {year}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>

      <hr />

      <h2>Counter (useState)</h2>

      <h3>{count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        style={{ marginLeft: "10px" }}
      >
        Decrement
      </button>

      <hr />

      <h2>Input</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Name: {name}</p>

      <hr />

      <h2>Object Example</h2>

      <p>ID : {student.id}</p>
      <p>Name : {student.name}</p>
      <p>Course : {student.course}</p>

      <hr />

      <h2>Array Example</h2>

      <ul>
        {colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>

      <hr />

      <h2>Array of Objects</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>
          {students.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.course}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Conditional Rendering</h2>

      {count >= 5 ? (
        <h3>Count is Greater than or Equal to 5</h3>
      ) : (
        <h3>Count is Less than 5</h3>
      )}

      <hr />

      <button onClick={() => greet(name || "Guest")}>
        Welcome
      </button>
    </div>
  );
};

export default TypeScriptPractice;