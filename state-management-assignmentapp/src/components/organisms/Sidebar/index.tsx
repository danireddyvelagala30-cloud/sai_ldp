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
import { useNavigate } from "react-router-dom";
import { APP_CONSTANTS } from "../../../data/constants";
import { styles } from "./styles";

interface SidebarProps {
  activeItem?: string;
  onSelectItem?: (item: string) => void;
}

const navItems = [
  { name: APP_CONSTANTS.home, icon: HomeIcon, path: "/" },
  { name: APP_CONSTANTS.candidates, icon: CandidatesIcon, path: APP_CONSTANTS.routes.candidates },
  { name: APP_CONSTANTS.adverseActions, icon: AdverseActionsIcon },
  { name: APP_CONSTANTS.logs, icon: LogsIcon },
  { name: APP_CONSTANTS.analytics, icon: AnalyticsIcon },
  { name: APP_CONSTANTS.account, icon: AccountIcon },
  { name: APP_CONSTANTS.screenings, icon: ScreeningsIcon },
];

const Sidebar = ({ activeItem = APP_CONSTANTS.candidates, onSelectItem }: SidebarProps) => {
  const navigate = useNavigate();

  const handleItemClick = (item: typeof navItems[0]) => {
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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <ListItemButton
                key={item.name}
                onClick={() => handleItemClick(item)}
                selected={isActive}
                aria-current={isActive ? "page" : undefined}
                sx={styles.navItem}
              >
                <ListItemIcon sx={styles.navIcon}><Icon fontSize="small" /></ListItemIcon>
                <ListItemText primary={item.name} primaryTypographyProps={{ variant: "body2" }} />
              </ListItemButton>
            );
          })}
        </List>
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center" sx={styles.profile}>
          <Avatar
            src={APP_CONSTANTS.profileAvatarUrl}
            alt={APP_CONSTANTS.profileAvatarAlt}
            sx={styles.avatar}
          >
            {APP_CONSTANTS.profileInitials}
          </Avatar>
          <Stack sx={styles.profileInfo}>
            <Typography variant="body2" fontWeight={600}>{APP_CONSTANTS.profileName}</Typography>
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
