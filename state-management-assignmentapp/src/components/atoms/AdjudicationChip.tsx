import Chip from "@mui/material/Chip";

interface AdjudicationChipProps {
  label: string;
}

const AdjudicationChip = ({ label }: AdjudicationChipProps) => {
  if (!label) return null;

  return (
    <Chip
      label={label}
      color="primary"
      size="small"
    />
  );
};

export default AdjudicationChip;