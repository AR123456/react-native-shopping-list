// seed file using cjs in case json is ever changed to type of module
const { neon } = require("@neondatabase/serverless");
const crypto = require("node:crypto");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required. Example: DATABASE_URL=... npm run seed:grocery",
  );
}

const sql = neon(databaseUrl);
