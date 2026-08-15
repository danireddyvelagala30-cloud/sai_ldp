import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

import type { Candidate } from "../../../models/Candidate";
import CandidateRow from "../CandidateRow";
import "./styles.css";

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable = ({ candidates }: CandidateTableProps) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [candidates.length]);

  const totalCount = candidates.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const displayCandidates = candidates.slice(startIndex, endIndex);

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
    <div className="candidate-table__wrapper">
      <div className="candidate-table__container">
        <Table stickyHeader className="candidate-table__table">
          <TableHead>
            <TableRow className="candidate-table__head-row">
              <TableCell className="candidate-table__head-cell--name">
                NAME
              </TableCell>
              <TableCell className="candidate-table__head-cell--adjudication">
                ADJUDICATION
              </TableCell>
              <TableCell className="candidate-table__head-cell--status">
                STATUS
              </TableCell>
              <TableCell className="candidate-table__head-cell--location">
                LOCATION
              </TableCell>
              <TableCell className="candidate-table__head-cell--date">
                DATE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="candidate-table__empty-cell">
                  No candidates found.
                </TableCell>
              </TableRow>
            ) : (
              displayCandidates.map((candidate) => (
                <CandidateRow key={candidate.id} candidate={candidate} />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="candidate-table__pagination">
        <div className="candidate-table__pagination-left">
          <span className="candidate-table__results-text">
            <strong>{displayCandidates.length}</strong> out of {totalCount} results
          </span>

          <select
            className="candidate-table__page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="candidate-table__pagination-right">
          <button
            type="button"
            className="candidate-table__nav-btn"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <KeyboardArrowLeft fontSize="small" />
          </button>

          {getPageNumbers().map((num, idx) => {
            if (typeof num === "string") {
              return (
                <div key={`dots-${idx}`} className="candidate-table__page-dots">
                  ...
                </div>
              );
            }

            return (
              <button
                type="button"
                key={num}
                onClick={() => setPage(num)}
                className={`candidate-table__page-btn ${
                  currentPage === num ? "candidate-table__page-btn--active" : ""
                }`}
              >
                {num}
              </button>
            );
          })}

          <button
            type="button"
            className="candidate-table__nav-btn"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <KeyboardArrowRight fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
