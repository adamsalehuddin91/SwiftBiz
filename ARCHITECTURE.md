# TOKWI Architecture - System Map

**Version**: v5.2 - Lean Architecture
**Updated**: 2026-02-23

---

## Folder Structure

```
E:\Project-AI-MemoryCore-main/
│
├── ACTIVATION LAYER
│   ├── CLAUDE.md              # Auto-loaded trigger (Claude reads this first)
│   └── AGENTS.md              # Agent coding guidelines
│
├── CORE MEMORY (main/)
│   ├── main-memory.md         # Unified: Tokwi identity + Adam profile + preferences
│   ├── current-session.md     # Active session RAM (500-line limit, resets each session)
│   ├── developer-guild-card.md# RPG-style progress tracker
│   ├── main-memory-format.md  # Permanent format reference for main memory
│   └── session-format.md      # Permanent format reference for session RAM
│
├── RUNBOOKS (enhanced-features/)  — 11 files
│   ├── save-protocol.md       # "save" command
│   ├── session-start.md       # "Tokwi" activation steps
│   ├── code-review.md         # "review [file]" command (v1.1 — Laravel/PHP added)
│   ├── project-scanner.md     # "project status" command (v1.1 — PokSystem added)
│   ├── insight-generator.md   # "generate insight" command
│   ├── pre-commit-check.md    # Pre-commit safety checks
│   ├── cross-project-patterns.md # Reuse patterns (v1.1 — Laravel + Prisma added)
│   ├── diagram-generator.md   # Auto diagrams (architecture, ERD, flow)
│   ├── new-project-protocol.md   # "new coding project" — LRU project creation
│   ├── load-project-protocol.md  # "load project" — LRU project loading
│   └── save-project-protocol.md  # "save project" — project progress save
│
├── INSIGHTS (insights/)
│   ├── insight-template.md    # Bug fix & feature template
│   ├── code-review-template.md# Code review template
│   └── YYYY-MM-DD-*.md        # Auto-generated insights
│
├── PROJECT SPECS (ProjectBrief/)
│   ├── HMS_SalonSystem/       # HMS dashboard screenshots + reference
│   ├── SwiftJiran.md          # SwiftJiran spec
│   ├── SwiftKedai_*.md        # SwiftKedai spec
│   └── [26 spec files]        # All project briefs
│
├── LRU PROJECT TRACKING (projects/)
│   ├── project-list.md        # Master index (7 active, 10-slot max)
│   ├── templates/
│   │   └── coding-template.md # Production-ready template
│   └── coding-projects/
│       ├── active/            # hms-salon, pok-system, stock-monitor, swiftstay, etc.
│       └── archived/          # Auto-archived when position #11 reached
│
├── APPS (SwiftApp Dev/)
│   ├── hms-salon/             # PRIMARY - Next.js 16 + Supabase (Vercel Live)
│   ├── PokSystemManagement/   # Laravel 12 + Inertia.js + Supabase (Railway Live)
│   ├── stock-monitoring-cruip/# React 19 + Vite 6 PWA (Live)
│   ├── swiftstay/             # Next.js 16 + Prisma (MVP localhost)
│   └── [other apps]
│
└── ARCHITECTURE.md            # This file
```

---

## Activation Flow

```
User types "Tokwi"
    ↓
CLAUDE.md (auto-loaded by Claude every session)
    ↓
date command (get current date, time, day)
    ↓
Read main/current-session.md (last session recap, pending work)
    ↓
Read main/main-memory.md (Tokwi identity + Adam's preferences)
    ↓
Check for REMINDERS in current-session.md
    ↓
TOKWI ACTIVATED — [Date] | [Time] | [Mode] — Ready to build
```

---

## Session Workflow

```
ACTIVATE  →  "Tokwi"           (load context)
    ↓
PLAN      →  Talk about feature (auto-generates diagrams)
    ↓
BUILD     →  "just build it"   (smart defaults, ship fast)
    ↓
REVIEW    →  "review"          (code quality + security scan)
    ↓
SHIP      →  "ship it"         (commit + push + verify build)
    ↓
CAPTURE   →  "generate insight"(save knowledge from session)
    ↓
SAVE      →  "save"            (update session RAM + git status)
```

---

## Memory Hierarchy

```
LEVEL 1: ALWAYS LOADED
├── CLAUDE.md                     (auto by Claude)
└── main/ (5 files)               (core memory + session)

LEVEL 2: ON DEMAND
├── enhanced-features/ (8 runbooks)  (triggered by commands)
├── insights/ (templates + history)  (triggered by "generate insight")
└── ProjectBrief/ (26 specs)         (referenced when planning features)
```

---

## Commands Quick Reference

```bash
# Activation
"Tokwi"                    # Full activation with context

# Building
"just build it"            # Smart defaults, zero questions
"ship it"                  # Commit + push + verify

# Quality
"review [file]"            # Code review (security, quality, perf)
"check before commit"      # Build + secret scan + console.log scan

# Diagrams (auto-detect + explicit)
"show architecture"        # Architecture diagram
"show ERD"                 # Database ERD diagram
"show flow"                # Flowchart / process diagram
"show sequence"            # API sequence diagram
"save diagram"             # Save diagram to insights/

# Knowledge
"generate insight"         # Create insight from session
"show insights"            # List all insights
"project status"           # Scan all projects

# Session
"save"                     # Preserve session state
"update memory"            # Refresh relationship memory
"flow mode"                # Ultra-concise responses
"lightning"                # Fastest responses
```

---

## Size & Scope

| Folder | Files | Purpose | Load |
|--------|-------|---------|------|
| **main/** | 4 | Core identity + session | Always |
| **enhanced-features/** | 8 | Command runbooks | On demand |
| **insights/** | 5 | Knowledge capture | On demand |
| **ProjectBrief/** | 26+ | Project specs & references | On demand |
| **SwiftApp Dev/** | 4 apps | All application code | On demand |

**Total**: 5 active folders, ~43 core files, 8 runbooks

---

## Evolution Path

```
v1.0  Basic memory (main/ only)
v2.2  Added enhanced-features/ (8 modules)
v3.0  Added daily-diary/ temporal tracking
v4.0  Added vibe coding modules
v4.1  Added insights/ portfolio
v5.0  Rebuilt: 31 marketing files → 7 real runbooks
v5.1  Added diagram-generator.md (auto Mermaid diagrams)
v5.2  Lean cleanup: deleted daily-diary/, memory-library/,
      fixed AGENTS.md, removed all dead references
```
