# Database Setup Guide - Two Environment Strategy

This project uses **two separate Neon databases** for complete environment isolation:

1. **Local** - For local development and testing
2. **Production** - For live production environment

## Step 1: Create Two Neon Databases

### In Neon Console (console.neon.tech):

1. **Create Local Database:**
   - Click "Create Project"
   - Name: `ideai-workflow-local`
   - Region: Choose closest to you
   - Copy the connection string (pooled) - save this for `.env.local`

2. **Create Production Database:**
   - Click "Create Project" again
   - Name: `ideai-workflow-prod`
   - Region: Choose based on your users' location
   - Copy the connection string (pooled) - save this for Vercel

**Note:** You already have one database - decide:
- Use existing as **production**, create new **local**
- Or use existing as **local**, create new **production**

## Step 2: Set Up Local Environment

Update your `.env.local` file:

```env
# Local Development Database
DATABASE_URL=postgresql://user:password@ep-xxx-xxx-pooler.region.neon.tech/local-db?sslmode=require

# ... rest of your env vars stay the same
```

Then run:
```bash
pnpm db:push
```

## Step 3: Set Up Vercel Environment Variables

### For Production:

```bash
vercel env add DATABASE_URL production
# Paste your production database connection string
```

Or via Vercel Dashboard:
- Go to Settings → Environment Variables
- Add `DATABASE_URL` for Production environment
- Paste your production database connection string

## Step 4: Initialize Each Database

After setting up connection strings:

1. **Local:** Run `pnpm db:push` to set up schema
2. **Production:** Will auto-run migrations on first production deploy

## Benefits of This Setup

✅ **Complete Isolation:**
- Test accounts stay in local DB
- Production accounts stay in prod DB
- No risk of mixing data

✅ **Easy Resets:**
- Can drop/recreate local DB anytime
- Production stays safe and isolated

✅ **Safe Testing:**
- Test migrations on local first
- Deploy to production with confidence
- Each environment is independent

✅ **Team Friendly:**
- Each developer can have their own local DB
- Production is protected

## Managing Migrations

### Development Workflow:

1. **Make schema changes** in `lib/db/schema.ts`
2. **Test locally:**
   ```bash
   pnpm db:push  # Updates local DB
   ```
3. **Deploy to production:**
   - Deploy to Vercel → production deployment
   - Migrations run automatically via `scripts/migrate-prod.ts`

### Manual Migration (if needed):

```bash
# Local
DATABASE_URL=your-local-url pnpm db:push

# Production (via Vercel CLI - be careful!)
vercel env pull .env.production
DATABASE_URL=$(grep DATABASE_URL .env.production) pnpm db:push
```

## Connection String Format

All Neon connection strings should look like:
```
postgresql://user:password@ep-xxx-xxx-pooler.region.neon.tech/database?sslmode=require
```

**Important:** Use the **pooled** connection string (ends with `-pooler`) for serverless environments like Vercel.

## Troubleshooting

### "Database connection refused"
- Check connection string is correct
- Verify database is not paused in Neon dashboard
- Ensure `?sslmode=require` is included

### "Table already exists" errors
- This is normal if tables exist - `db:push` handles this
- If issues persist, check migration script is using `db:push` not `db:migrate`

### Different data in each environment
- This is expected and correct! Each environment has its own data
- Local = your test data
- Production = real user data

## Current Setup Status

- ✅ Local database: Configured in `.env.local`
- ⏳ Production database: Need to create and configure (or use existing)

