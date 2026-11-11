import { Avatar } from "@mui/material";

interface CustomIconProps {
  children: React.ReactNode;
}

const CustomIcon = ({ children }: CustomIconProps) => {
  return (
    <Avatar className="custom-icon-avatar">
      {children}
    </Avatar>
  );
};

export default CustomIcon;
