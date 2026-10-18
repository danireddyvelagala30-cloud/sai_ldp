import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import InfoCard from "../../molecules/InfoCard";
import {
  CANDIDATE_DETAILS,
  CANDIDATE_INFORMATION_TITLE,
  REPORT_INFORMATION_PLACEHOLDER,
  REPORT_INFORMATION_TITLE,
} from "../../../utils/constants";

const candidateDetailIcons = {
  person: PersonOutlineOutlinedIcon,
  email: EmailOutlinedIcon,
  date: EventOutlinedIcon,
  phone: PhoneOutlinedIcon,
  location: LocationOnOutlinedIcon,
  security: ShieldOutlinedIcon,
  badge: BadgeOutlinedIcon,
  calendar: CalendarMonthOutlinedIcon,
};

const CandidateAccordion = () => {
  return (
    <>
      <Accordion defaultExpanded className="candidate-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="candidate-accordion-summary"
        >
          <Box className="candidate-accordion-title">
            {CANDIDATE_INFORMATION_TITLE}
          </Box>
        </AccordionSummary>

        <AccordionDetails className="candidate-accordion-details">
          {CANDIDATE_DETAILS.map(({ title, value, icon }) => {
            const DetailIcon = candidateDetailIcons[icon];

            return (
              <Box key={title}>
                <InfoCard title={title} value={value} icon={<DetailIcon />} />
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          {REPORT_INFORMATION_TITLE}
        </AccordionSummary>

        <AccordionDetails>
          {REPORT_INFORMATION_PLACEHOLDER}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CandidateAccordion;
