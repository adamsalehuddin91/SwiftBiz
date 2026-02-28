# Work Plan Execution

**Trigger**: User says `"copy plan"`, `"append plan"`, `"resume plan"`, `"start the plan"`, `"continue the plan"`, `"execute plan"`

## Config

- **Plan location**: `Project Resources/project-plan.md` (relative to active project root)
- **Plan source**: `C:\Users\Admin\.claude\plans\` (Claude Code plan mode output)
- **Line limit**: 1000 lines (auto-rotate on exceed)
- **Commit chain**: Yes (chains with Auto-Commit if installed)
- **Format reference**: `enhanced-features/plan-format.md`

---

## Command: Copy Plan

### Step 1: Find Latest Plan
```
Bash: ls -lt "C:/Users/Admin/.claude/plans/" | head -5
```
- Sort by modification date, pick most recent
- If no plan files found: ask user to specify a path or enter plan mode first

### Step 2: Transform to Project Plan Format
```
Read <latest-plan-file>
```
- Convert plan steps into `- [ ]` checkbox todo items
- Preserve all architecture diagrams (ASCII, mermaid) from original plan
- Add standard instructions header (see `plan-format.md`)
- Maintain logical phase/section grouping
- No emoji in plan files — clean, parseable markdown only

### Step 3: Write Project Plan
```
Bash: mkdir -p "<project-root>/Project Resources"
Write <project-root>/Project Resources/project-plan.md
```
- Overwrite if exists
- Report: "Plan copied — [X] todo items ready for execution"

### Step 4: Begin Execution
- Execute the **Shared Execution Loop** (below)

---

## Command: Append Plan

### Step 1-2: Same as Copy Plan

### Step 3: Check Existing Plan + Line Limit
```
Read <project-root>/Project Resources/project-plan.md
```
- Count total lines
- If appending would NOT exceed 1000 lines:
  - Append with date separator: `## Appended: [YYYY-MM-DD]`
  - Report: "Plan extended — [X] new items, [Y] total"
- If appending WOULD exceed 1000 lines:
  - Rename current file to `project-plan-YYYYMMDD.md` (archived)
  - Create fresh `project-plan.md` with new content only
  - Report: "Previous plan archived, new plan created"

### Step 4: Begin Execution
- Execute the **Shared Execution Loop** (below)

---

## Command: Resume Plan

### Step 1: Read Current Project Plan
```
Read <project-root>/Project Resources/project-plan.md
```
- If file not found: report "No plan found — use 'copy plan' to create one"

### Step 2: Parse Progress
- Count `[x]` items (completed)
- Count `[ ]` items (pending)
- Count `[~]` items (blocked)
- Identify next pending `[ ]` item as resumption point
- Read Architecture section for technical context

### Step 3: Report Status
```
Plan Status: [X] completed, [Y] pending, [Z] blocked
Current Phase: [phase name]
Next Task: [description of next pending item]
```

### Step 4: Resume Execution
- Execute the **Shared Execution Loop** from next pending item

---

## Shared Execution Loop

The core cycle for all three commands:

```
For each [ ] todo item in order:
  1. Execute the task (write code, create files, make changes)
  2. If Auto-Commit installed → trigger commit for this item
  3. Mark the item as [x] in the plan file
  4. Every 5 completed items → checkpoint save the plan file
  5. Move to next [ ] item
  6. If item is [~] (blocked) → skip and continue to next
```

### Key Behaviors
- **Per-task commits** — each completed todo gets its own commit (not batched)
- **Checkpoint saves** — plan file updated every 5 items to prevent loss
- **Skip blocked items** — `[~]` items flagged and skipped
- **User can pause** — if user says "stop" or "pause", halt at current item

### Without Auto-Commit
- Tasks still executed and marked `[x]` in plan file
- Commits done manually by user
- Plan file still serves as recovery mechanism

---

## Checkbox Convention

| Symbol | Meaning |
|--------|---------|
| `- [ ]` | Pending — not yet started |
| `- [x]` | Completed — done and committed |
| `- [~]` | Blocked — flagged, skip for now |

## Mandatory Rules

1. **Commit chain per-todo** — every completed todo triggers a commit (if Auto-Commit installed)
2. **Never commit plan files** — `project-plan*.md` stays local as AI working reference
3. **Preserve diagrams** — all visual elements from original plan carry over
4. **No emoji in plan files** — clean, parseable markdown only
5. **Line limit enforcement** — rotate at 1000 lines
6. **Recovery-first design** — plan file IS the recovery mechanism after any context reset
7. **Checkpoint discipline** — update plan file every 5 completed items

---
**Version**: v1.0 | **Installed**: 2026-02-28
**Source**: Project-AI-MemoryCore-Tokwi/Feature/Work-Plan-Execution
