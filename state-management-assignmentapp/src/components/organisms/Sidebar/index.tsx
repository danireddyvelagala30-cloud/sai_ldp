import {
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
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
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  APP_CONSTANTS,
  SIDEBAR_NAV_ITEMS,
  type SidebarNavKey,
} from "../../../utils/constants";
import { styles } from "./styles";

interface SidebarProps {
  activeItem?: string;
  onSelectItem?: (item: string) => void;
}

const navigationIcons: Record<SidebarNavKey, ReactNode> = {
  home: <HomeIcon fontSize="small" />,
  candidates: <CandidatesIcon fontSize="small" />,
  adverseActions: <AdverseActionsIcon fontSize="small" />,
  logs: <LogsIcon fontSize="small" />,
  analytics: <AnalyticsIcon fontSize="small" />,
  account: <AccountIcon fontSize="small" />,
  screenings: <ScreeningsIcon fontSize="small" />,
};

const Sidebar = ({ activeItem = APP_CONSTANTS.candidates, onSelectItem }: SidebarProps) => {
  const navigate = useNavigate();

  const handleItemClick = (item: (typeof SIDEBAR_NAV_ITEMS)[number]) => {
    if (onSelectItem) {
      onSelectItem(item.name);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <Paper component="aside" elevation={0} sx={styles.root}>
      <Stack sx={styles.top}>
        <Typography variant="h6" sx={styles.logo}>
          {APP_CONSTANTS.appName}
        </Typography>

        <List disablePadding sx={styles.navList}>
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.name;

            return (
              <ListItemButton
                key={item.name}
                onClick={() => handleItemClick(item)}
                selected={isActive}
                aria-current={isActive ? "page" : undefined}
                sx={styles.navItem}
              >
                <ListItemIcon sx={styles.navIcon}>{navigationIcons[item.key]}</ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">{item.name}</Typography>}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={styles.profile}>
          <Avatar
            src={APP_CONSTANTS.profileAvatarUrl}
            alt={APP_CONSTANTS.profileAvatarAlt}
            sx={styles.avatar}
          >
            {APP_CONSTANTS.profileInitials}
          </Avatar>
          <Stack sx={styles.profileInfo}>
            <Typography variant="body2" sx={styles.profileName}>
              {APP_CONSTANTS.profileName}
            </Typography>
            <Typography variant="caption" color="text.secondary">{APP_CONSTANTS.profileSubtitle}</Typography>
          </Stack>
          <Tooltip title={APP_CONSTANTS.logout}>
            <IconButton size="small" aria-label={APP_CONSTANTS.logout} sx={styles.logout}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
      </Stack>
    </Paper>
  );
};

export default Sidebar;
