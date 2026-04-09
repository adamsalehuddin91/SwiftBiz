# Project Baseline — SwiftMoney

**Version**: v1.0 | **Created**: 2026-04-09
**Stack**: Laravel 12 + Inertia.js + React + SQLite
**Deploy**: Coolify + Hetzner + Cloudflare + Docker | money.swiftapps.my

---

## Quality Rules

| Rule | Threshold |
|------|-----------|
| Minimum score to deploy | 8/10 |
| Max MEDIUM before deploy | 2 |
| Max LOW before deploy | 5 |
| AUTO-FAIL tolerance | 0 (always) |

---

## Project-Specific Zero Tolerance

- Raw SQL string concat on financial queries → user financial data at risk
- Missing `--force` on migrate in `entrypoint.sh` → Docker deploy will break
- Unauthenticated routes to `/api/finance/*` or `/api/savings/*` → direct data exposure
- Financial calculations outside Service layer (in Controller or View) → untestable logic

---

## Accepted Exceptions

| Pattern | File | Reason |
|---------|------|--------|
| `->get()` without paginate | DebtService.php | User debts dataset always small (<50 rows) |
| `select()` without range | DebtService.php | Intentional — small dataset, perf not a concern |

---

## Stack-Specific Checks

### Laravel
- All financial controllers: `$this->authorize()` required
- Services: no direct `DB::` calls — use Eloquent
- All migrations: must have `down()` method
- `entrypoint.sh`: must include `php artisan migrate --force`
- Scheduler: `CarryRecurringIncome` registered in `routes/console.php`

### React / Inertia
- All forms: `useForm()` from Inertia (no raw axios for form submit)
- No prop drilling beyond 2 levels
- Charts: Recharts only — no mixing libraries
- Month navigation: always pass `month` param to Inertia visits

### Docker
- `entrypoint.sh` must run migrate before serve
- `.env.production` must not have `APP_DEBUG=true`
- SQLite file: must be in `/var/www/html/database/` (persistent volume)

---

## Performance Benchmarks

| Metric | Threshold |
|--------|-----------|
| DB queries per request | max 5 |
| `generateMonthlyRecords()` | must use `cache()` |
| `carryRecurring()` | must use `cache()` |
| Dashboard load queries | max 3 (use `Promise.all` equivalent) |

---

## Review History

| Date | Score | HIGH | MED | LOW | Status | Notes |
|------|-------|------|-----|-----|--------|-------|
| 2026-04-08 | 8.6/10 | 0 | 2 | 3 | PASS | Full review + feature expansion session |
