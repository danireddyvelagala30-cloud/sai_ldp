import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    mb: 2,
    bgcolor: "background.paper",
    border: 1,
    borderColor: "divider",
    borderRadius: 1,
    boxShadow: "none",
    overflow: "hidden",
    "&:before": { display: "none" },
  },
  summary: { px: 3, py: 1, minHeight: 56 },
  details: { borderTop: 1, borderColor: "divider", px: 3, py: 2.5, bgcolor: "grey.50" },
  grid: {
    display: "grid",
    gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
    gap: 2,
  },
};