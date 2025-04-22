// src/components/layout/PopupLayout.tsx
import { useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useSheetStore } from "../../store/sheet-connect";
import { NewApplicationForm } from "../form/new-application-form";
import { ApplicationHistory } from "../history/application-history";
import { Settings } from "../settings";
import { SheetConnect } from "../sheet/sheet-connect";

export const PopupLayout = () => {
  const { isConnected, isLoading, loadFromStorage } = useSheetStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  // Show loader while checking connection
  if (isLoading) {
    return (
      <div className="w-[400px] h-[500px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show connect screen if not connected
  if (!isConnected) {
    return <SheetConnect />;
  }

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
