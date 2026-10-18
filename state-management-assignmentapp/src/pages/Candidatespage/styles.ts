import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  page: { display: "flex", minHeight: "100vh", bgcolor: "background.default" },
  main: { flex: 1, minWidth: 0, p: { xs: 1, md: 3 }, gap: 2 },
  count: { typography: "body2" },
};