import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSheetStore } from "../../store/sheet-connect";

export const SheetConnect = () => {
  const [url, setUrl] = useState("");
  const { connectSheet, isLoading, error } = useSheetStore();

  const handleConnect = async () => {
    if (!url.trim()) return;
    await connectSheet(url);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[500px] p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Connect Your Sheet</h2>
          <p className="text-gray-500 mt-2">
            Enter your Google Sheet URL to get started
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              disabled={isLoading}
            />
            {url && !url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/) && (
              <p className="text-red-500 text-sm mt-1">
                Invalid Google Sheets URL format
              </p>
            )}
          </div>

          <Button
            onClick={handleConnect}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Connecting...
              </div>
            ) : (
              "Connect Sheet"
            )}
          </Button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};
