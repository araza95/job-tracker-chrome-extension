// src/store/sheet-store.ts
import { create } from "zustand";

interface SheetState {
  isConnected: boolean;
  isLoading: boolean;
  sheetData: unknown[] | null;
  error: string | null;
  connectSheet: (url: string) => Promise<void>;
}

const data = {
  success: true,
  data: {
    spreadsheetId: "1w7trsGBVFudIbK1LgmFbzb1f7Jr0KcDWxvuXc9jOBgU",
    range: "Sheet1!A1:Z1000",
    rows: [
      {
        "Company Name": "Langdoc",
        "Job title": "Senior FE",
        Status: "Not a fit",
        "Appied on": "18.03.2025",
        "Job posted on": "18.03.2025",
        "Recruiter name": "N/A",
        Link: null,
      },
      {
        "Company Name": "Statista",
        "Job title": "FE Eng.",
        Status: "Recommencation ",
        "Appied on": null,
        "Job posted on": null,
        "Recruiter name": null,
        Link: null,
      },
    ],
  },
};

export const useSheetStore = create<SheetState>((set) => ({
  isConnected: false,
  isLoading: false,
  sheetData: null,
  error: null,
  connectSheet: async (url: string) => {
    console.log("🚀 ~ connectSheet: ~ url:", url);
    try {
      set({ isLoading: true, error: null });

      //   const response = await fetch("http://localhost:3001/api/sheets/connect", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ sheetUrl: url }),
      //   });

      //   const data = await response.json();

      //   if (!data.success) throw new Error(data.error);

      set({
        isConnected: true,
        sheetData: data.data.rows,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: error.message ?? "An error occurred",
          isLoading: false,
          isConnected: false,
        });
      }
    }
  },
}));
