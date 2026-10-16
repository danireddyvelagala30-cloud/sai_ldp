import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import CandidateList from "./pages/CandidateList";
import CandidateDetails from "./pages/CandidateDetails";
import { candidates as initialCandidates } from "./data/candidates";

function App() {
  const [candidates, setCandidates] = useState(initialCandidates);

  const engageCandidate = (id: number) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, adjudication: "ENGAGE" }
          : candidate
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<CandidateList candidates={candidates} />} />

      <Route
        path="/candidate/:id"
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