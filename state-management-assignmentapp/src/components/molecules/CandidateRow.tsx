import { Link } from "react-router-dom";
import { Chip, TableCell, TableRow } from "@mui/material";

import type { Candidate } from "../../models/Candidate";

interface CandidateRowProps {
  candidate: Candidate;
}

const CandidateRow = ({ candidate }: CandidateRowProps) => {
  const isEngaged = candidate.adjudication === "ENGAGE";

  return (
    <TableRow hover>
      <TableCell style={{ padding: "10px 16px" }}>
        <Link
          to={`/candidate/${candidate.id}`}
          style={{
            textDecoration: "none",
            color: "#224DFF",
            fontWeight: 700,
          }}
        >
          {candidate.name}
        </Link>
      </TableCell>
      <TableCell style={{ padding: "10px 16px" }}>
        <Chip
          label={candidate.adjudication || "-"}
          color={isEngaged ? "success" : "default"}
          size="small"
          variant={isEngaged ? "filled" : "outlined"}
        />
      </TableCell>
      <TableCell style={{ padding: "10px 16px" }}>{candidate.status}</TableCell>
      <TableCell style={{ padding: "10px 16px" }}>{candidate.location}</TableCell>
      <TableCell style={{ padding: "10px 16px" }}>{candidate.date}</TableCell>
    </TableRow>
  );
};

export default CandidateRow;