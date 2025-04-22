import { useState } from "react";
import { useSheetStore } from "../../store/sheet-connect-store";
import { Button } from "../ui/button";
import { SheetConnect } from "./sheet-connect";

export const SheetStatusBar = () => {
  const { sheetUrl, disconnect, isConnected } = useSheetStore();
  const [showConnect, setShowConnect] = useState(false);

  if (!isConnected) return null;

  return (
    <div className="flex flex-col gap-2 p-2 bg-[#1A202C] text-[#E9D8FD] px-4 py-2 text-sm border-b border-[#2D3748]">
      <div className="flex items-center justify-between">
        <span className="text-xs truncate">
          <span className="font-semibold">Connected Sheet:</span>{" "}
          {sheetUrl ? (
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              {sheetUrl}
            </a>
          ) : (
            "N/A"
          )}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowConnect((v) => !v)}
          >
            Connect New Sheet
          </Button>
          <Button size="sm" variant="destructive" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      </div>
      {showConnect && (
        <div className="mt-2">
          <SheetConnect />
          <Button size="sm" variant="destructive" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
};
