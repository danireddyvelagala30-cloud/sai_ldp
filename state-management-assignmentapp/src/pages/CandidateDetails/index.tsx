import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "../../components/atoms/Button";
import Sidebar from "../../components/organisms/Sidebar";
import CandidateDetailsCard from "../../components/organisms/CandidateDetailsCard";
import Chip from "../../components/atoms/Chip";
import type { Candidate } from "../../data/models/Candidate";
import { APP_CONSTANTS } from "../../utils/constants";
import { styles } from "./styles";

interface CandidateDetailsProps {
  candidates: Candidate[];
  engageCandidate: (id: number) => void;
}

const CandidateDetails = ({
  candidates,
  engageCandidate,
}: CandidateDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const candidate = candidates.find((c) => c.id === Number(id));

  if (!candidate) {
    return (
      <Box sx={styles.notFound}>
        <Typography variant="h5" sx={styles.notFoundTitle}>
          {APP_CONSTANTS.candidateNotFound}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(APP_CONSTANTS.routes.candidates)}
          sx={styles.backButton}
        >
          {APP_CONSTANTS.backToCandidates}
        </Button>
      </Box>
    );
  }

  const isEngaged =
    candidate.adjudication === APP_CONSTANTS.candidateAdjudicationEngage;

  return (
    <Box sx={styles.page}>
      <Sidebar activeItem={APP_CONSTANTS.candidates} />

      <Box component="main" sx={styles.main}>
        <Stack
          component="header"
          direction={{ xs: "column", sm: "row" }}
          sx={styles.header}
        >
          <Stack direction="row" spacing={2} sx={styles.headerLeft}>
            <IconButton
              aria-label={APP_CONSTANTS.backToCandidates}
              onClick={() => navigate(APP_CONSTANTS.routes.candidates)}
              sx={styles.backIcon}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1" sx={styles.title}>
              {candidate.name}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={styles.headerActions}>
            <Button
              variant="outlined"
              aria-label={APP_CONSTANTS.preAdverseAction}
              sx={styles.actionButton}
            >
              {APP_CONSTANTS.preAdverseAction}
            </Button>
            <Button
              variant="contained"
              disabled={isEngaged}
              onClick={() => engageCandidate(candidate.id)}
              sx={styles.actionButton}
            >
              {isEngaged ? APP_CONSTANTS.engaged : APP_CONSTANTS.engage}
            </Button>
          </Stack>
        </Stack>

        <Box component="section" sx={styles.content}>
          <CandidateDetailsCard
            title={APP_CONSTANTS.candidateInformation}
            defaultExpanded={true}
            candidate={candidate}
          />

          <CandidateDetailsCard title={APP_CONSTANTS.reportInformation} defaultExpanded={true}>
            <Box sx={styles.tabsBar}>
              <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)} sx={styles.tabs}>
                <Tab
                  label={APP_CONSTANTS.adverseActions}
                  id={APP_CONSTANTS.adverseActionsTabId}
                  aria-controls={APP_CONSTANTS.adverseActionsPanelId}
                  sx={styles.tab}
                />
              </Tabs>
            </Box>

            <TableContainer
              id={APP_CONSTANTS.adverseActionsPanelId}
              role="tabpanel"
              aria-labelledby={APP_CONSTANTS.adverseActionsTabId}
              component={Paper}
              elevation={0}
              sx={styles.searchTableContainer}
            >
              <Table aria-labelledby={APP_CONSTANTS.adverseActionsTabId} sx={styles.searchTable}>
                <TableHead sx={styles.searchTableHead}>
                  <TableRow sx={styles.searchHeaderRow}>
                    <TableCell sx={styles.searchHeader}>
                      {APP_CONSTANTS.courtSearchHeaders.search}
                    </TableCell>
                    <TableCell sx={styles.statusHeader}>
                      {APP_CONSTANTS.courtSearchHeaders.status}
                    </TableCell>
                    <TableCell sx={styles.dateHeader}>
                      {APP_CONSTANTS.courtSearchHeaders.date}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={styles.searchTableBody}>
                  {candidate.courtSearches && candidate.courtSearches.length > 0 ? (
                    candidate.courtSearches.map((searchItem) => (
                      <TableRow key={`${searchItem.search}-${searchItem.date}`} sx={styles.searchTableRow}>
                        <TableCell sx={styles.searchCell}>
                          {searchItem.search}
                        </TableCell>
                        <TableCell sx={styles.statusCell}>
                          <Chip appearance="status" label={searchItem.status} />
                        </TableCell>
                        <TableCell sx={styles.dateCell}>
                          {searchItem.date}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow sx={styles.emptyRow}>
                      <TableCell colSpan={3} align="center" sx={styles.emptyCell}>
                        {APP_CONSTANTS.noCourtSearches}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CandidateDetailsCard>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateDetails;
