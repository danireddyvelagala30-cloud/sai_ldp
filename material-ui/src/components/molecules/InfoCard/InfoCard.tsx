import { Card, CardContent, Stack } from "@mui/material";
import CustomIcon from "../../atoms/CustomIcon/CustomIcon";
import CustomTypography from "../../atoms/CustomTypography/CustomTypography";
import "./InfoCard.css";

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const InfoCard = ({
  title,
  value,
  icon,
}: InfoCardProps) => {
  return (
    <Card
      variant="outlined"
      className="info-card"
    >
      <CardContent className="info-card-content">
        <Stack direction="row" spacing={1.5} className="info-card-row-stack">
          <CustomIcon>{icon}</CustomIcon>
          <Stack direction="column" spacing={0.25} className="info-card-col-stack">
            <CustomTypography title={title} value={value} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
