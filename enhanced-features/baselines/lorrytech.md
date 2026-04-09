# Project Baseline — LorryTech OS

**Version**: v1.0 | **Created**: 2026-04-09
**Stack**: Laravel + Inertia.js + React (JSX) + Tailwind
**Deploy**: Coolify | lorrytech.swiftapps.my

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

- LIKE query without `escapeLike()` → SQL injection via search inputs
- Resource controller without `$this->middleware('role:owner')` → unauthorized access
- Commission field names wrong (`rate`/`amount` instead of `commission_rate`/`commission_amount`) → silent calculation errors
- Trip cost calculations outside TripService → untestable financial logic
- `find($id)` on trips/drivers without ownership check → IDOR vulnerability

---

## Accepted Exceptions

| Pattern | File | Reason |
|---------|------|--------|
| Commission section always rendered | Trips/Show.jsx | Shows message when rate = 0, intentional UX |

---

## Stack-Specific Checks

### Laravel
- All 6 resource controllers: must have `$this->middleware('role:owner')` in constructor
- All search inputs: must pass through `escapeLike()` in base Controller
- Commission model fields: always `commission_rate` + `commission_amount` (never `rate`/`amount`)
- Routes: `auth:sanctum` + `role` middleware on all protected routes
- Mass assignment: `$fillable` defined on all models

### React / Inertia
- Payment badge: 3 states only — Dibayar / Separa Bayar / Belum Bayar
- Commission section: always visible (show message if rate = 0)
- All forms: `useForm()` from Inertia

### UI / Language
- All UI labels: Malay — "Perjalanan", "Pemandu", "Komisyen"
- Status badges: consistent colors across all views

---

## Performance Benchmarks

| Metric | Threshold |
|--------|-----------|
| DB queries per request | max 5 |
| Dashboard query | cache recommended (LOW priority) |
| Trip list pagination | required for >20 records |

---

## Review History

| Date | Score | HIGH | MED | LOW | Status | Notes |
|------|-------|------|-----|-----|--------|-------|
| 2026-04-07 | 8.4/10 | 0 | 1 | 3 | PASS | Demo readiness review — escapeLike + middleware added |
