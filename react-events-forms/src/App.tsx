import ClickEvents from "./components/ClickEvents";
import InputEvents from "./components/InputEvents";
import FormBasics from "./components/FormBasics";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>React Event & Form Management</h1>

      <p>
        Practice React events, controlled inputs,
        forms, validation and TypeScript event types.
      </p>

      <hr />

      <ClickEvents />

      <hr />

      <InputEvents />

      <hr />

      <FormBasics />

      <hr />

      <RegistrationForm />

      <hr />

      <LoginForm />
    </div>
  );
};

export default App;