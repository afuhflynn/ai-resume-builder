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

* Email/password auth via Better Auth
* OAuth (Google, GitHub)
* Email verification
* Reset passwords
* 2FA support
* Session management with Arcjet protection

### Billing & Monetization

* Stripe Checkout & Billing portal
* Subscription tiers
* Coupons & discounts
* Referral system with reward credits
* Affiliate tracking with payout logic

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

## 📦 Tech Stack

**Frontend:** Next.js, TypeScript, TailwindCSS
**Backend:** Next.js Server Actions & Route Handlers
**Database:** PostgreSQL (Docker)
**ORM:** Prisma
**File Storage:** MinIO
**Billing:** Stripe Subscriptions
**Auth:** Better Auth
**AI:** OpenAI GPT Models

---

## 🐳 Running Locally

### 1. Clone the repository

```bash
git clone <repo-url>
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
npm install
```

### 4. Configure environment variables

Copy `.env.example` into `.env` and update the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"
MINIO_ENDPOINT=localhost
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
AUTH_SECRET=xxx
OPENAI_API_KEY=xxx
```

### 5. Apply database migrations

```bash
npx prisma migrate dev
```

### 6. Run the development server

```bash
npm run dev
```

Your app should now be live at:

```
http://localhost:3000
```

---

## 🧩 Project Structure

```
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

## 🧪 Testing

### Unit Tests

```
npm run test
```

Uses **Vitest** for utilities and core logic.

### E2E Tests

```
npm run test:e2e
```

Uses **Playwright** for:

* Auth flow
* Billing flow
* AI endpoints
* Resume builder actions

---

## 📤 Deployment

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

## 📘 Policies

This project includes:

* Terms of Service
* Privacy Policy
* Refund Policy
* Cookie Policy
* Data Handling & Security Policy

All legal pages are located in:

```
app/(marketing)/terms
app/(marketing)/privacy
```

---

## 📈 Roadmap

* Team collaboration
* AI-powered interview prep
* Smart resume scoring leaderboard
* Export to LinkedIn integration
* Browser extension (auto‑parse job posts)

---

## 📝 License

This project is licensed under MIT.

---

## 🙌 Author

Built with dedication and endless ambition.
