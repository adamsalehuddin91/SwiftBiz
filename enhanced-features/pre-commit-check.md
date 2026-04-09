# Pre-Commit Check

**Trigger**: User says "check before commit" or before any commit

---

## Steps

### 0. Load baseline
```
Read enhanced-features/baselines/_global-rules.md
Read enhanced-features/baselines/[project-name].md
```
Get: AUTO-FAIL rules, accepted exceptions, deploy floor score.

### 1. Check staged files
```
Bash: cd "<project-path>" && git diff --cached --name-only
```
If nothing staged, check unstaged:
```
Bash: cd "<project-path>" && git diff --name-only
```
If nothing changed at all: report "Nothing to commit" and stop.

### 2. Verify build passes
```
Bash: cd "<project-path>" && npm run build 2>&1 | tail -20
```
Laravel projects:
```
Bash: cd "<project-path>" && php artisan config:clear && php artisan route:list --compact 2>&1 | tail -10
```
If build fails: **BLOCK**. Report errors. Do not proceed.

### 3. AUTO-FAIL scan (blocks commit if any found)

Run against staged/changed files only:

**Security:**
```
Grep pattern="innerHTML|dangerouslySetInnerHTML" path="<changed-files>"
Grep pattern="eval\(|new Function\(" path="<changed-files>"
Grep pattern="(password|api_key|secret|token)\s*=\s*['\"][^'\"]{8,}" path="<changed-files>" -i
Grep pattern="http://" path="<changed-files>" glob="*.{ts,tsx,js,php}"
Grep pattern="APP_DEBUG\s*=\s*true" path="<changed-files>"
```

**Authorization (Laravel):**
```
Grep pattern="public function (store|update|destroy|create|edit)" path="<changed-files>" glob="*.php"
```
For each match: verify `$this->authorize()` or Gate exists in that method.

**Authorization (Next.js):**
```
Grep pattern="export (default )?async function (POST|PUT|DELETE|PATCH)" path="<changed-files>" glob="*.ts"
```
For each match: verify session/auth check exists.

**SQL Injection:**
```
Grep pattern="DB::statement\(.*\$|whereRaw\(.*\$" path="<changed-files>" glob="*.php"
```

**IDOR:**
```
Grep pattern="->find\(\$" path="<changed-files>" glob="*.php"
```
Flag each: must verify ownership check present.

### 4. HIGH severity scan (warns, does not block)

```
Grep pattern="console\.(log|error|warn|debug)" path="<changed-files>" glob="*.{ts,tsx,js}"
Grep pattern="dd\(|dump\(|var_dump\(|ray\(" path="<changed-files>" glob="*.php"
Grep pattern=": any" path="<changed-files>" glob="*.{ts,tsx}"
Grep pattern="eslint-disable" path="<changed-files>"
Grep pattern="TODO|FIXME|HACK" path="<changed-files>"
Grep pattern="\.single\(\)" path="<changed-files>" glob="*.ts"
Grep pattern="Model::all\(\)" path="<changed-files>" glob="*.php"
```

### 5. Show diff summary
```
Bash: cd "<project-path>" && git diff --cached --stat
```

### 6. Report results

**If AUTO-FAIL found — BLOCKED:**
```
PRE-COMMIT CHECK — [Project] | [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILD:      PASS / FAIL
AUTO-FAIL:  ❌ BLOCKED — X issue(s) found

  [S2] dangerouslySetInnerHTML — components/Modal.tsx:42
  [A4] find($id) no ownership check — InvoiceController.php:88
  [Q1] console.log — services/pos.ts:15

HIGH:       X warning(s)
  [Q2] : any — types/index.ts:7
  [Q3] eslint-disable — Dashboard.tsx:103

FILES:      N files changed, +X −Y lines

VERDICT:    ❌ COMMIT BLOCKED
Fix AUTO-FAIL issues above before committing.
```

**If PASS:**
```
PRE-COMMIT CHECK — [Project] | [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILD:      PASS
AUTO-FAIL:  ✅ CLEAR
HIGH:       ✅ CLEAR  (or: ⚠️ X warning(s) — review recommended)
TODOs:      CLEAR / ⚠️ X found

FILES:      N files changed, +X −Y lines

VERDICT:    ✅ READY TO COMMIT
```

---
**Version**: v2.0 | **Updated**: 2026-04-09
**Changes**: Added Step 0 (load baseline), structured AUTO-FAIL vs HIGH separation, BLOCKED vs PASS verdict format, baseline-aware checks.
