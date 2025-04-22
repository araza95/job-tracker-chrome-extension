// src/components/sheet/sheet-status-bar.tsx
import { useState } from "react";
import { useSheetStore } from "../../store/sheet-connect-store";
import { Button } from "../ui/button";
import { SheetConnect } from "./sheet-connect";

export const SheetStatusBar = () => {
  const { sheetUrl, disconnect, isConnected } = useSheetStore();
  const [showConnect, setShowConnect] = useState(false);

  if (!isConnected) return null;

  return (
    <div className="w-full px-4 py-2 bg-[#171923] border-b border-[#2D3748] flex flex-col gap-2">
      {/* Sheet Info Row */}
      <div className="flex items-center">
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
      </div>
      {/* Buttons Row */}
      <div className="flex gap-2 mt-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowConnect((v) => !v)}
          className="flex-1"
        >
          Connect New Sheet
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={disconnect}
          className="flex-1"
        >
          Disconnect
        </Button>
      </div>
      {showConnect && (
        <div className="mt-2">
          <SheetConnect />
        </div>
      )}
    </div>
  );
};
