import "./styles.css";

interface AdjudicationChipProps {
  label: string;
}

const AdjudicationChip = ({ label }: AdjudicationChipProps) => {
  if (!label) return null;

  return (
    <span className="adjudication-chip">
      {label}
    </span>
  );
};

export default AdjudicationChip;
