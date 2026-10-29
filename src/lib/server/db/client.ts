// client
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// my defined schema
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for API routes.");
}
// create neon object
const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema: schema });
