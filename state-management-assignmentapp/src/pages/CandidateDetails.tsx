import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

import type { Candidate } from "../models/Candidate";
import CandidateDetailsCard from "../components/organisms/CandidateDetailsCard";
import StatusChip from "../components/atoms/StatusChip";
import Sidebar from "../components/organisms/Sidebar";

interface CandidateDetailsProps {
  candidates: Candidate[];
  engageCandidate: (id: number) => void;
}

const CandidateDetails = ({ candidates, engageCandidate }: CandidateDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const candidate = candidates.find((item) => item.id === Number(id));

  if (!candidate) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Candidate Not Found</Typography>
        <Button onClick={() => navigate("/")} sx={{ mt: 2 }} variant="outlined">
          Go Back to Candidates
        </Button>
      </Box>
    );
  }

  const isEngaged = candidate.adjudication === "ENGAGE";

  const handleEngage = () => {
    engageCandidate(candidate.id);
  };

  const courtSearches = [
    { search: "SSN Verification", status: "CLEAR", date: "2/22/2022" },
    { search: "Sex Offender", status: "CLEAR", date: "3/13/2022" },
    { search: "Global Watchlist", status: "CONSIDER", date: "7/2/2022" },
    { search: "Federal Criminal", status: "CLEAR", date: "2/20/2022" },
    { search: "County Criminal", status: "CLEAR", date: "5/19/2022" },
  ];

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#F7F8FA", display: "flex", overflow: "hidden" }}>
      <Sidebar activeItem="Candidates" />

      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          p: "24px 32px 24px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <IconButton size="small" sx={{ color: "#344054", p: 0.5 }}>
              <ArrowBackIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: "20px",
                color: "#1D2939",
                lineHeight: "28px",
              }}
            >
              {candidate.name}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#344054",
                borderColor: "#D0D5DD",
                bgcolor: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "14px",
                px: "16px",
                py: "8px",
                "&:hover": {
                  bgcolor: "#F9FAFB",
                  borderColor: "#D0D5DD",
                },
              }}
            >
              Pre-Adverse Action
            </Button>

            {!isEngaged ? (
              <Button
                variant="contained"
                onClick={handleEngage}
                sx={{
                  textTransform: "none",
                  bgcolor: "#224DFF",
                  color: "#FFFFFF",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "14px",
                  px: "20px",
                  py: "8px",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1A3EDC",
                    boxShadow: "none",
                  },
                }}
              >
                Engage
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled
                sx={{
                  textTransform: "none",
                  bgcolor: "#ECFDF5 !important",
                  color: "#12B76A !important",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "14px",
                  px: "20px",
                  py: "8px",
                }}
              >
                ENGAGED
              </Button>
            )}
          </Stack>
        </Box>

        {/* Collapsible Section 1: Candidate Information */}
        <CandidateDetailsCard title="Candidate Information" candidate={candidate} />

        {/* Collapsible Section 2: Report Information */}
        <CandidateDetailsCard title="Report Information" candidate={candidate} />

        {/* Section 3: Court Searches Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            border: "1px solid #E4E7EC",
            bgcolor: "#FFFFFF",
            overflow: "hidden",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Box
            sx={{
              p: "20px 24px",
              borderBottom: "1px solid #EAECF0",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: "16px",
                color: "#1D2939",
              }}
            >
              Court Searches
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
                <TableRow sx={{ "& th": { borderBottom: "1px solid #EAECF0", py: "12px", px: "24px" } }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "280px" }}>
                    SEARCH
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em", width: "200px" }}>
                    STATUS
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "12px", color: "#475467", letterSpacing: "0.02em" }}>
                    DATE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courtSearches.map((item) => (
                  <TableRow
                    key={item.search}
                    hover
                    sx={{
                      "& td": {
                        borderBottom: "1px solid #F2F4F7",
                        py: "12px",
                        px: "24px",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#224DFF",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      {item.search}
                    </TableCell>
                    <TableCell>
                      <StatusChip label={item.status} />
                    </TableCell>
                    <TableCell sx={{ color: "#667085", fontSize: "14px" }}>
                      {item.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default CandidateDetails;
