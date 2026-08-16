import { Avatar } from "@mui/material";
import "./CustomIcon.css";

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
