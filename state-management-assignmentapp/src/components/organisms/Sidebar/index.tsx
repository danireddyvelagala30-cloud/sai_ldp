import { Typography, Avatar, IconButton } from "@mui/material";
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
import "./styles.css";

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
    <aside className="sidebar">
      <div className="sidebar__top">
        <Typography variant="h6" className="sidebar__logo">
          RECRUIT
        </Typography>

        <div className="sidebar__nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                type="button"
                key={item.name}
                onClick={() => handleItemClick(item)}
                className={`sidebar__nav-item ${
                  isActive ? "sidebar__nav-item--active" : ""
                }`}
              >
                <Icon
                  className={`sidebar__nav-icon ${
                    isActive ? "sidebar__nav-icon--active" : ""
                  }`}
                />
                <span
                  className={`sidebar__nav-label ${
                    isActive ? "sidebar__nav-label--active" : ""
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sidebar__bottom">
        <div className="sidebar__profile">
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
            alt="James Rodriguez"
            className="sidebar__avatar"
          />
          <div className="sidebar__profile-info">
            <span className="sidebar__profile-name">
              James Rodriguez
            </span>
            <span className="sidebar__profile-email">
              James.co
            </span>
          </div>
        </div>

        <IconButton
          size="small"
          className="sidebar__logout-btn"
        >
          <LogoutIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </div>
    </aside>
  );
};

export default Sidebar;
