# Qalbu — Project File

**Status**: 🟡 Built (localhost) — pending deploy
**Stack**: Laravel 11 + React + Vite + Tailwind + n8n
**Started**: 2026-04-11
**Last Accessed**: 2026-04-11

---

## Project Summary

PWA rohani minimalist — digital sanctuary untuk bacaan rohani harian.
Decoupled architecture: Laravel headless API + React PWA + n8n automation pipeline.

**Live URL**: TBD (deploy ke Coolify pending)
**Repo**: `SwiftApp Dev/qalbu-api/` + `SwiftApp Dev/qalbu-app/`

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend API | Laravel 11 + SQLite (dev) / PostgreSQL (prod) |
| Frontend | React + Vite + Tailwind CSS |
| Automation | n8n (self-hosted, same VPS) |
| Deploy | Coolify (backend + frontend) |

---

## Active Tasks

- [x] Session 1 — Laravel backend (migration, model, service, controller, middleware, routes)
- [x] Session 2 — React frontend (WisdomCard, App.jsx, ShareEngine, BookmarkDrawer, PWA)
- [x] Session 3 — n8n workflow JSON (import-ready)
- [ ] Deploy backend ke Coolify
- [ ] Deploy frontend ke Coolify / Vercel
- [ ] Import n8n workflow + set env vars
- [ ] Add Gemini API credentials dalam n8n
- [ ] Generate icon-192.png + icon-512.png (PWA icons)
- [ ] Test end-to-end: n8n → Laravel → React

---

## Architecture

```
[n8n Cron 6h] → [RSS MuftiWP] → [Gemini AI] → [Hash] → [POST /api/v1/wisdom/ingest]
[n8n Webhook] ─────────────────────────────────────────────────────────────────────↗
                                                            ↓
                                                   [wisdoms table SQLite/PG]
                                                            ↓
                                              [GET /api/v1/wisdom/random]
                                                            ↓
                                                   [React PWA — Qalbu]
```

---

## Key Files

| File | Purpose |
|------|---------|
| `qalbu-api/app/Services/WisdomService.php` | getRandom (cached) + ingest |
| `qalbu-api/app/Http/Middleware/VerifyN8NToken.php` | Protect ingest endpoint |
| `qalbu-api/routes/api.php` | 3 endpoints |
| `qalbu-api/n8n/qalbu-ingest-workflow.json` | Import ke n8n |
| `qalbu-app/src/App.jsx` | Main state + fetch + UI |
| `qalbu-app/src/components/WisdomCard.jsx` | Glassmorphism card |
| `qalbu-app/src/components/ShareEngine.jsx` | Canvas 1080×1920 + Web Share |
| `qalbu-app/src/components/BookmarkDrawer.jsx` | LocalStorage bookmark |
| `qalbu-app/public/sw.js` | Service worker (PWA offline) |

---

## Environment Variables

**Laravel (.env):**
```
N8N_INGEST_TOKEN=your-secret
APP_URL=https://api.qalbu.yourdomain.com
FRONTEND_URL=https://qalbu.yourdomain.com
```

**React (.env):**
```
VITE_API_URL=https://api.qalbu.yourdomain.com
```

**n8n (Settings → Variables):**
```
QALBU_API_URL=https://api.qalbu.yourdomain.com
QALBU_N8N_TOKEN=your-secret (sama dengan N8N_INGEST_TOKEN)
```

---

## Progress Log

### 2026-04-11 — Session 1, 2, 3 (3 sessions in one night)

**Session 1 — Laravel Backend**
- Migration: `wisdoms` table (content_hash unique index, is_active, tags JSON)
- `Wisdom` model + fillable + casts
- `WisdomService` — getRandom (Cache per session) + ingest (duplicate check via SHA256)
- `WisdomController` — GET random + POST ingest
- `VerifyN8NToken` middleware — validate X-N8N-TOKEN header
- `routes/api.php` — prefix v1, throttle on ingest
- SQLite seeded, all 3 endpoints tested ✅

**Session 2 — React Frontend**
- Vite React + Tailwind CSS setup
- `WisdomCard.jsx` — glassmorphism, Playfair Display, fade-in animation
- `App.jsx` — fetch wisdom, fallback offline, loading state
- `ShareEngine.jsx` — Canvas 1080×1920 render, Web Share API + download fallback
- `BookmarkDrawer.jsx` — LocalStorage, swipe-up drawer
- `manifest.json` + `sw.js` — PWA setup, NetworkFirst API, IndexedDB cache
- Vite proxy → Laravel :8001
- Build ✅

**Session 3 — n8n Workflow**
- `qalbu-ingest-workflow.json` — import-ready
- Cron 6jam trigger + Webhook trigger
- RSS MuftiWP → Gemini AI → Parse+Hash → POST Laravel
- 409 duplicate handling built-in
- `n8n/SETUP.md` guide

**Next steps:**
- Deploy ke Coolify
- Generate PWA icons (icon-192.png, icon-512.png)
- Import n8n workflow + set env vars + Gemini credentials
- Test full pipeline end-to-end
