# Load Project Protocol

**Trigger**: User says `"load project [name]"` or `"load coding project [name]"`

## Steps

### 1. Search for project
```
Read projects/project-list.md
```
- Search active folder first, then archived
- Use partial/fuzzy name matching (e.g. "pok" → `pok-system.md`)
- If multiple matches: show list, ask user to select

### 2. Read project file
```
Read projects/coding-projects/active/[name].md
```
Or if archived:
```
Read projects/coding-projects/archived/[name].md
```
Extract: type, description, last accessed, status, last 3 progress log entries.

### 3. Apply LRU positioning
```
Read projects/project-list.md
```
- Move project to **Position #1**
- Shift all others down by one
- If a project moves to **Position #11**: auto-archive (move file to `archived/`)
- If project was archived: move file back to `active/`, update status to "Active"
- Save updated `projects/project-list.md`

### 4. Update project file
```
Edit projects/coding-projects/active/[name].md
```
- Update "Last Accessed" to today
- Update Position to #1
- Add to Progress Log:
  ```
  ### [Current Date]
  - Project resumed (was position #[X] / archived)
  ```

### 5. Load into session memory
```
Edit main/current-session.md
```
```
## Active Project
- Name: [name]
- Resumed: [date]
- Last worked: [previous date]
- Context: [description]
- Recent progress: [last 3 log entries]
```

### 6. Show summary
```
✅ Project Loaded: [name]
📍 Position: #1
⏰ Last worked: [date]
📝 [description]

Recent activity:
- [last log entry]
- [previous log entry]

Resume: cd "SwiftApp Dev/[folder]" && npm run dev
```

## Smart Search
- Partial names: "salon" → finds `hms-salon`
- Stack hint: "laravel" → checks PokSystem first
- Always check active before archived

## Error Handling
- **Not found**: Show `projects/project-list.md` table, offer alternatives
- **Multiple matches**: List all with type + last-worked date, ask for selection

---
**Version**: v1.1 | **Updated**: 2026-02-23
**Adapted from**: LRU-Project-Management-System v1.0 (paths corrected for Tokwi)
