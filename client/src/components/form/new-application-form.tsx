import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { JOB_APPLICATION_STATUS, JobApplication } from "../../types";

export const NewApplicationForm = () => {
  const [formData, setFormData] = useState<JobApplication>({
    companyName: "",
    jobTitle: "",
    status: "applied",
    notes: "",
    appliedDate: "",
    description: "",
    id: "",
    location: "",
    url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: JOB_APPLICATION_STATUS) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData({
      id: "",
      companyName: "",
      jobTitle: "",
      url: "",
      status: "applied",
      notes: "",
      appliedDate: "",
      description: "",
      location: "",
    });
  };

  const handleAutoFill = () => {
    // This function would be used to auto-fill form data from the current page
    // You'll need to implement Chrome extension API calls here
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Example: Get the current URL
      const currentUrl = tabs[0].url || "";
      setFormData((prev) => ({ ...prev, url: currentUrl }));

      // You would need to implement more logic to extract company name, job title, etc.
      // This might involve sending a message to a content script to scrape the page
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAutoFill}
          className="text-xs flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Auto-fills
        </Button>
      </div>

      <section className="grid grid-cols-2 gap-2">
        <div className="space-y-2 col-span-1">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Inc."
            required
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="space-y-2 col-span-1">
          <Label htmlFor="jobUrl">Job URL</Label>
          <Input
            id="jobUrl"
            name="jobUrl"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </div>

        <div className="space-y-2 col-span-1 ">
          <Label htmlFor="status">Application Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="notes">Job Description</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add any notes about this application..."
            className="min-h-[80px]"
          />
        </div>
      </section>

      <Button type="submit" className="w-full">
        Save Application
      </Button>
    </form>
  );
};
