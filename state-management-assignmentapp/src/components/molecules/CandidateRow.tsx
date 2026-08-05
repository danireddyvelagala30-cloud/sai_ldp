import { Link } from "react-router-dom";
import { Chip, TableCell, TableRow } from "@mui/material";

import type { Candidate } from "../../models/Candidate";

interface CandidateRowProps {
  candidate: Candidate;
}

const CandidateRow = ({ candidate }: CandidateRowProps) => {
  const isEngaged = candidate.adjudication === "ENGAGE";
  const hasAdjudication = Boolean(candidate.adjudication?.trim());

  return (
    <TableRow hover>
      <TableCell style={{ padding: "10px 16px" }}>
        <Link
          to={`/candidate/${candidate.id}`}
          style={{
            textDecoration: "none",
            color: "#224DFF",
            fontWeight: 500,
          }}
        >
          {candidate.name}
        </Link>
      </TableCell>
      <TableCell style={{ padding: "10px 16px" }}>
        {hasAdjudication ? (
          <Chip
            label={candidate.adjudication}
            size="small"
            sx={{
              borderRadius: 1,
              border: isEngaged ? "1px dashed #8b5cf6" : "1px dashed #94a3b8",
              backgroundColor: isEngaged ? "#f3f4f6" : "#ffffff",
              color: isEngaged ? "#16a34a" : "#475569",
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              ".MuiChip-label": {
                px: 1.2,
              },
            }}
          />
        ) : (
          <span style={{ color: "#64748b" }}>-</span>
        )}
      </TableCell>
      <TableCell style={{ padding: "10px 16px" }}>{candidate.status}</TableCell>
      <TableCell style={{ padding: "10px 16px" }}>{candidate.location}</TableCell>
      <TableCell style={{ padding: "10px 16px" }}>{candidate.date}</TableCell>
    </TableRow>
  );
};

export default CandidateRow;