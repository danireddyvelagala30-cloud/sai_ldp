import { Link } from "react-router-dom";
import { TableCell, TableRow, Typography } from "@mui/material";

import type { Candidate } from "../../../models/Candidate";
import StatusChip from "../../atoms/StatusChip";
import "./styles.css";

interface CandidateRowProps {
  candidate: Candidate;
}

const CandidateRow = ({ candidate }: CandidateRowProps) => {
  const isEngaged = candidate.adjudication === "ENGAGE";
  const hasAdjudication = Boolean(candidate.adjudication?.trim());

  return (
    <TableRow hover className="candidate-row">
      <TableCell className="candidate-row__cell--name">
        <Link
          to={`/candidate/${candidate.id}`}
          className="candidate-row-link"
        >
          {candidate.name}
        </Link>
      </TableCell>

      <TableCell className="candidate-row__cell--adjudication">
        {hasAdjudication ? (
          <span
            className={`candidate-row__adjudication-chip ${
              isEngaged
                ? "candidate-row__adjudication-chip--engaged"
                : "candidate-row__adjudication-chip--neutral"
            }`}
          >
            {candidate.adjudication}
          </span>
        ) : (
          <Typography className="candidate-row__empty-text">-</Typography>
        )}
      </TableCell>

      <TableCell className="candidate-row__cell--status">
        <StatusChip label={candidate.status} />
      </TableCell>

      <TableCell className="candidate-row__cell--location candidate-row__location">
        {candidate.location}
      </TableCell>

      <TableCell className="candidate-row__cell--date candidate-row__date">
        {candidate.date}
      </TableCell>
    </TableRow>
  );
};

export default CandidateRow;
