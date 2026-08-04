import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

import type { Candidate } from "../models/Candidate";
import CandidateTable from "../components/molecules/CandidateTable";

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  const [search, setSearch] = useState("");

  const filteredCandidates = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return candidates;

    return candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(term)
    );
  }, [candidates, search]);

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
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#224DFF", mb: 4 }}>
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
                  bgcolor: item === "Candidates" ? "#2952FF" : "transparent",
                  borderRadius: 1.5,
                  py: 1.2,
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              bgcolor: "#dbeafe",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            }}
          >
            J
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              James Rodriguez
            </Typography>
            <Typography variant="caption" color="text.secondary">
              James.co
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 4 }} style={{ padding: "0px 32px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Candidates
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined">Export</Button>
            <Button variant="contained">Manual Order</Button>
          </Stack>
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid #dbe2ea",
            p: 2,
            mb: 2,
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Candidate Information
            </Typography>

            <TextField
              size="small"
              placeholder="Search any candidate"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ width: 340 }}
            />
          </Box>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Total Candidates: {filteredCandidates.length}
          </Typography>
          <Chip label="Filter" variant="outlined" />
        </Box>

        <CandidateTable candidates={filteredCandidates} />
      </Box>
    </Box>
  );
};

export default CandidateList;
