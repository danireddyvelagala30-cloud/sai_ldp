import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Candidate } from "../../models/Candidate";
import CandidateRow from "./CandidateRow";

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable = ({ candidates }: CandidateTableProps) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #dbe2ea" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 500, color: "#475569" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: 500, color: "#475569" }}>ADJUDICATION</TableCell>
              <TableCell sx={{ fontWeight: 500, color: "#475569" }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 500, color: "#475569" }}>LOCATION</TableCell>
              <TableCell sx={{ fontWeight: 500, color: "#475569" }}>DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body2" color="text.secondary">
                    No candidates found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <CandidateRow key={candidate.id} candidate={candidate} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CandidateTable;