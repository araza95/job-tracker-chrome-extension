export interface SheetData {
  spreadsheetId: string;
  range: string;
  rows: Record<string, any>[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
