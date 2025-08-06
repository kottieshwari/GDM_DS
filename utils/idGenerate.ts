import { queryDb } from "../db/dbClient";

export function generateRandomId(prefix: 'LOC' | 'DEV'|'RDL'|'RDR' ): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}_${randomPart}`;
}


export async function waitForRecordInDb(query: string, values: any[], timeoutMs = 30000, intervalMs = 2000): Promise<any[]> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const result = await queryDb(query, values);
    if (result.length > 0) return result;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Record not found in DB within ${timeoutMs}ms. Query: ${query}, Values: ${values}`);
}