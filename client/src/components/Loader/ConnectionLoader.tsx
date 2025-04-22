import { useEffect, useState } from "react";

interface ConnectionLoaderProps {
  sheetUrl: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  connectSheet: (url: string) => Promise<void>;
}

export const ConnectionLoader = ({
  sheetUrl,
  onSuccess,
  onError,
  connectSheet,
}: ConnectionLoaderProps) => {
  const [stage, setStage] = useState<"loading" | "success">("loading");

  useEffect(() => {
    // After 2 seconds, trigger API call
    const timer = setTimeout(async () => {
      try {
        await connectSheet(sheetUrl);
        setStage("success");
        // After success image shown for 1.5s, call onSuccess to proceed
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } catch (err) {
        onError(
          err instanceof Error ? err.message : "Failed to connect to sheet"
        );
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [sheetUrl, connectSheet, onSuccess, onError]);

  return (
    <div className="w-[600px] h-[600px] bg-[#171923] text-white shadow-lg flex flex-col items-center justify-center">
      {stage === "loading" && (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/loading-cartoon.png"
            alt="Loading cartoon"
            className="w-[250px] h-auto animate-bounce"
            style={{ animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)" }}
          />
          <p className="mt-4 text-lg font-medium text-gray-300 animate-pulse">
            Connecting with Google Spreadsheet...
          </p>
        </div>
      )}
      {stage === "success" && (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/success-cartoon.png"
            alt="Success cartoon"
            className="w-[250px] h-auto transition-opacity duration-700 opacity-100"
          />
          <p className="mt-4 text-lg font-medium text-gray-300">
            Successfully connected to Google Spreadsheet!
          </p>
        </div>
      )}
    </div>
  );
};
