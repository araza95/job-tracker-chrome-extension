// src/components/history/application-history.tsx
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useSheetStore } from "../../store/sheet-connect-store";

interface Application {
  "Company Name": string;
  "Job title": string;
  Status: string;
  "Applied on": string;
  "Job posted on": string;
  "Recruiter name": string;
  Link: string | null;
}

export const ApplicationHistory = () => {
  const { sheetData } = useSheetStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading] = useState(false);

  // Filter applications based on search term
  const filteredApplications = ((sheetData as Application[]) || []).filter(
    (app) =>
      app["Company Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      app["Job title"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
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
      case "not a fit":
        return "bg-gray-100 text-gray-800";
      case "recommendation":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      // Assuming date format is DD.MM.YYYY
      const [day, month, year] = dateString.split(".");
      return new Date(`${year}-${month}-${day}`).toLocaleDateString();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error formatting date:", error.message);
        return dateString; // Return original string if parsing fails
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search by company or job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-[#1A202C] border-[#2D3748] text-white focus:border-[#6B46C1]"
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
            {filteredApplications.map((app, index) => (
              <div
                key={index}
                className=" bg-[#1A202C] p-4 border border-[#2D3748] rounded-lg dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#E9D8FD] font-medium">
                      {app["Job title"]}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {app["Company Name"]}
                    </p>
                  </div>
                  <Badge className={getStatusColor(app["Status"])}>
                    {app["Status"]}
                  </Badge>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[#A0AEC0] text-sm block">
                      Applied: {formatDate(app["Applied on"])}
                    </span>
                    <span className="text-[#A0AEC0] text-sm block">
                      Posted: {formatDate(app["Job posted on"])}
                    </span>
                    {app["Recruiter name"] &&
                      app["Recruiter name"] !== "N/A" && (
                        <span className="text-[#A0AEC0] text-sm block">
                          Recruiter: {app["Recruiter name"]}
                        </span>
                      )}
                  </div>
                  <div className="flex space-x-1">
                    {app["Link"] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        // onClick={() => window.open(app["Link"], "_blank")}
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
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => {
                        // Edit functionality would go here
                        console.log("Edit application:", app);
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
