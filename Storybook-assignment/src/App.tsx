import "./App.css";
import Checkbox from "./components/atoms/checkbox/Checkbox";
import Text from "./components/atoms/text/Text";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Atoms Example</h1>

      <div className="section">
        <h2 className="section-title">Checkbox Atom</h2>
        <div className="component-demo">
          <Checkbox checked={false} />
          <Text text="Unchecked state" />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Text Atom</h2>
        <Text text="Contract 1" />
      </div>

      <div className="section">
        <h2 className="section-title">Another Text Example</h2>
        <Text text="Total Payable: $0.00" fontSize={16} fontWeight="bold" />
      </div>

      <div className="section">
        <h2 className="section-title">Checked Checkbox</h2>
        <div className="component-demo">
          <Checkbox checked={true} />
          <Text text="Checked state" />
        </div>
      </div>
    </div>
  );
};

export default App;