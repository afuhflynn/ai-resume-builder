# Resumi - AI Resume Builder SaaS

A full‑stack, production‑ready AI‑powered Resume Builder SaaS that generates professional resumes, cover letters, and ATS analysis using advanced AI, with full billing, authentication, and referral monetization.

This platform is built with:

* Next.js 15 (App Router)
* TypeScript
* Prisma ORM
* PostgreSQL (Docker)
* MinIO (File Storage)
* Stripe (Billing)
* Better Auth (Authentication)
* Arcjet (Security)
* AI Powered Generation (OpenAI)

---

## 🚀 Features

### Core Platform

* AI Resume generation
* AI Cover letter builder
* ATS scoring and suggestions
* PDF, DOCX, and Text parsing
* Unlimited resume templates (based on subscription)

### Authentication & Security

* Email/password auth via Better Auth (Implemented)
* OAuth (Google, GitHub) (Implemented)
* Email verification (Implemented)
* Reset passwords (Implemented)
* 2FA support (Pending)
* Session management with Arcjet protection (Implemented)

### Billing & Monetization

* Stripe Checkout & Billing portal (Implemented)
* Subscription tiers (Implemented)
* Coupons & discounts (In Progress)
* Referral system with reward credits (In Progress)
* Affiliate tracking with payout logic (Pending)

### File Management

* MinIO S3-compatible storage
* File validation, upload limits, and secure URLs

### Dashboard & UI

* Resume builder UI
* Resume template gallery
* Stats, history, and user activity
* Billing page, settings page, referral page
* Modern responsive design powered by Tailwind CSS + OKLCH theme

---

## Tech Stack

**Frontend:** Next.js, TypeScript, TailwindCSS
**Backend:** Next.js Server Actions & Route Handlers
**Database:** PostgreSQL (Docker)
**ORM:** Prisma
**File Storage:** MinIO
**Billing:** Stripe Subscriptions
**Auth:** Better Auth
**AI:** OpenAI GPT Models

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/afuhflynn/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Start Docker services

```bash
docker compose up -d
```

This launches:

* PostgreSQL 17.5
* MinIO console + S3 API

### 3. Install dependencies

```bash
pnpm install
```

### 4. Configure environment variables

Copy `.env.example` into `.env` and update the following:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:8003/ai_resume_builder

# MinIO File Storage
MINIO_ENDPOINT=localhost
MINIO_PORT=8004
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_USE_SSL=false
MINIO_BUCKET_NAME=resumes

# Authentication
BETTER_AUTH_SECRET=xxxxxxxxxxxxxxxxxxxx
BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Stripe Payment
STRIPE_SECRET_KEY=xxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx
STRIPE_STARTER_PRICE_ID=xxxxxxxxxxxxxxxxxx
STRIPE_PRO_PRICE_ID=xxxxxxxxxxxxxxxxxx
STRIPE_TEAM_PRICE_ID=xxxxxxxxxxxxxxxxxxx

# Arcjet Security
ARCJET_KEY=xxxxxxxxxxxxxxxxxx

# AI Provider
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxxxx

# App Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_POSTHOG_KEY=xxxxxx
NEXT_PUBLIC_POSTHOG_HOST=xxxxxxx

# Flutterwave
FLW_PUBLIC_KEY=FLWPUBK_TEST-xxxxxxxx
FLW_SECRET_KEY=FLWSECK_TEST-xxxxxxxx
FLW_ENCRYPTION_KEY=FLWSECK_TEST_xxxxxxxx
FLW_WEBHOOK_SECRET=your_webhook_secret


# MTN Mobile Money setup
MOMO_COLLECTIONS_PRIMARY_KEY=your_collections_primary_key
MOMO_COLLECTIONS_USER_ID=your_api_user_id
MOMO_COLLECTIONS_USER_SECRET=your_api_user_secret
MOMO_CALLBACK_HOST=your_publicly_accessible_callback_url


# ORANGE Mobile Money setup
ORANGE_MONEY_MERCHANT_KEY=your_merchant_key
ORANGE_MONEY_API_USER=your_api_username
ORANGE_MONEY_API_PASSWORD=your_api_password
ORANGE_MONEY_RETURN_URL=your_return_url
ORANGE_MONEY_CANCEL_URL=your_cancel_url
ORANGE_MONEY_NOTIF_URL=your_notification_url
```

### 5. Apply database migrations

```bash
pnpm db:migrate
```

### 6. Run the development server

```bash
npm run dev
```

Your app should now be live at:

```cmd
http://localhost:3000
```

---

## Project Structure

```cmd
app/
 ├─ (marketing)/
 ├─ (auth)/
 ├─ (dashboard)/
 ├─ api/
 ├─ layout.tsx
 └─ page.tsx

lib/
 ├─ prisma.ts
 ├─ ai.ts
 ├─ parser.ts
 ├─ credits.ts
 └─ auth.ts

scripts/
 ├─ migrate.sh
 └─ seed.ts
```

---

## Testing

### Unit Tests

Unit tests are planned using **Vitest** for utilities and core logic.

```bash
pnpm test
```

(Implementation pending)

### E2E Tests

E2E tests are planned using **Playwright** for:

* Auth flow
* Billing flow
* AI endpoints
* Resume builder actions

```bash
pnpm test:e2e
```

(Implementation pending)

---

## Deployment

### Docker Build

```bash
docker build -t ai-resume-builder .
```

### Environment Requirements

* PostgreSQL database
* MinIO/S3-compatible storage
* Stripe keys and webhook URL
* Auth secrets and OAuth keys

### Deployable Platforms

* Vercel (Edge functions + external DB)
* Docker VPS (Recommended)
* Render
* Fly.io

---

## Policies

This project includes:

* Terms of Service
* Privacy Policy
* Refund Policy
* Cookie Policy
* Data Handling & Security Policy

All legal pages are located in:

```cmd
app/(marketing)/terms
app/(marketing)/privacy
```

---

## Roadmap

* Team collaboration
* AI-powered interview prep
* Smart resume scoring leaderboard
* Export to LinkedIn integration
* Browser extension (auto‑parse job posts)

---

## License

This project is released under a **Proprietary License**.
Refer to the `LICENSE.md` file for full details.

---

## Author

Built with dedication and endless ambition.
