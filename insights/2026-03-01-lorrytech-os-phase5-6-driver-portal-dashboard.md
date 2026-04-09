# Insight: LorryTech OS — Phase 5 & 6 Sprint (Driver Portal + Dashboard Analytics)
**Date**: 2026-03-01
**Project**: LorryTech OS
**Type**: Feature — Two-phase sprint delivering driver-facing portal and owner analytics dashboard

## Problem
LorryTech OS had Phase 1-4 complete (Foundation, Fleet, Revenue Hub, Receipt Vault) but was still owner-only. Drivers had no way to view their trips, track commissions, or upload receipts from mobile. The owner dashboard was the default Breeze "You're logged in!" stub — no analytics, no P&L visibility, no alerts.

## Root Cause
The system was built owner-first (correct priority), but the driver UX and business intelligence layers were entirely missing. Without driver self-service, owners would have to manually share trip/commission data. Without a dashboard, the owner couldn't see financial health at a glance.

## Solution

### Phase 5: Driver Portal (6 endpoints, 5 React pages)
- **DriverPortalController** with `getDriver()` helper — finds Driver record by `user_id`
- **Auto-redirect**: `/dashboard` route redirects driver-role users to `/driver/dashboard`
- **Role-based sidebar**: `AuthenticatedLayout.jsx` renders different nav arrays based on `user.role` (owner: 7 items, driver: 5 items)
- **Pages built**: Dashboard (stats + quick actions + recent trips), MyTrips (month filter), MyCommissions (monthly summary cards + status filter), UploadReceipt (camera-first UI with `capture="environment"`), MyReceipts (receipt list with verified status)
- **Security**: All driver routes under `auth + role:driver` middleware with `/driver` prefix

### Phase 6: Dashboard & Analytics (DashboardService + DashboardController + Dashboard.jsx)
- **DashboardService** with 8 aggregation methods — all queries separated into clean service pattern
- **KPI cards**: Revenue, expenses, net profit (color-coded positive/negative), unpaid invoices
- **Mini count cards**: Total trips, vehicles, drivers, customers
- **P&L bar chart**: Last 6 months revenue vs expenses (pure CSS bars, no chart library)
- **Expense breakdown**: Category-wise horizontal progress bars with percentages
- **Vehicle alerts**: Documents expiring within 30 days (roadtax, insurance, APAD permit) — sorted by urgency, red for expired
- **Invoice summary**: Paid/partial/unpaid/overdue counts
- **Commission summary**: Pending, approved, paid-this-month
- **Top 5 customers**: Ranked by total revenue with trip count
- **Kewangan placeholder removed**: Dashboard IS the financial overview now

## Key Decisions
| Decision | Why | Alternative |
|----------|-----|-------------|
| Pure CSS bar chart (no Chart.js/Recharts) | Zero dependency, fast load, sufficient for 6-bar trend | Could add Chart.js later for interactivity |
| Role-based nav via separate arrays | Clean separation, no conditional rendering clutter | Single array with `role` filter — harder to maintain |
| DashboardService as separate class | Testable, reusable, keeps controller thin | Inline queries in controller — messy |
| `capture="environment"` on receipt upload | Opens rear camera directly on mobile — driver UX | Standard file picker — extra step for driver |
| Removed Kewangan sidebar item | Dashboard already shows all financial KPIs — separate page was redundant | Keep as dedicated finance page — too early |
| `strftime` for SQLite date filtering | Dev environment uses SQLite, prod will use PostgreSQL | Need to swap to `DATE_FORMAT` or `TO_CHAR` on prod migration |

## Architecture Patterns Established
1. **Service-Controller-Page pattern**: Service (queries) → Controller (passes to Inertia) → React Page (renders)
2. **Role-based layout**: Single `AuthenticatedLayout.jsx` serves both roles — nav items swapped by `user.role`
3. **Dashboard redirect**: `/dashboard` route checks `isDriver()` and redirects — clean separation
4. **Consistent Malay-first UI**: All labels, badges, empty states in Bahasa Melayu

## Stats
- **Files created this session**: 8 (DashboardService, DashboardController, DriverPortalController, 5 React pages)
- **Files modified**: 3 (web.php, AuthenticatedLayout.jsx, Dashboard.jsx)
- **Total React pages in project**: 53
- **Total PHP app files**: 47
- **Build time**: ~3.3s consistently
- **Pre-commit check**: All clear (0 console.log, 0 secrets, 0 TODOs)

## Lessons Learned
- Column name mismatch between model and JSX is easy to miss — MyReceipts used `receipt_path` but actual column is `receipt_image_url`. Always grep the migration/model before referencing in frontend.
- Pure CSS charts are surprisingly effective for simple bar/trend visualizations — avoids 50KB+ chart library dependency for basic needs.
- Role-based sidebar is cleaner with separate nav arrays rather than conditionals — easier to add/remove items per role without nested ternaries.
- `capture="environment"` attribute on `<input type="file">` is critical for driver mobile UX — opens camera directly instead of file browser.
- Dashboard service method count can grow quickly — 8 methods for a fleet dashboard. Consider caching if queries get expensive at scale.

## Production Considerations
- SQLite `strftime` in DriverPortalController needs to be swapped for PostgreSQL-compatible `TO_CHAR` or `DATE_FORMAT` before prod deployment
- Dashboard queries are not cached — fine for single-tenant with small data, but add cache if response time degrades
- Vehicle alerts query runs on every dashboard load — consider a scheduled command + notification system for critical expiries
