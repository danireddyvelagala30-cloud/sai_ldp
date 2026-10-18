import { Link as RouterLink } from "react-router-dom";
import { Link, TableCell, TableRow, Typography } from "@mui/material";

import type { Candidate } from "../../../data/models/Candidate";
import { APP_CONSTANTS } from "../../../data/constants";
import Chip from "../../atoms/Chip";
import { styles } from "./styles";

interface CandidateRowProps {
  candidate: Candidate;
}

const CandidateRow = ({ candidate }: CandidateRowProps) => {
  const isEngaged =
    candidate.adjudication === APP_CONSTANTS.candidateAdjudicationEngage;
  const hasAdjudication = Boolean(candidate.adjudication?.trim());

  return (
    <TableRow hover sx={styles.row}>
      <TableCell sx={styles.nameCell}>
        <Link
          component={RouterLink}
          to={APP_CONSTANTS.routes.candidateDetails.replace(
            ":id",
            String(candidate.id),
          )}
          underline="hover"
          sx={styles.link}
        >
          {candidate.name}
        </Link>
      </TableCell>

      <TableCell sx={styles.adjudicationCell}>
        {hasAdjudication ? (
          <Chip
            label={candidate.adjudication}
            color={isEngaged ? "success" : "default"}
            size="small"
            variant="outlined"
            sx={isEngaged ? styles.engagedChip : styles.neutralChip}
          />
        ) : (
          <Typography color="text.secondary">-</Typography>
        )}
      </TableCell>

      <TableCell sx={styles.statusCell}>
        <Chip appearance="status" label={candidate.status} />
      </TableCell>

      <TableCell sx={styles.locationCell}>
        {candidate.location}
      </TableCell>

      <TableCell sx={styles.dateCell}>
        {candidate.date}
      </TableCell>
    </TableRow>
  );
};

export default CandidateRow;
