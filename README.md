# AI Workflow Builder Template

A template for building your own AI-driven workflow automation platform. Built on top of Workflow DevKit, this template provides a complete visual workflow builder with real integrations and code generation capabilities.

![AI Workflow Builder Screenshot](screenshot.png)

## Deploy Your Own

You can deploy your own version of the workflow builder to Vercel in two ways:

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.new/workflow-builder)

**What happens during deployment:**

- **Automatic Database Setup**: A Neon Postgres database is automatically created and connected to your project
- **Environment Configuration**: You'll be prompted to provide required environment variables (Better Auth credentials and AI Gateway API key)
- **Ready to Use**: After deployment, you can start building workflows immediately

### Option 2: Deploy with Vercel CLI

If you prefer using the Vercel CLI or need more control over the deployment:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (or create new project)
vercel link

# Set up environment variables
# See "Environment Variables for Production" section below

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Important**: Before deploying, make sure you have:
1. Generated all required secrets (see below)
2. Set up a Neon PostgreSQL database (recommended - see setup instructions below)
3. Configured all required environment variables in Vercel dashboard or via CLI

### Database Setup: Neon (Recommended)

This project is configured to work seamlessly with **Neon** PostgreSQL database. Neon is the recommended choice because:

- **One-click integration** with Vercel
- **Automatic `DATABASE_URL` configuration** - no manual setup needed
- **Serverless-optimized** for Vercel deployments
- **Free tier available** for development

#### Option A: Automatic Setup (One-Click Deploy)

When using the [one-click deploy button](#option-1-one-click-deploy), Neon is automatically set up for you. The `DATABASE_URL` environment variable will be automatically configured.

#### Option B: Manual Neon Setup

If you're deploying with Vercel CLI or need to set up Neon manually:

1. **Create a Neon account** (if you don't have one):
   - Go to [neon.tech](https://neon.tech)
   - Sign up for a free account

2. **Create a new database**:
   - In Neon dashboard, click "Create Project"
   - Choose a project name and region
   - Copy the connection string (it looks like: `postgresql://user:password@host/database`)

3. **Add Neon integration to Vercel** (recommended):
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Integrations**
   - Find **Neon** and click "Add Integration"
   - Select your Neon project
   - This automatically sets `DATABASE_URL` for all environments

4. **Or set DATABASE_URL manually**:
   ```bash
   vercel env add DATABASE_URL production
   # Paste your Neon connection string when prompted
   ```

#### Alternative: Using Supabase or Other PostgreSQL Providers

While Neon is recommended, you can use any PostgreSQL database:
- **Supabase**: Works great, just set `DATABASE_URL` manually
- **Railway, Render, etc.**: All work - just provide the connection string

The project uses Drizzle ORM, which is database-agnostic and works with any PostgreSQL provider.

### Pre-Deployment Checklist

Before deploying to Vercel, ensure you have:

- [ ] **Database**: Neon PostgreSQL database set up (recommended) or another PostgreSQL provider
- [ ] **DATABASE_URL**: Connection string set in Vercel (auto-set if using Neon integration, otherwise set manually)
- [ ] **BETTER_AUTH_SECRET**: Generated and set (run `openssl rand -base64 32`)
- [ ] **INTEGRATION_ENCRYPTION_KEY**: Generated and set (run `openssl rand -hex 32`)
- [ ] **AI_GATEWAY_API_KEY**: Your OpenAI API key set
- [ ] **NEXT_PUBLIC_APP_URL**: Your production domain (e.g., `https://your-app.vercel.app`)
- [ ] **BETTER_AUTH_URL**: Same as `NEXT_PUBLIC_APP_URL`

**Quick Setup Commands:**

```bash
# Generate secrets locally
pnpm setup-env

# Or generate manually:
openssl rand -base64 32  # For BETTER_AUTH_SECRET
openssl rand -hex 32      # For INTEGRATION_ENCRYPTION_KEY

# Set environment variables in Vercel
# Note: DATABASE_URL is auto-set if using Neon integration via Vercel dashboard
# Otherwise, set it manually:
vercel env add DATABASE_URL production
vercel env add BETTER_AUTH_SECRET production
vercel env add INTEGRATION_ENCRYPTION_KEY production
vercel env add AI_GATEWAY_API_KEY production
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add BETTER_AUTH_URL production
```

## What's Included

- **Visual Workflow Builder** - Drag-and-drop interface powered by React Flow
- **Workflow DevKit Integration** - Built on top of Workflow DevKit for powerful execution capabilities
- **Real Integrations** - Connect to Resend (emails), Linear (tickets), Slack, PostgreSQL, and external APIs
- **Code Generation** - Convert workflows to executable TypeScript with `"use workflow"` directive
- **Execution Tracking** - Monitor workflow runs with detailed logs
- **Authentication** - Secure user authentication with Better Auth
- **AI-Powered** - Generate workflows from natural language descriptions using OpenAI
- **Database** - PostgreSQL with Drizzle ORM for type-safe database access
- **Modern UI** - Beautiful shadcn/ui components with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended - see [Database Setup](#database-setup-neon-recommended) above)
- pnpm package manager

### Environment Variables

#### For Local Development

Create a `.env.local` file with the following:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/workflow_builder

# Better Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Credentials Encryption Key (generate with: openssl rand -hex 32)
INTEGRATION_ENCRYPTION_KEY=your-64-character-hex-string

# AI Gateway (for AI workflow generation)
AI_GATEWAY_API_KEY=your-openai-api-key
```

#### For Production (Vercel)

Set these environment variables in your Vercel project settings or via CLI:

**Required Variables:**

```bash
# Database (automatically set if using Neon integration via Vercel dashboard)
# If not using Neon integration, set manually:
DATABASE_URL=postgresql://user:password@host:5432/database
# For Neon: Get connection string from neon.tech dashboard

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-generated-secret-here

# App URL (your production domain)
NEXT_PUBLIC_APP_URL=https://your-domain.com
BETTER_AUTH_URL=https://your-domain.com

# Credentials Encryption Key (generate with: openssl rand -hex 32)
INTEGRATION_ENCRYPTION_KEY=your-64-character-hex-string

# AI Gateway API Key
AI_GATEWAY_API_KEY=your-openai-api-key
```

**Optional Variables (for OAuth authentication):**

```bash
# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Vercel OAuth (for AI Gateway Managed Keys)
VERCEL_CLIENT_ID=your-vercel-client-id
VERCEL_CLIENT_SECRET=your-vercel-client-secret
NEXT_PUBLIC_VERCEL_CLIENT_ID=your-vercel-client-id
```

**Setting Environment Variables with Vercel CLI:**

```bash
# Set a single variable
vercel env add BETTER_AUTH_SECRET

# Set multiple variables from a file
vercel env pull .env.local  # Pull existing vars
# Edit .env.local, then:
vercel env push .env.local
```

**Generating Required Secrets:**

```bash
# Generate BETTER_AUTH_SECRET
openssl rand -base64 32

# Generate INTEGRATION_ENCRYPTION_KEY
openssl rand -hex 32
```

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (choose one method):

# Method 1: Use setup script (recommended - auto-generates secrets)
pnpm setup-env

# Method 2: Copy example file and fill in values
cp .env.example .env.local
# Then edit .env.local with your actual values

# Update .env.local with your actual values:
# - DATABASE_URL (your PostgreSQL connection string - get from Neon dashboard)
# - AI_GATEWAY_API_KEY (your OpenAI API key from https://platform.openai.com/api-keys)

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

**Note**: 
- The `setup-env` script automatically generates `BETTER_AUTH_SECRET` and `INTEGRATION_ENCRYPTION_KEY` and creates a `.env.local` file template
- `.env.local` is gitignored and will never be committed (your secrets are safe)
- `.env.example` is a template file showing what variables are needed (safe to commit)
- You can also generate secrets manually:

```bash
# Generate BETTER_AUTH_SECRET
openssl rand -base64 32

# Generate INTEGRATION_ENCRYPTION_KEY
openssl rand -hex 32
```

Visit [http://localhost:3000](http://localhost:3000) to get started.

### Troubleshooting Deployment

**Common deployment issues:**

1. **Database connection errors (ECONNREFUSED 127.0.0.1:5432)**:
   - **Problem**: `DATABASE_URL` is not set or is pointing to localhost
   - **Solution**: 
     - **Recommended**: Add Neon integration in Vercel (Settings → Integrations → Neon) - this auto-sets `DATABASE_URL`
     - **Manual**: Set `DATABASE_URL` in Vercel project settings (Settings → Environment Variables)
     - Use a remote database (Neon recommended, or Supabase, etc.) - not localhost
     - Verify the connection string format: `postgresql://user:password@host:5432/database`
     - For Neon: Get connection string from [neon.tech dashboard](https://console.neon.tech)

2. **Migration errors during build**:
   - The build process runs migrations automatically in production
   - Ensure `DATABASE_URL` is set **before** building
   - Check that your database allows connections from Vercel's IP addresses
   - Verify the database is accessible (not behind a firewall)

3. **Authentication errors**: 
   - Verify `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` are set correctly
   - `BETTER_AUTH_URL` should match your production domain (e.g., `https://your-domain.com`)

4. **Build failures**: 
   - Check that all required environment variables are set in Vercel
   - Required variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `INTEGRATION_ENCRYPTION_KEY`, `AI_GATEWAY_API_KEY`, `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_URL`

**Setting Environment Variables in Vercel:**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each required variable:
   - `DATABASE_URL` (from your database provider)
   - `BETTER_AUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `INTEGRATION_ENCRYPTION_KEY` (generate with `openssl rand -hex 32`)
   - `AI_GATEWAY_API_KEY` (your OpenAI API key)
   - `NEXT_PUBLIC_APP_URL` (your production URL)
   - `BETTER_AUTH_URL` (your production URL)
4. Make sure to set them for **Production** environment (and optionally Preview/Development)
5. Redeploy your project after adding variables

**Verifying deployment:**

After deployment, check:
- Database migrations ran successfully (check build logs)
- Environment variables are set (Vercel dashboard → Settings → Environment Variables)
- Application is accessible at your domain

## Workflow Types

### Trigger Nodes

- Webhook
- Schedule
- Manual
- Database Event

### Action Nodes

<!-- PLUGINS:START - Do not remove. Auto-generated by discover-plugins -->
- **AI Gateway**: Generate Text, Generate Image
- **Blob**: Put Blob, List Blobs
- **Clerk**: Get User, Create User, Update User, Delete User
- **fal.ai**: Generate Image, Generate Video, Upscale Image, Remove Background, Image to Image
- **Firecrawl**: Scrape URL, Search Web
- **GitHub**: Create Issue, List Issues, Get Issue, Update Issue
- **Linear**: Create Ticket, Find Issues
- **Perplexity**: Search Web, Ask Question, Research Topic
- **Resend**: Send Email
- **Slack**: Send Slack Message
- **Stripe**: Create Customer, Get Customer, Create Invoice
- **Superagent**: Guard, Redact
- **v0**: Create Chat, Send Message
- **Webflow**: List Sites, Get Site, Publish Site
<!-- PLUGINS:END -->

## Code Generation

Workflows can be converted to executable TypeScript code with the `"use workflow"` directive:

```typescript
export async function welcome(email: string, name: string, plan: string) {
  "use workflow";

  const { subject, body } = await generateEmail({
    name,
    plan,
  });

  const { status } = await sendEmail({
    to: email,
    subject,
    body,
  });

  return { status, subject, body };
}
```

### Generate Code for a Workflow

```bash
# Via API
GET /api/workflows/{id}/generate-code
```

The generated code includes:

- Type-safe TypeScript
- Real integration calls
- Error handling
- Execution logging

## API Endpoints

### Workflow Management

- `GET /api/workflows` - List all workflows
- `POST /api/workflows` - Create a new workflow
- `GET /api/workflows/{id}` - Get workflow by ID
- `PUT /api/workflows/{id}` - Update workflow
- `DELETE /api/workflows/{id}` - Delete workflow

### Workflow Execution

- `POST /api/workflows/{id}/execute` - Execute a workflow
- `GET /api/workflows/{id}/executions` - Get execution history
- `GET /api/workflows/executions/{executionId}/logs` - Get detailed execution logs

### Code Generation

- `GET /api/workflows/{id}/generate-code` - Generate TypeScript code
- `POST /api/workflows/{id}/generate-code` - Generate with custom options

### AI Generation

- `POST /api/ai/generate-workflow` - Generate workflow from prompt

## Database Schema

### Tables

- `user` - User accounts
- `session` - User sessions
- `workflows` - Workflow definitions
- `workflow_executions` - Execution history
- `workflow_execution_logs` - Detailed node execution logs

## Development

### Scripts

```bash
# Development
pnpm dev

# Build
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm check

# Formatting
pnpm fix

# Database
pnpm db:generate  # Generate migrations
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio
```

## Integrations

### Resend (Email)

Send transactional emails with Resend's API.

```typescript
import { sendEmail } from "@/lib/integrations/resend";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  body: "Welcome to our platform",
});
```

### Linear (Tickets)

Create and manage Linear issues.

```typescript
import { createTicket } from "@/lib/integrations/linear";

await createTicket({
  title: "Bug Report",
  description: "Something is broken",
  priority: 1,
});
```

### PostgreSQL

Direct database access for queries and updates.

```typescript
import { queryData } from "@/lib/integrations/database";

await queryData("users", { email: "user@example.com" });
```

### External APIs

Make HTTP requests to any API.

```typescript
import { callApi } from "@/lib/integrations/api";

await callApi({
  url: "https://api.example.com/endpoint",
  method: "POST",
  body: { data: "value" },
});
```

### Firecrawl (Web Scraping)

Scrape websites and search the web with Firecrawl.

```typescript
import {
  firecrawlScrapeStep,
  firecrawlSearchStep,
} from "@/lib/steps/firecrawl";

// Scrape a URL
const scrapeResult = await firecrawlScrapeStep({
  url: "https://example.com",
  formats: ["markdown"],
});

// Search the web
const searchResult = await firecrawlSearchStep({
  query: "AI workflow builders",
  limit: 5,
});
```

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Workflow Engine**: Workflow DevKit
- **UI**: shadcn/ui with Tailwind CSS
- **State Management**: Jotai
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Code Editor**: Monaco Editor
- **Workflow Canvas**: React Flow
- **AI**: OpenAI GPT-5
- **Type Checking**: TypeScript
- **Code Quality**: Ultracite (formatter + linter)

## About Workflow DevKit

This template is built on top of Workflow DevKit, a powerful workflow execution engine that enables:

- Native TypeScript workflow definitions with `"use workflow"` directive
- Type-safe workflow execution
- Automatic code generation from visual workflows
- Built-in logging and error handling
- Serverless deployment support

Learn more about Workflow DevKit at [useworkflow.dev](https://useworkflow.dev)

## License

Apache 2.0
