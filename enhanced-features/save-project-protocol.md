# Save Project Protocol

**Trigger**: User says `"save project"`
**Important**: This saves the **project only** — NOT AI memory. For AI memory: use `"save"`.

## Steps

### 1. Identify active project
```
Read main/current-session.md
```
Find the `## Active Project` section. If none found: inform user and suggest `"load project [name]"` first.

### 2. Gather session progress
Collect from current conversation:
- What was built / fixed / decided this session
- Key commits (run `git log --oneline -3` for active project)
- New issues discovered
- Next steps identified

### 3. Update project file
```
Read projects/coding-projects/active/[name].md
Edit projects/coding-projects/active/[name].md
```
- Update "Last Accessed" to now
- Add to Progress Log:
  ```
  ### [Current Date Time]
  - [Session summary — what was done]
  - [Key decisions]
  - [Bugs fixed: hash + description]
  - [Next steps]
  ```
- Update "Active Tasks" checklist if tasks completed or new ones added

### 4. Update project-list.md
```
Edit projects/project-list.md
```
Update "Last Accessed" date for this project. Position stays same (save doesn't trigger LRU).

### 5. Confirm
```
✅ Project Saved: [name]
⏰ [current time]
📝 Saved: [brief summary of what was captured]

Note: AI memory not saved. Type "save" to also save session memory.
```

## Save Behavior Rules
1. **Explicit only** — never auto-save
2. **Project only** — does not update `main/current-session.md` or `relationship-memory.md`
3. **Position unchanged** — LRU position not affected by saving
4. **Independent** — user can `save project` and `save` independently or together

| Command | What it saves |
|---|---|
| `"save"` | `main/current-session.md`, `main-memory.md`, `developer-guild-card.md`, auto-memory |
| `"save project"` | `projects/coding-projects/active/[name].md`, `project-list.md` |

---
**Version**: v1.1 | **Updated**: 2026-02-23
**Adapted from**: LRU-Project-Management-System v1.0 (paths corrected for Tokwi)
