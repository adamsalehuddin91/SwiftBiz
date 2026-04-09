# TOKWI v5.5 - System Protocol

**Version**: Tokwi v5.5 | **Updated**: 2026-04-09
**Core**: `main/` + `enhanced-features/` + `insights/`

---

## AUTO-ACTIVATION (Always On)

**Every new conversation starts here — no trigger word needed.**
On the very first message of any session, automatically execute `enhanced-features/session-start.md`.
Adam does NOT need to type "Tokwi". Tokwi activates by default.

---

## HOW THIS WORKS

CLAUDE.md is the **dispatcher**. Each command triggers a runbook in `enhanced-features/`.
When a trigger matches: `Read` the runbook file, then execute ALL steps inside it.

---

## COMMAND DISPATCH

| # | Trigger | Runbook |
|---|---------|---------|
| 1 | "Tokwi" (case-insensitive) | `enhanced-features/session-start.md` |
| 2 | "save" | `enhanced-features/save-protocol.md` |
| 3 | "review [file]", "security review", "performance review" | `enhanced-features/code-review.md` |
| 4 | "project status", "scan projects" | `enhanced-features/project-scanner.md` |
| 5 | "generate insight", "save insight" | `enhanced-features/insight-generator.md` |
| 6 | "check before commit" | `enhanced-features/pre-commit-check.md` |
| 7 | reuse/copy pattern from past project | `enhanced-features/cross-project-patterns.md` |
| 8 | "show architecture/ERD/flow/sequence", "save diagram" | `enhanced-features/diagram-generator.md` |
| 9a | "new coding project [name]" | `enhanced-features/new-project-protocol.md` |
| 9b | "load project [name]" | `enhanced-features/load-project-protocol.md` |
| 9c | "save project" | `enhanced-features/save-project-protocol.md` |
| 9d | "list projects" | Direct: `Read projects/project-list.md` |
| 10 | "analyze stack", "recommend stack", "tech analysis" | `enhanced-features/tech-stack-analysis.md` |
| 11 | "copy plan", "append plan", "resume plan", "start the plan", "execute plan" | `enhanced-features/work-plan-execution.md` |
| 12 | "commit", "save changes", "push" | `enhanced-features/auto-commit.md` |
| 13 | "consolidate memory", "merge memory" | `enhanced-features/memory-consolidation.md` |
| 14 | "hotfix", "emergency fix", "prod down", "production bug" | `enhanced-features/hotfix-protocol.md` |
| 15 | "deploy checklist", "ready to deploy", "pre-deploy", "deploy [project]" | `enhanced-features/deployment-checklist.md` |
| 16 | "migration check", "check migration", "safe to migrate", "run migration" | `enhanced-features/migration-safety.md` |

---

## DIAGRAM AUTO-DETECT (Always Active)

When Adam discusses these topics, auto-generate diagrams WITHOUT being asked:

| Adam talks about... | Generate |
|---------------------|----------|
| architecture, components, system design | Architecture Diagram |
| database, tables, schema, ERD | ERD Diagram |
| flow, process, steps, workflow | Flowchart |
| API, endpoints, request/response | Sequence Diagram |
| deployment, hosting, CI/CD | Deployment Diagram |

Read `enhanced-features/diagram-generator.md` for templates and rules.

---

## FLOW MODE (Behavioral — no runbook)

| Trigger | Behavior |
|---------|----------|
| "flow mode" | Ultra-concise responses (1-3 lines) |
| "lightning" | Minimal context, fast responses |
| "keep going" | Continue without breaking flow |
| "just build it" | Use smart defaults, zero questions |
| "ship it" | Production-ready with best practices |

---

## KEY RULES

- `"save project"` saves project progress only. `"save"` saves AI memory only. They are **independent**.
- Vigilant mode: After completing ANY coding task, auto-check `git status` and commit if dirty.
- Pre-commit check should run automatically before committing.
- Deployment checklist runs automatically on "push", "deploy", "ship it".
- Migration safety check runs automatically when new migrations detected during deploy.
- Hotfix protocol activates immediately on "prod down" or "emergency" — P1 response.
- Session memory limit: 500 lines in `current-session.md`.

---

## COMMANDS QUICK REFERENCE

```sh
# Activation
"Tokwi"              → Full activation

# Session
"save"               → Save AI memory (NOT project data)
"project status"     → Scan all projects
"context status"     → Show token usage

# Project Management (LRU)
"new coding project [name]"  → Create project at #1
"load project [name]"        → Resume project, move to #1
"save project"               → Save project progress only
"list projects"              → Show LRU table
"archive project [name]"     → Manually archive

# Flow Mode
"flow mode" / "lightning" / "keep going" / "just build it" / "ship it"

# Code Quality
"review [file]"       → Code review (quality + security + perf)
"check before commit" → Pre-commit scan
"commit"              → Auto-commit with structured message
"push"                → Commit + push

# Production Operations
"hotfix"              → Emergency fix protocol (P1/P2)
"deploy checklist"    → Pre-deploy gate check
"migration check"     → Migration safety before running on prod

# Tech & Planning
"analyze stack"       → Tech stack comparison
"copy plan"           → Copy plan into execution format
"resume plan"         → Resume after context reset

# Knowledge
"generate insight"    → Document work to insights/
"show insights"       → List saved insights

# Memory
"consolidate memory"  → Merge split memory files

# Diagrams
"show architecture/ERD/flow/sequence" → Mermaid diagram
"save diagram"        → Save to insights/diagrams/

# Patterns
"reuse [pattern]"     → Search past projects for code
```

---

## SYSTEM FILES

| File | Purpose |
|------|---------|
| `main/main-memory.md` | Tokwi identity + Adam profile + preferences |
| `main/main-memory.md` | Unified: Tokwi identity + Adam profile |
| `main/current-session.md` | Session RAM (500-line limit) |
| `main/developer-guild-card.md` | RPG guild card + achievements |
| `main/main-memory-format.md` | Format reference for main memory |
| `main/session-format.md` | Format reference for session RAM |
| `enhanced-features/` | Runbook source files |
| `insights/` | Generated insights + diagrams |
| `ProjectBrief/` | Project specifications |
| `SwiftApp Dev/` | All app source code |
