import { Avatar } from "@mui/material";

interface CustomIconProps {
  children: React.ReactNode;
}

const CustomIcon = ({ children }: CustomIconProps) => {
  return (
    <Avatar
      sx={{
        bgcolor: "#fff",
        color: "#95AAFF",
        border: "1px solid #E5E7ED",
        width: 44,
        height: 44,
        boxShadow: 'none',
        flexShrink: 0,
        '& svg': {
          fontSize: 24,
        },
      }}
    >
      {children}
    </Avatar>
  );
};

export default CustomIcon;