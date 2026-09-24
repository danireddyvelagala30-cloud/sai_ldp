import { useContext } from "react";
import { useParams } from "react-router-dom";

import CandidateDetailsCard from "../../components/organisms/CandidateDetailsCard";
import { CandidateContext } from "../../context/CandidateContext";

const CandidateDetailsPage = () => {
  const { id } = useParams();
  const { candidateList } = useContext(CandidateContext);

  const candidate = candidateList.find((item) => item.id === Number(id));

  if (!candidate) {
    return <h2>Candidate Not Found</h2>;
  }

  return (
    <div className="candidate-details-page-wrapper">
      <CandidateDetailsCard title="Candidate Information" candidate={candidate} />
    </div>
  );
};

export default CandidateDetailsPage;
