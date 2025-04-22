/**
 * @description Converts rows from Google Sheets to array of objects using the first row as keys.
 * @param {Object} params
 * @param {any[][]} params.rows - The rows from Google Sheets.
 *
 * @example
 * ```json
 * [
 *   {
 *     "name": "Alice",
 *     "email": "alice@email.com",
 *     "resume": "link1.pdf",
 *     "jd": "JD text 1"
 *   },
 *   {
 *     "name": "Bob",
 *     "email": "bob@email.com",
 *     "resume": "link2.pdf",
 *     "jd": "JD text 2"
 *   }
 * ]
 * ```
 * @returns {Record<string, any>[]} Array of objects.
 */
export function rowsToObjects({
  rows,
}: {
  rows: any[][];
}): Record<string, any>[] {
  console.log('🚀 ~ rowsToObjects ~ rows:', rows);
  if (!rows || rows.length < 2) return [];
  const [headers, ...dataRows] = rows;
  return dataRows.map((row) =>
    headers.reduce(
      (obj, key, idx) => {
        obj[key] = row[idx] ?? null;
        return obj;
      },
      {} as Record<string, any>,
    ),
  );
}
