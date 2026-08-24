import {
  useNavigate,
  useParams,
} from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div>
      <h1>Student Details</h1>

      <p>
        Student ID: <strong>{id}</strong>
      </p>

      <button onClick={() => navigate("/students")}>
        Back to Students
      </button>
    </div>
  );
};

export default StudentDetails;