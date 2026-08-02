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
        sx={{
          display: 'block',
          fontFamily: 'Inter',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: 0,
          color: '#696A6E',
          verticalAlign: 'middle',
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Typography>

      <Typography
        component="span"
        sx={{
          display: 'block',
          fontFamily: 'Inter',
          fontWeight: 500,
          fontStyle: 'normal',
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: 0,
          color: '#2C2C2E',
          verticalAlign: 'middle',
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </Typography>
    </>
  );
};

export default CustomTypography;