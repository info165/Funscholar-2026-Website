import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js loads .env.local on its own; drizzle-kit does not, so do it here.
config({ path: ".env.local" });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is required — copy .env.example to .env.local");
}

export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  dbCredentials: { url },
});
