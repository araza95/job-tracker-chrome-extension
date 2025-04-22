import { sheets } from '../config/google-sheets.config';
import { SheetData } from '../types';
import { extractSpreadsheetId } from '../utils/extract-sheet-id';

/**
 * @description Fetches data from a Google Sheet using the provided URL.
 * @param {Object} params
 * @param {string} params.sheetUrl - The Google Sheets URL.
 *
 * @returns {Promise<SheetData>} The sheet data.
 *
 * @throws {Error} If fetching data fails.
 */
export async function getSheetData({
  sheetUrl,
}: {
  sheetUrl: string;
}): Promise<SheetData> {
  try {
    const spreadsheetId = extractSpreadsheetId({ url: sheetUrl });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1', // Default sheet name
    });

    return {
      spreadsheetId,
      range: response.data.range || 'Sheet1',
      values: response.data.values || [],
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch sheet data: ${error.message}`);
  }
}
