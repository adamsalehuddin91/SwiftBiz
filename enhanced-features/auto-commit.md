# Auto-Commit — Intelligent Commit System

**Trigger**: User says `"commit"`, `"save changes"`, `"git commit"`, `"push"`, `"commit and push"`, or after completing any task (Vigilant mode)

## Config

- **Author**: Adam Salehuddin <adamsalehuddin91@gmail.com>
- **Section 1**: TECHNICAL CHANGES (files + what changed)
- **Section 2**: SESSION CONTEXT (project, type, time)
- **Activation message**: "Committing changes to history..."

---

## Context Guard

| Context | Status |
|---------|--------|
| User says "commit", "save changes" | ACTIVE — full protocol |
| AI completes a task (Vigilant mode) | ACTIVE — auto-detect and commit |
| User says "push" or "commit and push" | ACTIVE — commit + push |
| No git repository detected | DORMANT — warn and skip |
| No changes to commit (clean tree) | DORMANT — report "Nothing to commit" |
| Personal/casual conversation | DORMANT — no commit action |

---

## Commit Protocol

### Step 0: Pre-Flight Check
```
Bash: cd "<project-path>" && git status
```
- If no changes: report "Nothing to commit" and exit
- If unstaged changes: stage relevant files (prefer specific filenames)

### Step 1: Analyze Changes
```
Bash: cd "<project-path>" && git diff --staged
Bash: cd "<project-path>" && git diff
Bash: cd "<project-path>" && git log --oneline -5
```
- Read actual code changes
- Identify nature: feature, bug fix, refactor, docs
- Estimate time spent from session context

### Step 2: Draft Commit Message
Apply format:
```
[Achievement Title] - [Brief technical summary]

=== TECHNICAL CHANGES ===
* [File/Component]: [Specific change description]
* [File/Component]: [Specific change description]

=== SESSION CONTEXT ===
* Project: [name] | Type: [type] | Time: ~XX min
```

For trivial changes: one-liner, no sections.
For incomplete work: `WIP:` prefix.

### Step 3: Execute Commit
```
Bash: cd "<project-path>" && git add [specific files]
```
- Warn if sensitive files staged (.env, credentials, API keys)
- Commit using HEREDOC format
- Verify with `git status`

### Step 4: Confirm
- Display: short hash, title, files changed
- Show remaining unstaged/untracked if any

### Step 5: Push (Optional)
- Only if user explicitly said "push" or "commit and push"
- Never auto-push

---

## Vigilant Mode — Proactive Detection

After completing ANY task, automatically:

1. **Auto-check** — run `git status` silently
2. **Detect** — if uncommitted changes exist from completed task
3. **Auto-commit** — execute full commit protocol
4. **Report** — confirm what was committed

### Trigger Points
- After completing a coding task
- After a context shift (coding → casual)
- After save operations
- On session start — detect leftover uncommitted work

### Vigilant Behavior
- No approval gate — draft and commit in one flow
- If multiple logical change groups: commit separately
- Always report what was committed

---

## Mandatory Rules

1. **No emoji in commit messages** — clean text only
2. **Author is always Adam** — commits under Adam's name, not AI
3. **Prefer specific file staging** — `git add [filename]` not `git add -A`
4. **Time estimate required** — include approx time in session section
5. **Warn on sensitive files** — .env, credentials, API keys → warn and exclude
6. **Never auto-push** — pushing is always explicit
7. **Follow recent commit style** — check `git log` for consistency

## Edge Cases

| Situation | Behavior |
|-----------|----------|
| No changes | "Nothing to commit — working tree is clean" |
| Merge conflicts | Warn user, do not commit |
| Sensitive files staged | Block, list files, ask to confirm or exclude |
| No git repo | "No git repository found in this directory" |
| Multiple logical changes | Split into separate commits |

---
**Version**: v1.0 | **Installed**: 2026-02-28
**Source**: Project-AI-MemoryCore-Tokwi/Feature/Auto-Commit-System
