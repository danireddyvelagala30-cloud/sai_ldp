import CheckboxAtom from "./components/atoms/CheckboxAtom";
import TextAtom from "./components/atoms/TextAtom";

const App = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Atoms Example</h1>

      <h2>Checkbox Atom</h2>
      <CheckboxAtom checked={false} />

      <br />
      <br />

      <h2>Text Atom</h2>
      <TextAtom text="Contract 1" />

      <br />
      <br />

      <h2>Another Text Example</h2>
      <TextAtom text="Total Payable: $0.00" />

      <br />
      <br />

      <h2>Checked Checkbox</h2>
      <CheckboxAtom checked={true} />
    </div>
  );
};

export default App;