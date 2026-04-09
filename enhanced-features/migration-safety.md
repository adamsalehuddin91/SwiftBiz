# Migration Safety Check

**Trigger**: "migration check", "check migration", "safe to migrate", "run migration"
**Auto-trigger**: Called by `deployment-checklist.md` and `hotfix-protocol.md` when DB changes detected.
**Purpose**: Verify every migration is safe before running on production — no data loss, reversible, tested.

---

## Steps

### 1. Identify pending migrations
```bash
cd "<project-path>" && php artisan migrate:status 2>&1
```
List all `Pending` migrations. If none → report "No pending migrations. Safe to deploy." and stop.

### 2. Read each migration file
```
Read database/migrations/[pending-migration-file].php
```
For each pending migration, analyze:

### 3. Classify each migration

**GREEN — Safe to run:**
- `->string()`, `->integer()`, `->boolean()` — adding new nullable column
- `->nullable()` — always safe to add
- `create_[table]` — new table, no existing data affected
- Adding index only

**YELLOW — Caution, verify first:**
- Adding non-nullable column without default → will fail if table has existing rows
- Renaming column → check all code references updated
- Adding foreign key → check orphaned data exists or not
- Changing column type → data truncation risk

**RED — HIGH RISK, confirm with Adam:**
- `->dropColumn()` → permanent data loss
- `->drop()` / `Schema::drop()` → entire table deleted
- `->change()` on data-critical column → potential truncation
- Removing foreign key constraint → referential integrity broken

### 4. Check reversibility
For each migration, verify `down()` method:
```
Grep pattern="public function down" path="database/migrations/[file].php"
```
- Has proper `down()` → reversible ✅
- Empty `down()` or missing → irreversible ⚠️ — flag to Adam

### 5. Check for data risk
```bash
# Check if affected table has data (Laravel Tinker)
cd "<project-path>" && php artisan tinker --execute="echo DB::table('[table_name]')->count();"
```
- 0 rows → safe regardless of migration type
- >0 rows + RED classification → must confirm with Adam before running

### 6. Check code references (for column renames/drops)
If migration renames or drops a column:
```
Grep pattern="[old_column_name]" path="app/" glob="*.php"
Grep pattern="[old_column_name]" path="resources/js/" glob="*.{js,jsx,ts,tsx}"
```
If references found → code must be updated before or with migration.

### 7. Backup reminder
If any RED classification found:
> "⚠️ This migration has destructive operations. Confirm backup exists before running."

Per platform backup:
| Platform | Backup method |
|----------|--------------|
| Coolify + Hetzner | Hetzner volume snapshot or pg_dump |
| Railway | Railway DB backup (dashboard) |
| Vercel + Supabase | Supabase dashboard → Database → Backups |
| SQLite (SwiftMoney) | Copy `database/database.sqlite` before deploy |

### 8. Report

```
MIGRATION SAFETY CHECK — [Project] | [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pending migrations: X

[migration_file_name]
  Type:         CREATE / ALTER / DROP
  Risk:         🟢 SAFE / 🟡 CAUTION / 🔴 HIGH RISK
  Reversible:   ✅ Yes / ⚠️ No down() defined
  Rows affected: X rows in [table]
  Action:       [specific instruction]

VERDICT:  ✅ SAFE TO MIGRATE
         ⚠️ CAUTION — review [items] before running
         ❌ BLOCKED — confirm backup + Adam approval required
```

---

## Quick Rules Summary

| Scenario | Action |
|----------|--------|
| Add nullable column | ✅ Run |
| Add non-nullable, no default, table has rows | ❌ Add default or make nullable first |
| Drop column | ❌ Confirm backup + Adam approval |
| Drop table | ❌ Confirm backup + Adam approval |
| Rename column | 🟡 Check all references in code first |
| New table | ✅ Run |
| Add index | ✅ Run |
| Change column type | 🟡 Check data size/type compatibility |

---

**Version**: v1.0 | **Created**: 2026-04-09
