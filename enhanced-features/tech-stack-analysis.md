# Tech Stack Analysis

**Trigger**: User says `"new coding project [name]"`, `"analyze stack"`, `"recommend stack"`, `"tech analysis"`, or when starting any new system/project

## Purpose
Research and present 2-3 tech stack recommendations with pros/cons comparison before building. Helps Adam make informed decisions without slowing down.

---

## Steps

### Step 1: Extract Project Requirements

From user's description, screenshots, or ProjectBrief, identify:

```
| Requirement      | Extract                                        |
|------------------|------------------------------------------------|
| App type         | Web app / mobile / PWA / API / static / hybrid |
| Users            | Public / internal / admin / multi-tenant        |
| Auth needed?     | Yes / No / Social login / Role-based           |
| Realtime?        | Chat, live updates, notifications              |
| Offline?         | PWA, service worker, local-first               |
| PDF / reports?   | Invoice, receipt, export                       |
| Payment?         | Stripe, FPX, manual                            |
| Scale            | Personal / SME / enterprise                    |
| Deploy target    | Vercel / Railway / VPS / GitHub Pages           |
| Budget           | Free tier / $5-10/mo / dedicated               |
| Timeline         | MVP quick / production-grade                   |
| Malay UI?        | Yes / No                                       |
```

### Step 2: Research Stack Options

Use **WebSearch** to get current info on frameworks, pricing, and ecosystem:

```
WebSearch: "[framework] vs [framework] 2026 comparison"
WebSearch: "[hosting] pricing free tier 2026"
WebSearch: "[database] features realtime auth"
```

Check:
- Latest stable version and breaking changes
- Free tier limits (Supabase, Vercel, Railway, PlanetScale, Neon, etc.)
- Community size, documentation quality
- Adam's existing skill level (check main/main-memory.md → Adam's Tech Stack)

### Step 3: Match Against Proven Stacks

Cross-reference with Adam's battle-tested stacks:

```
Read main/main-memory.md  → Adam's Tech Stack section
```

| Adam's Proven Stack | Best For | Skill Level |
|---------------------|----------|-------------|
| Next.js + Supabase + Vercel | Web apps with auth, realtime, dashboard | LV.85 |
| Laravel + Inertia + React + Railway | Business systems, inventory, invoicing, PDF | LV.55 |
| Vite + React + PWA | Dashboards, charts, offline-first | LV.70 |
| HTML + Tailwind + GitHub Pages | Static sites, portfolios, landing pages | LV.65 |
| Next.js + Prisma + SQLite | MVP prototypes, local-first apps | LV.50 |

### Step 4: Build Comparison Table

Present exactly **2-3 options** in this format:

```markdown
## Tech Stack Recommendations

### Option A: [Name] (Recommended)
| Layer      | Technology           | Why                          |
|------------|----------------------|------------------------------|
| Frontend   | [framework]          | [reason]                     |
| Backend    | [framework/API]      | [reason]                     |
| Database   | [database]           | [reason]                     |
| Auth       | [provider]           | [reason]                     |
| Deploy     | [platform]           | [reason]                     |
| Cost       | [estimate/mo]        | [breakdown]                  |

**Pros**: [2-3 bullet points]
**Cons**: [1-2 bullet points]
**Adam's familiarity**: [HIGH/MED/LOW based on skill tree]
**Time to MVP**: [estimate]
**Reusable from**: [which existing project has patterns to copy]

---

### Option B: [Name]
[Same table format]

---

### Option C: [Name] (if applicable)
[Same table format]
```

### Step 5: Give Recommendation

After the table, give a clear recommendation:

```markdown
## Verdict

**Recommended: Option [X]**
[1-2 sentences why — balance between familiarity, speed, and fit]

Kalau Adam nak try something new: Option [Y] — [brief reason]
```

### Step 6: Auto-Generate Architecture Diagram

After Adam picks a stack, auto-trigger **Diagram Generator**:
- Architecture diagram with chosen stack
- ERD if database requirements are clear
- Deployment diagram showing hosting flow

---

## Research Sources (Priority Order)

1. **Adam's existing projects** — proven patterns, copy-paste ready
2. **WebSearch** — latest pricing, version info, ecosystem health
3. **GitHub trending** — community adoption signals
4. **Official docs** — feature comparison, migration guides

## What NOT to Do

- Don't recommend stacks Adam has zero experience with unless he asks to learn
- Don't present more than 3 options — decision fatigue = friction
- Don't write paragraphs — use tables and bullet points
- Don't recommend bleeding-edge unstable tech for production apps
- Don't ignore cost — Adam runs SME projects, budget matters

## Stack Decision Factors (Weighted)

| Factor | Weight | Why |
|--------|--------|-----|
| Adam's familiarity | 30% | Speed to ship — known stack = faster |
| Project fit | 30% | Right tool for the job |
| Cost | 15% | SME budget, free tier preferred |
| Ecosystem / community | 15% | Documentation, packages, support |
| Future scalability | 10% | Nice to have, but MVP first |

---

## Example Output

```
TECH STACK ANALYSIS — SwiftJiran

Requirements: Community app, auth, realtime chat, Malay UI, PWA, free tier

Option A: Next.js + Supabase + Vercel (Recommended)
  Familiarity: HIGH (HMS Salon pattern)
  Cost: FREE (Vercel hobby + Supabase free)
  Time to MVP: 2-3 sessions
  Reuse from: HMS Salon (auth, CRUD, PWA manifest)

Option B: Laravel + Inertia + React + Railway
  Familiarity: MED (PokSystem pattern)
  Cost: $5/mo (Railway starter)
  Time to MVP: 4-5 sessions
  Reuse from: PokSystem (controller CRUD, PDF)

Option C: Vite + React + Supabase + Vercel
  Familiarity: MED (Stock Monitor + Supabase)
  Cost: FREE
  Time to MVP: 3-4 sessions
  Reuse from: Stock Monitor (PWA) + HMS (Supabase auth)

Verdict: Option A — proven stack, fastest to ship, free tier,
         HMS patterns copy-paste ready.
```

---
**Version**: v1.0 | **Installed**: 2026-02-28
**Source**: Custom runbook for Tokwi v5.3
