import {
  Box,
  Button,
  Chip,
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
import { useNavigate, useParams } from "react-router-dom";

import type { Candidate } from "../models/Candidate";
import CandidateInfoCard from "../components/organisms/CandidateDetailsCard";

interface CandidateDetailsProps {
  candidates: Candidate[];
  engageCandidate: (id: number) => void;
}

const CandidateDetails = ({ candidates, engageCandidate }: CandidateDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const candidate = candidates.find((item) => item.id === Number(id));

  if (!candidate) {
    return <Typography variant="h5">Candidate Not Found</Typography>;
  }

  const handleEngage = () => {
    engageCandidate(candidate.id);
    navigate("/");
  };

  const courtSearches = [
    { search: "SSN Verification", status: "CLEAR", date: "2/22/2022" },
    { search: "Sex Offender", status: "CLEAR", date: "3/13/2022" },
    { search: "Global Watchlist", status: "CONSIDER", date: "7/2/2022" },
    { search: "Federal Criminal", status: "CLEAR", date: "2/20/2022" },
    { search: "County Criminal", status: "CLEAR", date: "5/19/2022" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f5f9", display: "flex" }}>
      <Box
        sx={{
          width: 260,
          bgcolor: "#ffffff",
          borderRight: "1px solid #dbe2ea",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#2952FF", mb: 4 }}>
            RECRUIT
          </Typography>

          <Stack spacing={1}>
            {[
              "Home",
              "Candidates",
              "Adverse Actions",
              "Logs",
              "Analytics",
              "Account",
              "Screenings",
            ].map((item) => (
              <Button
                key={item}
                variant={item === "Candidates" ? "contained" : "text"}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color: item === "Candidates" ? "#fff" : "#475569",
                  bgcolor: item === "Candidates" ? "#224DFF" : "transparent",
                  borderRadius: 1.5,
                  py: 1.2,
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button onClick={() => navigate("/")} variant="text">← Back</Button>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {candidate.name}
            </Typography>
          </Box>

          <Button variant="contained" onClick={handleEngage}>
            Engage
          </Button>
        </Box>

        <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid #dbe2ea", bgcolor: "#fff", mb: 3 }}>
          <CandidateInfoCard candidate={candidate} />
        </Paper>

        <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid #dbe2ea", bgcolor: "#fff" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Court Searches
          </Typography>

          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>SEARCH</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courtSearches.map((item) => (
                  <TableRow key={item.search} hover>
                    <TableCell>{item.search}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        size="small"
                        color={item.status === "CONSIDER" ? "warning" : "success"}
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
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
