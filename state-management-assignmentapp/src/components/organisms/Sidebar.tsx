import { Box, Typography, Avatar, IconButton } from "@mui/material";
import {
  GridViewOutlined as HomeIcon,
  PeopleOutlined as CandidatesIcon,
  GavelOutlined as AdverseActionsIcon,
  ArticleOutlined as LogsIcon,
  BarChartOutlined as AnalyticsIcon,
  ManageAccountsOutlined as AccountIcon,
  FactCheckOutlined as ScreeningsIcon,
  LogoutOutlined as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeItem?: string;
  onSelectItem?: (item: string) => void;
}

const navItems = [
  { name: "Home", icon: HomeIcon, path: "/" },
  { name: "Candidates", icon: CandidatesIcon, path: "/" },
  { name: "Adverse Actions", icon: AdverseActionsIcon, path: "#" },
  { name: "Logs", icon: LogsIcon, path: "#" },
  { name: "Analytics", icon: AnalyticsIcon, path: "#" },
  { name: "Account", icon: AccountIcon, path: "#" },
  { name: "Screenings", icon: ScreeningsIcon, path: "#" },
];

const Sidebar = ({ activeItem = "Candidates", onSelectItem }: SidebarProps) => {
  const navigate = useNavigate();

  const handleItemClick = (item: typeof navItems[0]) => {
    if (onSelectItem) {
      onSelectItem(item.name);
    }
    if (item.path && item.path !== "#") {
      navigate(item.path);
    }
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 238,
        minWidth: 238,
        height: 720,
        maxHeight: "calc(100vh - 48px)",
        bgcolor: "#FFFFFF",
        borderRadius: "8px",
        border: "1px solid #E4E8EE",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        overflow: "hidden",
        m: "24px 0 24px 24px",
      }}
    >
      {/* Top Section */}
      <Box sx={{ pt: "24px", px: "24px" }}>
        {/* Header / Logo */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 800,
            fontSize: "20px",
            lineHeight: "24px",
            color: "#0B198F",
            letterSpacing: "0.5px",
            mb: "24px",
          }}
        >
          RECRUIT
        </Typography>

        {/* List Layout */}
        <Box
          sx={{
            width: 206,
            height: 374,
            display: "flex",
            flexDirection: "column",
            gap: "11px",
            ml: "-8px",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <Box
                key={item.name}
                onClick={() => handleItemClick(item)}
                sx={{
                  width: "100%",
                  height: 44,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  px: "14px",
                  cursor: "pointer",
                  bgcolor: isActive ? "#F0F3FF" : "transparent",
                  color: isActive ? "#224DFF" : "#334155",
                  transition: "all 0.15s ease-in-out",
                  "&:hover": {
                    bgcolor: isActive ? "#F0F3FF" : "#F8FAFC",
                    color: isActive ? "#224DFF" : "#1E293B",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: "20px",
                    color: isActive ? "#224DFF" : "#475569",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    lineHeight: "20px",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Bottom Profile Section */}
      <Box
        sx={{
          borderTop: "1px solid #E4E7EC",
          p: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
            alt="James Rodriguez"
            sx={{ width: 38, height: 38 }}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "14px",
                fontWeight: 600,
                color: "#1D2939",
                lineHeight: "18px",
              }}
            >
              James Rodriguez
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "12px",
                fontWeight: 400,
                color: "#667085",
                lineHeight: "16px",
              }}
            >
              James.co
            </Typography>
          </Box>
        </Box>

        <IconButton
          size="small"
          sx={{
            color: "#667085",
            "&:hover": {
              color: "#344054",
              bgcolor: "#F8FAFC",
            },
          }}
        >
          <LogoutIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;