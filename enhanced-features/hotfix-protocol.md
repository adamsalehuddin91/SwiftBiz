# Hotfix Protocol

**Trigger**: "hotfix", "emergency fix", "prod down", "production bug"
**Purpose**: Safe, fast emergency fix on live production — minimize downtime, zero data loss.

---

## ⚠️ BEFORE ANYTHING

Ask Adam one question only:
> "What's broken? (symptom + which project)"

If he says "prod down" or "users affected" → treat as P1. Skip non-critical steps. Move fast.

---

## Steps

### 1. Triage — Understand the blast radius
Identify:
- Which project? (SwiftMoney / HMS Salon / LorryTech / PokSystem)
- What's broken? (auth / payment / data / UI / API)
- How many users affected? (all / some / one)
- Is data at risk? (corruption / loss / exposure)
- When did it start? (after last deploy? random?)

Get last deploy info:
```bash
cd "<project-path>" && git log --oneline -5
```

### 2. Create hotfix branch
```bash
git checkout main
git pull origin main
git checkout -b hotfix/[short-description]-[date]
# e.g. hotfix/auth-crash-20260409
```
**Never fix directly on main.**

### 3. Run migration safety check (if DB involved)
If the bug involves database:
```
Read enhanced-features/migration-safety.md → execute steps
```
Do not run any migration on prod without safety check passing.

### 4. Minimal fix — surgical only
- Fix ONLY what's broken. Zero scope creep.
- No refactors. No cleanups. No "while I'm here" changes.
- One file changed = good. Five files changed = stop and reassess.

### 5. Pre-commit check — fast mode
```
Read enhanced-features/pre-commit-check.md → execute Steps 3-4 only
```
Skip build check if time-critical. Never skip AUTO-FAIL scan.

### 6. Commit with hotfix tag
```bash
git add [specific-files-only]
git commit -m "hotfix: [what was broken] — [one-line fix description]

Affected: [feature/module]
Root cause: [brief]
Fix: [what changed]
Tested: [how verified locally]

Tokwi - SwiftApps OS Ecosystem"
```

### 7. Deploy
Per project deploy path:

| Project | Deploy command |
|---------|---------------|
| SwiftMoney | Push to main → Coolify auto-deploys |
| HMS Salon | Push to main → Vercel auto-deploys |
| LorryTech | Push to main → Coolify auto-deploys |
| PokSystem | Push to main → Railway auto-deploys |

```bash
git checkout main
git merge hotfix/[branch-name]
git push origin main
```

### 8. Smoke test — verify fix live
Within 5 minutes of deploy, verify:
- [ ] The broken feature works
- [ ] Auth still works (login/logout)
- [ ] No new console errors
- [ ] No 500 errors in logs

Ask Adam: "Can you confirm it's working on your end?"

### 9. Merge hotfix back + cleanup
```bash
git branch -d hotfix/[branch-name]
```

### 10. Post-mortem (brief)
Add to `main/current-session.md` under `## PENDING / REMIND ADAM`:
```
- POST-MORTEM: [project] hotfix [date] — root cause: [X], fix: [Y], prevent: [Z]
```

---

## P1 vs P2 Classification

| Level | Condition | Response |
|-------|-----------|----------|
| P1 | Prod down / auth broken / data at risk | Drop everything. Fix now. |
| P2 | Feature broken but app still usable | Fix in next 2 hours |
| P3 | Visual bug / minor UX issue | Normal PR flow |

---

**Version**: v1.0 | **Created**: 2026-04-09
