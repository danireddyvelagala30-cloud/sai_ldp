import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import CandidateDetailsCard from "../../components/organisms/CandidateDetailsCard";
import { CandidateContext } from "../../context/CandidateContext";
import { APP_CONSTANTS } from "../../data/constants";
import { styles } from "./styles";

const CandidateDetailsPage = () => {
  const { id } = useParams();
  const { candidateList } = useContext(CandidateContext);

  const candidate = candidateList.find((item) => item.id === Number(id));

  if (!candidate) {
    return (
      <Box sx={styles.notFound}>
        <Typography variant="h5">{APP_CONSTANTS.candidateNotFound}</Typography>
        <Button href={APP_CONSTANTS.routes.candidates} variant="outlined">
          {APP_CONSTANTS.backToCandidates}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <CandidateDetailsCard
        title={APP_CONSTANTS.candidateInformation}
        candidate={candidate}
      />
    </Box>
  );
};

export default CandidateDetailsPage;
