import React, { createContext, useState } from "react";
import type { Candidate } from "../models/Candidate";
import { candidates } from "../data/candidates";

interface CandidateContextValue {
  candidateList: Candidate[];
  engageCandidate: (id: number) => void;
}

const CandidateContext = createContext<CandidateContextValue>({
  candidateList: [],
  engageCandidate: () => {},
});

const CandidateProvider = ({ children }: { children: React.ReactNode }) => {
  const [candidateList, setCandidateList] = useState<Candidate[]>(candidates);

  const engageCandidate = (id: number) => {
    setCandidateList((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, adjudication: "ENGAGE" }
          : candidate
      )
    );
  };

  return (
    <CandidateContext.Provider
      value={{
        candidateList,
        engageCandidate,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export { CandidateContext };
export default CandidateProvider;