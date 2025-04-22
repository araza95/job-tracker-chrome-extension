// src/components/history/application-history.tsx
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useSheetStore } from "../../store/sheet-connect-store";
import { Search, RefreshCcw, ExternalLink, Edit, FileText } from "lucide-react";

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
  const { sheetData, refreshHistory } = useSheetStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const refresh = async () => {
    try {
      setIsLoading(true);
      await refreshHistory();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error refreshing history:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 space-y-4 p-4 bg-[#171923] z-50 border-b border-[#2D3748]">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search by company or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-[#1A202C] border-[#2D3748] text-white focus:border-[#6B46C1]"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#E9D8FD]">Applications</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={refresh}
            className="hover:bg-[#2D3748] transition-colors"
          >
            <RefreshCcw
              className={`h-4 w-4 text-[#E9D8FD] ${isLoading ? "animate-spin" : "hover:rotate-180 transition-transform duration-500"}`}
            />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 relative">
        <div className="p-4 space-y-2">
          {isLoading ? (
            <div className="h-[400px] flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6B46C1]"></div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="h-[400px] flex flex-col items-center justify-center text-[#E9D8FD]">
              <FileText className="h-12 w-12 mb-4 text-[#44337A]" />
              <p>No applications found</p>
            </div>
          ) : (
            filteredApplications.map((app, index) => (
              <div
                key={index}
                className="bg-[#1A202C] p-4 border border-[#2D3748] rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
                        className="h-7 w-7 p-0 hover:bg-[#2D3748] transition-colors"
                        // onClick={() => window.open(app["Link"], "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-[#2D3748] transition-colors"
                      onClick={() => {
                        console.log("Edit application:", app);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
