import { Link } from "react-router-dom";
import { Chip, TableCell, TableRow, Typography } from "@mui/material";

import type { Candidate } from "../../models/Candidate";
import StatusChip from "../atoms/StatusChip";

interface CandidateRowProps {
  candidate: Candidate;
}

const CandidateRow = ({ candidate }: CandidateRowProps) => {
  const isEngaged = candidate.adjudication === "ENGAGE";
  const hasAdjudication = Boolean(candidate.adjudication?.trim());

  return (
    <TableRow
      hover
      sx={{
        "&:hover": {
          bgcolor: "#F9FAFB",
        },
        "& td": {
          borderBottom: "1px solid #EAECF0",
          py: "8px",
          px: "24px",
          verticalAlign: "middle",
        },
      }}
    >
      <TableCell sx={{ width: "22%" }}>
        <Link
          to={`/candidate/${candidate.id}`}
          style={{
            textDecoration: "none",
            color: "#224DFF",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {candidate.name}
        </Link>
      </TableCell>

      <TableCell sx={{ width: "18%" }}>
        {hasAdjudication ? (
          <Chip
            label={candidate.adjudication}
            size="small"
            sx={{
              borderRadius: "4px",
              border: isEngaged ? "1px solid #A6F4C5" : "1px solid #D0D5DD",
              backgroundColor: isEngaged ? "#ECFDF5" : "#F9FAFB",
              color: isEngaged ? "#12B76A" : "#344054",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.02em",
              height: 24,
              textTransform: "uppercase",
              "& .MuiChip-label": {
                px: "8px",
              },
            }}
          />
        ) : (
          <Typography sx={{ color: "#667085", fontSize: "14px" }}>-</Typography>
        )}
      </TableCell>

      <TableCell sx={{ width: "18%" }}>
        <StatusChip label={candidate.status} />
      </TableCell>

      <TableCell sx={{ color: "#344054", fontSize: "14px", width: "22%" }}>
        {candidate.location}
      </TableCell>

      <TableCell sx={{ color: "#667085", fontSize: "14px", width: "20%" }}>
        {candidate.date}
      </TableCell>
    </TableRow>
  );
};

export default CandidateRow;