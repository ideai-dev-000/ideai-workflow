import { execSync } from "child_process";

const VERCEL_ENV = process.env.VERCEL_ENV;
const DATABASE_URL = process.env.DATABASE_URL;

if (VERCEL_ENV === "production") {
  console.log("Running database migrations for production...");

  // Validate DATABASE_URL is set and not pointing to localhost
  if (!DATABASE_URL) {
    console.error("❌ ERROR: DATABASE_URL environment variable is not set!");
    console.error("Please set DATABASE_URL in your Vercel project settings.");
    console.error(
      "Go to: Vercel Dashboard → Your Project → Settings → Environment Variables"
    );
    process.exit(1);
  }

  if (
    DATABASE_URL.includes("localhost") ||
    DATABASE_URL.includes("127.0.0.1")
  ) {
    console.error("❌ ERROR: DATABASE_URL is pointing to localhost!");
    console.error(
      "DATABASE_URL must point to a remote database (e.g., Neon, Supabase, etc.)"
    );
    console.error(
      "Current DATABASE_URL:",
      DATABASE_URL.replace(/:[^:@]+@/, ":****@")
    );
    process.exit(1);
  }

  console.log("✓ DATABASE_URL is set and valid");
  console.log("Connecting to database...");

  try {
    // Use db:push instead of db:migrate for production
    // db:push is idempotent and handles existing tables gracefully
    // It will create missing tables and update existing ones without errors
    console.log("Running database schema sync (db:push)...");
    execSync("pnpm db:push", { stdio: "inherit" });
    console.log("✓ Database schema synced successfully");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    console.error("\nTroubleshooting:");
    console.error(
      "1. Verify DATABASE_URL is correct in Vercel environment variables"
    );
    console.error(
      "2. Check that your database is accessible from Vercel's IP addresses"
    );
    console.error(
      "3. Ensure your database allows connections from external IPs"
    );
    console.error("4. Check build logs above for specific database errors");
    process.exit(1);
  }
} else {
  console.log(`Skipping migrations (VERCEL_ENV=${VERCEL_ENV ?? "not set"})`);
}
