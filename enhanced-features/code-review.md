# Code Review

**Trigger**: User says "review [file/project]"

## Steps

### 0. Load baseline
```
Read enhanced-features/baselines/_global-rules.md
Read enhanced-features/baselines/[project-name].md   ← match to active project
```
Get: quality floor, AUTO-FAIL rules, accepted exceptions, last review score.
If no project baseline exists, use global rules only.

### 1. Read target files
```
Read <target-file>
```
If user says "review project", identify key files:
```
Glob src/**/*.ts or app/**/*.tsx (depending on project)
```
Focus on recently changed files first:
```
Bash: cd "<project-path>" && git diff --name-only HEAD~5
```

### 2. Check for code quality issues
```
Grep pattern="console\.(log|error|warn)" path="<target>"
Grep pattern="TODO|FIXME|HACK|XXX" path="<target>"
Grep pattern=": any" path="<target>" glob="*.{ts,tsx}"
Grep pattern="eslint-disable" path="<target>"
```

### 3. Check for security issues
```
Grep pattern="innerHTML|dangerouslySetInnerHTML" path="<target>"
Grep pattern="eval\(|Function\(" path="<target>"
Grep pattern="password|secret|api.key" path="<target>" -i
Grep pattern="http://" path="<target>" glob="*.ts"
```

### 4. Check for performance issues (React/Next.js)
```
Grep pattern="useEffect\(\s*\(\)" path="<target>" glob="*.tsx"
Grep pattern="\.map\(.*\.map\(" path="<target>"
Grep pattern="JSON\.parse\(JSON\.stringify" path="<target>"
```

### 5. Check for Laravel/PHP-specific issues (PokSystem only)
```
Grep pattern="dd\(|dump\(|var_dump\(" path="<target>" glob="*.php"
Grep pattern="->withTrashed\(" path="<target>" glob="*.php"
Grep pattern="auth\(\)->can\(|\$this->authorize" path="<target>" glob="*.php"
```
Verify: no debug helpers left in (`dd()`, `dump()`), `withTrashed()` always paired with authorization check, all controller methods have `$this->authorize()` or policy gate.

### 6. Check for Supabase-specific issues (Next.js projects only)
```
Grep pattern="\.from\(" path="<target>" glob="*.ts"
```
Verify: `.range()` used for large queries, `.single()` vs `.maybeSingle()` correct usage, RLS considered.

### 6. Generate review report

**Header:**
```
REVIEW: [Project] — [YYYY-MM-DD]
SCORE: X.X/10  (was X.X — [improved/regressed/same])
STATUS: PASS / FAIL
AUTO-FAIL issues: X  |  HIGH: X  |  MEDIUM: X  |  LOW: X
Deploy threshold: [floor]/10 — [MET / NOT MET]
```

**Issues table:**
| Category | Issue | File:Line | Severity |
|----------|-------|-----------|----------|
| Security | innerHTML usage | file.tsx:42 | AUTO-FAIL |
| Quality | console.log left in | file.ts:15 | LOW |
| Performance | useEffect no deps | page.tsx:23 | MEDIUM |

**Score calculation:**
```
Start: 10/10
Each AUTO-FAIL: -1.5
Each HIGH:      -0.8
Each MEDIUM:    -0.3
Each LOW:       -0.1
Final: X.X/10
```

**Footer:**
```
Must fix before commit: [list AUTO-FAIL items]
Fix before deploy: [list HIGH items]
```

### 7. Update baseline review history
Append to `enhanced-features/baselines/[project].md` Review History table:
```
| [today's date] | X.X/10 | X | X | X | PASS/FAIL | [one-line summary] |
```

### 8. Optionally save full review
If user wants to save:
```
Write insights/YYYY-MM-DD-review-<project>.md
```

---
**Version**: v1.2 | **Updated**: 2026-04-09
**Changes**: Added Step 0 (load baseline), updated Step 6 output format with score + pass/fail, added Step 7 (update baseline history).
