import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const dbHost = process.env.POSTGRES_HOST || "localhost";
const DATABASE_URL = `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@${dbHost}:5432/postgres`;

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
