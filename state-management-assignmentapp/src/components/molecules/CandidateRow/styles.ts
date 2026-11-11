import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  row: {
    "&:hover": { bgcolor: "action.hover" },
    "& td": { borderBottomColor: "divider", py: 1, px: 3 },
  },
  nameCell: { width: "22%" },
  adjudicationCell: { width: "18%" },
  statusCell: { width: "18%" },
  locationCell: { width: "22%", color: "text.secondary", typography: "body2" },
  dateCell: { width: "20%", color: "text.secondary", typography: "body2" },
  link: { fontWeight: 500, color: "primary.main" },
  engagedChip: { bgcolor: "success.light", color: "success.dark", borderColor: "success.light" },
  neutralChip: { bgcolor: "grey.50", color: "text.secondary", borderColor: "divider" },
  emptyTypography: { color: "text.secondary" },
};