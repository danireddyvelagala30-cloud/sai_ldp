import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStudentsClick = () => {
    navigate("/students");
  };

  return (
    <div>
      <h1>Home Page</h1>

      <p>Welcome to the React Router Practice App.</p>

      <button onClick={handleStudentsClick}>
        Go to Students
      </button>
    </div>
  );
};

export default Home;