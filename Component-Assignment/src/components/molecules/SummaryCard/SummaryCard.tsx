import TextAtom from "../../atoms/TextAtom/TextAtom";

const SummaryCard = () => {
  return (
    <div className="summary">
      <h2>Summary</h2>

      <p>
        <TextAtom text="Term: 12 Months" />
      </p>

      <p>
        <TextAtom text="Selected Contracts: 0" />
      </p>

      <p>
        <TextAtom text="Total Payable: $0.00" />
      </p>

      <button>Review Your Credit</button>
    </div>
  );
};

export default SummaryCard;