import { useState } from "react";
import axios from "axios";

const FetchPractice = () => {
  const [data, setData] = useState("");

  const handleAxios = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/students"
      );

      setData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
      setData("Failed to fetch data with Axios");
    }
  };

  return (
    <div>
      <h1>Axios Get Data Practice</h1>

      <button onClick={handleAxios}>
        Fetch Students (Axios)
      </button>

      <pre>{data}</pre>
    </div>
  );
};

export default FetchPractice;