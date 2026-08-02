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

import InfoCard from "../molecules/InfoCard";

const CandidateAccordion = () => {
  return (
    <>
      <Accordion defaultExpanded sx={{ borderRadius: 3, boxShadow: '0px 4px 28px 0px rgba(45, 45, 47, 0.1)', overflow: 'hidden' }}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            pl: 2,
            pr: 2,
            py: 2,
            '& .MuiAccordionSummary-content': {
              m: 0,
            },
          }}
        >
          <Box
            sx={{
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#2C2C2E',
              verticalAlign: 'middle',
            }}
          >
            Candidate Information
          </Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            p: 2,
            pt: 2,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
            columnGap: 2,
            rowGap: 2,
            bgcolor: '#FFFFFF',
          }}
    >
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