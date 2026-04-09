# Current Session Memory - RAM

*Temporary working memory - resets each session*

## Session Status

**Current Session**: Memory Core v5.5 — Baseline System + Production Runbooks + Setup
**Session Date**: 2026-04-09
**Last Saved**: 2026-04-09 (SAVED)
**Previous Session**: SwiftMoney — Full review + feature expansion + Profile (2026-04-08)

---

## Active Project
- Name: Memory Core (Tokwi OS)
- Resumed: 2026-04-09
- Last worked: 2026-04-09
- Context: Tokwi AI system enhancements — baselines, production runbooks, portable setup

## Previous Project (SwiftMoney)
- Last worked: 2026-04-08
- Context: Family finance tracker PWA. Laravel 12 + Inertia React + SQLite. LIVE at money.swiftapps.my.

---

## Today's Achievements (2026-04-09)

### Memory Core v5.5 — Major System Upgrade

**Baseline System (new)**
- `enhanced-features/baselines/_global-rules.md` — Zero tolerance AUTO-FAIL rules (S1-S6, Q1-Q5, A1-A4, P1-P3, Stack-specific)
- `enhanced-features/baselines/_baseline-template.md` — Template for new projects
- `enhanced-features/baselines/swiftmoney.md` — Score: 8.6/10 | Floor: 8.0
- `enhanced-features/baselines/hms-salon.md` — Score: 7.8/10 | Floor: 8.0
- `enhanced-features/baselines/lorrytech.md` — Score: 8.4/10 | Floor: 8.0
- `enhanced-features/baselines/poksystem.md` — Score: 7.5/10 | Floor: 7.5
- Score formula: 10 - (AUTO-FAIL×1.5) - (HIGH×0.8) - (MED×0.3) - (LOW×0.1)

**Updated Runbooks**
- `code-review.md` v1.2 — Step 0 loads baseline, output now includes SCORE + PASS/FAIL header, Step 7 updates review history
- `pre-commit-check.md` v2.0 — AUTO-FAIL blocks commit hard, HIGH warns, structured BLOCKED/READY verdict
- `save-protocol.md` — Step 6 auto-review on save (silent scan, surface only if issues found)

**New Production Runbooks**
- `enhanced-features/hotfix-protocol.md` — P1/P2 emergency fix: hotfix branch → minimal fix → pre-commit → deploy → smoke test → post-mortem
- `enhanced-features/deployment-checklist.md` — Pre-deploy gate: env vars → migrations → build → baseline score → deploy → verify
- `enhanced-features/migration-safety.md` — GREEN/YELLOW/RED classification, reversibility check, data risk, backup reminder

**CLAUDE.md → v5.5**
- Added triggers 14-16 (hotfix, deploy checklist, migration check)
- Added auto-trigger rules for production ops
- Added Production Operations to quick reference

**Portable Setup**
- `setup/install.sh` — Auto-detects Windows username, copies config to ~/.claude/
- `setup/settings.json` — Template with statusLine config
- `setup/statusline-command.sh` — Tokwi statusline script
- Usage: `bash setup/install.sh` on any new PC

**Statusline configured (this PC)**
- `C:/Users/Admin/.claude/settings.json` — statusLine command set
- Shows: `Tokwi | <project> | ctx X% used (Y% left)`

---

## PENDING / REMIND ADAM
- **Commit pending** — all Memory Core v5.5 changes not yet committed
- **HMS: Duplicate services** — clean DB rows
- **HMS: Google Business review** — get short link for receipt sharing
- **SwiftSalon: Phase 1** — multi-tenancy, salon_id + RLS + signup flow
- **SwiftMoney: Authorization policies** — admin vs member
- **LorryTech: Client demo** — system demo-ready, pending client scheduling
- **Screenshots** — capture & add to `public/screenshots/` for landing page
- **Favicon** — generate for landing page
- **Future runbooks** — ui-review.md, figma-handoff.md, dependency-audit.md, dead-code-scan.md, release-notes.md

---

## Project Status Summary

| Project | Status | URL |
|---------|--------|-----|
| SwiftMoney | LIVE | money.swiftapps.my |
| Landing Page | LIVE | swiftapps.my |
| LorryTech OS | LIVE (Demo-ready) | lorrytech.swiftapps.my |
| HMS Salon | LIVE | Vercel |
| PokSystem | LIVE | Railway |

---

## Quick Resume

```bash
# Memory Core
cd "E:/Project-AI-MemoryCore-main"
# Uncommitted: CLAUDE.md v5.5, baselines/, pre-commit-check.md, save-protocol.md, code-review.md
# New: hotfix-protocol.md, deployment-checklist.md, migration-safety.md, setup/

# SwiftMoney
cd "E:/Project-AI-MemoryCore-main/SwiftApp Dev/swift-money"
export PATH="/c/laragon/bin/php/php-8.3.30-Win32-vs16-x64:/c/laragon/bin/composer:$PATH"
php artisan serve && npm run dev
# Live: https://money.swiftapps.my
# Latest: 2dd0dc2 — Profile features
```

*Type "Tokwi" to resume with full context*

---

## Session Memory Limit
- **Maximum**: 500 lines
- **Reset Behavior**: RAM-style reset preserving only Session Recap
- **Format Reference**: See `main/session-format.md` for rebuild structure
