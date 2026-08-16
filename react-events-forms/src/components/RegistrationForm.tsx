import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  terms: boolean;
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    terms: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;

    const checked =
      event.target instanceof HTMLInputElement
        ? event.target.checked
        : false;

    setFormData((previousData) => ({
      ...previousData,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.terms) {
      setMessage(
        "Please accept the terms and conditions."
      );
      return;
    }

    setMessage("Registration successful!");

    console.log("Form Data:", formData);
  };

  return (
    <section>
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}

        <div>
          <label>Name</label>

          <br />

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* Email */}

        <div>
          <label>Email</label>

          <br />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* Password */}

        <div>
          <label>Password</label>

          <br />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        {/* Gender */}

        <div>
          <label>Gender</label>

          <br />

          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <br />

        {/* Country */}

        <div>
          <label>Country</label>

          <br />

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">
              Select Country
            </option>

            <option value="India">
              India
            </option>

            <option value="USA">
              USA
            </option>

            <option value="UK">
              UK
            </option>
          </select>
        </div>

        <br />

        {/* Terms */}

        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />

            I accept the terms and conditions
          </label>
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default RegistrationForm;