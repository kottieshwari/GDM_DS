import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

export async function queryDb(query: string, values: any[] = []) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  const result = await client.query(query,values);
  await client.end();

  return result.rows;
}