import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import Label from "./components/atoms/Label";
const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Storybook Atoms Example</h1>

      <h2>Button Component</h2>
      <Button text="Login" />
      <br />
      <br />
      <Button text="Register" />

      <hr />

      <h2>Input Component</h2>
      <Input placeholder="Enter Username" />
      <br />
      <br />
      <Input placeholder="Enter Password" />

      <hr />

      <h2>Label Component</h2>
      <Label text="Student Name" />
      <br />
      <Label text="Email Address" />
    </div>
  );
};

export default App;