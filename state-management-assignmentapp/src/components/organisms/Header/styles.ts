import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
    gap: 2,
    mb: 2,
  },
  actions: { flexWrap: "wrap", justifyContent: { xs: "flex-start", sm: "flex-end" } },
  search: { width: { xs: "100%", sm: 280 } },
  avatar: {
    width: 36,
    height: 36,
    bgcolor: "primary.light",
    color: "primary.dark",
    fontWeight: 600,
    flexShrink: 0,
  },
};