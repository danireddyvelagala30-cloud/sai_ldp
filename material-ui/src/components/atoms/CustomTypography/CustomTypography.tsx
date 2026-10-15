import { Typography } from "@mui/material";

interface TypographyProps {
  title: string;
  value: string;
}

const CustomTypography = ({
  title,
  value,
}: TypographyProps) => {
  return (
    <>
      <Typography
        component="span"
        className="custom-typography-title"
      >
        {title}
      </Typography>

      <Typography
        component="span"
        className="custom-typography-value"
      >
        {value}
      </Typography>
    </>
  );
};

export default CustomTypography;
