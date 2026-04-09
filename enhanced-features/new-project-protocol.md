# New Project Protocol

**Trigger**: User says `"new coding project [name]"`

## Steps

### 1. Parse command
Extract: project name from command. Validate it doesn't already exist in `projects/coding-projects/active/`.

### 2. Gather project details
Ask user for:
- Brief description (1-2 sentences)
- Stack (framework, DB, deploy target)
- Repo URL (if known)

### 3. Create project file
```
Read projects/templates/coding-template.md
```
Fill in: name, description, date, stack, status = Active, position = #1.
```
Write projects/coding-projects/active/[kebab-name].md
```

### 4. Apply LRU positioning
```
Read projects/project-list.md
```
- Insert new project at **Position #1**
- Shift all existing projects down by one
- If a project moves to **Position #11**: move its file to `projects/coding-projects/archived/`, update status to "Archived (LRU)", note archive date
- Save updated `projects/project-list.md`

### 5. Update session memory
```
Edit main/current-session.md
```
Add under active project:
```
## Active Project
- Name: [project name]
- Type: coding
- Started: [date]
- Context: [description]
```

### 6. Confirm
```
✅ Project Created: [name]
📁 Type: coding
📍 Position: #1
📝 [Brief description]

3 free slots remaining (7/10 active)
```

## Error Handling
- **Name already exists**: Suggest `load project [name]` instead
- **10 slots full**: Inform which project will be auto-archived, confirm before proceeding
- **Archives > 50**: Suggest manual cleanup of `archived/`

---
**Version**: v1.1 | **Updated**: 2026-02-23
**Adapted from**: LRU-Project-Management-System v1.0 (paths corrected for Tokwi)
