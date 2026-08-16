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

import InfoCard from "../../molecules/InfoCard/InfoCard";
import "./CandidateAccordion.css";

const CandidateAccordion = () => {
  return (
    <>
      <Accordion defaultExpanded className="candidate-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="candidate-accordion-summary"
        >
          <Box className="candidate-accordion-title">
            Candidate Information
          </Box>
        </AccordionSummary>

        <AccordionDetails className="candidate-accordion-details">
          <Box>
            <InfoCard
              title="Name"
              value="John Smith"
              icon={<PersonOutlineOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="Email"
              value="john.smith@checkr.com"
              icon={<EmailOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="DOB"
              value="1990-09-10 (26)"
              icon={<EventOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="Phone"
              value="(555) 555-5555"
              icon={<PhoneOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="Zipcode"
              value="94158"
              icon={<LocationOnOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="Social Security"
              value="XXX-XX-6789"
              icon={<ShieldOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="Drivers License"
              value="FTEST1111 (CA)"
              icon={<BadgeOutlinedIcon />}
            />
          </Box>

          <Box>
            <InfoCard
              title="Created At"
              value="Nov 29, 2016 11:05:57 AM"
              icon={<CalendarMonthOutlinedIcon />}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Report Information
        </AccordionSummary>

        <AccordionDetails>
          Report details go here...
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CandidateAccordion;
