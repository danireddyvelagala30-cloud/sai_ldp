import Chip from "@mui/material/Chip";

interface StatusChipProps {
  label: string;
}

const StatusChip = ({ label }: StatusChipProps) => {
  let bg = "#ECFDF5";
  let color = "#12B76A";

  if (label.toUpperCase() === "CLEAR") {
    bg = "#ECFDF5";
    color = "#12B76A";
  } else if (label.toUpperCase() === "CONSIDER") {
    bg = "#FEF0C7";
    color = "#B54708";
  }

  return (
    <Chip
      label={label}
      size="small"
      variant="filled"
      sx={{
        textTransform: "uppercase",
        fontWeight: 600,
        letterSpacing: "0.04em",
        fontSize: "12px",
        height: 24,
        borderRadius: "4px",
        bgcolor: bg,
        color: color,
        boxShadow: "none",
        border: "none",
        "& .MuiChip-label": {
          px: "8px",
          py: 0,
        },
      }}
    />
  );
};

export default StatusChip;