import { useContext, useState } from "react";

import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/organisms/Header";
import CandidateTable from "../components/molecules/CandidateTable";

import { CandidateContext } from "../context/CandidateContext";

const CandidatesPage = () => {
  const { candidateList } = useContext(CandidateContext);
  const [search, setSearch] = useState("");

  const filteredCandidates = candidateList.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "16px", background: "#EEF2F6", minHeight: "100vh" }}>
        <Header search={search} setSearch={setSearch} />
        <p>Total Candidates : {filteredCandidates.length}</p>
        <CandidateTable candidates={filteredCandidates} />
      </div>
    </div>
  );
};

export default CandidatesPage;