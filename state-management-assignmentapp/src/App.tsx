import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import CandidateList from "./pages/CandidateList";
import CandidateDetails from "./pages/CandidateDetails";
import { candidates as initialCandidates } from "./data/candidates";
import { APP_CONSTANTS } from "./utils/constants";

function App() {
  const [candidates, setCandidates] = useState(initialCandidates);

  const engageCandidate = (id: number) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              adjudication: APP_CONSTANTS.candidateAdjudicationEngage,
            }
          : candidate
      )
    );
  };

  return (
    <Routes>
      <Route
        path={APP_CONSTANTS.routes.candidates}
        element={<CandidateList candidates={candidates} />}
      />

      <Route
        path={APP_CONSTANTS.routes.candidateDetails}
        element={
          <CandidateDetails
            candidates={candidates}
            engageCandidate={engageCandidate}
          />
        }
      />
    </Routes>
  );
}

export default App;