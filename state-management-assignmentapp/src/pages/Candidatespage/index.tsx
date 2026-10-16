import { useContext, useState } from "react";

import Sidebar from "../../components/organisms/Sidebar";
import Header from "../../components/organisms/Header";
import CandidateTable from "../../components/molecules/CandidateTable";

import { CandidateContext } from "../../context/CandidateContext";

const CandidatesPage = () => {
  const { candidateList } = useContext(CandidateContext);
  const [search, setSearch] = useState("");

  const filteredCandidates = candidateList.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="candidates-page-container">
      <Sidebar />

      <div className="candidates-page-main">
        <Header search={search} setSearch={setSearch} />
        <p>Total Candidates : {filteredCandidates.length}</p>
        <CandidateTable candidates={filteredCandidates} />
      </div>
    </div>
  );
};

export default CandidatesPage;
