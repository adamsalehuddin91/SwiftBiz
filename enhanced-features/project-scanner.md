# Project Scanner

**Trigger**: User says "project status" or "scan projects"

## Steps

### 1. List all project briefs
```
Glob ProjectBrief/*.md
```

### 2. Identify active project directories
```
Bash: ls "SwiftApp Dev/"
```
Known projects (from projects/project-list.md):
- `SwiftApp Dev/hms-salon` - HMS Salon (Next.js + Supabase)
- `SwiftApp Dev/stock-monitoring-cruip` - Stock Monitor (Vite + PWA)
- `SwiftApp Dev/swiftstay` - SwiftStay (Next.js + Prisma)
- `SwiftApp Dev/PokSystemManagement` - PokSystem (Laravel 12 + Railway)

### 3. Get git status for each project
For each project directory:
```
Bash: cd "<project-path>" && git log --oneline -3
Bash: cd "<project-path>" && git status --short
```

### 4. Check build status
For **Next.js / Vite** projects:
```
Bash: cd "<project-path>" && npm run build 2>&1 | tail -5
```
For **Laravel (PokSystem)** — check for compile errors:
```
Bash: cd "<project-path>" && php artisan config:clear && php artisan route:list --compact 2>&1 | tail -10
```
Note: only run if user wants full scan. Skip for quick status.

### 5. Display results table
Format:
```
| Project        | Stack      | Last Commit      | Branch | Uncommitted | Status  |
|----------------|------------|------------------|--------|-------------|---------||
| HMS Salon      | Next.js    | 3a372bb (Feb 21) | main   | Clean       | LIVE    |
| Stock Monitor  | Vite PWA   | abc1234 (Jan 1)  | main   | Clean       | LIVE    |
| SwiftStay      | Next.js    | def5678 (Oct 28) | main   | Clean       | MVP     |
| PokSystem      | Laravel 12 | 85b0e29 (Feb 19) | main   | Clean       | RAILWAY |
```

### 6. Show pending work
Pull from current-session.md "Pending" section and any ProjectBrief notes.

---
**Version**: v1.1 | **Updated**: 2026-02-23
**Changes**: Added PokSystem (Laravel), Laravel build check via `php artisan`, updated project table.
