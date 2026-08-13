import Icon from "../atoms/Icon";
import Typography from "../atoms/Typography";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoCard = ({
  icon,
  label,
  value,
}: InfoCardProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        border: "1px solid lightgray",
        borderRadius: "10px",
        padding: "15px",
        width: "300px",
        alignItems: "center",
      }}
    >
        <Icon icon={icon} />

      <Typography
        label={label}
        value={value}
      />
    </div>
  );
};

export default InfoCard;