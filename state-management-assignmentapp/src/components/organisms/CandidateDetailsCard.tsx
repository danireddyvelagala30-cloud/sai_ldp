import { useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { Candidate } from "../../models/Candidate";

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
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "8px",
        border: "1px solid #E4E7EC",
        overflow: "hidden",
        mb: "16px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box
        onClick={() => setExpanded((prev) => !prev)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "24px",
          py: "16px",
          cursor: "pointer",
          userSelect: "none",
          bgcolor: "#FFFFFF",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: "16px",
            color: "#1D2939",
            lineHeight: "24px",
          }}
        >
          {title}
        </Typography>

        <IconButton
          size="small"
          sx={{
            color: "#667085",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            borderTop: "1px solid #EAECF0",
            p: "20px 24px",
            bgcolor: "#FAFAFA",
          }}
        >
          {children ? (
            children
          ) : candidate ? (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" }, gap: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: "#667085", fontWeight: 500 }}>
                  Name
                </Typography>
                <Typography variant="body2" sx={{ color: "#1D2939", fontWeight: 600 }}>
                  {candidate.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#667085", fontWeight: 500 }}>
                  Location
                </Typography>
                <Typography variant="body2" sx={{ color: "#1D2939", fontWeight: 600 }}>
                  {candidate.location}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#667085", fontWeight: 500 }}>
                  Date
                </Typography>
                <Typography variant="body2" sx={{ color: "#1D2939", fontWeight: 600 }}>
                  {candidate.date}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#667085", fontWeight: 500 }}>
                  Position
                </Typography>
                <Typography variant="body2" sx={{ color: "#1D2939", fontWeight: 600 }}>
                  {candidate.position}
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CandidateDetailsCard;