export interface CourtSearch {
  search: string;
  status: string;
  date: string;
}

export interface Candidate {
  id: number;
  name: string;
  adjudication: string;
  status: string;
  location: string;
  date: string;
  position: string;
  courtSearches?: CourtSearch[];
}