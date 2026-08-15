import { useState, useMemo } from "react";
import {
  Popover,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from "@mui/icons-material/FilterList";
import MoreIcon from "@mui/icons-material/MoreVert";
import ExportIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";

import Sidebar from "../../components/organisms/Sidebar";
import CandidateTable from "../../components/molecules/CandidateTable";
import type { Candidate } from "../../models/Candidate";
import "./styles.css";

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  const [search, setSearch] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [statusFilters, setStatusFilters] = useState<{ [key: string]: boolean }>({
    CLEAR: false,
    CONSIDER: false,
  });

  const [adjudicationFilters, setAdjudicationFilters] = useState<{ [key: string]: boolean }>({
    ENGAGE: false,
  });

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusChange = (statusKey: string) => {
    setStatusFilters((prev) => ({
      ...prev,
      [statusKey]: !prev[statusKey],
    }));
  };

  const handleAdjudicationChange = (adjKey: string) => {
    setAdjudicationFilters((prev) => ({
      ...prev,
      [adjKey]: !prev[adjKey],
    }));
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        search.trim() === "" ||
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.location.toLowerCase().includes(search.toLowerCase());

      const activeStatusKeys = Object.keys(statusFilters).filter((k) => statusFilters[k]);
      const matchesStatus =
        activeStatusKeys.length === 0 || activeStatusKeys.includes(candidate.status.toUpperCase());

      const activeAdjKeys = Object.keys(adjudicationFilters).filter((k) => adjudicationFilters[k]);
      const matchesAdjudication =
        activeAdjKeys.length === 0 ||
        (candidate.adjudication && activeAdjKeys.includes(candidate.adjudication.toUpperCase()));

      return matchesSearch && matchesStatus && matchesAdjudication;
    });
  }, [candidates, search, statusFilters, adjudicationFilters]);

  const isFilterOpen = Boolean(filterAnchorEl);

  return (
    <div className="candidate-list-page">
      <Sidebar activeItem="Candidates" />

      <main className="candidate-list-page__main">
        <div className="candidate-list-page__card">
          <header className="candidate-list-page__card-header">
            <h1 className="candidate-list-page__card-title">
              Candidates
            </h1>

            <div className="candidate-list-page__card-actions">
              <button
                type="button"
                className="candidate-list-page__btn-export"
              >
                <ExportIcon sx={{ fontSize: "18px" }} />
                Export
              </button>
              <button
                type="button"
                className="candidate-list-page__btn-add"
              >
                <AddIcon sx={{ fontSize: "18px" }} />
                Add Candidate
              </button>
            </div>
          </header>

          <div className="candidate-list-page__toolbar">
            <h2 className="candidate-list-page__toolbar-title">
              Candidate Information
            </h2>

            <div className="candidate-list-page__toolbar-controls">
              <div className="candidate-list-page__search-field">
                <SearchIcon className="candidate-list-page__search-icon" />
                <input
                  type="text"
                  placeholder="Search candidate"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={handleFilterClick}
                className="candidate-list-page__btn-filter"
              >
                <FilterIcon sx={{ fontSize: "18px", color: "#344054" }} />
                Filters
              </button>

              <Popover
                open={isFilterOpen}
                anchorEl={filterAnchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  paper: {
                    className: "candidate-list-page__filter-popover",
                  },
                }}
              >
                <h3 className="candidate-list-page__filter-heading">
                  Status
                </h3>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={statusFilters.CLEAR}
                        onChange={() => handleStatusChange("CLEAR")}
                      />
                    }
                    label={<Typography variant="body2">Clear</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={statusFilters.CONSIDER}
                        onChange={() => handleStatusChange("CONSIDER")}
                      />
                    }
                    label={<Typography variant="body2">Consider</Typography>}
                  />
                </FormGroup>

                <h3 className="candidate-list-page__filter-heading candidate-list-page__filter-heading--spaced">
                  Adjudication
                </h3>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={adjudicationFilters.ENGAGE}
                        onChange={() => handleAdjudicationChange("ENGAGE")}
                      />
                    }
                    label={<Typography variant="body2">Engage</Typography>}
                  />
                </FormGroup>
              </Popover>

              <button
                type="button"
                className="candidate-list-page__btn-more"
              >
                <MoreIcon sx={{ fontSize: "20px" }} />
              </button>
            </div>
          </div>

          <div className="candidate-list-page__table-area">
            <CandidateTable candidates={filteredCandidates} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateList;
