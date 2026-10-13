import Button from "../../atoms/Button/Button";
import Text from "../../atoms/Text/Text";
import { contracts, summaryDetails } from "../../../data/contracts";

const selectedContracts = contracts.filter((contract) => contract.selected).length;
const totalPayable = contracts
  .filter((contract) => contract.selected)
  .reduce((sum, contract) => sum + contract.amount, 0);

const SummaryCard = () => {
  return (
    <div className="summary">
      <Text text={summaryDetails.title} />

      <p>
        <Text text={`Term: ${summaryDetails.term}`} />
      </p>

      <p>
        <Text text={`Selected Contracts: ${selectedContracts}`} />
      </p>

      <p>
        <Text text={`Total Payable: $${totalPayable.toLocaleString()}`} />
      </p>

      <Button label={summaryDetails.reviewButtonLabel} />
    </div>
  );
};

export default SummaryCard;