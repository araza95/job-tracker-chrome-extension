/**
 * @description Extracts the spreadsheet ID from a Google Sheets URL.
 * @param {string} url - The Google Sheets URL.
 *
 * @example extractSpreadsheetId('extractSpreadsheetId('URL_ADDRESS.google.com/spreadsheets/d/1234567890abcdefghijklmnopqrstuvwxyz')
 * // => '1234567890abcdefghijklmnopqrstuvwxyz'
 *
 * @returns {string} The spreadsheet ID.
 *
 * @throws {Error} If the URL is invalid..
 *
 * @see {@link @see {@link URL_ADDRESSers.google.com/sheets/api/guides/concepts#spreadsheet_id|Spreadsheet ID}
 */
export function extractSpreadsheetId({ url }: { url: string }): string {
  const matches = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!matches) throw new Error('Invalid Google Sheets URL');
  return matches[1];
}
