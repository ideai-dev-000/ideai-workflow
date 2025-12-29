import { config } from "dotenv";
import type { Config } from "drizzle-kit";

// Load .env.local first (Next.js convention), then fallback to .env
config({ path: ".env.local" });
config(); // Also load .env if it exists

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://localhost:5432/workflow",
  },
} satisfies Config;
