import React, { useState } from "react";
import {
  JOB_APPLICATION_RECOMMENDATION,
  JOB_APPLICATION_STATUS,
  JOB_APPLICATION_TYPE,
  JOB_APPLICATION_TYPE_OPTIONS,
  JOB_STATUS_OPTIONS,
  JobApplication,
  RECOMMENDATION_OPTIONS,
} from "../../types";
import { Button } from "../ui/button";
import { FormField } from "./form-field";
import { StatusSelect } from "./status-select";

const initialFormState: JobApplication = {
  id: "",
  companyName: "",
  jobTitle: "",
  location: "",
  jobType: "onsite",
  platform: "linkedin",
  recommendation: "no",
  status: "applied",
  appliedDate: new Date().toISOString().split("T")[0],
  postingDate: "",
  recruiterName: "",
  recruiterLinkedInUrl: "",
  url: "",
  description: "",
};

export const NewApplicationForm = () => {
  const [formData, setFormData] = useState<JobApplication>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData(initialFormState);
  };

  const handleAutoFill = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0].url || "";
      setFormData((prev) => ({ ...prev, url: currentUrl }));
    });
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            tooltip="Name of the company you're applying to"
          />

          <FormField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            tooltip="Job location (remote/hybrid/on-site)"
          />

          <FormField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            tooltip="Position title you're applying for"
            className="col-span-2"
          />

          <FormField
            label="Posting Date"
            name="postingDate"
            type="date"
            value={formData.postingDate}
            onChange={handleChange}
            tooltip="When the job was posted"
          />

          <StatusSelect
            label="Recommendation"
            value={formData.recommendation}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                recommendation: value as JOB_APPLICATION_RECOMMENDATION,
              }))
            }
            options={RECOMMENDATION_OPTIONS}
            tooltip="Are you recommended for this job?"
          />

          <StatusSelect
            label="Status"
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status: value as JOB_APPLICATION_STATUS,
              }))
            }
            options={JOB_STATUS_OPTIONS}
            tooltip="Current status of your application"
          />

          <StatusSelect
            label="Type"
            value={formData.jobType}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                jobType: value as JOB_APPLICATION_TYPE,
              }))
            }
            options={JOB_APPLICATION_TYPE_OPTIONS}
            tooltip="Type of job (remote/hybrid/on-site)"
          />

          <FormField
            label="Applied Date"
            name="appliedDate"
            type="date"
            value={formData.appliedDate}
            onChange={handleChange}
            tooltip="Date when you submitted your application"
          />

          <FormField
            label="Recruiter Name"
            name="recruiterName"
            value={formData.recruiterName as string}
            onChange={handleChange}
            tooltip="Name of the recruiter"
          />

          <FormField
            label="Recruiter LinkedIn URL"
            name="recruiterLinkedInUrl"
            type="url"
            value={formData.recruiterLinkedInUrl as string}
            onChange={handleChange}
            tooltip="LinkedIn profile of the recruiter"
          />

          <FormField
            label="Job URL"
            name="url"
            type="url"
            value={formData.url as string}
            onChange={handleChange}
            tooltip="Link to the job posting"
          />

          <FormField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="textarea"
            className="col-span-2"
            tooltip="Job description and requirements"
          />
        </div>
      </div>

      <div className="flex-shrink-0 space-y-4 pt-4 border-t border-[#2D3748]">
        <Button
          type="button"
          variant="outline"
          onClick={handleAutoFill}
          className="w-full border-[#2D3748] text-[#E9D8FD] hover:bg-[#1A202C]"
        >
          Auto-fill from current page
        </Button>
        <Button
          type="submit"
          className="w-full bg-[#6B46C1] hover:bg-[#553C9A] text-white"
        >
          Submit Application
        </Button>
      </div>
    </form>
  );
};
