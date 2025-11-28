# Implementation Guide: AI Resume Builder SaaS

This document provides a technical overview of the project, setup instructions, and details on the core systems for developers.

## 1. Core Technology Stack

The project is a modern full-stack application built with the following technologies:

-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Database ORM**: Prisma
-   **Database**: PostgreSQL
-   **File Storage**: MinIO (S3-Compatible)
-   **Authentication**: Better Auth
-   **Billing**: Stripe
-   **AI**: Vercel AI SDK (OpenAI & Google Gemini)
-   **Styling**: Tailwind CSS with an OKLCH theme
-   **UI Components**: shadcn/ui (built on Radix UI)
-   **State Management**: Zustand
-   **Form Handling**: React Hook Form with Zod for validation

## 2. Local Development Setup

To run the project locally, follow these steps.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ai-resume-builder
```

### Step 2: Configure Environment Variables

Create a `.env` file by copying the example file:

```bash
cp .env.example .env
```

Update the `.env` file with the necessary secrets and configuration for the following services:
- `DATABASE_URL` (for PostgreSQL)
- `MINIO_*` variables (endpoint, access key, secret key)
- `STRIPE_*` variables (secret key, webhook secret)
- `AUTH_SECRET` (for Better Auth)
- `OPENAI_API_KEY` or other AI provider keys

### Step 3: Start Docker Services

The project uses Docker Compose to manage the database and file storage services.

```bash
docker compose up -d
```

This command will start PostgreSQL and MinIO containers in the background.

### Step 4: Install Dependencies

This project uses `pnpm` for package management.

```bash
pnpm install
```

### Step 5: Run Database Migrations

Apply the latest database schema using Prisma Migrate.

```bash
pnpm db:migrate
```

This will sync your local PostgreSQL database with the schema defined in `prisma/schema.prisma`.

### Step 6: Run the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 3. Project Structure Overview

-   `app/`: Contains all Next.js App Router routes.
    -   `(auth)`: Routes for login, signup, password reset, etc. **(Currently not implemented)**.
    -   `(dashboard)`: Protected routes for authenticated users.
    -   `(marketing)`: Public-facing pages like the landing page and pricing.
    -   `api/`: Route handlers for backend logic (AI, Stripe webhooks, etc.).
-   `components/`: Shared React components, organized by feature.
-   `lib/`: Core business logic, utilities, and client initializations.
    -   `auth.ts`: Configuration for Better Auth.
    -   `credits.ts`: Logic for managing user AI credits.
    -   `prisma.ts`: Prisma client instance.
    -   `stripe.ts`: Stripe client and helper functions.
-   `prisma/`: Contains the `schema.prisma` file and migration history.
-   `scripts/`: Standalone scripts for tasks like database seeding (`db:seed`).

## 4. Core Systems Implementation

### Authentication

-   **Provider**: `better-auth`
-   **Status**: **Not yet implemented.**
-   **Implementation Files**: The logic will reside in `lib/auth.ts`, `/api/auth/[...betterauth]/route.ts`, and the UI in `app/(auth)/...`. Middleware in `middleware.ts` will protect dashboard routes.

### Billing (Stripe)

-   **Status**: Mostly complete.
-   **Logic**: The system is webhook-driven.
    -   `app/api/stripe/checkout/route.ts`: Creates Stripe Checkout sessions.
    -   `app/api/stripe/portal/route.ts`: Redirects users to the Stripe Billing Portal.
    -   `app/api/stripe/webhook/route.ts`: Handles events from Stripe to update user subscriptions and credit balances. It listens for `checkout.session.completed`, `customer.subscription.*`, and other critical events.

### AI Features

-   **Status**: Complete.
-   **SDK**: Vercel AI SDK.
-   **Logic**: AI generation is handled via API routes in `app/api/ai/`.
    -   `generate/route.ts`: Creates a full resume.
    -   `improve/route.ts`: Improves a specific section of a resume.
    -   `ats-optimize/route.ts`: Analyzes and scores a resume for ATS compatibility.
-   **Credit Deduction**: The logic in `lib/credits.ts` is called from these API routes to deduct the appropriate amount of credits per request.

## 5. Available `pnpm` Scripts

-   `pnpm dev`: Starts the Next.js development server.
-   `pnpm build`: Builds the application for production.
-   `pnpm db:migrate`: Applies pending Prisma migrations.
-   `pnpm db:generate`: Generates the Prisma Client.
-   `pnpm db:studio`: Opens the Prisma Studio to view and edit data.
-   `pnpm db:seed`: Seeds the database with initial data using the `scripts/seed.ts` file.