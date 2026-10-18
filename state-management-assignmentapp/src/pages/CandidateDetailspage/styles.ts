import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  root: { width: "100%", p: { xs: 2, md: 3 } },
  notFound: { p: 4, display: "grid", justifyItems: "start", gap: 2 },
};