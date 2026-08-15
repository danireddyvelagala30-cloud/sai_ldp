import { useState } from "react";
import { Collapse, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { Candidate } from "../../../models/Candidate";
import "./styles.css";

interface CandidateDetailsCardProps {
  title: string;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
  candidate?: Candidate;
}

const CandidateDetailsCard = ({
  title,
  defaultExpanded = false,
  children,
  candidate,
}: CandidateDetailsCardProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="details-card">
      <div
        className="details-card__header"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Typography className="details-card__title">
          {title}
        </Typography>

        <IconButton
          size="small"
          className={`details-card__toggle-btn ${
            expanded
              ? "details-card__toggle-btn--expanded"
              : "details-card__toggle-btn--collapsed"
          }`}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="details-card__body">
          {children ? (
            children
          ) : candidate ? (
            <div className="details-card__grid">
              <div>
                <span className="details-card__field-label">
                  Name
                </span>
                <span className="details-card__field-value">
                  {candidate.name}
                </span>
              </div>
              <div>
                <span className="details-card__field-label">
                  Location
                </span>
                <span className="details-card__field-value">
                  {candidate.location}
                </span>
              </div>
              <div>
                <span className="details-card__field-label">
                  Date
                </span>
                <span className="details-card__field-value">
                  {candidate.date}
                </span>
              </div>
              <div>
                <span className="details-card__field-label">
                  Position
                </span>
                <span className="details-card__field-value">
                  {candidate.position}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </Collapse>
    </div>
  );
};

export default CandidateDetailsCard;
