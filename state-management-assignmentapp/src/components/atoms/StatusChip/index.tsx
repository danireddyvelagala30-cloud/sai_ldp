import "./styles.css";

interface StatusChipProps {
  label: string;
}

const StatusChip = ({ label }: StatusChipProps) => {
  const isClear = label.toUpperCase() === "CLEAR";
  const modifier = isClear ? "status-chip--clear" : "status-chip--consider";

  return (
    <span className={`status-chip ${modifier}`}>
      {label}
    </span>
  );
};

export default StatusChip;
