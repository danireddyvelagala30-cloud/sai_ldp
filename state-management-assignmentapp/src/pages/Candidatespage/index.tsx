import { useContext, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import Sidebar from "../../components/organisms/Sidebar";
import Header from "../../components/organisms/Header";
import CandidateTable from "../../components/organisms/CandidateTable";

import { CandidateContext } from "../../context/CandidateContext";
import { APP_CONSTANTS } from "../../utils/constants";
import { styles } from "./styles";

const CandidatesPage = () => {
  const { candidateList } = useContext(CandidateContext);
  const [search, setSearch] = useState("");

  const filteredCandidates = candidateList.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={styles.page}>
      <Sidebar />

      <Stack sx={styles.main}>
        <Header search={search} setSearch={setSearch} />
        <Typography color="text.secondary" sx={styles.count}>
          {APP_CONSTANTS.totalCandidates}: {filteredCandidates.length}
        </Typography>
        <CandidateTable candidates={filteredCandidates} />
      </Stack>
    </Box>
  );
};

export default CandidatesPage;
