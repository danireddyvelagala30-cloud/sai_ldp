import { useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] =
    useState<LoginData>({
      email: "",
      password: "",
    });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.email) {
      setError("Email is required.");
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    setError("");

    console.log("Login Data:", formData);

    alert("Login successful!");
  };

  return (
    <section>
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <br />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Password</label>

          <br />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </section>
  );
};

export default LoginForm;