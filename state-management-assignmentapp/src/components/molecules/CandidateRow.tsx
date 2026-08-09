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
        "& td": {
          borderBottom: "1px solid #F2F4F7",
          py: "12px",
          px: "24px",
        },
      }}
    >
      <TableCell>
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
      <TableCell>
        {hasAdjudication ? (
          <Chip
            label={candidate.adjudication}
            size="small"
            sx={{
              borderRadius: "4px",
              border: isEngaged ? "1px dashed #8b5cf6" : "1px dashed #94a3b8",
              backgroundColor: isEngaged ? "#f3f4f6" : "#ffffff",
              color: isEngaged ? "#16a34a" : "#475569",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              ".MuiChip-label": {
                px: 1,
              },
            }}
          />
        ) : (
          <Typography sx={{ color: "#667085", fontSize: "14px" }}>-</Typography>
        )}
      </TableCell>
      <TableCell>
        <StatusChip label={candidate.status} />
      </TableCell>
      <TableCell sx={{ color: "#344054", fontSize: "14px" }}>
        {candidate.location}
      </TableCell>
      <TableCell sx={{ color: "#667085", fontSize: "14px" }}>
        {candidate.date}
      </TableCell>
    </TableRow>
  );
};

export default CandidateRow;