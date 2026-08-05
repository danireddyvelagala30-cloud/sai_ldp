import { useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import type { Candidate } from "../../models/Candidate";

interface CandidateDetailsCardProps {
  candidate: Candidate;
}

const CandidateDetailsCard = ({ candidate }: CandidateDetailsCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        border: "1px solid #1d4ed8",
        borderStyle: "dashed",
        bgcolor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.8,
          cursor: "pointer",
          minHeight: 56,
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Typography
          sx={{
            fontFamily: '"Inter", Arial, Helvetica, sans-serif',
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
            color: "#111827",
          }}
        >
          Candidate Information
        </Typography>

        <IconButton
          size="small"
          sx={{
            color: "#1d4ed8",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
          onClick={(event) => {
            event.stopPropagation();
            setExpanded((prev) => !prev);
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            borderTop: "1px dashed #93c5fd",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 2,
            px: 3,
            py: 3,
          }}
        >
          <Typography
            sx={{
              color: "#111827",
              fontFamily: '"Inter", Arial, Helvetica, sans-serif',
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Position: {candidate.position}
          </Typography>
          <Typography
            sx={{
              color: "#111827",
              textAlign: "right",
              fontFamily: '"Inter", Arial, Helvetica, sans-serif',
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Status: {candidate.status}
          </Typography>
          <Typography
            sx={{
              color: "#111827",
              fontFamily: '"Inter", Arial, Helvetica, sans-serif',
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Location: {candidate.location}
          </Typography>
          <Typography
            sx={{
              color: "#111827",
              textAlign: "right",
              fontFamily: '"Inter", Arial, Helvetica, sans-serif',
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            Date: {candidate.date}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CandidateDetailsCard;