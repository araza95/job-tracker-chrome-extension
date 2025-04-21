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
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-sm">
                Notifications
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Receive notifications for application updates
              </p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={() => handleToggle("notifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode" className="text-sm">
                Dark Mode
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use dark theme for the extension
              </p>
            </div>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle("darkMode")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoFill" className="text-sm">
                Auto-fill
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automatically extract job details from pages
              </p>
            </div>
            <Switch
              id="autoFill"
              checked={settings.autoFill}
              onCheckedChange={() => handleToggle("autoFill")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dataSync" className="text-sm">
                Data Sync
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sync data across devices (requires sign-in)
              </p>
            </div>
            <Switch
              id="dataSync"
              checked={settings.dataSync}
              onCheckedChange={() => handleToggle("dataSync")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Data Management</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            className="text-xs"
          >
            Export Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportData}
            className="text-xs"
          >
            Import Data
          </Button>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleClearData}
          className="w-full text-xs"
        >
          Clear All Data
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">About</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>Job Application Tracker v1.0.0</p>
          <p>© 2023 Your Name</p>
          <p>
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{" "}
            •{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
