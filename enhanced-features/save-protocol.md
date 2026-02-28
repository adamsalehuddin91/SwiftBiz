# Save Protocol

**Trigger**: User says "save"

## Steps

### 1. Read current session state
```
Read main/current-session.md
```
Note what's already recorded vs what happened this session.

### 2. Get git status for active project
```
Bash: cd "<active-project-path>" && git log --oneline -5
Bash: cd "<active-project-path>" && git status
```
Capture: latest commit hash, branch, uncommitted changes.

### 3. Update current-session.md
```
Edit main/current-session.md
```
Update these sections:
- **Last Activity**: today's date + "Session SAVED"
- **Working Memory**: add achievements from this session (commits, features, fixes)
- **Commits This Session**: add any new commits with hashes
- **Project Status**: update if changed (deployed, new features, etc.)
- **Pending**: add any new TODOs or blockers discovered

### 4. Update main-memory.md (if needed)
```
Read main/main-memory.md
Edit main/main-memory.md
```
Only update if new patterns learned about Adam:
- New workflow preferences
- New tool preferences
- Schedule/availability patterns

### 5. Update developer-guild-card.md (if applicable)
```
Read main/developer-guild-card.md
Edit main/developer-guild-card.md
```
Update stats if:
- New commits pushed
- New features shipped
- Bugs fixed
- New projects started

### 6. Confirm to user
Report back:
- What was saved (files updated)
- Latest commit hash + branch
- Any reminders set
- Quick resume command for next session
