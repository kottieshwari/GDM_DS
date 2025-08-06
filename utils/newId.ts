import { queryDb } from "../db/dbClient";

export function generateEntityIds(prefix: 'LOC' | 'DEV' | 'RDL' | 'RDR', count: number): string[] {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const datePrefix = dd + mm;

  const ids: string[] = [];

  for (let i = 1; i <= 1; i++) {
    const numberPart = String(i).padStart(3, '0');
    ids.push(`${prefix}${datePrefix}_${numberPart}`);
  }

  return ids;
};



export function generateUEntityIds(
  prefix: 'LOC' | 'DEV' | 'RDL' | 'RDR',
  count: number,
  offset: number = 0 // <-- optional index-based offset
): string[] {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(1, '0');

  const yyyy = today.getFullYear();
  const datePrefix = `${dd}${mm}${yyyy}`; 
  //const datePrefix = dd + mm;

  const ids: string[] = [];

  for (let i = 0; i < count; i++) {
    const numberPart = String(offset * count + i + 1).padStart(1, '0');
    ids.push(`${prefix}_${datePrefix}_${numberPart}`);
  }

  return ids;
};



export async function waitForRecordInDb(query: string, values: any[], timeoutMs = 30000, intervalMs = 2000): Promise<any[]> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const result = await queryDb(query, values);
    if (result.length > 0) return result;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Record not found in DB within ${timeoutMs}ms. Query: ${query}, Values: ${values}`);
};

export const startDate = '07/01/2025 00:00';