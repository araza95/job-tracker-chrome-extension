import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSheetStore } from "../../store/sheet-connect-store";
import { ConnectionLoader } from "../Loader/ConnectionLoader";

export const SheetConnect = () => {
  const [url, setUrl] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connectSheet, isLoading } = useSheetStore();

  // Reset error on url change
  useEffect(() => {
    if (error) setError(null);
  }, [url]);

  const handleConnect = () => {
    if (!url.trim()) return;
    if (!url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)) {
      setError("Invalid Google Sheets URL format");
      return;
    }
    setShowLoader(true);
  };

  const handleSuccess = () => {
    setShowLoader(false);
    setUrl("");
  };

  const handleError = (msg: string) => {
    setError(msg);
    setShowLoader(false);
  };

  if (showLoader) {
    return (
      <ConnectionLoader
        sheetUrl={url}
        connectSheet={connectSheet}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    );
  }

  return (
    <div className="w-[600px] h-[600px] bg-[#171923] text-white shadow-lg flex flex-col items-center">
      {/* Initial cartoon */}
      <div className="flex-1 flex items-center justify-center py-4 cursor-pointer">
        <img
          src="/assets/cartoon-character.png"
          alt="Welcome cartoon"
          className="w-[250px] h-auto"
        />
      </div>

      {/* Connection Form Section */}
      <div className="w-full px-8 pb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#E9D8FD]">
            Connect Your Sheet
          </h2>
          <p className="text-gray-500 mt-2">
            Enter your Google Sheet URL to get started
          </p>
        </div>

        <div className="space-y-4">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-[#1A202C] border-[#2D3748] focus:border-[#6B46C1]"
            placeholder="https://docs.google.com/spreadsheets/d/..."
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleConnect();
              }
            }}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          <Button
            onClick={handleConnect}
            className="w-full bg-[#6B46C1] hover:bg-[#553C9A] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Connecting...</span>
              </div>
            ) : (
              "Connect Sheet"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
