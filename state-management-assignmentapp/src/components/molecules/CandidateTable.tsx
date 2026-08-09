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
import { useState, useEffect } from "react";

import type { Candidate } from "../../models/Candidate";
import CandidateRow from "./CandidateRow";

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable = ({ candidates }: CandidateTableProps) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  // Reset to page 1 whenever candidates list changes (e.g. search filter)
  useEffect(() => {
    setPage(1);
  }, [candidates.length]);

  const totalCount = candidates.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const displayCandidates = candidates.slice(startIndex, endIndex);

  // Generate page numbers array with ellipsis support
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "none",
          boxShadow: "none",
          borderRadius: 0,
        }}
      >
        <Table stickyHeader sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ "& th": { borderBottom: "1px solid #EAECF0", py: "10px", px: "24px", bgcolor: "#F9FAFB" } }}>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "22%" }}>
                NAME
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "18%" }}>
                ADJUDICATION
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "18%" }}>
                STATUS
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "22%" }}>
                LOCATION
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "20%" }}>
                DATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" sx={{ color: "#667085" }}>
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

      {/* Sticky Pinned Pagination Footer */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "24px",
          py: "10px",
          borderTop: "1px solid #EAECF0",
          bgcolor: "#FFFFFF",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Left Side: Results Count & Per Page Selector */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontSize: "14px", color: "#344054", fontWeight: 400 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>
              {displayCandidates.length}
            </Box>{" "}
            out of {totalCount} results
          </Typography>

          <Select
            size="small"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
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

        {/* Right Side: Page Navigation Controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <IconButton
            size="small"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            sx={{
              color: "#667085",
              "&.Mui-disabled": {
                color: "#D0D5DD",
              },
            }}
          >
            <KeyboardArrowLeft fontSize="small" />
          </IconButton>

          {getPageNumbers().map((num, idx) => {
            if (typeof num === "string") {
              return (
                <Box
                  key={`dots-${idx}`}
                  sx={{
                    width: 32,
                    height: 32,
                    display: "grid",
                    placeItems: "center",
                    fontSize: "14px",
                    color: "#667085",
                  }}
                >
                  ...
                </Box>
              );
            }

            return (
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
                  fontWeight: currentPage === num ? 600 : 500,
                  color: currentPage === num ? "#224DFF" : "#667085",
                  bgcolor: currentPage === num ? "#EFF4FF" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease-in-out",
                  "&:hover": {
                    bgcolor: currentPage === num ? "#EFF4FF" : "#F9FAFB",
                  },
                }}
              >
                {num}
              </Box>
            );
          })}

          <IconButton
            size="small"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            sx={{
              color: "#667085",
              "&.Mui-disabled": {
                color: "#D0D5DD",
              },
            }}
          >
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateTable;