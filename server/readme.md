# What's next

Cool, now we have created the backend.
Best practices are being followed,

What we have achieved so far!

Here's a summary of what's done in the client folder for your frontend:

## Frontend

- **Project Setup**:
  - The frontend is built using React, Vite, and TypeScript, providing a modern and efficient development environment.
  - Tailwind CSS is integrated for styling, along with Shadcn UI for consistent and customizable UI components.

- **Basic Layout**:
  - The application layout is structured using a component-based architecture, with a main `App` component rendering the `PopupLayout`.
  - The layout includes a header and tabbed navigation for easy access to different sections of the application.

- **Tabs for Job Tracker**:
  - **New**: Contains a form for adding new job applications. The form includes fields for company name, job title, URL, status, and notes, with functionality for auto-filling data from the current page.
  - **History**: Displays a list of job applications with details such as company name, job title, status, and applied date. It includes search functionality and status badges for quick identification.
  - **Settings**: Provides options for managing application preferences like notifications, dark mode, auto-fill, and data sync. It also includes data management features like exporting, importing, and clearing application data.

- **Utilities and Components**:
  - Utility functions are provided for class name merging and other common tasks.
  - UI components are organized into folders for forms, history, settings, and layout, ensuring a clean and maintainable codebase.

- **Manifest and Configuration**:
  - The project includes a `manifest.json` file for Chrome extension settings, specifying permissions and default popup behavior.
  - Vite configuration is set up with plugins for React and Tailwind CSS, along with aliasing for easier imports.

This setup ensures a responsive and user-friendly frontend that integrates seamlessly with the backend, providing a comprehensive job tracking solution.

## Backend

- **Express JS Backend**: The backend is built using Express JS, following the Model-View-Controller (MVC) pattern to organize the codebase efficiently.

- **Google Sheets Integration**:
  - The backend includes functionality to connect to Google Sheets using the Google Sheets API.
  - It extracts data from Google Sheets and converts it into a usable format for the application.

- **Configuration**:
  - The Google Sheets API is configured using a service account, with credentials stored in a `credentials.json` file.
  - Environment variables are managed using a `.env` file for configuration like the server port.

- **Routing**:
  - Routes are defined for handling requests related to Google Sheets, such as connecting to a sheet and retrieving data.

- **Utilities**:
  - Utility functions are provided for tasks like extracting spreadsheet IDs from URLs and converting sheet rows to objects.

- **TypeScript**:
  - The project uses TypeScript for type safety and better code maintainability.
  - Type definitions are provided for various data structures used in the application.

- **Development Tools**:
  - ESLint and Prettier are configured for code linting and formatting to maintain code quality.
  - Nodemon is used for automatic server restarts during development.

This setup ensures a robust and scalable backend that can efficiently handle requests and interact with Google Sheets.

## Next Steps

- I will write feature we have to focus for this round.
- Before any screen there should be a screen with a button to connect to google sheet.
- Once connected to google sheet, user should be able to add new job application or view history.
- If there is no sheet connected, we don't render any screen but show a button to connect to google sheet.
- When connect sheet is clicked, we should show a nice loader and then redirect to job tracker screen ( history screen ).
- I think in the popupLayout we have to conditionally render the tabs based on the data fetched/connected from google sheet
- Data should be fetched from google sheet and shown in history screen, api is already written. It is a POST request,
   url: `http://localhost:3001/api/sheets/connect`
   body: {
        {
            "sheetUrl": "https://..."
        }
   }
   API Response:

   ```json
   {
    "success": true,
    "data": {
        "spreadsheetId": "1w7trsGBVFudIbK1LgmFbzb1f7Jr0KcDWxvuXc9j",
        "range": "Sheet1!A1:Z1000",
        "rows": [
            {
                "Company Name": "Langdoc",
                "Job title": "Senior FE",
                "Status": "Not a fit",
                "Appied on": "18.03.2025",
                "Job posted on": "18.03.2025",
                "Recruiter name": "N/A",
                "Link": null
            },
            {
                "Company Name": "Statista",
                "Job title": "FE Eng.",
                "Status": "Recommencation ",
                "Appied on": null,
                "Job posted on": null,
                "Recruiter name": null,
                "Link": null
            }
        ]
        }
        }
    ```

- For api fetching we will use react query and caching data is most important thing.

--------

## Frontend Code

### App.tsx

```tsx
// src/App.tsx
import { PopupLayout } from "../src/components/layout/popup-layout";
import "./index.css";

function App() {
  return <PopupLayout />;
}

export default App;
```

### PopupLayout.tsx

```tsx
// src/components/layout/PopupLayout.tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { NewApplicationForm } from "../form/new-application-form";
import { ApplicationHistory } from "../history/application-history";
import { Settings } from "../settings";

export const PopupLayout = () => {
  return (
    <div className="w-[95%] mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden flex flex-col">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
          Job Application Tracker
        </h1>
      </header>

      <Tabs
        defaultValue="new"
        className="w-full flex-1 flex flex-col overflow-hidden "
      >
        <TabsList className="w-full grid grid-cols-3 gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-fit">
          <TabsTrigger
            value="new"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
          >
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
          >
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              History
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm"
          >
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Settings
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto">
          <TabsContent value="new" className="h-full p-4 overflow-y-auto">
            <NewApplicationForm />
          </TabsContent>

          <TabsContent value="history" className="h-full p-4 overflow-y-auto">
            <ApplicationHistory />
          </TabsContent>

          <TabsContent value="settings" className="h-full p-4 overflow-y-auto">
            <Settings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
```

### History Component

```tsx
import { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { JobApplication } from "../../types";

export const ApplicationHistory = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you would fetch data from storage
    // For now, we'll use mock data
    const mockData: JobApplication[] = [
      {
        id: "1",
        companyName: "Tech Solutions",
        jobTitle: "Software Engineer",
        url: "",
        appliedDate: "2023-06-15",
        status: "applied",
        notes: "Applied for Software Engineer position",
        description: "",
        location: "",
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setApplications(mockData);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredApplications = applications.filter(
    (app) =>
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interested":
        return "bg-blue-100 text-blue-800";
      case "applied":
        return "bg-purple-100 text-purple-800";
      case "interviewing":
        return "bg-yellow-100 text-yellow-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No applications found</p>
        </div>
      ) : (
        <ScrollArea className="h-[320px]">
          <div className="space-y-3">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">{app.jobTitle}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {app.companyName}
                    </p>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Applied: {new Date(app.appliedDate).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => window.open(app.url, "_blank")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => {
                        // Edit functionality would go here
                        console.log("Edit application:", app.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
```

### Types

```ts
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
```

### New Application Form

```tsx
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
```

### Zustand Store

```ts
import { create } from "zustand";

interface Application {
  id: string;
  name: string;
  description: string;
}

interface ApplicationState {
  applications: Application[];
  addApplication: (application: Application) => void;
  updateApplication: (id: string, application: Application) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  addApplication: (application) => {
    set((state) => ({
      applications: [...state.applications, application],
    }));
  },
  updateApplication: (id, application) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, ...application } : app
      ),
    }));
  },
}));
```
