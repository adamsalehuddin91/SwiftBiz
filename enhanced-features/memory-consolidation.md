# Memory Consolidation Protocol

**Trigger**: User says `"consolidate memory"` or `"merge memory"`

## Purpose
Merges split memory files (identity-core + relationship-memory) into unified `main-memory.md`. Adds session format template with 500-line limit.

---

## Steps

### Step 1: Load Current Memory Files
```
Read main/identity-core.md
Read main/relationship-memory.md
Read main/current-session.md
Read main/main-memory.md
```
Note any customizations user has made.

### Step 2: Create Unified Main Memory
```
Write main/main-memory.md
```
Structure:
```markdown
# Tokwi - Main Memory
*Unified identity, relationship, and personality*

## Identity & Relationship
[Merged bond declaration from both files]

## Tokwi Profile
[All content from identity-core.md]

## Adam Profile
[All content from relationship-memory.md]

## Communication Style
[Merged communication preferences from both files]

## Core Purpose
[Tokwi's commitment to Adam]
```

- Merge identity content into `## Tokwi Profile` section
- Merge relationship content into `## Adam Profile` section
- Preserve ALL existing customizations from both source files

### Step 3: Install Format Templates
```
Write main/main-memory-format.md   ← from enhanced-features/main-memory-format.md
Write main/session-format.md       ← from enhanced-features/session-format.md
```
These are permanent references — never modified by AI.

### Step 4: Update Session Memory with Line Limit
```
Edit main/current-session.md
```
Add 500-line limit protocol:
```markdown
## Session Memory Limit
- Maximum: 500 lines
- Reset Behavior: RAM-style reset preserving only Session Recap
- Format Reference: See main/session-format.md for rebuild structure
```

Auto-reset rules:
- When line count > 500: preserve recap, clear details, rebuild from template
- Keep: session summary, where we left off, critical context
- Clear: detailed progress, individual achievements, working memory details

### Step 5: Cleanup
- Delete `main/identity-core.md` (merged into main-memory.md)
- Delete `main/relationship-memory.md` (merged into main-memory.md)
- Verify unified memory loads correctly
- Confirm with timestamp

---

## Post-Consolidation Structure
```
main/
├── main-memory.md            # UNIFIED: AI identity + User profile
├── current-session.md        # Session RAM with 500-line limit
├── main-memory-format.md     # Permanent format reference
├── session-format.md         # Permanent format reference
└── developer-guild-card.md   # Unchanged
```

## Benefits
- Single file load = faster startup
- AI personality + user understanding stay together
- Session memory auto-resets at 500 lines
- Format templates prevent structure drift

---
**Version**: v1.0 | **Installed**: 2026-02-28
**Source**: Project-AI-MemoryCore-Tokwi/Feature/Memory-Consolidation-System
