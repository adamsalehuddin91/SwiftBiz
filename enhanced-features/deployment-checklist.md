# Deployment Checklist

**Trigger**: "deploy checklist", "ready to deploy", "pre-deploy", "deploy [project]"
**Purpose**: Gate check before every production deployment. Nothing ships without this passing.

---

## Steps

### 0. Load baseline
```
Read enhanced-features/baselines/_global-rules.md
Read enhanced-features/baselines/[project-name].md
```
Get: deploy score floor, zero-tolerance rules.

### 1. Identify project + deploy target
Confirm:
- Project name + URL
- Branch being deployed (must be `main`)
- Any pending migrations? (check `database/migrations/` for untracked files)

```bash
cd "<project-path>" && git log --oneline origin/main..HEAD
```
If commits not yet pushed → push first, then deploy.

### 2. Environment variables check
```bash
# Check .env.example vs actual .env — any new vars missing?
cd "<project-path>" && diff <(grep -o '^[^=]*' .env.example | sort) <(grep -o '^[^=]*' .env | sort)
```
Flag any var in `.env.example` not in `.env` — deployment will fail or behave wrong.

Verify per project:

| Project | Critical env vars |
|---------|------------------|
| SwiftMoney | `APP_KEY`, `DB_DATABASE`, `APP_ENV=production`, `APP_DEBUG=false` |
| HMS Salon | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| LorryTech | `APP_KEY`, `DB_*`, `APP_ENV=production`, `APP_DEBUG=false` |
| PokSystem | `APP_KEY`, `DB_*`, `APP_ENV=production`, Railway env vars |

### 3. Migration safety check
If any new migration files exist:
```
Read enhanced-features/migration-safety.md → execute ALL steps
```
**Do not proceed if migration safety check fails.**

### 4. Build check
```bash
# Laravel
php artisan config:clear && php artisan route:list --compact 2>&1 | tail -5

# Next.js
npm run build 2>&1 | tail -20
```
If build fails → STOP. Fix before deploying.

### 5. Baseline review score check
```
Read enhanced-features/baselines/[project-name].md → check last Review History entry
```
- Score ≥ floor → proceed
- Score < floor → warn Adam, ask for confirmation before proceeding
- No recent review → run quick scan: `Read enhanced-features/pre-commit-check.md → Steps 3-4`

### 6. Final git state check
```bash
cd "<project-path>" && git status && git log --oneline -3
```
Verify:
- [ ] On `main` branch
- [ ] No uncommitted changes
- [ ] Latest commit is what we expect to deploy

### 7. Deploy
Trigger deploy per platform:

| Project | Platform | How |
|---------|----------|-----|
| SwiftMoney | Coolify | `git push origin main` → auto-deploy |
| HMS Salon | Vercel | `git push origin main` → auto-deploy |
| LorryTech | Coolify | `git push origin main` → auto-deploy |
| PokSystem | Railway | `git push origin main` → auto-deploy |

### 8. Post-deploy verification (within 5 min)
- [ ] App loads at production URL
- [ ] Login works
- [ ] Core feature works (POS / trip create / invoice / finance dashboard)
- [ ] No 500 errors
- [ ] Migrations ran (check logs if applicable)

### 9. Report
```
DEPLOYMENT CHECKLIST — [Project] | [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENV VARS:      ✅ CLEAR / ❌ [missing vars]
MIGRATIONS:    ✅ SAFE / ❌ BLOCKED / ⚠️ WARNING
BUILD:         ✅ PASS / ❌ FAIL
BASELINE:      ✅ [score]/10 (above floor) / ⚠️ below floor
GIT STATE:     ✅ Clean on main / ❌ [issue]

VERDICT:       ✅ DEPLOY / ❌ BLOCKED
```

---

## Auto-trigger rule
This checklist runs automatically when:
- `"commit"` runbook detects push to main
- Adam says "push", "deploy", "ship it"
- Hotfix protocol reaches Step 7

---

**Version**: v1.0 | **Created**: 2026-04-09
