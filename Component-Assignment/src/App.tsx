import "./App.css";

import ContractRow from "./components/molecules/ContractRow/ContractRow";
import SummaryCard from "./components/molecules/SummaryCard/SummaryCard";

function App() {
  return (
    <div className="container">
      <div className="contracts">
        <h2>Your Contracts</h2>

        <ContractRow />
        <ContractRow />
        <ContractRow />
        <ContractRow />
      </div>

      <SummaryCard />
    </div>
  );
}

export default App;