import React from "react";

type Student = {
  name: string;
  age: number;
};

type Props = {
  // String Prop
  name: string;

  // Number Prop
  age: number;

  // Boolean Prop
  isStudent: boolean;

  // Object Prop
  student: Student;

  // Array Prop
  fruits: string[];

  // Function Prop
  showMessage: () => void;

  // Children Prop
  children: React.ReactNode;

  // Optional Prop
  city?: string;
};

function PropsDemo({
  name,
  age,
  isStudent,
  student,
  fruits,
  showMessage,
  children,
  city = "Not Provided",
}: Props) {
  return (
    <div style={{ padding: "20px", border: "2px solid black" }}>
      <h1>Props Practice</h1>

      <hr />

      <h2>1. String Prop</h2>
      <p>Name : {name}</p>

      <hr />

      <h2>2. Number Prop</h2>
      <p>Age : {age}</p>

      <hr />

      <h2>3. Boolean Prop</h2>
      <p>{isStudent ? "Student" : "Not Student"}</p>

      <hr />

      <h2>4. Object Prop</h2>
      <p>Name : {student.name}</p>
      <p>Age : {student.age}</p>

      <hr />

      <h2>5. Array Prop</h2>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <hr />

      <h2>6. Function Prop</h2>

      <button onClick={showMessage}>
        Click Here
      </button>

      <hr />

      <h2>7. Children Prop</h2>

      {children}

      <hr />

      <h2>8. Optional Prop</h2>

      <p>City : {city}</p>
    </div>
  );
}

export default PropsDemo;