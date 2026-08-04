import Chip from "@mui/material/Chip";

interface StatusChipProps {
  label: string;
}

const StatusChip = ({ label }: StatusChipProps) => {
  let color: "success" | "warning" | "primary" = "primary";

  if (label === "CLEAR") {
    color = "success";
  } else if (label === "CONSIDER") {
    color = "warning";
  }

  return (
    <Chip
      label={label}
      color={color}
      size="small"
    />
  );
};

export default StatusChip;