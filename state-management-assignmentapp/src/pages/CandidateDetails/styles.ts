import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  page: { display: "flex", width: "100%", minHeight: "100vh", bgcolor: "background.default" },
  main: { flex: 1, minWidth: 0, minHeight: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" },
  header: { justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, px: { xs: 2, md: 4 }, py: 2.5, bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" },
  headerActions: { flexWrap: "wrap", justifyContent: { xs: "flex-start", sm: "flex-end" } },
  backIcon: { color: "text.secondary" },
  title: { color: "text.primary" },
  content: { p: { xs: 2, md: 3 }, display: "grid", alignContent: "start", gap: 2 },
  notFound: { p: 4, display: "grid", justifyItems: "start", gap: 2 },
  backButton: { mt: 2 },
  tabsBar: { borderBottom: 1, borderColor: "divider", mb: 2 },
  tabs: { minHeight: 40, "& .MuiTab-root": { minHeight: 40, px: 0, mr: 3, fontWeight: 600, textTransform: "none" } },
  searchTableContainer: { border: 1, borderColor: "divider", borderRadius: 1, bgcolor: "background.paper" },
  searchHeader: { width: 280 },
  statusHeader: { width: 200 },
  dateHeader: {},
  searchCell: { color: "primary.main", fontWeight: 500 },
  dateCell: { color: "text.secondary" },
  emptyCell: { color: "text.secondary", py: 3 },
};