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
        <Typography variant="h5">Candidate not found</Typography>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="candidate-details-page__btn-pre-adverse"
          style={{ marginTop: "16px" }}
        >
          Back to Candidates
        </button>
      </div>
    );
  }

  const isEngaged = candidate.adjudication === "ENGAGE";

  return (
    <div className="candidate-details-page">
      <Sidebar activeItem="Candidates" />

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
              Pre-Adverse Action
            </button>
            <button
              type="button"
              disabled={isEngaged}
              onClick={() => engageCandidate(candidate.id)}
              className="candidate-details-page__btn-engage"
            >
              {isEngaged ? "Engaged" : "Engage"}
            </button>
          </div>
        </header>

        <section className="candidate-details-page__content">
          <CandidateDetailsCard
            title="Candidate Information"
            defaultExpanded={true}
            candidate={candidate}
          />

          <CandidateDetailsCard title="Report Information" defaultExpanded={true}>
            <div className="candidate-details-page__tabs-bar">
              <Tabs
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
                sx={{
                  minHeight: "40px",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#224DFF",
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
                    color: tabIndex === 0 ? "#224DFF" : "#667085",
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
                      SEARCH
                    </th>
                    <th className="candidate-details-page__th candidate-details-page__th--status">
                      STATUS
                    </th>
                    <th className="candidate-details-page__th">
                      DATE
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
                        No court searches recorded for this candidate.
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
