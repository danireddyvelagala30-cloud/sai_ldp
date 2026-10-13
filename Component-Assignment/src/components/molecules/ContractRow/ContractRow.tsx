import Checkbox from "../../atoms/Checkbox/Checkbox";
import Text from "../../atoms/Text/Text";

interface ContractRowProps {
  name: string;
  billingCycle: string;
  amount: number;
  selected: boolean;
}

const ContractRow = ({ name, billingCycle, amount, selected }: ContractRowProps) => {
  return (
    <div className="row">
      <Checkbox label={name} checked={selected} />
      <Text text={name} />
      <Text text={billingCycle} />
      <Text text={`$${amount.toLocaleString()}`} />
    </div>
  );
};

export default ContractRow;