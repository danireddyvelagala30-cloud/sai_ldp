import type { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  wrapper: { display: "flex", flexDirection: "column", minHeight: 0, width: "100%", height: "100%" },
  container: { flex: 1, minHeight: 0, overflow: "auto", borderRadius: 0, bgcolor: "background.paper" },
  table: { minWidth: 760, tableLayout: "fixed" },
  header: {
    bgcolor: "grey.50",
    borderBottom: 1,
    borderColor: "divider",
    color: "text.secondary",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.5,
    py: 1.25,
    px: 3,
  },
  nameHeader: { width: "22%", bgcolor: "grey.50", color: "text.secondary", fontWeight: 600, fontSize: 12, py: 1.25, px: 3 },
  adjudicationHeader: { width: "18%", bgcolor: "grey.50", color: "text.secondary", fontWeight: 600, fontSize: 12, py: 1.25, px: 3 },
  statusHeader: { width: "18%", bgcolor: "grey.50", color: "text.secondary", fontWeight: 600, fontSize: 12, py: 1.25, px: 3 },
  locationHeader: { width: "22%", bgcolor: "grey.50", color: "text.secondary", fontWeight: 600, fontSize: 12, py: 1.25, px: 3 },
  dateHeader: { width: "20%", bgcolor: "grey.50", color: "text.secondary", fontWeight: 600, fontSize: 12, py: 1.25, px: 3 },
  headerRow: { bgcolor: "grey.50" },
  emptyRow: {},
  emptyCell: { py: 4, color: "text.secondary" },
  pagination: {
    flexShrink: 0,
    borderTop: 1,
    borderColor: "divider",
    bgcolor: "background.paper",
    "& .MuiTablePagination-toolbar": { flexWrap: "wrap", gap: 1 },
  },
};