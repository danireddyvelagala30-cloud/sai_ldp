import { useState } from "react";

const PromisePractice = () => {
  const [message, setMessage] = useState("");

  const getData = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const success = true;

      setTimeout(() => {
        if (success) {
          resolve("Data received successfully!");
        } else {
          reject("Something went wrong!");
        }
      }, 2000);
    });
  };

  const handlePromise = () => {
    setMessage("Loading...");

    getData()
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        setMessage(error);
      });
  };

  return (
    <div>
      <h1>Promise Practice</h1>

      <button onClick={handlePromise}>
        Run Promise
      </button>

      <p>{message}</p>
    </div>
  );
};

export default PromisePractice;