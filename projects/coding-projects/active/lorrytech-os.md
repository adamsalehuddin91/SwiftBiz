# LorryTech OS
*Coding Project - Created 2026-02-28*

## Description
Fleet management system for Malaysian SME lorry owners. Centralizes Lalamove + side job revenue, digital receipt vault (LHDN 7-year compliance), driver commission tracking, vehicle maintenance alerts, and financial P&L — all in one dashboard. Single-tenant, owner + driver roles.

## Project Details
- **Status**: Active
- **Created**: 2026-02-28
- **Last Accessed**: 2026-04-07
- **Position**: #1

## Stack
- **Framework**: Laravel 12 + Inertia.js + React 18 (JSX) + Tailwind 3 + Vite 7
- **Database**: PostgreSQL (self-hosted dalam Hetzner via Coolify)
- **Auth**: Laravel Breeze (owner/driver roles)
- **PDF**: barryvdh/laravel-dompdf
- **Storage**: Cloudflare R2 (S3-compatible, receipt images)
- **Deploy**: Hetzner VPS + Coolify (Git push auto-deploy)
- **Domain**: `lorrytech.swiftapps.my`
- **Repo**: `adamsalehuddin91/LorryTech-OS`
- **URL**: `https://lorrytech.swiftapps.my`
- **Branch**: `master`

## Resume
```bash
cd "SwiftApp Dev/lorrytech-os"
export PATH="/c/laragon/bin/php/php-8.3.30-Win32-vs16-x64:/c/laragon/bin/composer:$PATH"
php artisan serve && npm run dev
```

## Active Tasks
- [x] Phase 1: Foundation — Laravel scaffold, Breeze, migrations (18 tables), seed data
- [x] Phase 2: Fleet & Maintenance — Vehicles, Drivers, Assignments, Leasing CRUD
- [x] Phase 3: Revenue Hub — Trips, Quotations, Invoices, PDF generation
- [x] Phase 4: Receipt Vault — Expenses CRUD, R2 upload, Audit Score widget
- [x] Phase 5: Driver Portal — Driver login, receipt snap, commission tracker
- [x] Phase 6: Dashboard & Analytics — P&L charts, reports, alerts
- [x] Phase 7: Deploy — Hetzner+Coolify, PostgreSQL, Docker, Cloudflare DNS

## Progress Log
### 2026-04-07 (Session 7 — Demo Readiness Review + Bug Fixes)
- **Full system review** conducted — demo readiness check before client presentation
- **3 issues found and fixed** (commits `d019c2e` + `e18772c`):
  - LIKE wildcard injection: `escapeLike()` added to base Controller, applied in 6 controllers
  - Authorization defense-in-depth: `$this->middleware('role:owner')` added to all 6 resource controllers
  - Payment badge fix: `Dashboard.jsx` now handles 3 states (Dibayar/Separa/Belum Bayar)
  - Commission display bug: `Trips/Show.jsx` wrong field names (`rate`→`commission_rate`, `amount`→`commission_amount`)
  - Commission UX: Section always visible, shows helpful message when driver has 0% rate
- **Latest commits**: `e18772c` (commission fix), `d019c2e` (security + badge)
- **System status**: Demo-ready ✅ — 9/10 code quality

### 2026-04-07
- Project resumed (was position #4)

### 2026-03-23 (Session 6 — Production Deploy + PostgreSQL Migration)
- **Phase 7 COMPLETE** — Full production deployment:
  - Dockerfile: PHP 8.3-FPM + Nginx + Supervisor + pdo_pgsql
  - Docker support files: `docker/nginx.conf`, `docker/supervisord.conf`
  - Coolify: Git auto-deploy from `master` branch
  - Cloudflare DNS: `lorrytech.swiftapps.my` → Hetzner VPS (46.224.209.152)
  - Force HTTPS via `URL::forceScheme('https')` in AppServiceProvider
  - Root `/` redirects to `/login` (no Welcome page)
- **SQLite → PostgreSQL migration**:
  - Added `pdo_pgsql` to Dockerfile
  - Fixed migration ordering: merged `vehicle_leases` + `lease_payments` into single file
  - Fixed column references for PostgreSQL strict checking:
    - `driver:id,name` → `driver.user:id,name` (DashboardService)
    - `unassigned_date` → `returned_date` (DriverPortalController)
    - `brand,model` → `make_model` (ExpenseController)
  - Seeder: `Create` → `firstOrCreate` / `updateOrInsert` (idempotent)
- **TablePlus access**: PostgreSQL exposed on port 5433 via Coolify
- **Image compression**: Client-side Canvas API (max 1200px, 70% JPEG quality) on UploadReceipt + Expenses/Create
- **Commits**: `a29a757` → `72f12bc` (12 commits this session)
- **Login**: admin@lorrytech.my / password | ali@lorrytech.my | abu@lorrytech.my

### 2026-03-08 (Session 5 — Code Review + Security Hardening + SoftDeletes)
- **Full code review** completed — 3 HIGH, 5 MEDIUM issues identified
- **HIGH fixes**:
  - XSS: Replaced `dangerouslySetInnerHTML` with safe `children` prop in 9 pagination JSX files
  - strftime: Replaced SQLite-only `strftime` with Carbon `whereBetween` in DriverPortalController
  - Register disabled: Commented out register routes + removed link from Welcome.jsx
- **SoftDeletes on financial models**:
  - Added `use SoftDeletes;` to Trip, Invoice, Expense, DriverCommission, Payment
  - Migration `2026_03_08_000001` adds `deleted_at` to all 5 tables (ran successfully)
  - Fixed cascade delete in TripController, TripService, InvoiceController (model-level delete instead of query builder mass delete)
- **Additional**: `abort_unless($driver, 403)` null guard on 5 DriverPortal methods
- `npm run build` passed (3.11s)
- **Tokwi v5.4**: CLAUDE.md slimmed to dispatcher (388→137 lines), auto memory → bootstrap pointer

### 2026-03-01 (Session 4 — Phase 5 + Phase 6)
- **Phase 5 COMPLETE** — Driver Portal:
  - DriverPortalController: 6 endpoints (dashboard, trips, commissions, upload receipt, receipts)
  - 5 React pages: Dashboard, MyTrips, MyCommissions, UploadReceipt, MyReceipts
  - Role-based sidebar: owner (7 items) vs driver (5 items) in AuthenticatedLayout
  - Auto-redirect /dashboard for driver-role users
  - Camera-first upload UI with `capture="environment"` for mobile
  - Bug fix: `receipt_path` → `receipt_image_url` in MyReceipts
  - `npm run build` passed (3.39s)
- **Phase 6 COMPLETE** — Dashboard & Analytics:
  - DashboardService: 8 aggregation methods (KPIs, P&L trend, expense breakdown, vehicle alerts, etc.)
  - DashboardController: invokable, replaces inline closure
  - Dashboard.jsx full rewrite: KPI cards, P&L bar chart (pure CSS), expense breakdown, vehicle alerts, invoice/commission summaries, top customers, recent trips
  - Removed Kewangan placeholder (dashboard IS financial overview)
  - `npm run build` passed (3.32s)
- **Pre-commit check**: All clear (0 console.log, 0 secrets, 0 TODOs)
- **Insight saved**: `insights/2026-03-01-lorrytech-os-phase5-6-driver-portal-dashboard.md`
- **Stats**: 53 React pages, 47 PHP app files

### 2026-03-01 (Session 3 — Phase 3 finish + Phase 4)
- **Phase 3 COMPLETE**:
  - Invoice React pages: Index, Create, Edit, Show (4/4 done)
  - Bug fix: Payment method values mismatched (Malay labels vs DB enum)
  - Sidebar nav: Perjalanan, Sebut Harga, Invois linked to real routes
  - `npm run build` passed (3.23s)
- **Phase 4 COMPLETE**:
  - R2 disk config in `filesystems.php` (auto-fallback to public disk in dev)
  - ExpenseService: CRUD + R2 upload/delete + Audit Score calculation
  - ExpenseController: Full CRUD + receipt upload (5MB) + verify toggle
  - 4 React pages: Index (audit widget + filters), Create, Edit, Show (receipt preview + verify)
  - 10 expense categories with Malay labels + color-coded badges
  - Sidebar: Perbelanjaan linked to `expenses.index`
  - `npm run build` passed (3.18s)

### 2026-02-28 (Session 2 — Build)
- **Phase 1 COMPLETE**: Laravel 12.53.0 + Breeze v2.3.8 + dompdf v3.1.1, 21 migrations, 17 models, seeder, RoleMiddleware
- **Phase 2 COMPLETE**: Dark sidebar layout, Vehicle CRUD (4 pages), Driver CRUD (4 pages), 38 routes
- **Phase 3 IN PROGRESS**:
  - Services: TripService, InvoiceService, QuotationService, PdfService (all 4 done)
  - Controllers: TripController, QuotationController, InvoiceController (all 3 done)
  - React pages: Trips (4/4), Quotations (4/4), Invoices (0/4 — rate limited)
  - PDF Blade: invoice.blade.php, quotation.blade.php (both done)
- Deploy decision: Hetzner+Coolify (not Railway), self-hosted PostgreSQL
- Login: admin@lorrytech.my / password (127.0.0.1:8000)

### 2026-02-28 (Session 1 — Planning)
- Project initialized in LRU system
- Full implementation plan designed (7 phases)
- 18 database migrations planned
- Reusable patterns identified from PokSystem

## Known Issues
- localhost:8000 doesn't work — must use 127.0.0.1:8000
- Laragon PHP/Composer not in system PATH — must export before every command
- R2 env vars not set yet (using local public disk for now)
- ~~No git repo yet~~ DEPLOYED (2026-03-23, Hetzner+Coolify+PostgreSQL)
- ~~SQLite `strftime` in DriverPortalController~~ FIXED (2026-03-08, Carbon `whereBetween`)
- Driver test accounts: ali@lorrytech.my / abu@lorrytech.my (password: password)
- ~~Authorization policies~~ FIXED (2026-04-07, defense-in-depth middleware)
- ~~LIKE wildcard escaping~~ FIXED (2026-04-07, escapeLike() helper)
- Dashboard query caching (LOW — nice to have)
- Client demo — pending scheduling

## Resources & References
- PokSystem patterns: `SwiftApp Dev/PokSystemManagement/` (invoice, quotation, PDF, finance services)
- Cloudflare R2 for receipt storage (zero egress, 7-year LHDN compliance)
- Laragon path: `/c/laragon/bin/php/php-8.3.30-Win32-vs16-x64/` + `/c/laragon/bin/composer/`

## Memory Patterns
*AI records discoveries here during sessions:*
- Document numbering: LT{YY}{MM}/{SEQ} trips, LTI{YY}{MM}/{SEQ} invoices, LTQ{YY}{MM}/{SEQ} quotations
- PDF: A4 portrait, margins 20mm/18mm, nested tables only (no flexbox in dompdf)
- Company config: `config/company.php` pattern from PokSystem
- Deploy: Hetzner VPS + Coolify → lorrytech.swiftapps.my, self-hosted PostgreSQL
- Dev: Laragon PHP 8.3.30, Composer 2.9.4, SQLite local DB
- `localhost:8000` blocked on Windows — use `127.0.0.1:8000`
- Expense categories: fuel, toll, maintenance, repair, tyre, insurance, roadtax, permit, parking, other
- Receipt upload: R2 in prod, public disk in dev (auto-detect via R2_ACCESS_KEY_ID)
- Inertia file upload: must use `post()` with `forceFormData: true`, use `_method: PUT` for updates

---
*Coding Project Template v1.1 — Tokwi Adapted*
