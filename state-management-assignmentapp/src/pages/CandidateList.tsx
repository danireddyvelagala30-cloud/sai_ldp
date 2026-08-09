import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FileDownloadOutlined as ExportIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { useMemo, useState } from "react";

import type { Candidate } from "../models/Candidate";
import CandidateTable from "../components/molecules/CandidateTable";
import Sidebar from "../components/organisms/Sidebar";

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
        {/* Top Bar: Title & Action Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "24px",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              fontSize: "20px",
              color: "#1D2939",
              lineHeight: "28px",
            }}
          >
            Candidates
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<ExportIcon sx={{ fontSize: "18px" }} />}
              sx={{
                textTransform: "none",
                color: "#344054",
                borderColor: "#D0D5DD",
                bgcolor: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "14px",
                px: "16px",
                py: "8px",
                "&:hover": {
                  bgcolor: "#F9FAFB",
                  borderColor: "#D0D5DD",
                },
              }}
            >
              Export
            </Button>

            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: "18px" }} />}
              sx={{
                textTransform: "none",
                bgcolor: "#224DFF",
                color: "#FFFFFF",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "14px",
                px: "16px",
                py: "8px",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#1A3EDC",
                  boxShadow: "none",
                },
              }}
            >
              Manual Order
            </Button>
          </Stack>
        </Box>

        {/* Main Paper Container */}
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
          {/* Candidate Information Header & Tools */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "20px 24px",
              borderBottom: "1px solid #EAECF0",
              flexWrap: "wrap",
              gap: 2,
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
              Candidate Information
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", ml: "auto" }}>
              {/* Search Box */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  px: "12px",
                  py: "6px",
                  bgcolor: "#FFFFFF",
                  width: 280,
                }}
              >
                <SearchIcon sx={{ color: "#667085", fontSize: "20px" }} />
                <TextField
                  size="small"
                  placeholder="Search any candidate"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      padding: 0,
                      fontSize: "14px",
                      color: "#1D2939",
                      "&::placeholder": {
                        color: "#667085",
                        opacity: 1,
                      },
                    },
                  }}
                />
              </Box>

              {/* Filter Button */}
              <Button
                variant="outlined"
                startIcon={<FilterIcon sx={{ fontSize: "18px", color: "#344054" }} />}
                sx={{
                  textTransform: "none",
                  color: "#344054",
                  borderColor: "#D0D5DD",
                  bgcolor: "#FFFFFF",
                  borderRadius: "6px",
                  fontWeight: 500,
                  fontSize: "14px",
                  px: "14px",
                  py: "6px",
                  height: 36,
                  "&:hover": {
                    bgcolor: "#F9FAFB",
                    borderColor: "#D0D5DD",
                  },
                }}
              >
                Filter
              </Button>

              {/* More Options Button */}
              <IconButton
                sx={{
                  border: "1px solid #D0D5DD",
                  borderRadius: "6px",
                  p: "6px",
                  height: 36,
                  width: 36,
                  color: "#667085",
                  "&:hover": {
                    bgcolor: "#F9FAFB",
                  },
                }}
              >
                <MoreIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
          </Box>

          {/* Table */}
          <CandidateTable candidates={filteredCandidates} />
        </Paper>
      </Box>
    </Box>
  );
};

export default CandidateList;
