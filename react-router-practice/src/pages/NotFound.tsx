import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <button onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;