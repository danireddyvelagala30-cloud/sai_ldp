import Text from "../../atoms/Text/Text";

const SummaryCard = () => {
  return (
    <div className="summary">
      <h2>Summary</h2>

      <p>
        <Text text="Term: 12 Months" />
      </p>

      <p>
        <Text text="Selected Contracts: 0" />
      </p>

      <p>
        <Text text="Total Payable: $0.00" />
      </p>

      <button>Review Your Credit</button>
    </div>
  );
};

export default SummaryCard;