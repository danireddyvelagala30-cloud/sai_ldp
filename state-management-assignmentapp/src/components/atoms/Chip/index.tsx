import { Chip as MuiChip } from "@mui/material";

interface ChipProps {
  label: string;
}

const Chip = ({ label }: ChipProps) => {
  if (!label) return null;

  return (
    <MuiChip
      label={label}
      size="small"
      color="primary"
      variant="outlined"
      sx={{
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    />
  );
};

export default Chip;
