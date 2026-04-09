# Insight: Auth Role Corruption + Navigation Loading Freeze
**Date**: 2026-02-26
**Project**: HMS Salon
**Type**: Bug Fix (Multi-Root-Cause)
**Commits**: `2f720e9` → `afc8bd8` (10 commits, 15 files, +190 -171 lines)

---

## Overview

Two major bug hunts in one session:
1. **Auth bug** — Admin user was seeing Staff navigation after login (6 commits to find root cause)
2. **Navigation freeze** — App locked up after navigating away mid-request; required browser restart to recover (3 root causes, fixed in 1 commit)

Plus a bonus: **Google Fonts compile hang** causing Turbopack to never finish loading the dev server.

---

## BUG 1 — Admin Sees Staff Navigation

### Problem
Admin logs in → sees Staff navigation instead of Admin nav. No error. No warning. Silently wrong.

### Root Cause Chain (6 commits to trace)

The bug had **4 contributing layers**, each hiding the real cause:

```
Layer 1 (attempted fix) — BROKE prod
  d7041a2: Added async DB query inside onAuthStateChange
  → Created race condition: DB fetch races with Supabase session init
  → Admin role arrives AFTER nav renders → stays as "staff"

Layer 2 (partial fix) — still broken
  ba63176: Removed DB query from onAuthStateChange, used checkSession()
  → Race condition partially fixed but wrong role still appearing

Layer 3 (race condition)
  0472289: INITIAL_SESSION event in onAuthStateChange was re-running checkSession()
  → Supabase fires INITIAL_SESSION on page load → triggered duplicate checkSession()
  → Second call could overwrite the first with stale data
  Fix: Skip INITIAL_SESSION event (already handled by explicit checkSession() on mount)

Layer 4 (stale closure)
  38d2388: stableUserRef was capturing "staff" role from localStorage into a ref
  → Ref never updated after correct role arrived → always returned cached wrong value
  Fix: Remove ref, read live user from Zustand store directly

ROOT CAUSE (1d919af):
  login/page.tsx was calling supabase.auth.signInWithPassword()
  then immediately reading user_metadata.role for the nav role.
  user_metadata.role was EMPTY (never set during user creation)
  → Empty role → default fallback = "staff"
  → Admin logs in → sees Staff nav
  Fix: Call checkSession() AFTER signInWithPassword before router.push()
       checkSession() fetches from public.users table (has correct role)
```

### Key Decision
| Decision | Why | Alternative |
|----------|-----|-------------|
| Read role from `public.users` not `user_metadata` | `user_metadata` is optional and often empty | Set `user_metadata.role` during user creation — brittle |
| Call `checkSession()` before redirect in login page | Guarantees role is resolved before dashboard renders | Trust onAuthStateChange — race condition prone |
| Skip `INITIAL_SESSION` in `onAuthStateChange` | Already handled by explicit `checkSession()` on mount | Handle it — causes duplicate concurrent calls |

### Lessons Learned
- **`user_metadata` is unreliable** for app-level roles. Always use a `public.users` profile table.
- **Race conditions in auth are invisible** — no errors, just wrong state. Always trace the full event chain.
- **`onAuthStateChange` fires more events than expected** — `INITIAL_SESSION`, `TOKEN_REFRESHED`, `SIGNED_IN` all fire on normal page load. Handle or explicitly skip each one.
- **Stale refs capture corrupted state** — `useRef` in auth flows is dangerous. Use live Zustand selectors.

---

## BUG 2 — Navigation Loading Freeze (Browser Restart Required)

### Problem
1. Click any action that loads server data
2. Navigate away while request is in-flight
3. **Every page in the app shows loading spinner indefinitely**
4. Logout → login → dashboard shows full-page spinner forever
5. Only closing the browser and reopening fixes it

### Root Causes (3 layers)

**Root Cause A — Connection Pool Exhaustion**
```
No AbortController on any page's useEffect fetches.
When navigating away mid-request:
  → The in-flight Supabase fetch continues running in the background
  → Next page starts its own fetch (another connection used)
  → Navigate again → another orphaned connection
  → Browser HTTP connection pool to Supabase domain (6 max) fills up
  → All new Supabase requests queue but never get a connection
  → Every page stuck at loading spinner forever
  → Only "close browser" releases all connections and resets the pool
```

**Root Cause B — Dashboard Layout `isLoading` Death Gate**
```
dashboard/layout.tsx:
  if (!isHydrated || isLoading) return <spinner />

isLoading from Zustand auth store:
  - Initial value: true (not persisted to localStorage)
  - Set to false by: checkSession() completing

After logout → login → /dashboard:
  - isLoading resets to true (fresh Zustand initial state)
  - checkSession() must complete to set it false
  - If checkSession() hangs (network slow) → isLoading stays true → spinner forever
  - Even after "fixing" the connection issue, this gate could still trap users
```

**Root Cause C — Google Fonts compile hang (bonus)**
```
layout.tsx imported Geist + Geist_Mono from next/font/google
During first Turbopack compilation, Next.js downloads font files from Google
If Google servers are slow or blocked → download hangs → Compiling / ...
Browser shows loading forever (server never sends response)
The fonts weren't even being used — CSS already had --font-sans: 'Inter', system-ui
```

### Fixes Applied

| Fix | File | Change |
|-----|------|--------|
| AbortController | 8 pages + pos hook | Add `abortController` to each `useEffect`, `.abortSignal(signal)` on Supabase queries, `return () => abortController.abort()` cleanup |
| Remove `isLoading` gate | `dashboard/layout.tsx` | Spinner only during `!isHydrated` (1 frame). Middleware handles server-side auth. |
| `checkSession()` timeout | `auth-store.ts` | `Promise.race([sessionPromise, 8s timeout])`. On timeout: keep existing auth state, just unblock loading (don't log out user) |
| Remove Google Fonts | `layout.tsx` | Delete `next/font/google` imports. Use `system-ui` fallbacks via CSS variables. |

### Pages Fixed (AbortController)
- `dashboard/page.tsx`
- `reports/page.tsx` (2 useEffects)
- `pos/hooks/use-pos.ts`
- `appointments/page.tsx`
- `customers/page.tsx`
- `inventory/page.tsx`
- `staff/page.tsx`
- `settings/page.tsx`
- `promotions/page.tsx`

### AbortController Pattern (reusable)
```tsx
useEffect(() => {
  const abortController = new AbortController();
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('table')
        .select('*')
        .abortSignal(abortController.signal);  // ← key line

      if (!abortController.signal.aborted) setData(data);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') logError('Page', err);
    } finally {
      if (!abortController.signal.aborted) setLoading(false);
    }
  };
  fetchData();
  return () => abortController.abort();  // ← cleanup on unmount/re-render
}, [dependency]);
```

### Key Decision
| Decision | Why | Alternative |
|----------|-----|-------------|
| Remove `isLoading` from dashboard render gate | Middleware protects route server-side; `isLoading` can get stuck | Keep `isLoading` + add max timeout — adds complexity |
| `Promise.race` timeout (not AbortController) on `getSession()` | Supabase auth SDK doesn't expose abort for `getSession()` | AbortController only works on `.from()` query builder |
| Keep user logged in on timeout | User already authenticated via localStorage; don't punish slow network | Clear auth on timeout — bad UX, forces re-login on slow connections |

### Lessons Learned
- **Every `useEffect` with async Supabase call MUST have AbortController + cleanup.** This is non-negotiable in Next.js App Router where navigation is frequent.
- **Never gate a layout render on a network-dependent flag.** `isLoading` from a store that depends on Supabase is a ticking time bomb. Use middleware for auth, local hydration flag for render gate.
- **Google Fonts = compile-time network dependency.** In dev with Turbopack, `next/font/google` fetches from Google during first compile. Always verify fonts are actually needed before importing.
- **"Close browser fixes it"** is always a connection pool / in-memory state signal. Think: what survives a tab refresh but not a browser restart? Active network connections.

---

## BUG 3 — WhatsApp Desktop Not Opening

### Problem
WhatsApp share button was using Web Share API → downloaded PDF but didn't auto-open WhatsApp Desktop. Customer number was pre-filled but the app didn't launch.

### Root Cause
`navigator.share()` (Web Share API) opens native share sheet on mobile, but on desktop it either does nothing or shows OS share options — not WhatsApp directly.

### Fix
```ts
// Deep link opens WhatsApp Desktop immediately
window.location.href = `whatsapp://send?phone=${phone}&text=${message}`;

// Fallback after 1.5s if app not installed
setTimeout(() => {
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}, 1500);
```

Applied to: `SuccessModal` (`5f4fb2b`) + `RecentReceipts` (`cd85527`)

---

## Session Stats

| Metric | Value |
|--------|-------|
| Commits | 10 |
| Files changed | 15 |
| Lines added | +190 |
| Lines removed | -171 |
| Bugs fixed | 3 major |
| Root causes traced | 7 layers |
| Pages hardened | 8 |
| Build status | ✅ PASS |
| Deploy | ✅ Vercel (afc8bd8) |

---

## Reusable Patterns From This Session

1. **AbortController template** — copy-paste for any new page with `useEffect` + Supabase
2. **Auth role source** — always read from `public.users`, never `user_metadata`
3. **`onAuthStateChange` event filter** — skip `INITIAL_SESSION` and `TOKEN_REFRESHED`
4. **Promise.race timeout** — wrap any non-abortable async call that could hang
5. **WhatsApp deep link** — `whatsapp://send` + `wa.me` fallback pattern
6. **No Google Fonts in prod** — use system font stack or local fonts to avoid compile-time network dep
