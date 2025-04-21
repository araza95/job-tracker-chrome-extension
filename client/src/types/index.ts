export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  description: string;
  appliedDate: string;
  status: JOB_APPLICATION_STATUS;
  url?: string;
  notes?: string;
}

export type JOB_APPLICATION_STATUS =
  | "applied"
  | "interviewing"
  | "offered"
  | "rejected";
