import CheckboxAtom from "../atoms/CheckboxAtom";
import TextAtom from "../atoms/TextAtom";

const ContractRow = () => {
  return (
    <div className="row">
      <CheckboxAtom />
      <TextAtom text="Contract 1" />
      <TextAtom text="Monthly" />
      <TextAtom text="$12,000" />
    </div>
  );
};

export default ContractRow;