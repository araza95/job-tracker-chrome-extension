import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";

export const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoFill: true,
    dataSync: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleExportData = () => {
    // This would export all application data as JSON
    console.log("Exporting data...");
    // Implementation would use chrome.storage.local.get to retrieve data
    // Then create and download a JSON file
  };

  const handleImportData = () => {
    // This would trigger a file input to import data
    console.log("Importing data...");
    // Implementation would involve file upload and parsing
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This cannot be undone."
      )
    ) {
      console.log("Clearing all data...");
      // Implementation would use chrome.storage.local.clear()
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#E9D8FD]">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Dark Mode</Label>
                <p className="text-sm text-[#A0AEC0]">
                  Enable dark mode for the application
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleToggle("darkMode")}
                className="bg-[#2D3748] data-[state=checked]:bg-[#6B46C1]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Auto-fill</Label>
                <p className="text-sm text-[#A0AEC0]">
                  Automatically fill form from job pages
                </p>
              </div>
              <Switch
                checked={settings.autoFill}
                onCheckedChange={(checked) => handleToggle("autoFill")}
                className="bg-[#2D3748] data-[state=checked]:bg-[#6B46C1]"
              />
            </div>
          </div>

          <Separator className="bg-[#2D3748]" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#E9D8FD]">
              Data Management
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full border-[#2D3748] text-[#E9D8FD] hover:bg-[#1A202C]"
              >
                Export Data
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#2D3748] text-[#E9D8FD] hover:bg-[#1A202C]"
              >
                Import Data
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 pt-4 border-t border-[#2D3748] mt-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              // Handle reset functionality
            }}
          >
            Reset All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
