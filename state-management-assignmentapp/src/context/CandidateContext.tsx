import React, { createContext, useState } from "react";
import type { Candidate } from "../data/models/Candidate";
import { candidates } from "../data/candidates";
import { APP_CONSTANTS } from "../data/constants";

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
          ? {
              ...candidate,
              adjudication: APP_CONSTANTS.candidateAdjudicationEngage,
            }
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