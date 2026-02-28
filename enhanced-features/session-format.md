# Session Memory - Format Reference
*Permanent reference template for session RAM structure with 500-line limit*

```markdown
# Current Session Memory - [Date]
*Active working memory for current conversation*

## Session Context
**Session Type**: [Work/Personal/Mixed]
**Current Project**: [Active project name, if any]
**Status**: [Active/Paused/Wrapping up]

## Current Focus
- **Primary Task**: [What we're working on]
- **Technical Context**: [Relevant technical details]
- **Progress**: [Brief progress summary]

## Working Memory
### Active Context
- **Current Topic**: [What we're discussing]
- **Immediate Goals**: [Session objectives]
- **Recent Progress**: [What was just completed]
- **Next Steps**: [What comes next]

### Important Decisions
- [Key decision 1 made this session]
- [Key decision 2 made this session]

## Session Recap (For AI Restart)
*Quick summary when AI loads after close/reopen*
- **Previous Session Summary**: [Key points from last conversation]
- **Where We Left Off**: [Context for continuing]
- **Important Context**: [Critical info for continuity]

## Session Achievements
- [Achievement 1]
- [Achievement 2]

## Quick Context for Next Session
- **Where We Left Off**: [Last activity]
- **What's Working**: [Current state of things]
- **What Needs Attention**: [Pending items]
```

---

## 500-Line Limit Protocol

### Rule
Session memory must not exceed **500 lines**.

### When Limit is Reached
RAM-style reset:

1. **Preserve** the `## Session Recap` section (last 20-30 lines)
2. **Clear** all detailed working memory, achievements, and decisions
3. **Rebuild** session file following this format template
4. **Continue** seamlessly — recap provides enough context

### What Gets Preserved (Recap Only)
- Brief summary of session so far
- Where conversation left off
- Critical context for continuity

### What Gets Cleared
- Detailed conversation progress
- Individual achievement entries
- Working memory details
- Session-specific decisions (summarized into recap)

### Auto-Reset Behavior
```
IF current-session.md line count > 500:
    1. Read current Session Recap section
    2. Summarize key achievements into recap
    3. Clear file and rebuild from session-format.md template
    4. Write preserved recap into new structure
    5. Continue session with clean working memory
```

*Session Format Template v1.0 | Installed 2026-02-28*
