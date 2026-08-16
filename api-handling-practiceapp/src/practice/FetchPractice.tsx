import { useState } from "react";

const FetchPractice = () => {
  const [data, setData] = useState("");

  const handleFetch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/students"
      );

      const result = await response.json();

      setData(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(error);
      setData("Failed to fetch data");
    }
  };

  return (
    <div>
      <h1>Fetch Practice</h1>

      <button onClick={handleFetch}>
        Fetch Students
      </button>

      <pre>{data}</pre>
    </div>
  );
};

export default FetchPractice;