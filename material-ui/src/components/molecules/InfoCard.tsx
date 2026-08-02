import { Card, CardContent, Stack } from "@mui/material";

import CustomIcon from "../atoms/CustomIcon";
import CustomTypography from "../atoms/CustomTypography";

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
      sx={{
        borderRadius: 1.5,
        width: '100%',
        height: 68,
        minHeight: 68,
        boxShadow: 'none',
        bgcolor: '#FAFAFC',
        border: '1px solid #E5E7ED',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CardContent sx={{ p: 1.5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
          <CustomIcon>{icon}</CustomIcon>
          <Stack direction="column" spacing={0.25} sx={{ minWidth: 0, flex: 1 }}>
            <CustomTypography title={title} value={value} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InfoCard;