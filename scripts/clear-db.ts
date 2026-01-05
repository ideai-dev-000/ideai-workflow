// Load .env.local FIRST before any other imports
import { config } from "dotenv";

config({ path: ".env.local" });
config(); // Also load .env if it exists

import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;

// Safety check: Make sure we're not accidentally clearing production
if (!DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL not found in .env.local");
  process.exit(1);
}

if (DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1")) {
  console.error("❌ ERROR: DATABASE_URL points to localhost!");
  console.error("This script only works with remote databases (Neon, etc.)");
  process.exit(1);
}

// Additional safety: Check if it looks like a production database
if (DATABASE_URL.includes("prod") || DATABASE_URL.includes("production")) {
  console.error("❌ ERROR: DATABASE_URL contains 'prod' or 'production'!");
  console.error("This looks like a production database. Aborting for safety.");
  console.error(
    "Current DATABASE_URL:",
    DATABASE_URL.replace(/:[^:@]+@/, ":****@")
  );
  process.exit(1);
}

async function clearDatabase() {
  // TypeScript doesn't know DATABASE_URL is defined here, but we checked it above
  // Use non-null assertion since we validate and exit early if undefined
  const dbUrl = DATABASE_URL!;

  console.log("🗑️  Clearing local database...");
  console.log("Database:", dbUrl.replace(/:[^:@]+@/, ":****@"));
  console.log("");

  // Create a direct database connection
  const sql = postgres(dbUrl, { max: 1 });

  try {
    // Delete in order (respecting foreign key constraints)
    console.log("1. Deleting workflow execution logs...");
    await sql`DELETE FROM workflow_execution_logs`;
    console.log("   ✓ Deleted workflow execution logs");

    console.log("2. Deleting workflow executions...");
    await sql`DELETE FROM workflow_executions`;
    console.log("   ✓ Deleted workflow executions");

    console.log("3. Deleting workflows...");
    await sql`DELETE FROM workflows`;
    console.log("   ✓ Deleted workflows");

    console.log("4. Deleting API keys...");
    await sql`DELETE FROM api_keys`;
    console.log("   ✓ Deleted API keys");

    console.log("5. Deleting integrations...");
    await sql`DELETE FROM integrations`;
    console.log("   ✓ Deleted integrations");

    console.log("6. Deleting accounts...");
    await sql`DELETE FROM accounts`;
    console.log("   ✓ Deleted accounts");

    console.log("7. Deleting sessions...");
    await sql`DELETE FROM sessions`;
    console.log("   ✓ Deleted sessions");

    console.log("8. Deleting users...");
    await sql`DELETE FROM users`;
    console.log("   ✓ Deleted users");

    console.log("9. Deleting verifications...");
    await sql`DELETE FROM verifications`;
    console.log("   ✓ Deleted verifications");

    console.log("");
    console.log("✅ Database cleared successfully!");
    console.log("");
    console.log("You can now start fresh:");
    console.log("  - Open the app in your browser");
    console.log("  - A new anonymous user will be created automatically");
    console.log("  - Create new workflows as needed");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    process.exit(1);
  } finally {
    // Close database connection
    await sql.end();
    process.exit(0);
  }
}

clearDatabase();
