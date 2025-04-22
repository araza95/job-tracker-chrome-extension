import { RequestHandler } from 'express';
import { getSheetData } from '../services/sheets.service';

/**
 * @description Handles a POST request to connect to a Google Sheet and retrieve its data.
 *
 * Expects `sheetUrl` in the request body.
 * • On success: responds with `{ success: true, data: sheetData }`.
 * • On client error (missing URL): responds with 400 and `{ success: false, error }`.
 * • On server error: responds with 500 and `{ success: false, error }`.
 *
 * @param req  – Express Request, body must include `{ sheetUrl: string }`
 * @param res  – Express Response, used to send JSON status and data
 *
 * @example
 * POST /connect
 *
 * @returns {void}
 *
 * @throws {Error} If sheetUrl is missing or if there's an issue with the Google Sheets API.
 */
export const connectSheet: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { sheetUrl } = req.body;
    if (!sheetUrl) {
      res.status(400).json({ success: false, error: 'Sheet URL is required' });
      return;
    }

    const sheetData = await getSheetData({ sheetUrl });
    console.log('Retrieved Sheet Data:', sheetData);

    res.status(200).json({ success: true, data: sheetData });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }
};
