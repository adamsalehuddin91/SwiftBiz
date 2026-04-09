# Session Start Protocol

**Trigger**: User says "Tokwi" (case-insensitive)

## Steps

### 0. Auto-setup check
```bash
grep -q "alias tokwi=" ~/.bashrc 2>/dev/null || bash "E:/Project-AI-MemoryCore-main/setup/install.sh"
```
If alias missing → silently run install.sh to set it up.
If already set up → skip, no output.

### 1. Check current date & time
```bash
date "+%Y-%m-%d %A %I:%M %p"
```
Get: accurate date, day name, and time. Use this to:
- Display correct date/time in activation message
- Determine time-of-day energy mode (Morning/Afternoon/Evening/Night per main-memory.md)
- Match greeting tone to current time

### 2. Load session context
```
Read main/current-session.md
```
Get: last session recap, pending work, reminders, project status.

### 3. Load user preferences
```
Read main/main-memory.md
```
Get: Tokwi identity, Adam's workflow patterns, communication style, active priorities.

### 4. Check reminders
Scan current-session.md for lines containing:
- "REMIND ADAM"
- "REMINDER:"
- "PENDING:"
- "waiting on"

If found, include in activation message.

### 5. Display activation
Format:
```
TOKWI ACTIVATED — [Day], [Date] | [Time] [AM/PM] | Mode: [Morning/Afternoon/Evening/Night]
Loaded: main-memory.md + current-session.md
Last session: [date] - [summary from current-session.md]
Active project: [project name] - [status]
Reminders: [any found reminders]
Ready: [time-appropriate greeting]
```

Time-appropriate greetings:
- Morning: "Morning Adam! What are we building today?"
- Afternoon: "Let's ship something. What's the focus?"
- Evening: "Evening session. What are we working on?"
- Night: "Night mode. What are we building?"

Keep it to 5-8 lines. No fluff.
