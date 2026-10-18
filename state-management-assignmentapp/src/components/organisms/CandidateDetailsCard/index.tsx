import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { APP_CONSTANTS } from "../../../data/constants";
import type { Candidate } from "../../../data/models/Candidate";
import { styles } from "./styles";

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
  const sectionId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, nextExpanded) => setExpanded(nextExpanded)}
      sx={styles.root}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${sectionId}-content`}
        id={`${sectionId}-header`}
        sx={styles.summary}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails id={`${sectionId}-content`} sx={styles.details}>
        {children ?? (candidate ? (
          <Box sx={styles.grid}>
            {APP_CONSTANTS.candidateDetailFields.map(({ field, label }) => (
              <Box key={field}>
                <Typography variant="caption" color="text.secondary" display="block">
                  {label}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {candidate[field]}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null)}
      </AccordionDetails>
    </Accordion>
  );
};

export default CandidateDetailsCard;
