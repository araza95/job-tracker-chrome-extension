export interface SheetData {
  spreadsheetId: string;
  range: string;
  values: any[][];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
