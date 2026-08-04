import { Box, Chip, Divider, Typography } from "@mui/material";

import type { Candidate } from "../../models/Candidate";

interface CandidateDetailsCardProps {
  candidate: Candidate;
}

const CandidateDetailsCard = ({ candidate }: CandidateDetailsCardProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Candidate Information
        </Typography>
        <Chip
          label={candidate.adjudication || "-"}
          color={candidate.adjudication === "ENGAGE" ? "success" : "default"}
          variant={candidate.adjudication === "ENGAGE" ? "filled" : "outlined"}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 2 }}>
        <Typography><strong>Position:</strong> {candidate.position}</Typography>
        <Typography><strong>Status:</strong> {candidate.status}</Typography>
        <Typography><strong>Location:</strong> {candidate.location}</Typography>
        <Typography><strong>Date:</strong> {candidate.date}</Typography>
      </Box>
    </Box>
  );
};

export default CandidateDetailsCard;