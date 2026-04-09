# SwiftMoney
*Coding Project - Created 2026-03-13*

## Description
Aplikasi pengurusan aliran tunai domestik (family finance tracker) untuk pasangan (Abg & Ayg). Ganti rekod manual WhatsApp — bajet, komitmen bulanan, pengurangan hutang secara real-time. SaaS-ready architecture with multi-tenancy via family_id.

## Project Details
- **Status**: 🟢 LIVE (Sprint 1-4 + Feature Expansion Done)
- **Created**: 2026-03-13
- **Last Accessed**: 2026-04-08
- **Position**: #1

## Stack
- **Framework**: Laravel 12 + Inertia.js + React 18 (JSX) + Tailwind 3
- **Database**: SQLite (dev) / MySQL or PostgreSQL (prod)
- **Auth**: Laravel Breeze
- **Real-time**: Laravel Reverb (WebSockets) — code ready, not activated
- **PWA**: Vite PWA plugin — configured, manifest + SW registered
- **Deploy**: Coolify + Hetzner VPS + Cloudflare (Docker: PHP-FPM + Nginx + Supervisor)
- **Repo**: https://github.com/adamsalehuddin91/swift-money.git
- **URL**: https://money.swiftapps.my
- **Branch**: `main`

## Resume
```bash
cd "SwiftApp Dev/swift-money"
export PATH="/c/laragon/bin/php/php-8.3.30-Win32-vs16-x64:/c/laragon/bin/composer:$PATH"
php artisan serve && npm run dev
# Login: abg@swiftmoney.my / password (admin)
# Login: ayg@swiftmoney.my / password (member)
```

## Roadmap
- [x] **Sprint 1**: Backend Core — Migrations, Auth (Breeze), Service Classes (Income/Bill/Debt)
- [x] **Sprint 2**: UI/PWA — Dashboard, Privacy Toggle, Modals (Income/Bills)
- [x] **Sprint 3**: Debt Module — Add/Pay/History, Bill-Debt linking, Auto offset + reverse
- [x] **Sprint 4**: Real-time — Laravel Reverb (ready), Receipt Upload, PWA, 25th Auto-Clone, Production Deploy

## Active Tasks
- [x] git init + first commit + push to GitHub
- [x] Sprint 4: Laravel Reverb WebSocket setup (code ready, not activated)
- [x] Sprint 4: Receipt upload (bill_records.receipt_path)
- [x] Sprint 4: Vite PWA plugin config + manifest + SW registration
- [x] 25th Auto-Clone scheduled command (GenerateMonthlyBills)
- [x] Production deploy on Coolify + Hetzner + Cloudflare
- [x] Docker setup (PHP-FPM + Nginx + Supervisor + entrypoint.sh)
- [x] Persistent volume for SQLite + receipts
- [x] Trust proxies fix (Cloudflare/Coolify)
- [x] Baki bersih formula fix (income - paid_bills)
- [x] Edit bill templates (name, amount, category, archive)
- [x] Edit debts (name, amount, type) + settle + delete
- [x] 14 bill categories
- [x] Savings Goal Tracker (CRUD + contribute + history)
- [x] Spending Analytics (Recharts — 6-month trend + category breakdown)
- [x] Recurring income carry (29th monthly command)
- [x] Bill auto-generation moved to 29th (was 25th)
- [x] Month navigation (view previous months)
- [x] Profile: Edit nama/email/password
- [x] Profile: Financial Health Score (0-100 circular gauge)
- [ ] Authorization policies (admin vs member)
- [ ] Activate Laravel Reverb in production
- [x] Personal/Family view toggle (Saya/Keluarga)
- [x] Tappable Abg/Ayg badge to switch bill ownership
- [x] Income edit (tap to edit source/amount, delete)
- [x] Net balance bug fix

## Business Rules
1. **25th Auto-Clone**: Scheduled job clones bill_templates → bill_records for next month (NOT YET IMPLEMENTED)
2. **Debt Offset**: When bill_record linked to debt is paid → auto debt_payment + decrement balance (DB Transaction) — DONE
3. **Debt Reverse**: When bill_record is unmarked paid → reverse debt_payment + increment balance — DONE
4. **Privacy Mode**: Mask incomes, net_balance, debt totals via Eye toggle — DONE
5. **Multi-tenancy**: All queries scoped by family_id — DONE
6. **Auto-generate**: Monthly bill records auto-created from templates on dashboard load — DONE
7. **Personal View**: Each user sees their own income + bills (assigned_to matches user.name) — DONE
8. **Family View**: Combined view of all family income + bills — DONE
9. **Net Balance**: income - paid_bills — shows cash remaining in hand — DONE

## Schema Reference
- families: id, name
- users: id, family_id, name, email, password, role (admin/member)
- incomes: id, family_id, user_id, source, amount, month_year, is_recurring
- bill_templates: id, family_id, category, title, default_amount, assigned_to, debt_id (nullable), is_active
- bill_records: id, bill_template_id, month_year, actual_amount, is_paid, paid_at, receipt_path
- debts: id, family_id, title, total_amount, current_balance, type (fixed/flexible)
- savings_goals: id, family_id, title, target_amount, current_amount, deadline, emoji
- savings_contributions: id, savings_goal_id, amount, note, contributed_at
- debt_payments: id, debt_id, bill_record_id (nullable), amount_paid, payment_date

## Progress Log

### 2026-04-08 (Session 5 — Full Review + Feature Expansion)
- **Full code review**: MEDIUM + LOW performance issues fixed
  - Service methods refactored to accept pre-fetched Collection (eliminated 4× redundant DB queries)
  - Receipt storage hardened: moved to private `local` disk + auth-protected serve route (`/bills/{record}/receipt`)
  - `generateMonthlyRecords` + `carryRecurring` wrapped with Laravel Cache (idempotent, no double-gen)
  - `DebtService::getForFamily` — added `->select()` to avoid full row fetch
- **Edit support added**: Bill templates + Debts now fully editable (name, amount, type/category)
  - `updateTemplate` syncs unpaid BillRecord.actual_amount when default_amount changes
  - `updateDebt` recalculates `current_balance = new_total - paid_amount`
  - Archive template: sets `is_active = false`
- **Category expansion**: 14 bill categories (added Kereta, Utiliti, Telefon, Internet, Makanan, Kesihatan, Pelaburan, Hiburan, Minyak)
- **Tier 1 features shipped**:
  - Savings Goal Tracker: CRUD + contributions + history (SavingsGoal + SavingsContribution models, SavingsService, SavingsController)
  - Spending Analytics: 6-month trend LineChart (income/bills/saved), monthly surplus BarChart, category breakdown — Recharts
  - Debt: settle + delete actions
  - Income: is_recurring toggle, CarryRecurringIncome command (29th monthly at 08:05)
  - Bill auto-generation moved to 29th (was 25th)
- **Month navigation**: ChevronLeft/Right in header, navigate previous months' history
- **Profile features**:
  - Edit nama/email/password via EditProfileModal (2-tab: Maklumat / Kata Laluan)
  - Financial Health Score: 0–100 circular gauge, formula = billsScore×50% + savingsScore×25% + debtScore×25%
  - 5 grades: Cemerlang(≥90), Bagus(≥75), OK(≥60), Perlu Perhatian(≥40), Kritikal(<40)
  - ProfileController redirect fixed → dashboard (not separate profile page)
- **Schema additions**: savings_goals table, savings_contributions table (2 migrations)
- **Docker**: entrypoint.sh runs `php artisan migrate --force` on every deploy
- **Commits**: `23391fc` → `4da306f` → `2dd0dc2` (pushed to main)
- **Next**: Authorization policies (admin vs member), activate Laravel Reverb in production

**Key commits**:
- `23391fc` — SwiftMoney v1.1 — Security hardening, full edit support, Savings + Analytics
- `4da306f` — Schedule bill generation + recurring income carry on 29th monthly
- `2dd0dc2` — Profile features: Edit nama/password + Financial Health Score
### 2026-03-14 (Session 3 — Sprint 4 + Production Deploy)
- **Sprint 4 COMPLETE**: Receipt upload, PWA config, 25th auto-clone command, Laravel Reverb (code ready)
- **Production LIVE**: https://money.swiftapps.my on Coolify + Hetzner + Cloudflare
- **Docker**: PHP 8.3 FPM Alpine + Nginx + Supervisor + entrypoint.sh (auto-fix volume permissions)
- **Critical fixes**: debt_id authorization bypass, month_year regex validation, reversePayment logging
- **Deploy fixes**: trust proxies for Cloudflare (`b8a1679`→`706efb1`), SQLite volume permissions (`36e6c14`), root redirect to login (`b8a1679`)
- **Baki bersih**: Changed from income-total_bills → income-paid_bills (cash in hand) (`a583be1`)
- **PWA**: Manifest link + explicit SW registration added (`0b60a7c`)
- **Git**: Repo pushed to GitHub (adamsalehuddin91/swift-money)
- **Deployment guideline**: Created universal SOP at `insights/deployment-guideline-coolify-hetzner.md`
- Commits: `6682d91` → `0b60a7c` (8 commits this session)

### 2026-03-13 (Session 2)
- **Personal/Family View**: Saya/Keluarga toggle — each user sees own bills/income, family view shows all
- **Tappable Badge**: Abg/Ayg badge on bills can be tapped to switch ownership (PUT route added)
- **Income Edit**: Tap income card → edit modal with source/amount pre-filled, kemaskini + padam buttons
- **Net Balance Fix**: Changed from income-unpaid to income-total_bills (correct baki calculation)
- **New route**: PUT /bills/templates/{template}/assign
- **Backend**: BillService.getCategorizedBills/getBillSummary accept optional assignedTo filter, IncomeService.getForUser/getTotalForUser added
- Build: npm run build passed (5.07s)

### 2026-03-13 (Session 1)
- Project initialized in LRU system
- **Sprint 1 COMPLETE**: Laravel 12 + Breeze scaffolded, 7 migrations, 6 models, 3 services, 4 controllers, 11 routes, seeder with real data
- **Sprint 2 COMPLETE**: Full Dashboard UI matching mockup — indigo theme, floating nav, privacy toggle, income/bill modals, profile view, category-grouped bills with tap-to-toggle
- **Sprint 3 COMPLETE**: Debt module — add debt modal, manual payment modal, payment history timeline, bill-to-debt linking with auto offset/reverse, orange debt badges on linked bills
- Build: npm run build passed (5.43s)
- All 3 sprints completed in single session

## Known Issues
- No authorization policies (any family member can do anything)
- Laravel Reverb not activated in production (code ready)
- PWA install prompt may need manual "Add to Home Screen" on iOS

## Resources & References
- ProjectBrief/SwiftMoney.md — Full proposal
- ProjectBrief/SwiftMoneymockup.txt — React mockup (dashboard + profile + modals)

## Memory Patterns
- Service pattern: IncomeService, BillService, DebtService — all with family_id scoping
- Debt offset uses DB::transaction in BillController@togglePaid (auto-detect debt from template relationship)
- reversePayment pattern: find DebtPayment by bill_record_id, increment balance, delete payment
- Modal pattern: reusable Modal wrapper component, each form uses useForm from @inertiajs/react
- Bill records auto-generated on dashboard load via BillService::generateMonthlyRecords
- Personal filtering: assigned_to field on bill_templates matches user.name ("Abg"/"Ayg")
- DashboardController passes dual data: my_* (personal) + family (all) — frontend toggles via viewMode state
- IncomeModal dual-mode: editIncome prop switches between add/edit, useEffect syncs form data on prop change

---
*Coding Project Template v1.1 — Tokwi Adapted*
