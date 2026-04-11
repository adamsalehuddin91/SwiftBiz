# Current Session Memory - RAM

*Temporary working memory - resets each session*

## Session Status

**Current Session**: SwiftMoney — Dwi Bahasa + PCF Power Apps exploration
**Session Date**: 2026-04-10
**Last Saved**: 2026-04-10 (SAVED)
**Previous Session**: SwiftMoney — Mockup Generator (Multi-screen Puppeteer + Sharp) (2026-04-10)

---

## Active Project
- Name: Qalbu
- Started: 2026-04-11
- Last worked: 2026-04-11
- Context: PWA rohani — Laravel API + React frontend + n8n pipeline (3 sessions complete)

---

## Today's Achievements (2026-04-10)

### SwiftMoney — Dwi Bahasa + UI Fixes (Session 8)

**Dual Language BM/EN** (`730125d`)
- Migration: `language` column on users (default 'ms')
- `LanguageController` + `POST /language` route
- `HandleInertiaRequests` shares `language` globally via Inertia
- `resources/js/lang.js` — full BM + EN translation file
- `resources/js/hooks/useLang.js` — `t()`, `lang`, `setLanguage` hook
- Login, Register, Invite/Accept, Invite/Invalid — fully translated
- Dashboard FamilySection + ProfileView — translated
- Language toggle (BM/EN pill) in Profile → Settings
- Preference persisted in DB — survives logout/device change

**UI Fixes**
- Family full message — show "Ahli keluarga penuh (2/2)" instead of hiding invite section
- Replace Laravel SVG logo with SwiftMoney `pwa-192x192.png` on login/register page

**Power Apps / PCF Exploration**
- Adam familiar with Power Apps Canvas
- Next step: PCF Component development (TypeScript + React)
- Can connect Power Apps env via: `pac auth create --url https://[org].crm.dynamics.com`
- Adam wants to use Tokwi Memory Core for Power Apps development

### SwiftMoney — Mockup Generator (Session 7)

**Multi-screen mockup generator** (`mockup-generator/generate-mockup.js`)
- Puppeteer (screenshot) + Sharp (composite SVG frame)
- Auto-login: fills credentials, waits for Inertia XHR URL change (not page load)
- SVG mask fix: `<mask>` cuts transparent hole — was covering screenshot with black
- 8 phone screens: home, komitmen scrolled, add-komitmen modal, analytics, simpan, profile, add-income modal, hutang
- 2 laptop screens: analytics + dashboard
- Session cookie shared — second page (laptop) skips re-login
- Env override: `MOCKUP_URL`, `MOCKUP_EMAIL`, `MOCKUP_PASS`
- Run: `MOCKUP_EMAIL=x MOCKUP_PASS=y node generate-mockup.js`
- Output: `mockup-generator/output/phone-0x-*.png` + `laptop-0x-*.png`
- **Pending**: commit mockup-generator, run laptop mockups

---

### SwiftMoney v1.2 → v1.3 — SaaS Foundation

**Google OAuth (v1.2)**
- `laravel/socialite` installed
- `SocialAuthController` — login existing user or create new + auto-create Family
- Migration: `google_id`, `avatar` on users; `password` nullable
- Routes: `/auth/google`, `/auth/google/callback`
- Login + Register pages — "Teruskan dengan Google" button

**Invite Spouse Flow (v1.2)**
- `family_invites` table — token, expires_at (7 days), used_at
- `InviteController` — generate + show invite page
- `Invite/Accept.jsx` + `Invite/Invalid.jsx` pages
- Session-stored invite token → join family on Google callback
- Dashboard: FamilySection — show members, Jana Link Jemputan, Copy button

**Feature Gating (v1.3)**
- `families` table: plan (free/paid), plan_expires_at, subscribed_at
- `Family::isPaid()` helper
- Gated: debt tracker, savings goals, analytics, receipt upload, month history, max 5 bill templates
- `HandleInertiaRequests` shares `plan.is_paid` globally
- Dashboard: UpgradeModal, `requirePaid()` helper, lock icons, analytics upgrade page

**Admin Panel (v1.3)**
- `/admin` — superadmin middleware (adamsalehuddin91@gmail.com only)
- Stats: total families, paid, free, total users
- Search by email/name
- Upgrade (1/2/3/6/12 months) + Downgrade buttons
- `Admin/Dashboard.jsx`

**Polish**
- Google avatar — profile, nav, family members (fallback initials)
- 👑 Pro badge on profile for paid users
- SQLite backup on deploy (last 7 copies)
- Bug fixes: User $fillable missing google_id/avatar, Carbon addMonths string type error

**Commits this session**:
- `f4cbb0a` — SwiftMoney v1.2 — Google Login + Invite Spouse Flow
- `3daffaf` — SwiftMoney v1.3 — Feature Gating + Admin Panel
- `a2756e0` — Add Google avatar display
- `40f88ab` — Fix admin upgrade Carbon type error
- `c2fefff` — Fix avatar not saving (User fillable)
- `c13e394` — Add Pro badge on profile

---

## PENDING / REMIND ADAM (Updated 2026-04-11 Session 9)
- **Commit pending** — mockup-generator files + Memory Core v5.5 changes (ARCHITECTURE.md) not yet committed
- ~~**Google OAuth credentials**~~ — ✅ DONE (2026-04-11) — Coolify env vars set
- **SwiftMoney: iOS install guide** — modal untuk iOS users Add to Home Screen
- **SwiftMoney: Authorization policies** — admin vs member
- **SwiftMoney: Billplz payment** — bila dah ada users
- **Power Apps PCF** — Adam nak start PCF development, need: Node.js + `pac` CLI + Power Apps env URL
- **Threads Auto-Post** — setup Cloudinary account + Threads Developer account dulu, then Tokwi buat runbook + script
- **Qalbu** ✅ 3 sessions complete — deploy ke Coolify (backend + frontend separate)
- **HMS: Duplicate services** — clean DB rows
- **HMS: Google Business review** — get short link for receipt sharing
- **SwiftSalon: Phase 1** — multi-tenancy, salon_id + RLS + signup flow
- **LorryTech: Client demo** — pending client scheduling
- **Future runbooks** — ui-review.md, figma-handoff.md, dependency-audit.md

---

## Project Status Summary

| Project | Status | URL |
|---------|--------|-----|
| SwiftMoney | 🟢 LIVE (SaaS-ready v1.3, real users active) | money.swiftapps.my |
| Landing Page | 🟢 LIVE | swiftapps.my |
| LorryTech OS | 🟢 LIVE (Demo-ready) | lorrytech.swiftapps.my |
| HMS Salon | 🟢 LIVE | Vercel |
| PokSystem | 🟡 LIVE (Railway pending) | Railway |

---

## Quick Resume

```bash
# SwiftMoney
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/swift-money"
export PATH="/c/laragon/bin/php/php-8.3.30-Win32-vs16-x64:/c/laragon/bin/composer:$PATH"
php artisan serve && npm run dev
# Live: https://money.swiftapps.my
# Admin: https://money.swiftapps.my/admin
# Latest: c13e394 — Pro badge
```

*Type "Tokwi" to resume with full context*

---

## Session Memory Limit
- **Maximum**: 500 lines
- **Reset Behavior**: RAM-style reset preserving only Session Recap
- **Format Reference**: See `main/session-format.md` for rebuild structure
