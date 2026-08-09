import Chip from "@mui/material/Chip";

interface StatusChipProps {
  label: string;
}

const StatusChip = ({ label }: StatusChipProps) => {
  let bg = "#ECFDF5";
  let color = "#12B76A";

  if (label === "CLEAR") {
    bg = "#ECFDF5";
    color = "#12B76A";
  } else if (label === "CONSIDER") {
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
        fontSize: "0.75rem",
        height: 24,
        borderRadius: "4px",
        bgcolor: bg,
        color: color,
        boxShadow: "none",
        px: 0.5,
        "& .MuiChip-label": {
          px: 1,
        },
      }}
    />
  );
};

export default StatusChip;