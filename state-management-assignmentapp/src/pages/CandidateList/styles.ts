import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  page: { display: "flex", width: "100%", minHeight: "100vh", bgcolor: "background.default" },
  main: { flex: 1, minWidth: 0, p: { xs: 1, md: 3 }, display: "flex", flexDirection: "column" },
  card: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    border: 1,
    borderColor: "divider",
    borderRadius: 1,
    overflow: "hidden",
  },
  cardHeader: { justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, px: 3, py: 2.5, borderBottom: 1, borderColor: "divider" },
  cardTitle: { color: "text.primary" },
  cardActions: { alignSelf: { xs: "flex-end", sm: "center" }, flexWrap: "wrap" },
  actionButton: { minHeight: 40 },
  toolbar: { justifyContent: "space-between", alignItems: { xs: "stretch", lg: "center" }, gap: 2, p: 2.5, borderBottom: 1, borderColor: "divider" },
  toolbarTitle: { fontWeight: 600, color: "text.primary" },
  toolbarControls: { alignItems: "center", flexWrap: "wrap", justifyContent: { xs: "flex-start", lg: "flex-end" } },
  searchField: { minWidth: { xs: "100%", sm: 240 }, bgcolor: "background.paper" },
  filterButton: { minHeight: 40, flexShrink: 0 },
  filterPopover: { p: 2, width: 260 },
  filterGroup: { display: "grid", gap: 1, "& + &": { mt: 2 } },
  tableArea: { display: "flex", flex: 1, minHeight: 0 },
};