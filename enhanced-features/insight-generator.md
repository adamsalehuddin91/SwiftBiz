# Insight Generator

**Trigger**: User says "generate insight" after completing work

## Steps

### 1. Get recent git activity
```
Bash: cd "<project-path>" && git log --oneline -10
Bash: cd "<project-path>" && git diff HEAD~3 --stat
```

### 2. Read session context
```
Read main/current-session.md
```
Extract: achievements, bugs fixed, features shipped, patterns discovered.

### 3. Read insight template
```
Read insights/insight-template.md
```
If template doesn't exist, use this structure:
```markdown
# Insight: [Brief Title]
**Date**: YYYY-MM-DD
**Project**: [Project Name]
**Type**: Bug Fix | Feature | Refactor | Performance | Architecture

## Problem
[What was the issue?]

## Root Cause
[Why did it happen?]

## Solution
[What was done to fix it?]

## Key Decisions
| Decision | Why | Alternative Considered |
|----------|-----|----------------------|

## Lessons Learned
- [Takeaway 1]
- [Takeaway 2]
```

### 4. Format the insight
Fill template with data from steps 1-2. Keep it factual:
- Actual commit hashes
- Actual file paths
- Actual error messages (if applicable)

### 5. Write insight file
```
Write insights/YYYY-MM-DD-brief-description.md
```
Naming: lowercase, hyphens, date-prefixed.

### 6. Confirm to user
Report: file path, summary of what was captured.
