import "./App.css";
import CheckboxAtom from "./components/atoms/checkbox/CheckboxAtom";
import TextAtom from "./components/atoms/textatom/TextAtom";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Atoms Example</h1>

      <div className="section">
        <h2 className="section-title">Checkbox Atom</h2>
        <div className="component-demo">
          <CheckboxAtom checked={false} />
          <TextAtom text="Unchecked state" />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Text Atom</h2>
        <TextAtom text="Contract 1" />
      </div>

      <div className="section">
        <h2 className="section-title">Another Text Example</h2>
        <TextAtom text="Total Payable: $0.00" fontSize={16} fontWeight="bold" />
      </div>

      <div className="section">
        <h2 className="section-title">Checked Checkbox</h2>
        <div className="component-demo">
          <CheckboxAtom checked={true} />
          <TextAtom text="Checked state" />
        </div>
      </div>
    </div>
  );
};

export default App;