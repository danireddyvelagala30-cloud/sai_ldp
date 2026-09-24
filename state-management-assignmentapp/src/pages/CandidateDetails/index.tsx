import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Sidebar from "../../components/organisms/Sidebar";
import CandidateDetailsCard from "../../components/organisms/CandidateDetailsCard";
import StatusChip from "../../components/atoms/StatusChip";
import type { Candidate } from "../../models/Candidate";
import { APP_CONSTANTS } from "../../utils/constants";
import "./styles.css";

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
      <div className="candidate-details-page__not-found">
        <Typography variant="h5">{APP_CONSTANTS.candidateNotFound}</Typography>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="candidate-details-page__btn-pre-adverse"
          style={{ marginTop: "16px" }}
        >
          {APP_CONSTANTS.backToCandidates}
        </button>
      </div>
    );
  }

  const isEngaged = candidate.adjudication === "ENGAGE";

  return (
    <div className="candidate-details-page">
            <Sidebar activeItem={APP_CONSTANTS.candidates} />

      <main className="candidate-details-page__main">
        <header className="candidate-details-page__header">
          <div className="candidate-details-page__header-left">
            <button
              type="button"
              className="candidate-details-page__back-btn"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon sx={{ fontSize: "20px" }} />
            </button>
            <h1 className="candidate-details-page__title">
              {candidate.name}
            </h1>
          </div>

          <div className="candidate-details-page__header-actions">
            <button
              type="button"
              className="candidate-details-page__btn-pre-adverse"
            >
              {APP_CONSTANTS.preAdverseAction}
            </button>
            <button
              type="button"
              disabled={isEngaged}
              onClick={() => engageCandidate(candidate.id)}
              className="candidate-details-page__btn-engage"
            >
              {isEngaged ? APP_CONSTANTS.engaged : APP_CONSTANTS.engage}
            </button>
          </div>
        </header>

        <section className="candidate-details-page__content">
          <CandidateDetailsCard
            title={APP_CONSTANTS.candidateInformation}
            defaultExpanded={true}
            candidate={candidate}
          />

          <CandidateDetailsCard title={APP_CONSTANTS.reportInformation} defaultExpanded={true}>
            <div className="candidate-details-page__tabs-bar">
              <Tabs
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
                sx={{
                  minHeight: "40px",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "primary.main",
                    height: 2,
                  },
                }}
              >
                <Tab
                  label="Adverse Actions"
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                    fontWeight: 600,
                    textTransform: "none",
                    color: tabIndex === 0 ? "primary.main" : "text.secondary",
                    minHeight: "40px",
                    px: 0,
                    mr: "24px",
                  }}
                />
              </Tabs>
            </div>

            <div className="candidate-details-page__table-container">
              <table className="candidate-details-page__table">
                <thead className="candidate-details-page__table-head">
                  <tr>
                    <th className="candidate-details-page__th candidate-details-page__th--search">
                      {APP_CONSTANTS.searchLabel}
                    </th>
                    <th className="candidate-details-page__th candidate-details-page__th--status">
                      {APP_CONSTANTS.statusLabel}
                    </th>
                    <th className="candidate-details-page__th">
                      {APP_CONSTANTS.date}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidate.courtSearches && candidate.courtSearches.length > 0 ? (
                    candidate.courtSearches.map((searchItem, index) => (
                      <tr key={index} className="candidate-details-page__row">
                        <td className="candidate-details-page__cell-search">
                          {searchItem.search}
                        </td>
                        <td>
                          <StatusChip label={searchItem.status} />
                        </td>
                        <td className="candidate-details-page__cell-date">
                          {searchItem.date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="candidate-details-page__empty-row">
                      <td colSpan={3}>
                        {APP_CONSTANTS.noCourtSearches}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CandidateDetailsCard>
        </section>
      </main>
    </div>
  );
};

export default CandidateDetails;
