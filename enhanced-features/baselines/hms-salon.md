# Project Baseline — HMS Salon

**Version**: v1.0 | **Created**: 2026-04-09
**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Supabase
**Deploy**: Vercel (auto-deploy on push to main)

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

- Supabase service key exposed in client-side code → full DB access leak
- RLS disabled on `users`, `appointments`, `sales`, `commissions` tables → cross-tenant data leak
- `.single()` on queries that can return 0 rows → runtime crash in prod
- Auth role read from `user_metadata` alone (must verify from `public.users`) → privilege escalation
- `any` type in POS, receipt, or commission calculation code → financial logic bugs

---

## Accepted Exceptions

| Pattern | File | Reason |
|---------|------|--------|
| `dangerouslySetInnerHTML` | receipt components | jsPDF thermal format requires it, sanitized |
| `@ts-ignore` | proxy.ts | Next.js 16 migration, documented |

---

## Stack-Specific Checks

### Supabase
- All queries on user-scoped tables: must have RLS or explicit `.eq('user_id', userId)` filter
- `.single()` → only where row guaranteed to exist (e.g. by PK lookup after insert)
- `.maybeSingle()` → all other single-row lookups
- Batch queries: use `.in('col', array)` not sequential awaits
- Independent queries: use `Promise.all()` not sequential awaits

### Next.js / Auth
- Session check: always call `checkSession()` → reads from `public.users` (not metadata)
- `proxy.ts` is the auth convention (not `middleware.ts` — deprecated)
- All API routes: validate session server-side before data access
- Role check: server-side only — never trust client-passed role

### Receipt / PDF
- jsPDF: 58mm thermal format only
- WhatsApp share: `whatsapp://send?phone=...` deep link + `wa.me` fallback after 1.5s
- Web Share API: attach PDF blob, not URL

### UI / Language
- All UI labels: Malay (ms-MY) — "Resit Terkini", "Tempahan", "Pelanggan"
- Code: English only

---

## Performance Benchmarks

| Metric | Threshold |
|--------|-----------|
| Supabase queries per page | max 4 (use Promise.all) |
| Batch operations | use `.in()` not loop |
| Receipt generation | < 2s |

---

## Review History

| Date | Score | HIGH | MED | LOW | Status | Notes |
|------|-------|------|-----|-----|--------|-------|
| 2026-02-26 | 7.8/10 | 0 | 3 | 4 | PASS | Auth fix + WhatsApp desktop fix session |
