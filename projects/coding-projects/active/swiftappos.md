# SwiftApp OS
*Coding Project - Created 2026-03-27*

## Description
Internal business OS for Adam's SwiftApps freelance operation. Manages client projects (Drafting→Dev→UAT→Live), invoicing, quotations, receipts, and business analytics — all in one self-hosted dashboard. Single-user, password-gated.

## Project Details
- **Status**: Active (Deploying to Coolify)
- **Created**: 2026-02-18
- **Last Accessed**: 2026-03-28
- **Position**: #1

## Stack
- **Framework**: Next.js + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (self-hosted via Coolify) + Prisma ORM
- **Auth**: Env-based password gate + login page (middleware.ts)
- **Deploy**: Hetzner VPS + Coolify (Docker)
- **Branch**: main

## Resume
```bash
cd "SwiftApp Dev/SwiftAppOS"
npm run dev
# Access: localhost:3000
```

## Active Tasks
- [x] Initial build — projects, billing, analytics, settings pages
- [x] v2.0 upgrade — P1 (Zod validation, sequential numbering, status guards, pagination, toast, auth)
- [x] v2.0 upgrade — P2 (search/filter, quotation→invoice, receipt recording, overdue alerts, progress bar)
- [x] v2.0 upgrade — P3 (bank details, CSV export, duplicate quotation, project archiving, mobile responsive)
- [x] Dockerfile + Next.js standalone mode for Coolify deployment
- [x] Fix Docker build — prisma schema copy order
- [x] Switch Neon → standard PostgreSQL adapter (pg + @prisma/adapter-pg) for self-hosted DB
- [ ] Verify Coolify deploy succeeds — prisma migrate deploy fix pending
- [ ] Set env vars in Coolify: DATABASE_URL, APP_PASSWORD

## Progress Log

### 2026-03-28 (Session 2 — Coolify Docker Prisma Fixes)
- **4 Dockerfile fixes** chasing Prisma v7 deploy errors:
  - `03fa05d` — `prisma: not found` → copy `node_modules/.bin/prisma` to runner
  - `c131d9c` — `.wasm not found` → use `node node_modules/prisma/build/index.js` instead of npx
  - `0509dfa` — `valibot missing` (first attempt) → removed migrate from CMD temporarily
  - `4403e64` — **root fix** → `prisma.config.ts` was triggering `@prisma/dev` → `valibot` chain. Removed config from runner stage. CLI falls back to `prisma/schema.prisma` directly — no dep chain.
- **Lesson**: Prisma v7's `prisma.config.ts` is a TypeScript config loader that pulls `@prisma/dev` at runtime. Never copy it to production Docker runner — use classic schema.prisma approach.
- **Next step**: Verify Coolify deploy succeeds with latest fix. Set `DATABASE_URL` + `APP_PASSWORD` env vars.

### 2026-03-27 (Session 1 — v2.0 + Coolify Deploy Prep)
- **SwiftAppOS v2.0 COMPLETE** (commit `b034298`):
  - **P1 Critical**: Zod validation on all 11 API routes, sequential numbering (Sequence table), status workflow guards, pagination (projects/invoices/quotations), toast notifications (sonner), auth middleware + login page
  - **P2 High Value**: Search/filter on billing + projects, quotation→invoice conversion, full draft edit, receipt/payment recording (auto-mark Paid), overdue invoice alerts, project progress bar (milestone %), receipt view + PDF template
  - **P3 QoL**: Bank details in settings + invoice PDF footer, CSV export (invoices + quotations), duplicate quotation, project archiving, mobile-responsive table component, logo URL with preview, audit trail (updatedAt)
  - Schema: Added Sequence table, bank/logo fields, isArchived, updatedAt columns
  - Packages: +zod +sonner | 20 new files, ~33 modified
- **Dockerfile added** (commit `315557b`): Node 20 Alpine, multi-stage build, standalone mode, `prisma migrate deploy` on startup
- **Docker build fix** (commit `b2e132c`): Copy prisma schema before `npm ci` (was failing)
- **Neon → pg adapter** (commit `52d6440`): Replace `@neondatabase/serverless` + `@prisma/adapter-neon` with `@prisma/adapter-pg` + `pg` for self-hosted PostgreSQL compatibility
- **Next step**: Deploy to Coolify, verify DB connection, set env vars

## Known Issues
- Coolify deploy not yet verified — multiple Prisma Docker issues resolved, final fix pushed
- Env vars to configure: `DATABASE_URL`, `APP_PASSWORD`

## Resources & References
- Deploy: Hetzner VPS + Coolify, same pattern as LorryTech OS
- DB: Self-hosted PostgreSQL via Coolify (not Neon)
- Schema: `prisma/schema.prisma` — Project, Milestone, Client, Quotation, Invoice, Receipt, Cost, Sequence, Settings

## Memory Patterns
*AI records discoveries here during sessions:*
- Prisma adapter: `@prisma/adapter-pg` + `pg` (NOT Neon) for self-hosted PostgreSQL
- Docker CMD: `sh -c "node node_modules/prisma/build/index.js migrate deploy && node server.js"`
- Copy prisma schema BEFORE `npm ci` in Dockerfile deps stage
- **DO NOT copy `prisma.config.ts` to runner** — triggers `@prisma/dev` dep chain → valibot crash
- Runner needs: `node_modules/prisma` + `node_modules/@prisma` (NO prisma.config.ts)
- Sequential numbering via Sequence table (not UUID) for invoices/quotations

---
*Coding Project Template v1.1 — Tokwi Adapted*
