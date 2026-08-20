import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
}

const API_URL = "http://localhost:3001/students";

const App = () => {
  const [promiseMessage, setPromiseMessage] = useState("");

  const promisePractice = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const success = true;

      setTimeout(() => {
        if (success) {
          resolve("Promise resolved successfully!");
        } else {
          reject("Promise rejected!");
        }
      }, 1000);
    });
  };

  const handlePromise = () => {
    setPromiseMessage("Promise is pending...");

    promisePractice()
      .then((result) => {
        setPromiseMessage(result);
      })
      .catch((error) => {
        console.error(error);
        setPromiseMessage(String(error));
      });
  };

  const [asyncMessage, setAsyncMessage] = useState("");

  const handleAsyncAwait = async () => {
    setAsyncMessage("Waiting...");

    try {
      const result = await promisePractice();

      setAsyncMessage(result);
    } catch (error) {
      console.error(error);
      setAsyncMessage("Async/Await failed");
    }
  };

  const [axiosMessage, setAxiosMessage] = useState("");

  const handleAxiosGet = async () => {
    try {
      const response = await axios.get<Student[]>(API_URL);

      setAxiosMessage(
        JSON.stringify(response.data, null, 2)
      );
    } catch (error) {
      console.error(error);
      setAxiosMessage("Axios GET failed");
    }
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<Student[]>(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const [postMessage, setPostMessage] = useState("");

  const createStudent = async () => {
    try {
      const getResponse = await axios.get<Student[]>(API_URL);
      const existingStudents: Student[] = getResponse.data;

      const maxId = existingStudents.reduce((max, s) => {
        const num = parseInt(s.id, 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);

      const nextId = String(maxId + 1);

      const response = await axios.post<Student>(API_URL, {
        id: nextId,
        name: "Kiran",
        email: "kiran@example.com",
        course: "React",
      });

      const data: Student = response.data;

      setPostMessage(
        `Created student: ID ${data.id} - ${data.name}`
      );

      getStudents();
    } catch (error) {
      console.error(error);
      setPostMessage("Failed to create student");
    }
  };

  const [putMessage, setPutMessage] = useState("");

  const updateStudent = async () => {
    try {
      const response = await axios.put<Student>(
        `${API_URL}/1`,
        {
          name: "Sai Updated",
          email: "sai.updated@example.com",
          course: "Advanced React",
        }
      );

      const data: Student = response.data;

      setPutMessage(
        `Updated student: ${data.name}`
      );

      getStudents();
    } catch (error) {
      console.error(error);
      setPutMessage("Failed to update student");
    }
  };

  const [patchMessage, setPatchMessage] =
    useState("");

  const patchStudent = async () => {
    try {
      const response = await axios.patch<Student>(
        `${API_URL}/1`,
        {
          course: "TypeScript",
        }
      );

      const data: Student = response.data;

      setPatchMessage(
        `Course changed to: ${data.course}`
      );

      getStudents();
    } catch (error) {
      console.error(error);
      setPatchMessage("Failed to patch student");
    }
  };

  const [deleteMessage, setDeleteMessage] =
    useState("");

  const deleteStudent = async () => {
    try {
      await axios.delete(`${API_URL}/1`);

      setDeleteMessage(
        "Student deleted successfully!"
      );

      getStudents();
    } catch (error) {
      console.error(error);
      setDeleteMessage(
        "Failed to delete student"
      );
    }
  };

  useEffect(() => {
    (async () => {
      await getStudents();
    })();
  }, []);


  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>API Handling Practice</h1>

      <p>
        React + TypeScript + JSON Server
      </p>

      <hr />

      <section>
        <h2>1. Promise</h2>

        <button onClick={handlePromise}>
          Run Promise
        </button>

        <p>{promiseMessage}</p>
      </section>

      <hr />

      <section>
        <h2>2. Async / Await</h2>

        <button onClick={handleAsyncAwait}>
          Run Async/Await
        </button>

        <p>{asyncMessage}</p>
      </section>

      <hr />

      <section>
        <h2>3. Axios GET</h2>

        <button onClick={handleAxiosGet}>
          Axios Get Students
        </button>

        <pre>{axiosMessage}</pre>
      </section>

      <hr />

      <section>
        <h2>4. GET API</h2>

        <button onClick={getStudents}>
          Get Students
        </button>

        {loading && <p>Loading students...</p>}

        {error && <p>{error}</p>}

        {!loading &&
          !error &&
          students.map((student) => (
            <div key={student.id}>
              <h3>
                ID: {student.id} - {student.name}
              </h3>

              <p>
                Email: {student.email}
              </p>

              <p>
                Course: {student.course}
              </p>

              <hr />
            </div>
          ))}
      </section>

      <hr />

      <section>
        <h2>5. POST API</h2>

        <button onClick={createStudent}>
          Add Student
        </button>

        <p>{postMessage}</p>
      </section>

      <hr />

      <section>
        <h2>6. PUT API</h2>

        <button onClick={updateStudent}>
          Update Student
        </button>

        <p>{putMessage}</p>
      </section>

      <hr />

      <section>
        <h2>7. PATCH API</h2>

        <button onClick={patchStudent}>
          Update Course
        </button>

        <p>{patchMessage}</p>
      </section>

      <hr />

      <section>
        <h2>8. DELETE API</h2>

        <button onClick={deleteStudent}>
          Delete Student ID 1
        </button>

        <p>{deleteMessage}</p>
      </section>
    </div>
  );
};

export default App;