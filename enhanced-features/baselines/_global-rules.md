# Global Baseline Rules — All Projects

**Version**: v1.0 | **Created**: 2026-04-09
**Applies to**: SwiftMoney, HMS Salon, LorryTech OS, PokSystem

---

## AUTO-FAIL — Security

### S1 — Hardcoded Secrets
- Patterns: `password=`, `api_key=`, `secret=`, `token=`, `APP_KEY=` in source files
- Why: Leaked to git history, public repos, logs
- Exception: `.env` files only — never committed

### S2 — Injection Vectors
- Patterns: `eval()`, `Function()`, `innerHTML`, `dangerouslySetInnerHTML`
- Why: XSS / code injection entry points
- Exception: `dangerouslySetInnerHTML` ONLY if sanitized with DOMPurify (must verify)

### S3 — Unparameterized Queries
- Patterns: `DB::statement("...{$var}")`, `"SELECT * WHERE id = " . $id`
- Why: SQL injection
- Exception: none

### S4 — Unauthenticated Routes to Sensitive Data
- Patterns: Missing `auth:sanctum` / `auth` middleware on financial/user routes
- Why: Direct data exposure
- Exception: none

### S5 — HTTP in Production
- Patterns: `http://` in API calls, `fetch("http://...")`
- Why: Data in plaintext, MITM risk
- Exception: `localhost` only (dev env)

### S6 — Exposed Stack Traces
- Patterns: `APP_DEBUG=true` in `.env.production`, `dd()`, `dump()`
- Why: Leaks file paths, DB structure, logic
- Exception: none in production

---

## AUTO-FAIL — Code Quality

### Q1 — Debug Leftovers
- Patterns: `console.log`, `console.error`, `console.warn`, `dd()`, `dump()`, `var_dump()`, `ray()`, `print_r()`, `die()`
- Why: Leaks data, pollutes logs, unprofessional in prod
- Exception: none in production files

### Q2 — Untyped Code (TypeScript projects)
- Patterns: `: any`, `as any`, `@ts-ignore`, `@ts-expect-error`
- Why: Defeats TypeScript entirely, hides real bugs
- Exception: `@ts-ignore` ONLY with comment explaining why

### Q3 — Disabled Linting
- Patterns: `eslint-disable`, `eslint-disable-next-line`, `// @phpstan-ignore`, `// phpcs:ignore`
- Why: Silences the tools meant to catch bugs
- Exception: ONLY with inline comment explaining the specific reason

### Q4 — Unhandled Promises
- Patterns: `async function` with no `try/catch`, `.then()` with no `.catch()`, `await` without error boundary
- Why: Silent failures in production
- Exception: Top-level error boundary handles it (must verify)

### Q5 — Empty Catch Blocks
- Patterns: `catch(e) {}`, `catch(error) { /* TODO */ }`
- Why: Swallows errors silently, impossible to debug
- Exception: none

---

## AUTO-FAIL — Authorization

### A1 — Missing Auth Gate (Laravel)
- Patterns: Controller method without `$this->authorize()` or `Gate::allows()` / policy check
- Why: Any logged-in user can perform any action
- Exception: Public routes only (index pages, guest views)

### A2 — Missing Middleware (Laravel)
- Patterns: Route without `auth:sanctum` or `role` middleware, resource controller missing `middleware()` in constructor
- Why: Unauthenticated access to protected resources
- Exception: none on sensitive routes

### A3 — Client-Side Auth Only (React/Next.js)
- Patterns: Hiding UI based on role without server-side check, API route with no session validation
- Why: UI can be bypassed with DevTools
- Exception: none — server must always validate

### A4 — IDOR Risk
- Patterns: `find($id)` without `where('user_id', auth()->id())`, fetching resource without ownership check
- Why: User A can access User B's data by changing ID in URL
- Exception: Admin-only routes with explicit role check

---

## AUTO-FAIL — Performance

### P1 — N+1 Queries
- Patterns: `foreach` loop containing DB query, relationship accessed without eager loading (missing `with()`)
- Why: 100 records = 101 queries. Kills performance at scale
- Exception: none

### P2 — Missing Cache on Heavy Operations
- Patterns: Known-heavy report/generation functions called without `cache()`
- Why: Repeated expensive computation on every request
- Exception: none on known-heavy operations

### P3 — Unbounded Queries
- Patterns: `Model::all()` on large tables, `->get()` without `->limit()` or `->paginate()`
- Why: Returns entire table, OOM risk
- Exception: Tables guaranteed < 100 rows

---

## AUTO-FAIL — Stack Specific

### Laravel
- `withTrashed()` without ownership/role check → FAIL
- Raw file path in response (`storage_path`, `base_path` leaked) → FAIL
- Mass assignment without `$fillable` defined → FAIL
- Migration without `down()` method → FAIL

### Next.js / Supabase
- `.single()` where 0 results possible (should be `.maybeSingle()`) → FAIL
- Supabase key exposed in client-side code → FAIL
- RLS disabled on user-scoped tables → FAIL
- Server action without auth check → FAIL

### React
- `useEffect` with missing deps (causes infinite loops) → FAIL
- `key={index}` in dynamic lists (causes render bugs) → FAIL
- Direct DOM mutation outside `useRef` → FAIL

---

## Severity Scale

| Severity | Definition | Action |
|----------|-----------|--------|
| AUTO-FAIL | Zero tolerance — any occurrence = review fails | Must fix before commit |
| HIGH | Serious issue, not zero-tolerance | Fix before deploy |
| MEDIUM | Quality/perf issue | Fix within sprint |
| LOW | Cleanup item | Fix when passing through |

---

## Score Calculation

```
Start: 10/10
- Each AUTO-FAIL found:  -1.5
- Each HIGH:             -0.8
- Each MEDIUM:           -0.3
- Each LOW:              -0.1
Floor: 0/10
```

**Deploy threshold**: Score ≥ 7.0 AND zero AUTO-FAIL issues
