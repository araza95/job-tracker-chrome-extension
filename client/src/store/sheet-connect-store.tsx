// src/store/sheet-store.ts
import { create } from "zustand";
import { chromeStorage } from "../utils/chrome-storage";

interface SheetState {
  isConnected: boolean;
  isLoading: boolean;
  sheetData: unknown[] | null;
  error: string | null;
  sheetUrl: string | null;
  connectSheet: (url: string) => Promise<void>;
  loadFromStorage: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useSheetStore = create<SheetState>((set) => ({
  isConnected: false,
  isLoading: false,
  sheetData: null,
  error: null,
  sheetUrl: null,

  connectSheet: async (url: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch("http://localhost:3001/api/sheets/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheetUrl: url }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      set({
        isConnected: true,
        sheetData: data.data.rows,
        isLoading: false,
        sheetUrl: url,
      });

      // Persist to chrome.storage
      await chromeStorage.set("sheetData", data.data.rows);
      await chromeStorage.set("sheetUrl", url);
      await chromeStorage.set("isConnected", true);
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: error.message,
          isLoading: false,
          isConnected: false,
        });
      }
    }
  },

  loadFromStorage: async () => {
    const [sheetData, sheetUrl, isConnected] = await Promise.all([
      chromeStorage.get<unknown[]>("sheetData"),
      chromeStorage.get<string>("sheetUrl"),
      chromeStorage.get<boolean>("isConnected"),
    ]);
    set({
      sheetData: sheetData ?? null,
      sheetUrl: sheetUrl ?? null,
      isConnected: !!isConnected,
    });
  },

  disconnect: async () => {
    await chromeStorage.remove("sheetData");
    await chromeStorage.remove("sheetUrl");
    await chromeStorage.remove("isConnected");
    set({
      isConnected: false,
      sheetData: null,
      sheetUrl: null,
      error: null,
    });
  },
}));
