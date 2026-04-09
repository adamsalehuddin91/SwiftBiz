# Project Baseline — PokSystem Management

**Version**: v1.0 | **Created**: 2026-04-09
**Stack**: Laravel + Inertia.js + React (JSX) + Tailwind
**Deploy**: Railway | poksystemmanagement-production.up.railway.app

---

## Quality Rules

| Rule | Threshold |
|------|-----------|
| Minimum score to deploy | 7.5/10 |
| Max MEDIUM before deploy | 3 |
| Max LOW before deploy | 6 |
| AUTO-FAIL tolerance | 0 (always) |

---

## Project-Specific Zero Tolerance

- Invoice/Quotation calculations outside `InvoiceService`/`QuotationService` → untestable financial logic
- PDF generation outside `PdfService` → inconsistent output
- Delivery order logic outside `DeliveryOrderService` → fragmented business logic
- `FinanceService::calculateProfitLoss()` called without date range validation → incorrect reports
- Missing `payment_status` check on invoice queries → wrong financial totals

---

## Accepted Exceptions

| Pattern | File | Reason |
|---------|------|--------|
| None currently | — | — |

---

## Stack-Specific Checks

### Laravel Services
- Financial logic: `FinanceService`, `InvoiceService`, `QuotationService` only
- PDF: always through `PdfService.php`
- Delivery orders: always through `DeliveryOrderService`
- `getMonthlySummary(Y-m)` for dashboard — not raw queries
- `getMonthlyTrend(12)` for charts — not raw queries
- `calculateProfitLoss(startDate, endDate)` for P&L — validate date range inputs

### Laravel General
- All controllers: `$this->authorize()` required on write operations
- All routes: `auth:sanctum` middleware
- Mass assignment: `$fillable` on all models
- Migrations: must have `down()` method
- Railway deploy: check `Procfile` / railway config for migrate command

### React / Inertia
- All forms: `useForm()` from Inertia
- Financial inputs: always formatted (not raw floats displayed)
- Report filters: date range validation before submit

### Reporting (Roadmap awareness)
- AR Aging: group by `due_date` + `payment_status` (0-30, 31-60, 61-90, 90+ days)
- P&L filter: UI pending — `FinanceService` already supports range
- PDF export: adapt `PdfService.php` for reports

---

## Performance Benchmarks

| Metric | Threshold |
|--------|-----------|
| DB queries per request | max 6 |
| Invoice list | paginate required |
| Finance reports | cache recommended for date-range queries |

---

## Review History

| Date | Score | HIGH | MED | LOW | Status | Notes |
|------|-------|------|-----|-----|--------|-------|
| 2026-02-26 | 7.5/10 | 0 | 3 | 4 | PASS | Reporting roadmap defined, services verified |
