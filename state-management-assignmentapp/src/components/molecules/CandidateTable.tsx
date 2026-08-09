import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useState } from "react";

import type { Candidate } from "../../models/Candidate";
import CandidateRow from "./CandidateRow";

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable = ({ candidates }: CandidateTableProps) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(2);

  const totalCount = candidates.length > 0 ? 84 : 0;
  const startIndex = (page - 1) * pageSize;
  const visibleCandidates = candidates.slice(
    startIndex < candidates.length ? startIndex : 0,
    (startIndex < candidates.length ? startIndex : 0) + pageSize
  );
  const displayCandidates = visibleCandidates.length > 0 ? visibleCandidates : candidates;

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} elevation={0} sx={{ border: "none", boxShadow: "none" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow sx={{ "& th": { borderBottom: "1px solid #EAECF0", py: "12px", px: "24px" } }}>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "200px" }}>
                NAME
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "170px" }}>
                ADJUDICATION
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "150px" }}>
                STATUS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "180px" }}>
                LOCATION
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em" }}>
                DATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No candidates found.
                  </Typography>
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

      {/* Pagination Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "20px",
          py: "12px",
          borderTop: "1px solid #EAECF0",
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Left: Results count & per page selector */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontSize: "14px", color: "#344054", fontWeight: 400 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>{displayCandidates.length}</Box> out of {totalCount || candidates.length} results
          </Typography>

          <Select
            size="small"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            sx={{
              height: 32,
              fontSize: "14px",
              color: "#344054",
              bgcolor: "#FFFFFF",
              borderRadius: "6px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D0D5DD",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#98A2B3",
              },
            }}
          >
            <MenuItem value={10}>10 per page</MenuItem>
            <MenuItem value={25}>25 per page</MenuItem>
            <MenuItem value={50}>50 per page</MenuItem>
          </Select>
        </Box>

        {/* Right: Page navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            sx={{ color: "#667085" }}
          >
            <KeyboardArrowLeft fontSize="small" />
          </IconButton>

          {[1, 2, 3].map((num) => (
            <Box
              key={num}
              onClick={() => setPage(num)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "6px",
                display: "grid",
                placeItems: "center",
                fontSize: "14px",
                fontWeight: page === num ? 600 : 500,
                color: page === num ? "#224DFF" : "#667085",
                bgcolor: page === num ? "#EFF4FF" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
                "&:hover": {
                  bgcolor: page === num ? "#EFF4FF" : "#F9FAFB",
                },
              }}
            >
              {num}
            </Box>
          ))}

          <IconButton
            size="small"
            onClick={() => setPage((p) => Math.min(3, p + 1))}
            sx={{ color: "#667085" }}
          >
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateTable;