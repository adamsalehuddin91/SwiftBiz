# Insight: Rebuilt enhanced-features/ from Marketing to Runbooks

**Date**: 2026-02-12
**Project**: AI Memory Core (Tokwi)
**Type**: Refactor / Architecture

## Problem

The `enhanced-features/` folder contained 31 files (~10,300 lines) of marketing-style documentation. None of the files contained actual tool instructions. They described capabilities in abstract terms ("predictive assistance engine", "cross-project learning transfer") but never specified which tools to use or what steps to follow.

Result: the folder was dead weight - never loaded, never referenced during real work.

## Root Cause

Original files were written as feature specs / pitch documents, not as operational runbooks. They described *what* Tokwi could do in theory, not *how* to do it with Claude Code tools (Read, Write, Edit, Bash, Grep, Glob).

## Solution

Deleted all 31 files. Replaced with 7 runbook files (393 lines total):

| File | Trigger | Tools Used |
|------|---------|------------|
| `save-protocol.md` | "save" | Read, Bash, Edit |
| `session-start.md` | "Tokwi" | Read (x3) |
| `code-review.md` | "review [file]" | Read, Grep (x7), Bash |
| `project-scanner.md` | "project status" | Glob, Bash (x3) |
| `insight-generator.md` | "generate insight" | Bash, Read, Write |
| `pre-commit-check.md` | "check before commit" | Bash, Grep (x3) |
| `cross-project-patterns.md` | reuse patterns | Grep, Read |

Each file follows: **Trigger → Steps (with exact tool calls) → Output format**.

Updated references in CLAUDE.md, master-memory.md, ARCHITECTURE.md to v5.0.

## Key Decisions

| Decision | Why | Alternative Considered |
|----------|-----|----------------------|
| 7 files instead of 31 | Each maps to a real user command | Keep granular (too many unused files) |
| Runbook format | Directly executable by Claude Code | Descriptive docs (not actionable) |
| ~50-65 lines each | Enough detail without bloat | Longer with examples (unnecessary) |
| v5.0 version bump | Breaking change from 31→7 files | Incremental (misleading) |

## Lessons Learned

- Documentation that doesn't reference real tools is dead weight
- Runbook format (trigger → tool → output) is the only format that gets used
- 393 lines replacing 10,300 lines = 96% reduction with more actual value
- Every enhanced-feature file should answer: "what tool do I call and with what arguments?"
