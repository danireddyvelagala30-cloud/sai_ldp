import Checkbox from "../../atoms/Checkbox/Checkbox";
import Text from "../../atoms/Text/Text";

const ContractRow = () => {
  return (
    <div className="row">
      <Checkbox />
      <Text text="Contract 1" />
      <Text text="Monthly" />
      <Text text="$12,000" />
    </div>
  );
};

export default ContractRow;