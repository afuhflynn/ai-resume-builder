# AI Resume Builder SaaS - Complete Implementation Guide

**Project Name:** Resumi
**Version:** 1.0.0
**Status:** Beta / MVP Complete
**Last Updated:** November 28, 2025

---

## 1. Project Overview

**Resumi** is a modern, AI-powered SaaS platform designed to help users create professional, ATS-optimized resumes and cover letters. It leverages advanced AI (Google Gemini/OpenAI) to generate content, offers premium templates, and includes a full subscription billing system.

### Core Value Proposition
- **AI-Powered Creation:** Generate resumes from scratch or import existing ones.
- **Smart Editing:** Real-time AI assistance for rewriting and improving content.
- **Versioning:** Track changes and restore previous versions.
- **Cover Letters:** tailored cover letters based on job descriptions.
- **Monetization:** Credit-based system and monthly subscriptions.

---

## 2. Technology Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **UI Components:** shadcn/ui (Radix Primitives)
- **Animations:** Framer Motion, GSAP
- **State Management:** React Context + Hooks
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js (Next.js Server Actions & API Routes)
- **Database:** PostgreSQL 17.5
- **ORM:** Prisma
- **Storage:** MinIO (S3 Compatible) for file uploads

### Services & Integrations
- **Authentication:** Better Auth (Email/Pass, Google, GitHub)
- **Payments:** Stripe (Subscriptions & Webhooks)
- **AI:** Google Gemini / OpenAI (via Vercel AI SDK)
- **Security:** Arcjet (Rate Limiting, Bot Protection)
- **Email:** Nodemailer (Transactional Emails)
- **Analytics:** PostHog

---

## 3. Architecture & Database

### Database Schema (Prisma)
The application uses a relational database with the following key models:

- **User:** Core user profile, credits, stripe customer ID.
- **Session/Account:** Auth management.
- **Resume:** Stores resume content (JSON), title, template ID.
- **ResumeVersion:** Snapshots of resumes for version control.
- **CoverLetter:** Generated cover letters.
- **Subscription:** Tracks user plan status and period.
- **BillingPlan:** Defines available plans (Free, Pro, etc.).
- **AIUsage:** Logs AI credit consumption.

### API Structure
- `/api/auth/*`: Authentication routes.
- `/api/resumes/*`: CRUD for resumes, versions, and imports.
- `/api/ai/*`: AI generation endpoints (resume, chat, rewrite).
- `/api/stripe/*`: Checkout sessions and webhooks.
- `/api/user/*`: User profile and settings.

---

## 4. Core Features Implementation

### A. Resume Builder
**Location:** `app/(dashboard)/resumes` & `components/resume`
- **Creation Flows:**
  1.  **From Scratch:** Empty state.
  2.  **Template:** Pre-selected design.
  3.  **Import:** Parses PDF/DOCX via AI.
  4.  **AI Gen:** Generates full content from job title/experience.
- **Editor:**
  - Real-time preview.
  - Section-based editing (Personal, Experience, Education, etc.).
  - Drag-and-drop reordering.
- **AI Assistant:** "Improve with AI" button for text fields.

### B. Resume Versioning
**Location:** `lib/versioning.ts` & `components/resume/VersionHistory.tsx`
- **Auto-Save:** Creates versions periodically.
- **Manual Snapshots:** User-triggered saves.
- **Restore:** Revert to any previous version.
- **Diffing:** Compare versions (backend logic implemented).

### C. Cover Letter Generator
**Location:** `app/(dashboard)/cover-letter`
- **Two-Step Flow:**
  1.  **Info:** Collect job details and tone.
  2.  **Chat:** AI agent drafts and refines the letter.
- **Context:** Can link to a specific resume for personalized content.

### D. Billing & Credits
**Location:** `lib/stripe.ts` & `lib/credits.ts`
- **Plans:**
  - **Free:** Limited credits, basic templates.
  - **Pro:** Monthly sub, unlimited AI, premium templates.
- **Credit System:**
  - Actions cost credits (e.g., Generate Resume = 50, Rewrite = 5).
  - Credits deducted via `deductCredits` utility.
  - Low balance alerts via email.

### E. Email Notifications
**Location:** `lib/email`
- **Tech:** Nodemailer with custom HTML template engine.
- **Branding:** Consistent Blue-600 theme.
- **Triggers:**
  - Welcome (Signup).
  - Payment Receipt (Stripe Webhook).
  - Low Credits (Credit deduction logic).

---

## 5. Security & Performance

### Authentication
- **Better Auth:** Secure session management.
- **Middleware:** `proxy.ts` protects dashboard routes.
- **RBAC:** Role-based access (User/Admin) for specific routes.

### Rate Limiting (Arcjet)
- **Protection:** Prevents API abuse on AI and Auth endpoints.
- **Bot Detection:** Blocks malicious bots.

### Optimization
- **Server Components:** Used where possible for performance.
- **Debouncing:** Auto-save inputs to reduce DB writes.
- **Lazy Loading:** Heavy components loaded on demand.

---

## 6. Deployment & DevOps

### Environment Variables
Required keys for production:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET` & `BETTER_AUTH_URL`
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`
- `NODEMAILER_` credentials
- `ARCJET_KEY`

### Build Process
1.  `pnpm install`
2.  `pnpm db:generate` (Prisma)
3.  `pnpm build` (Next.js)
4.  `pnpm start`

---

## 7. Future Roadmap

- **Template Marketplace:** Allow community submissions.
- **Job Board Integration:** Auto-apply with generated resumes.
- **Interview Prep:** AI mock interviews based on resume.
- **Mobile App:** Native wrapper for iOS/Android.
- **Multi-Language:** Support for non-English resumes.

---

**Developed by:** Tembeng & Antigravity (Google DeepMind)
