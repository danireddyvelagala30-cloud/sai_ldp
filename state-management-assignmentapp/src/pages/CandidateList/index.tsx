import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Popover,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from "@mui/icons-material/FilterList";
import MoreIcon from "@mui/icons-material/MoreVert";
import ExportIcon from "@mui/icons-material/FileUploadOutlined";
import AddIcon from "@mui/icons-material/Add";

import Sidebar from "../../components/organisms/Sidebar";
import CandidateTable from "../../components/organisms/CandidateTable";
import type { Candidate } from "../../data/models/Candidate";
import { APP_CONSTANTS } from "../../utils/constants";
import { styles } from "./styles";

type CandidateStatus =
  | typeof APP_CONSTANTS.candidateStatusClear
  | typeof APP_CONSTANTS.candidateStatusConsider;

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  const [search, setSearch] = useState<string>("");
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const [statusFilters, setStatusFilters] = useState<Record<CandidateStatus, boolean>>({
    [APP_CONSTANTS.candidateStatusClear]: false,
    [APP_CONSTANTS.candidateStatusConsider]: false,
  });

  const [adjudicationFilters, setAdjudicationFilters] = useState({
    [APP_CONSTANTS.candidateAdjudicationEngage]: false,
  });

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusChange = (statusKey: CandidateStatus) => {
    setStatusFilters((prev) => ({
      ...prev,
      [statusKey]: !prev[statusKey],
    }));
  };

  const handleAdjudicationChange = (
    adjKey: typeof APP_CONSTANTS.candidateAdjudicationEngage,
  ) => {
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

      const activeStatusKeys = Object.keys(statusFilters).filter(
        (key) => statusFilters[key as CandidateStatus],
      );
      const matchesStatus =
        activeStatusKeys.length === 0 || activeStatusKeys.includes(candidate.status.toUpperCase());

      const activeAdjKeys = Object.keys(adjudicationFilters).filter(
        (key) => adjudicationFilters[key as typeof APP_CONSTANTS.candidateAdjudicationEngage],
      );
      const matchesAdjudication =
        activeAdjKeys.length === 0 ||
        (candidate.adjudication && activeAdjKeys.includes(candidate.adjudication.toUpperCase()));

      return matchesSearch && matchesStatus && matchesAdjudication;
    });
  }, [candidates, search, statusFilters, adjudicationFilters]);

  const isFilterOpen = Boolean(filterAnchorEl);

  return (
    <Box component="main" sx={styles.page}>
      <Sidebar activeItem={APP_CONSTANTS.candidates} />

      <Box sx={styles.main}>
        <Paper elevation={0} sx={styles.card}>
          <Stack
            component="header"
            direction={{ xs: "column", sm: "row" }}
            sx={styles.cardHeader}
          >
            <Typography variant="h5" component="h1" sx={styles.cardTitle}>
              {APP_CONSTANTS.candidates}
            </Typography>

            <Stack direction="row" spacing={1.5} sx={styles.cardActions}>
              <Button
                variant="outlined"
                startIcon={<ExportIcon />}
                sx={styles.actionButton}
              >
                {APP_CONSTANTS.export}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={styles.actionButton}
              >
                {APP_CONSTANTS.addCandidate}
              </Button>
            </Stack>
          </Stack>

          <Stack
            component="section"
            direction={{ xs: "column", lg: "row" }}
            sx={styles.toolbar}
          >
            <Typography variant="subtitle1" component="h2" sx={styles.toolbarTitle}>
              {APP_CONSTANTS.candidateInformation}
            </Typography>

            <Stack direction="row" spacing={1.5} sx={styles.toolbarControls}>
              <TextField
                size="small"
                type="search"
                label={APP_CONSTANTS.searchCandidates}
                slotProps={{
                  htmlInput: { "aria-label": APP_CONSTANTS.searchCandidates },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={styles.searchField}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={handleFilterClick}
                sx={styles.filterButton}
              >
                {APP_CONSTANTS.filters}
              </Button>

              <Popover
                open={isFilterOpen}
                anchorEl={filterAnchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{ paper: { sx: styles.filterPopover } }}
              >
                <Box sx={styles.filterGroup}>
                  <Typography variant="subtitle2">{APP_CONSTANTS.status}</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={statusFilters[APP_CONSTANTS.candidateStatusClear]}
                            onChange={() => handleStatusChange(APP_CONSTANTS.candidateStatusClear)}
                          />
                        }
                        label={APP_CONSTANTS.clear}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={statusFilters[APP_CONSTANTS.candidateStatusConsider]}
                            onChange={() => handleStatusChange(APP_CONSTANTS.candidateStatusConsider)}
                          />
                        }
                        label={APP_CONSTANTS.consider}
                      />
                    </FormGroup>
                  </FormControl>
                </Box>

                <Box sx={styles.filterGroup}>
                  <Typography variant="subtitle2">{APP_CONSTANTS.adjudication}</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={adjudicationFilters[APP_CONSTANTS.candidateAdjudicationEngage]}
                            onChange={() => handleAdjudicationChange(APP_CONSTANTS.candidateAdjudicationEngage)}
                          />
                        }
                        label={APP_CONSTANTS.engage}
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
              </Popover>

              <Tooltip title={APP_CONSTANTS.moreActions}>
                <IconButton aria-label={APP_CONSTANTS.moreActions}>
                  <MoreIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Box sx={styles.tableArea}>
            <CandidateTable candidates={filteredCandidates} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CandidateList;
