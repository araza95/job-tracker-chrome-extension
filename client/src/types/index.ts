export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  description: string;
  appliedDate: string;
  postingDate: string;
  recommendation: JOB_APPLICATION_RECOMMENDATION;
  status: JOB_APPLICATION_STATUS;
  platform: JOB_APPLICATION_PLATFORM;
  url?: string;
  notes?: string;
}

export const JOB_STATUS_OPTIONS = {
  interested: "Interested",
  applied: "Applied",
  interviewing: "Interviewing",
  offered: "Offered",
  rejected: "Rejected",
  accepted: "Accepted",
} as const;

export const PLATFORM_OPTIONS = {
  linkedin: "LinkedIn",
  indeed: "Indeed",
  join: "Join",
  "company-portal": "Company Portal",
  xing: "Xing",
  workday: "Workday",
  stepstone: "Stepstone",
} as const;

export const RECOMMENDATION_OPTIONS = {
  yes: "Yes",
  no: "No",
} as const;

export type JOB_APPLICATION_STATUS = keyof typeof JOB_STATUS_OPTIONS;
export type JOB_APPLICATION_PLATFORM = keyof typeof PLATFORM_OPTIONS;
export type JOB_APPLICATION_RECOMMENDATION =
  keyof typeof RECOMMENDATION_OPTIONS;
