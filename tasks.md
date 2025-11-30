# AI Resume Builder SaaS - Implementation Tasks

## 🔴 HIGH PRIORITY (Core MVP - Must Have)

### Infrastructure & Database
- [/] **Migrate Prisma schema from SQLite to PostgreSQL**
  - [ ] Update `datasource` in `schema.prisma`
  - [ ] Add `stripeCustomerId` to User model
  - [ ] Add database indexes for performance
  - [ ] Create `prisma.config.ts` for PostgreSQL connection
  - [ ] Run initial migration: `pnpm prisma migrate dev`

- [/] **Docker Configuration**
  - [ ] Update `docker-compose.yml` with PostgreSQL 17.5
  - [ ] Add MinIO service for file storage
  - [ ] Configure healthchecks and volumes
  - [ ] Create production `Dockerfile` with multi-stage build
  - [ ] Test: `docker compose up` successfully runs

### Authentication (Better Auth)
- [ ] **Core Auth Implementation**
  - [ ] Create `lib/auth.ts` with Better Auth config
  - [ ] Add email/password provider
  - [ ] Create `/api/auth/[...betterauth]/route.ts`
  - [ ] Implement `middleware.ts` for protected routes
  - [ ] Update `BetterAuthProvider.tsx` with session management

- [ ] **Auth Pages**
  - [ ] Create `app/(auth)/login/page.tsx`
  - [ ] Create `app/(auth)/signup/page.tsx`
  - [ ] Add email verification flow
  - [ ] Create `app/(auth)/reset-password/page.tsx`
  - [ ] Test: Complete signup → login → reset password flow

### Billing & Monetization (Core)
- [x] **Stripe Integration**
  - [x] Create `app/api/stripe/checkout/route.ts`
  - [x] Create `app/api/stripe/portal/route.ts`
  - [x] Complete webhook handlers in `/api/stripe/webhook/route.ts`
    - [x] Handle `checkout.session.completed`
    - [x] Handle `customer.subscription.created`
    - [x] Handle `customer.subscription.updated`
    - [x] Handle `customer.subscription.deleted`
    - [ ] Handle `invoice.payment_failed`
  - [ ] Create `lib/credits.ts` for credit management
  - [x] Test: Select plan → checkout → subscription active

- [x] **Billing UI**
  - [ ] Create `app/(marketing)/pricing/page.tsx`
  - [x] Create `app/(dashboard)/billing/page.tsx`
  - [x] Show current plan and usage
  - [ ] Show payment history
  - [x] Add "Manage Subscription" button

- [x] **Credit System**
  - [x] Create `lib/credits.ts` for credit management
  - [x] Implement credit deduction logic
  - [x] Create `/api/credits/stats` endpoint
  - [x] Add credit tracking to all AI features
  - [x] Display credits in dashboard

### AI Features (Core)
- [x] **Resume Generation**
  - [x] Create `app/api/ai/generate/route.ts`
  - [x] Implement AI-powered resume creation from user profile
  - [x] Credit deduction (50 credits)

- [x] **Resume Improvement**
  - [x] Create `app/api/ai/improve/route.ts`
  - [x] Per-section enhancement with AI
  - [x] Credit deduction (10 credits)

- [x] **ATS Optimization**
  - [x] Create `app/api/ai/ats-optimize/route.ts`
  - [x] Create `components/resume/ATSOptimizer.tsx`
  - [x] Analyze resume for ATS compatibility
  - [x] Provide score, keywords, and suggestions
  - [x] Credit deduction (25 credits)
  - [x] Integrate into AI Assistant tab
  - [x] Generate tailored cover letter

- [x] **File Upload & Parsing**
  - [x] Create `app/api/resumes/import/route.ts`
  - [x] Support PDF, DOCX, TXT formats
  - [x] Parse resume text with AI
  - [x] Populate resume fields automatically
 content

### UI Pages (Core MVP)
- [/] **Landing Page**
  - [ ] Create `app/(marketing)/page.tsx`
  - [ ] **Atomic Components**:
    - [ ] `components/landing/HeroSection.tsx` (Trust-building, clear value prop)
    - [ ] `components/landing/TrustSection.tsx` (Logos, "Used by...")
    - [ ] `components/landing/FeaturesSection.tsx` (Atomic feature cards)
    - [ ] `components/landing/HowItWorksSection.tsx` (Step-by-step visual)
    - [ ] `components/landing/TestimonialsSection.tsx` (Social proof)
    - [ ] `components/landing/PricingSection.tsx` (Clear tiers)
    - [ ] `components/landing/FAQSection.tsx` (Address objections)
    - [ ] `components/landing/CTASection.tsx` (Final push)
    - [ ] `components/layout/Footer.tsx`

- [x] **Dashboard**
  - [x] Create `app/(dashboard)/dashboard/page.tsx`
  - [x] Show stats (resumes, credits, plan)
  - [x] Show recent resumes
  - [x] Add quick action buttons

- [x] **Resume Management**
  - [x] Create `app/(dashboard)/resumes/page.tsx`
  - [x] Add grid/list view toggle (Grid implemented)
  - [x] Add search and filters (Search UI implemented)
  - [x] Create `app/(dashboard)/resumes/[id]/page.tsx`
  - [x] Build basic resume editor (Split view, Accordion)
  - [x] Add export to PDF functionality

- [x] **Settings**
  - [x] Create `app/(dashboard)/settings/page.tsx`
  - [x] Add profile settings tab
  - [x] Add billing management tab
  - [x] Link to Stripe billing portal

### Styling & Theme
- [x] **Apply OKLCH Theme**
  - [x] Update `app/globals.css` with new theme
  - [x] Update `tailwind.config.ts` with custom variables
  - [x] Test dark/light mode switching
  - [x] Verify all shadcn components use new theme

### Essential Components
- [x] **Layout Components**
  - [x] Create `components/layout/DashboardNav.tsx` (Sidebar)
  - [x] Create `components/layout/Header.tsx` (Dashboard Header)
  - [ ] Create `components/billing/PricingCard.tsx`

- [x] **Resume Components**
  - [x] Create `components/resume/ResumePreview.tsx`
  - [x] Create basic `components/resume/ResumeBuilder.tsx`

---

## 🟡 MEDIUM PRIORITY (Enhanced Features)

### Resume Templates (High Priority Request)
- [ ] **Template System**
  - [ ] Create `components/resume/templates/TemplateSelector.tsx`
  - [ ] Create `components/resume/templates/ColorPicker.tsx`
  - [ ] **Implement Templates**:
    - [ ] `GlassTemplate` (Based on @ResumeGlass _ Base44.pdf)
    - [ ] `ProfessionalTemplate` (Clean, traditional)
    - [ ] `CreativeTemplate` (Modern, colorful)
    - [ ] `MinimalistTemplate` (Simple, typography-focused)
  - [ ] Add dynamic color theming support
  - [ ] Test: Switch templates → content adapts → colors change

### Monetization (Enhanced)
- [ ] **Affiliate Program**
  - [ ] Add `Referral` model to Prisma schema
  - [ ] Create `app/api/referral/route.ts`
  - [ ] Create `app/(dashboard)/referrals/page.tsx`
  - [ ] Show referral link generator
  - [ ] Show referral stats and earned credits
  - [ ] Track referral signups in signup flow
  - [ ] Award credits on successful referrals
  - [ ] Test: Generate link → signup via link → verify credits

- [ ] **Coupon System**
  - [ ] Add `Coupon` model to Prisma schema
  - [ ] Create `app/api/coupon/validate/route.ts`
  - [ ] Add coupon input to pricing page
  - [ ] Add coupon application in checkout
  - [ ] Support percentage discounts
  - [ ] Support fixed amount discounts
  - [ ] Support free trial extensions
  - [ ] Test: Create coupon → apply → verify discount

### Legal & Compliance
- [ ] **Legal Pages**
  - [ ] Create `app/(marketing)/terms/page.tsx`
  - [ ] Create `app/(marketing)/privacy/page.tsx`
  - [ ] Add cookie consent banner
  - [ ] Add age verification (18+) in signup
  - [ ] Add GDPR data export feature

---

## 🟢 LOW PRIORITY (Nice to Have)

### Team Collaboration
- [ ] **Multi-User Workspaces**
  - [ ] Add `Team` and `Workspace` models to Prisma
  - [ ] Create team invitation system
  - [ ] Create workspace management UI
  - [ ] Add role-based permissions (owner, editor, viewer)
  - [ ] Share resumes within workspace
  - [ ] Test: Create team → invite member → share resume

### Advanced AI Features
- [x] **Bulk Operations**
  - [x] Add bulk resume generation endpoint
  - [x] Add batch processing queue
  - [x] Show progress indicator
  - [x] Test: Generate 10 resumes at once

- [x] **AI Request Queue**
  - [x] Implement background job processing
  - [x] Add Redis for queue management
  - [x] Show queue status in UI
  - [x] Add retry logic for failed jobs

### Admin Features
- [x] **Admin Panel**
  - [x] Create admin authentication check
  - [x] Create `app/(admin)/dashboard/page.tsx`
  - [x] Show user statistics
  - [x] Show revenue metrics
  - [x] Manage coupons and referrals
  - [x] View system health
  - [x] Create health check page

### Analytics & Monitoring
- [x] **User Analytics**
  - [x] Add PostHog or Plausible integration
  - [x] Track resume creations
  - [x] Track AI usage
  - [x] Track conversion funnel

- [/] **Error Monitoring**
  - [x] Add Sentry integration
  - [x] Set up error alerts
  - [ ] Add performance monitoring

### Additional Features
- [x] **Resume Versioning**
  - [x] Add version history to Resume model (schema already had it)
  - [x] Create version comparison UI
  - [x] Add restore version functionality
  - [x] Create API routes for version management
  - [x] Add version history sidebar component
  - [x] Integrate into resume builder

- [ ] **Email Notifications**
  - [ ] Set up email service (Resend or SendGrid)
  - [ ] Welcome email on signup
  - [ ] Payment confirmation emails
  - [ ] Credit balance alerts
  - [ ] Weekly usage reports

- [ ] **API for Developers**
  - [ ] Create public API documentation
  - [ ] Add API key generation
  - [ ] Add rate limiting per API key
  - [ ] Create API usage dashboard

---

## 🔵 SECONDARY (Post-Launch)

### Marketing & Growth
- [ ] **SEO Optimization**
  - [ ] Add meta tags to all pages
  - [ ] Create sitemap.xml
  - [ ] Add structured data (JSON-LD)
  - [ ] Optimize images and assets

- [ ] **Blog System**
  - [ ] Create blog CMS (MDX)
  - [ ] Write 10+ SEO-optimized articles
  - [ ] Add blog categories and tags

- [ ] **Social Proof**
  - [ ] Add testimonials collection system
  - [ ] Display testimonials on landing page
  - [ ] Add trust badges
  - [ ] Show live user count

### Internationalization
- [ ] **Multi-Language Support**
  - [ ] Set up next-intl or similar
  - [ ] Translate UI to French
  - [ ] Translate UI to Spanish
  - [ ] Add language selector

### Mobile Experience
- [ ] **Mobile App (Optional)**
  - [ ] Create React Native app
  - [ ] Sync with web backend
  - [ ] Add mobile-specific features

### Integrations
- [ ] **Third-Party Integrations**
  - [ ] LinkedIn profile import
  - [ ] Indeed resume export
  - [ ] Google Drive sync
  - [ ] Dropbox backup

---

## 🧪 TESTING & QUALITY ASSURANCE

### Unit Tests
- [ ] **Set up Testing Framework**
  - [ ] Create `vitest.config.ts`
  - [ ] Configure test environment

- [ ] **Write Unit Tests**
  - [ ] Test AI utility functions (`lib/ai.ts`)
  - [ ] Test credit system (`lib/credits.ts`)
  - [ ] Test parser functions (`lib/parser.ts`)
  - [ ] Test Stripe utilities (`lib/stripe.ts`)
  - [ ] Run: `pnpm test` (aim for 80%+ coverage)

### E2E Tests
- [ ] **Set up Playwright**
  - [ ] Create `playwright.config.ts`
  - [ ] Set up test database

- [ ] **Write E2E Tests**
  - [ ] Test auth flow (signup → login → logout)
  - [ ] Test billing flow (select plan → checkout → verify)
  - [ ] Test resume creation (create → edit → export)
  - [ ] Test AI generation (generate → verify credits)
  - [ ] Test affiliate flow (generate link → signup → verify credits)
  - [ ] Run: `pnpm test:e2e`

### Manual Testing Checklist
- [ ] **Cross-Browser Testing**
  - [ ] Test on Chrome
  - [ ] Test on Firefox
  - [ ] Test on Safari
  - [ ] Test on Edge

- [ ] **Responsive Testing**
  - [ ] Test on mobile (iOS)
  - [ ] Test on mobile (Android)
  - [ ] Test on tablet
  - [ ] Test on desktop (1920x1080)

- [ ] **Accessibility Testing**
  - [ ] Run Lighthouse audit (aim for 90+ accessibility score)
  - [ ] Test keyboard navigation
  - [ ] Test screen reader compatibility

---

## 🚀 DEPLOYMENT & DEVOPS

### Environment Setup
- [ ] **Environment Variables**
  - [ ] Update `.env.example` with all required vars
  - [ ] Document each variable in README
  - [ ] Set up production `.env` file
  - [ ] Configure secrets in deployment platform

### Database & Storage
- [ ] **Production Database**
  - [ ] Set up production PostgreSQL (Supabase/Neon/Railway)
  - [ ] Run migrations on production DB
  - [ ] Set up automated backups

- [ ] **File Storage**
  - [ ] Configure production MinIO/S3/Vercel Blob
  - [ ] Test file upload in production
  - [ ] Set up CDN for file delivery

### Deployment Scripts
- [ ] **Create Deployment Scripts**
  - [ ] Create `scripts/migrate.sh` for DB migrations
  - [ ] Create `scripts/seed.ts` for initial data
  - [ ] Test seed script: `pnpm seed`

### CI/CD Pipeline
- [ ] **Set up GitHub Actions**
  - [ ] Create workflow for tests on PR
  - [ ] Create workflow for production deploy
  - [ ] Add environment variable validation

### Monitoring & Security
- [ ] **Production Monitoring**
  - [ ] Set up uptime monitoring
  - [ ] Configure error alerts
  - [ ] Set up performance monitoring

- [ ] **Security Hardening**
  - [ ] Enable HTTPS
  - [ ] Configure CORS properly
  - [ ] Enable Arcjet in production
  - [ ] Set up rate limiting
  - [ ] Configure CSP headers

### Launch Checklist
- [ ] **Pre-Launch**
  - [ ] Complete security audit
  - [ ] Test payment processing end-to-end
  - [ ] Verify all webhooks working
  - [ ] Test email notifications
  - [ ] Review privacy policy and terms
  - [ ] Set up customer support email/chat

- [ ] **Launch Day**
  - [ ] Deploy to production
  - [ ] Test critical user flows
  - [ ] Monitor error logs
  - [ ] Monitor payment processing
  - [ ] Announce launch on social media

---

## 📦 DEPENDENCIES TO INSTALL

### Production Dependencies
```bash
pnpm add pdf-parse mammoth minio @better-auth/prisma bcryptjs
```

### Development Dependencies
```bash
pnpm add -D @types/pdf-parse @types/bcryptjs vitest @playwright/test @vitejs/plugin-react
```

### Optional (Based on Choices)
```bash
# If using Gemini AI
pnpm add @google/generative-ai

# If using email service
pnpm add resend

# If using analytics
pnpm add posthog-js

# If using monitoring
pnpm add @sentry/nextjs
```

---

## 📝 DOCUMENTATION

- [ ] **Update README.md**
  - [ ] Add project description
  - [ ] Add setup instructions
  - [ ] Document environment variables
  - [ ] Add development workflow
  - [ ] Add deployment guide

- [ ] **Create CONTRIBUTING.md**
  - [ ] Code style guidelines
  - [ ] Git workflow
  - [ ] Testing requirements

- [ ] **Create API Documentation**
  - [ ] Document all public API routes
  - [ ] Add request/response examples
  - [ ] Document error codes

---

## ⏱️ TIME ESTIMATES

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| 🔴 High Priority (MVP) | 60 tasks | 22-28 hours |
| 🟡 Medium Priority | 35 tasks | 15-20 hours |
| 🟢 Low Priority | 25 tasks | 12-15 hours |
| 🔵 Secondary | 20 tasks | 10-12 hours |
| 🧪 Testing | 15 tasks | 6-8 hours |
| 🚀 Deployment | 20 tasks | 5-7 hours |

**Total: ~70-90 hours for complete implementation**

**MVP Only: ~22-28 hours**

---

## 🎯 MILESTONE TARGETS

### Milestone 1: Core Infrastructure (Week 1)
- ✅ Database migrated to PostgreSQL
- ✅ Docker setup complete
- ✅ Authentication working (email/password)
- ✅ Basic billing flow complete

### Milestone 2: AI Features (Week 2)
- ✅ Resume generation working
- ✅ File upload and parsing working
- ✅ Credit system implemented
- ✅ Basic resume editor complete

### Milestone 3: MVP Launch (Week 3)
- ✅ Landing page live
- ✅ All core pages complete
- ✅ Payment processing tested
- ✅ Deployed to production

### Milestone 4: Enhanced Features (Week 4-5)
- ✅ Cover letter generation
- ✅ ATS optimization
- ✅ Template system
- ✅ Affiliate program

### Milestone 5: Polish & Scale (Week 6+)
- ✅ Team collaboration
- ✅ Admin panel
- ✅ Analytics integrated
- ✅ Marketing features

### Advance

[] User should be able to add some other advance sections including education
[] ATS Analysis (select from existing ones or upload a resume) (This has to take note of a job scenario either filled in by the user or from already created job templates in the db or some data file in the apps codebase.)

[] Make the templates tab active and work in the resume builder
[] Ensure that resume templates are stored in the db and each resume data from the db is taken to form a resume based on the template id and the appropriate resume image is generated to display on the general resume page.
[] Add all resume templates to the database.
[] Ensure there is a default color for all resumes created.
[] And there is also a default resume template id for all resumes all from the ones stored in the db.
[] Also make sure that

[] Fix error: `Resume import error: Error: Setting up fake worker failed: "Cannot find module '/home/tembeng/Documents/new_projects/ai-resume-builder/.next/dev/server/chunks/pdf.worker.mjs' imported from /home/tembeng/Documents/new_projects/ai-resume-builder/.next/dev/server/chunks/32f72_pdfjs-dist_legacy_build_pdf_mjs_a1dfb4aa._.js".
    at <unknown> (webpack://pdf.js/src/display/api.js:2278:11)
  2276 |       .catch(reason => {
  2277 |         this.#capability.reject(
> 2278 |           new Error(`Setting up fake worker failed: "${reason.message}".`)
       |           ^
  2279 |         );
  2280 |       });
  2281 |   }
 POST /api/resumes/import 500 in 3.2s (compile: 2.7s, proxy.ts: 9ms, render: 438ms)`
