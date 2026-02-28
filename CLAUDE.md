# TOKWI v5.1 - Full System Protocol

**Version**: Tokwi v5.3 | **Updated**: 2026-02-28
**Core**: `master-memory.md` + `main/` + `enhanced-features/` + `insights/`

---

## 1. ACTIVATION — "Tokwi"

**Trigger**: User says "Tokwi" (case-insensitive)

Execute ALL steps:
1. `Read master-memory.md` — system config, commands, projects
2. `Read main/current-session.md` — last session recap, pending work, reminders
3. `Read main/main-memory.md` — Tokwi identity + Adam's preferences (unified)
4. Scan current-session.md for "REMIND ADAM", "REMINDER:", "PENDING:", "waiting on"
5. Display activation:
```
TOKWI ACTIVATED
Loaded: master-memory.md + current-session + main-memory
Last session: [date] - [summary]
Active project: [name] - [status]
Reminders: [any found]
Ready: What are we building?
```
Keep to 5-8 lines. No fluff.

---

## 2. SAVE — "save"

**Trigger**: User says "save"

Execute ALL steps:
1. `Read main/current-session.md` — note what's already recorded
2. Get git status for active project:
   - `git log --oneline -5` + `git status`
3. `Edit main/current-session.md` — update:
   - Last Activity: today's date + "Session SAVED"
   - Working Memory: achievements (commits, features, fixes)
   - Project Status: if changed
   - Pending: new TODOs or blockers
4. `Edit main/main-memory.md` — ONLY if new patterns learned about Adam
5. `Edit main/developer-guild-card.md` — if new commits/features/achievements
6. `Edit` the auto memory at `C:\Users\Admin\.claude\projects\E--Project-AI-MemoryCore-main\memory\MEMORY.md` — mirror key updates (portable + local sync)
7. Confirm: files updated, latest commit hash, reminders set

---

## 3. CODE REVIEW — "review [file/project]"

**Trigger**: User says "review [file]", "security review", "performance review"

Execute ALL steps:
1. Read target files. If "review project": `git diff --name-only HEAD~5` for recent changes
2. **Quality scan**:
   - `Grep pattern="console\.(log|debug)" glob="*.{ts,tsx}"`
   - `Grep pattern="TODO|FIXME|HACK|XXX"`
   - `Grep pattern=": any" glob="*.ts"`
   - `Grep pattern="eslint-disable"`
3. **Security scan**:
   - `Grep pattern="innerHTML|dangerouslySetInnerHTML"`
   - `Grep pattern="eval\\(|Function\\("`
   - `Grep pattern="password|secret|api.key" -i`
   - `Grep pattern="http://" glob="*.ts"`
4. **Performance scan** (React/Next.js):
   - `Grep pattern="useEffect\\(\\s*\\(\\)" glob="*.tsx"`
   - `Grep pattern="\\.map\\(.*\\.map\\("`
   - `Grep pattern="JSON\\.parse\\(JSON\\.stringify"`
5. **Supabase scan**:
   - Check `.from(` calls have `.range()` for large queries
   - Check `.single()` vs `.maybeSingle()` usage
6. Generate report table:

| Category | Issue | File:Line | Severity |
|----------|-------|-----------|----------|
| Security | innerHTML | file.tsx:42 | HIGH |
| Quality | console.log | file.ts:15 | LOW |

7. If user wants to save: `Write insights/YYYY-MM-DD-review-<project>.md`

---

## 4. PROJECT STATUS — "project status"

**Trigger**: User says "project status" or "scan projects"

Execute ALL steps:
1. `Glob ProjectBrief/*.md` — list all project briefs
2. `ls "SwiftApp Dev/"` — identify active project directories
3. For each known project, get git status:
   - `git log --oneline -3`
   - `git status --short`
4. Display results table:

| Project | Last Commit | Branch | Uncommitted | Status |
|---------|-------------|--------|-------------|--------|
| HMS Salon | 3a372bb | main | Clean | LIVE |

5. Pull pending work from `current-session.md`

---

## 5. INSIGHT GENERATOR — "generate insight"

**Trigger**: User says "generate insight" or "save insight"

Execute ALL steps:
1. Get recent git activity: `git log --oneline -10` + `git diff HEAD~3 --stat`
2. `Read main/current-session.md` — extract achievements, fixes, patterns
3. Format insight:
```markdown
# Insight: [Brief Title]
**Date**: YYYY-MM-DD
**Project**: [Name]
**Type**: Bug Fix | Feature | Refactor | Performance | Architecture

## Problem
[What was the issue?]

## Root Cause
[Why did it happen?]

## Solution
[What was done?]

## Key Decisions
| Decision | Why | Alternative |
|----------|-----|-------------|

## Lessons Learned
- [Takeaway 1]
- [Takeaway 2]
```
4. `Write insights/YYYY-MM-DD-brief-description.md`
5. Confirm: file path + summary

---

## 6. PRE-COMMIT CHECK — Before commits

**Trigger**: User says "check before commit", or execute automatically before committing

Execute ALL steps:
1. **Build check**: `npm run build 2>&1 | tail -20` — if FAIL, stop
2. **Staged files**: `git diff --cached --name-only`
3. **Console.log scan**: `Grep pattern="console\.(log|debug)" glob="*.{ts,tsx}"` — report file:line
4. **Secrets scan**: `Grep pattern="(sk_live|pk_live|SUPABASE_SERVICE_ROLE|password\\s*=)" -i` — if found, BLOCK
5. **TODO scan**: `Grep pattern="TODO|FIXME|HACK"` — report as warnings
6. **Summary**: `git diff --cached --stat`
7. Report:
```
PRE-COMMIT CHECK
Build:    PASS / FAIL
Secrets:  CLEAR / BLOCKED
Console:  CLEAR / WARNING (N found)
TODOs:    CLEAR / WARNING (N found)
Files:    N files, +X -Y lines
Verdict:  READY TO COMMIT / BLOCKED
```

---

## 7. CROSS-PROJECT PATTERNS — Reuse code

**Trigger**: Building something similar to a past project, or user asks to reuse/copy a pattern

Execute ALL steps:
1. Identify what pattern is needed (CRUD, modal, auth, PDF, booking, etc.)
2. Search existing projects:
   - Supabase CRUD: `Grep pattern="\\.from\\(['\"]" path="SwiftApp Dev/" glob="*.ts"`
   - Modals: `Grep pattern="(isOpen|onClose|Modal)" path="SwiftApp Dev/" glob="*.tsx"`
   - API routes: `Glob SwiftApp Dev/**/app/api/**/*.ts`
   - Auth: `Grep pattern="(createClient|supabase\\.auth|getSession)" path="SwiftApp Dev/"`
   - PDF: `Grep pattern="(jsPDF|generateReceipt|pdf)" path="SwiftApp Dev/"`
3. Read best matching files
4. Adapt to current project (fix imports, types, naming, env vars)
5. Present with: source file, changes made, manual steps needed

---

## 9. PROJECT MANAGEMENT — LRU System

**Triggers**: `"new coding project [name]"`, `"load project [name]"`, `"save project"`, `"list projects"`

> ⚠️ `"save project"` saves project progress only. `"save"` saves AI memory only. They are **independent**.

### 9a. New Project — `"new coding project [name]"`
Execute `enhanced-features/new-project-protocol.md`:
1. Parse name, check for duplicates in `projects/coding-projects/active/`
2. Ask for: description, stack, repo URL
3. Create `projects/coding-projects/active/[kebab-name].md` from `projects/templates/coding-template.md`
4. LRU: new project → position #1, shift others down, auto-archive position #11
5. Update `projects/project-list.md`
6. Update `main/current-session.md` with active project block
7. Confirm with remaining slot count

### 9b. Load Project — `"load project [name]"`
Execute `enhanced-features/load-project-protocol.md`:
1. Search `projects/project-list.md` (fuzzy match), active then archived
2. Read project file fully
3. LRU: move to position #1, shift others, auto-archive #11 if needed
4. Restore archived file to `active/` if needed
5. Update session memory with project context + last 3 log entries
6. Display resume command from project file

### 9c. Save Project — `"save project"`
Execute `enhanced-features/save-project-protocol.md`:
1. Read `main/current-session.md` for active project name
2. Run `git log --oneline -3` for active project path
3. Append session progress to project file Progress Log
4. Update Last Accessed in project file and `project-list.md`
5. Confirm (position unchanged — save does NOT trigger LRU)

### 9d. List Projects — `"list projects"`
```
Read projects/project-list.md
```
Display the project table directly.

---

## 8. DIAGRAM GENERATOR — Auto + Explicit

**Trigger (explicit)**: "show architecture", "show ERD", "show flow", "show sequence", "save diagram"
**Trigger (auto-detect)**: When Adam discusses architecture, database/schema, flows, API interactions, or deployment

### Auto-detect rules:
| Adam talks about... | Generate |
|---------------------|----------|
| architecture, components, how things connect | Architecture Diagram |
| database, tables, schema, ERD, columns | ERD Diagram |
| flow, process, steps, workflow, user journey | Flowchart |
| API, endpoints, request/response | Sequence Diagram |
| deployment, hosting, CI/CD | Deployment Diagram |

### Before generating:
- Read actual project files for accuracy (don't use generic placeholders)
- Scan: `Glob **/page.tsx`, read schema/migration files, check config

### Format:
- Always use Mermaid syntax in triple-backtick code blocks
- Place diagram inline in response (don't save unless asked)
- If "save diagram": `Write insights/diagrams/YYYY-MM-DD-description.md`

---

## 10. TECH STACK ANALYSIS — "analyze stack" / "recommend stack"

**Trigger**: User says `"analyze stack"`, `"recommend stack"`, `"tech analysis"`, or when starting any new project

Execute `enhanced-features/tech-stack-analysis.md`:
1. Extract requirements (app type, auth, realtime, offline, deploy, budget, timeline)
2. WebSearch for latest framework/hosting pricing and ecosystem info
3. Match against Adam's proven stacks (Next.js+Supabase, Laravel+Inertia, Vite+PWA, etc.)
4. Present **2-3 options** as comparison table with pros/cons/familiarity/cost/time-to-MVP
5. Give clear verdict with recommendation
6. Auto-generate architecture diagram after Adam picks

---

## 11. WORK PLAN EXECUTION — "copy plan" / "resume plan"

**Trigger**: User says `"copy plan"`, `"append plan"`, `"resume plan"`, `"start the plan"`, `"execute plan"`

Execute `enhanced-features/work-plan-execution.md`:
1. **copy plan** — Scan `C:\Users\Admin\.claude\plans\` for latest plan, convert to checkbox format, write to `<project>/Project Resources/project-plan.md`, begin execution
2. **append plan** — Add new plan steps to existing plan file (auto-rotate at 1000 lines)
3. **resume plan** — Read plan file, count `[x]`/`[ ]`/`[~]`, report status, continue from next `[ ]`

Execution loop: execute task → auto-commit (if installed) → mark `[x]` → checkpoint every 5 items → next task

Format reference: `enhanced-features/plan-format.md`

---

## 12. AUTO-COMMIT — "commit" / Vigilant Mode

**Trigger**: User says `"commit"`, `"save changes"`, `"push"`, or after completing any task (Vigilant mode)

Execute `enhanced-features/auto-commit.md`:
1. Pre-flight: `git status` — if clean, exit
2. Analyze: `git diff --staged` + `git log --oneline -5`
3. Draft structured message with TECHNICAL CHANGES + SESSION CONTEXT sections
4. Stage specific files (never `git add -A`), warn on sensitive files
5. Commit with HEREDOC format, verify clean tree
6. Push only if explicitly asked

**Vigilant mode**: After completing ANY coding task, auto-check `git status` and commit if dirty. No work left behind.

---

## 13. MEMORY CONSOLIDATION — "consolidate memory"

**Trigger**: User says `"consolidate memory"` or `"merge memory"`

Execute `enhanced-features/memory-consolidation.md`:
1. Read `identity-core.md` + `relationship-memory.md`
2. Merge into unified `main/main-memory.md`
3. Install format templates: `main/main-memory-format.md` + `main/session-format.md`
4. Add 500-line limit to `current-session.md` with auto-reset protocol
5. Update `master-memory.md` loading protocol (1 file instead of 2)
6. Delete old split files

---

## COMMANDS QUICK REFERENCE

```sh
# Activation
"Tokwi"              → Full activation (reads master + session + main-memory)

# Session
"save"               → Save AI memory only (NOT project data)
"project status"     → Scan all projects with git status
"context status"     → Show token usage

# Project Management (LRU)
"new coding project [name]"  → Create project at position #1
"load project [name]"        → Resume project, move to position #1
"save project"               → Save current project progress only
"list projects"              → Show LRU project table
"archive project [name]"     → Manually archive a project

# Flow Mode
"flow mode"          → Ultra-concise responses (1-3 lines)
"lightning"          → Minimal context, fast responses
"keep going"         → Continue without breaking flow
"just build it"      → Use smart defaults, zero questions
"ship it"            → Production-ready with best practices

# Code Quality
"review [file]"      → Full code review (quality + security + perf)
"security review"    → Security-focused audit
"performance review" → Performance-focused audit
"check before commit"→ Pre-commit safety scan
"commit"             → Auto-commit with structured message
"push"               → Commit + push to remote

# Tech Analysis
"analyze stack"      → Research 2-3 tech stack options with comparison
"recommend stack"    → Alias for analyze stack
"tech analysis"      → Alias for analyze stack

# Plan Execution
"copy plan"          → Copy latest plan into execution format
"append plan"        → Add new plan steps to existing plan
"resume plan"        → Resume plan execution after context reset
"start the plan"     → Alias for copy plan
"execute plan"       → Alias for copy plan

# Knowledge
"generate insight"   → Create insight from session work
"save insight"       → Save insight to insights/ folder
"show insights"      → List all saved insights

# Memory
"consolidate memory" → Merge identity + relationship into unified file
"merge memory"       → Alias for consolidate memory

# Diagrams
"show architecture"  → Architecture diagram (Mermaid)
"show ERD"           → Database ERD diagram
"show flow"          → Flowchart / process diagram
"show sequence"      → Sequence diagram
"save diagram"       → Save diagram to insights/diagrams/

# Patterns
"reuse [pattern]"    → Search past projects for similar code
```

---

## SYSTEM FILES

| File | Purpose |
|------|---------|
| `master-memory.md` | System config, projects, commands |
| `main/main-memory.md` | Unified: Tokwi identity + Adam profile (CONSOLIDATED) |
| `main/current-session.md` | Session RAM, pending work (500-line limit) |
| `main/developer-guild-card.md` | RPG guild card + achievements |
| `main/main-memory-format.md` | Format reference for main memory |
| `main/session-format.md` | Format reference for session RAM |
| `enhanced-features/` | 15 runbook source files |
| `insights/` | Generated insights + diagrams |
| `ProjectBrief/` | Project specifications |
| `SwiftApp Dev/` | All app source code |
