import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
} from "@mui/material";
import { useState, useEffect } from "react";

import type { Candidate } from "../../../data/models/Candidate";
import CandidateRow from "../CandidateRow";
import { APP_CONSTANTS } from "../../../data/constants";
import { styles } from "./styles";

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable = ({ candidates }: CandidateTableProps) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPage(0);
  }, [candidates.length]);

  const totalCount = candidates.length;
  const startIndex = page * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const displayCandidates = candidates.slice(startIndex, endIndex);

  return (
    <Box sx={styles.wrapper}>
      <TableContainer component={Paper} elevation={0} sx={styles.container}>
        <Table stickyHeader sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.nameHeader}>
                {APP_CONSTANTS.name.toUpperCase()}
              </TableCell>
              <TableCell sx={styles.adjudicationHeader}>
                {APP_CONSTANTS.adjudication.toUpperCase()}
              </TableCell>
              <TableCell sx={styles.statusHeader}>
                {APP_CONSTANTS.status.toUpperCase()}
              </TableCell>
              <TableCell sx={styles.locationHeader}>
                {APP_CONSTANTS.location.toUpperCase()}
              </TableCell>
              <TableCell sx={styles.dateHeader}>
                {APP_CONSTANTS.date.toUpperCase()}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={styles.emptyCell}>
                  {APP_CONSTANTS.noCandidatesFound}
                </TableCell>
              </TableRow>
            ) : (
              displayCandidates.map((candidate) => (
                <CandidateRow key={candidate.id} candidate={candidate} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => {
          setPageSize(Number(event.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[...APP_CONSTANTS.rowsPerPageOptions]}
        labelRowsPerPage={APP_CONSTANTS.rowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} ${APP_CONSTANTS.outOf} ${count}`
        }
        sx={styles.pagination}
      />
    </Box>
  );
};

export default CandidateTable;
