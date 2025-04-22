// src/components/layout/PopupLayout.tsx
import { useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { useSheetStore } from "../../store/sheet-connect-store";
import { NewApplicationForm } from "../form/new-application-form";
import { ApplicationHistory } from "../history/application-history";
import { Settings } from "../settings";
import { SheetConnect } from "../sheet/sheet-connect";
import { SheetStatusBar } from "../sheet/sheet-status-bar";
import SpreadsheetLoader from "../Loader/SpreadsheetLoader";

export const PopupLayout = () => {
  const { isConnected, isLoading, loadFromStorage } = useSheetStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  // Show loader while checking connection
  if (isLoading) {
    return (
      <div className="w-[600px] h-[600px] overflow-hidden">
        <SpreadsheetLoader isLoading={isLoading} />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="w-[600px] h-[600px] overflow-hidden">
        <SheetConnect />
      </div>
    );
  }

  return (
    <div className="w-[600px] h-[600px] bg-[#171923] text-white overflow-hidden flex flex-col">
      <header className="p-4 border-b border-[#2D3748] bg-[#1A202C] shadow-sm flex-shrink-0">
        <h1 className="text-xl font-semibold text-center flex items-center justify-center gap-2">
          Job Application Tracker
        </h1>
      </header>
      <SheetStatusBar />

      <Tabs defaultValue="new" className="flex-1 flex flex-col min-h-0">
        <TabsList className="h-fit w-full grid grid-cols-3 gap-2 p-2 bg-[#1A202C] border-b border-[#2D3748] flex-shrink-0">
          <TabsTrigger
            value="new"
            className="data-[state=active]:bg-[#44337A] data-[state=active]:text-[#E9D8FD] data-[state=active]:shadow-sm"
          >
            <span className="flex items-center gap-1">
              {/* SVG remains the same */}
              New
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-[#44337A] data-[state=active]:text-[#E9D8FD] data-[state=active]:shadow-sm"
          >
            <span className="flex items-center gap-1">
              {/* SVG remains the same */}
              History
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-[#44337A] data-[state=active]:text-[#E9D8FD] data-[state=active]:shadow-sm"
          >
            <span className="flex items-center gap-1">
              {/* SVG remains the same */}
              Settings
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden bg-[#171923]">
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
