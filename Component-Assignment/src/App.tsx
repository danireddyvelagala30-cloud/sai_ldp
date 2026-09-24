import "./App.css";

import ContractRow from "./components/molecules/ContractRow/ContractRow";
import SummaryCard from "./components/molecules/SummaryCard/SummaryCard";
import { contracts } from "./data/contracts";

function App() {
  return (
    <div className="container">
      <div className="contracts">
        <h2>Your Contracts</h2>

        {contracts.map((contract) => (
          <ContractRow
            key={contract.id}
            name={contract.name}
            billingCycle={contract.billingCycle}
            amount={contract.amount}
            selected={contract.selected}
          />
        ))}
      </div>

      <SummaryCard />
    </div>
  );
}

export default App;