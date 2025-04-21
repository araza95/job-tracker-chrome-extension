export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  description: string;
  appliedDate: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  url?: string;
  notes?: string;
}
