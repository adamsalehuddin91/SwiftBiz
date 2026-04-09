# HMS Salon
*Coding Project - Created 2026-02-23*

## Description
Full-stack salon management system for Haida Muslimah Salon. Real production app with paying customers. Includes POS, appointments, customer management, staff management, inventory, reports, and a public booking portal.

## Project Details
- **Status**: 🟢 PRODUCTION LIVE
- **Created**: 2025-10 (approx)
- **Last Accessed**: 2026-04-02
- **Position**: #2

## Stack
- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (role-based: Admin / Staff / Auditor)
- **Deploy**: Vercel (auto-deploy on push to main)
- **Repo**: `adamsalehuddin91/HMS-Management-System`
- **URL**: (Vercel production URL)
- **Branch**: `main`

## Resume
```bash
cd "SwiftApp Dev/hms-salon"
npm run dev
```

## Active Tasks
- [x] PWA migration — DONE (native manifest.ts, icons 192+512, viewportFit cover)
- [x] Logo upload feature — DONE (Settings → Profil Bisnes, Supabase salon-assets bucket)
- [x] Responsive layout fixes — DONE (header mobile, p-4 md:p-8 across 6 pages)
- [x] Test PWA install prompt on phone ✅ DONE
- [x] Public booking page `/book` ✅ DONE
- [x] Clean duplicate service rows in Supabase ✅ DONE
- [x] Run SQL migration (negative points guard + sale_items columns) ✅ DONE
- [x] Fix auth bug — admin seeing staff nav (`1d919af`) ✅ DONE
- [x] WhatsApp Desktop deep link fix (`5f4fb2b`, `cd85527`) ✅ DONE
- [x] Fix navigation loading freeze + AbortController (`afc8bd8`) ✅ DONE
- [x] Booking UX — search bar, skeleton loading, WhatsApp fix (`e69184f`) ✅ DONE
- [x] POS UI/UX improvements — 5 areas (`e69184f`) ✅ DONE
- [x] Auth race condition fix — Appointments + Customers pages (`e69184f`) ✅ DONE
- [x] Rebrand to Haida Muslimah Salon (HMS) (`4722d0e`) ✅ DONE
- [x] Filter assistants from booking page (`c55e534`) ✅ DONE
- [x] POS per-item discount — staff can apply RM discount per service (`5a313fb`) ✅ DONE
- [x] Auditor role — read-only transaction history + settings Paparan (`5a313fb`) ✅ DONE
- [x] Receipt discount detail — PDF + WhatsApp show per-item discount (`c17a669`) ✅ DONE
- [x] Commission report — actual rates by role, expandable detail with Solo/Share (`ac5b220`) ✅ DONE
- [x] Sync all receipt generators with discount support (`c055ee1`) ✅ DONE
- [x] Logo display in sidebar + thermal receipt PDF (`f5752d5`) ✅ DONE
- [x] Fix logo missing on Reports receipt (`2b05ffa`) ✅ DONE
- [x] Feb 2026 SQL migration — 208 resit, RM33,282 ✅ DONE (run in production)
- [x] Mac 2026 SQL migration — 255 resit, RM44,880 ✅ DONE (run in production)
- [x] Stock update SQL (inventory as of 2 Apr 2026) ✅ DONE
- [ ] Get Google Business review short link
- [ ] Fix duplicate services in Supabase DB (e.g. "Bleaching (Medium)" appears twice)
- [ ] Accessibility: aria-labels, keyboard nav (score 1/10)
- ~~Fonnte WhatsApp~~ — SKIPPED by Adam

## Progress Log
### 2026-04-02
- **`2b05ffa`** Fix logo missing in Reports receipt:
  - `RecentTransactionsList.tsx` — `logoUrl` was not passed to `ReceiptData` in `fetchReceiptData()`. 1-line fix: added `logoUrl: bizInfo?.logo_url`
  - Root cause: POS receipt (SuccessModal/RecentReceipts) was fixed on Mar 31 but Reports page was missed
- Data migration: Feb 2026 (208 resit, RM 33,282) + Mac 2026 (255 resit, RM 44,880) SQL run in Supabase production
- Stock update SQL run: 6 products synced to client inventory as of 2 Apr 2026
- Migration scripts saved: `generate-sales-sql.py` (reusable for future months), `sales-14-feb-2026.sql`, `sales-15-mar-2026.sql`, `update-stock-2apr2026.sql`
- Client fully onboarded — system ready for daily production use
- Next: Google Business review short link, duplicate services cleanup

### 2026-03-31
- **`f5752d5`** Logo fully wired end-to-end:
  - Upload to Supabase Storage with cache-bust URL (?t=timestamp) — fixes CDN stale cache
  - New `business-settings-store` (Zustand) — shared business info across sidebar + POS
  - Sidebar now shows uploaded logo image (fallback: Leaf icon), updates instantly after save
  - Thermal receipt PDF (`receipt-generator.ts`) — logo rendered at top of 58mm PDF
  - `use-pos` / `SuccessModal` / `RecentReceipts` — all pass `logoUrl` through to receipt
  - Server PDF (`pdf-generator.ts`) — fetches logo as base64, embeds in A4 PDF
  - Fixed bug: `supabase` client used before init in `generate/route.ts`

### 2026-03-29
- Project resumed (was position #2)

### 2026-03-25
- Project resumed (was position #3)
- Auditor SQL completed — ALTER constraint + auditor user created in Supabase ✅
- Receipt logo — generated receipts (PDF/WhatsApp share) now display salon logo ✅

### 2026-03-22
- **`5a313fb`** POS per-item discount: staff can toggle discount per cart item (RM amount, clamped to max), commission calculated on discounted price, points earned on total after discounts
- **`5a313fb`** Auditor role: new `auditor` auth role (separate from staff/admin), read-only monthly transaction history with search by customer name/phone, payment method breakdown (Tunai/QR/Terminal/Bank Transfer), full transaction detail modal on click, Settings limited to Paparan tab only
- **`c17a669`** Receipt discount detail: PDF thermal receipt + WhatsApp text show per-item discount in red
- **`132f095`** Fix hardcoded 15% commission rate in staff performance report — now shows actual rate per role (Hairstylist 15%, Assistant 10%)
- **`ac5b220`** Expandable commission detail: accordion per staff showing each service with date, sale amount, rate %, Solo/Share type, and commission earned
- **`c055ee1`** Sync all receipt generators: RecentTransactionsList + RecentReceipts now fetch discount/unit_price/promo from DB, legacy pdf-generator (n8n webhook) updated with full discount/staff/promo/payment support
- **SQL needed**: Auditor role requires ALTER constraint + create user in Supabase (provided to Adam)

### 2026-03-15 (Session 2)
- **`95a40cf`** Compact POS cart panel — ~50% smaller cart items (icon 28→48px, qty buttons 24→32px, staff selectors inline on one row, commission single line), footer tighter (points inline, totals smaller), header compact (avatar 28px), all labels Malay

### 2026-03-15 (Session 1)
- **`e69184f`** Booking UX + POS UI/UX + Auth race condition fixes:
  - Booking: search bar, `.single()` → `.maybeSingle()`, skeleton loading, WhatsApp emoji fix, scrollToTop
  - Appointments: reschedule/cancel WhatsApp notification with toast action, RLS auth guard
  - Customers: same RLS auth race condition fix
  - POS: duration badge on service cards, add-to-cart flash animation, popular services quick-tap row, spring-physics cart animations, walk-in customer button, bigger payment tap targets, Enter/Escape keyboard shortcuts, Malay labels, streamlined success modal, tablet-responsive at md breakpoint
- **`4722d0e`** Rebrand — "HMS Salon" → "Haida Muslimah Salon (HMS)" across 14 files (sidebar, login, manifest, page title, all fallback defaults)
- **`c55e534`** Filter assistant staff from booking page — customers only see hairstylists
- Commission system reviewed and confirmed correct:
  - Hairstylist solo: 15%, with assistant: 10%+5%, with hairstylist: 8%+8%
  - Assistant solo: 10%, product: 15%/10% by role
  - Commission always on original price (not promo)
  - Products have staff assignment + commission in POS

### 2026-02-26
- **`afc8bd8`** Fix navigation loading freeze — AbortController on 8 pages, remove `isLoading` render gate from dashboard layout, 8s timeout on `checkSession()` with silent fallback, remove Google Fonts (Geist) import causing Turbopack compile hang
- **`1d919af`** Fix auth root cause — login page was reading `user_metadata.role` (empty = "staff"), now calls `checkSession()` before redirect
- **`5f4fb2b`** WhatsApp Desktop deep link fix — `whatsapp://send` opens app directly, `wa.me` fallback after 1.5s
- **`cd85527`** Same WhatsApp fix applied to RecentReceipts (Resit Terkini)
- Backlog fully cleared: PWA tested ✅, `/book` built ✅, duplicate services cleaned ✅, SQL migration run ✅

### 2026-02-25
- **`8aeff16`** Logo upload feature: Settings → Profil Bisnes → upload to Supabase `salon-assets` bucket (public, 2MB, image/*)
- **`8aeff16`** PWA setup: native `manifest.ts` (Next.js 16), icons 192+512px dari `HMS_transparent.png`, `viewportFit: cover` for iPhone notch
- **`064cfa0`** Responsive layout: header search+name hidden mobile, 6 pages `p-4 md:p-8`, settings CardContent responsive padding
- Supabase bucket `salon-assets` created via SQL (INSERT + 4 policies)
- Fonnte WhatsApp — SKIPPED (Adam decision)

### 2026-02-23
- Project added to LRU system

### 2026-02-21
- Role-based access (`3a372bb`): Admin hides POS + "New Sale"; Staff Settings shows "Paparan" tab only
- Files: `sidebar.tsx`, `settings/page.tsx`

### 2026-02-11–12
- Receipt PDF bug fix, WhatsApp PDF sharing (Web Share API + fallback)
- ReceiptModal + thermal receipt preview

### 2026-02 (Earlier)
- POS system, receipt PDF+QR, booking API hardening (Zod + CSRF)
- 3 Supabase migrations, 17-page production app

## Known Issues
- Duplicate services in Supabase DB (deduplicated in code but should clean DB)
- Public `/book` page — built and working ✅

## Memory Patterns
- Supabase `.maybeSingle()` for optional lookups, `.single()` only when guaranteed row
- PDF receipt: jsPDF + QR code embedded
- Role check: read `user_metadata.role` from Supabase session
- CSRF: custom token in API routes
- RLS race condition fix: `authLoading` guard + `getSession()` check before queries
- Commission: rates in `pos-calculations.ts` — Hairstylist solo 15%, Assistant solo 10%, sharing 8%/5%/10%. Calculated on discounted price (after per-item discount)
- Per-item discount: `CartItem.discount` (RM), stored in `sale_items.discount` column
- Auditor role: `auditor` type in UserRole, route guard in dashboard layout, redirects to `/transactions`
