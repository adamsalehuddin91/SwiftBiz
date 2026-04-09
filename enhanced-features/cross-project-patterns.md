# Cross-Project Patterns

**Trigger**: Building something similar to a past project, or user asks to reuse a pattern

## Common Patterns to Search

### Supabase CRUD
```
Grep pattern="\.from\(['\"]" path="SwiftApp Dev/" glob="*.ts"
```
Look for: `.select()`, `.insert()`, `.update()`, `.delete()`, `.range()` patterns.

### Modal Components
```
Grep pattern="(isOpen|onClose|Modal)" path="SwiftApp Dev/" glob="*.tsx"
```

### API Routes (Next.js)
```
Glob SwiftApp Dev/**/app/api/**/*.ts
```

### Auth / Session
```
Grep pattern="(createClient|supabase\.auth|getSession)" path="SwiftApp Dev/" glob="*.ts"
```

### Receipt / PDF Generation
```
Grep pattern="(jsPDF|generateReceipt|pdf)" path="SwiftApp Dev/" glob="*.ts"
```

### Booking / Appointment
```
Grep pattern="(booking|appointment)" path="SwiftApp Dev/" glob="*.ts" -i
```

### Laravel Eloquent (PokSystem)
```
Grep pattern="->where\(|->with\(|->belongsTo" path="SwiftApp Dev/PokSystemManagement/" glob="*.php"
Grep pattern="->paginate\(|->get\(|->first\(" path="SwiftApp Dev/PokSystemManagement/" glob="*.php"
Glob SwiftApp Dev/PokSystemManagement/app/Http/Controllers/**/*.php
```
Look for: model relationships, query patterns, controller CRUD structure.

### Prisma ORM (SwiftStay)
```
Grep pattern="prisma\.\w+\.findMany|prisma\.\w+\.create|prisma\.\w+\.update" path="SwiftApp Dev/swiftstay/" glob="*.ts"
Grep pattern="include:\s*{" path="SwiftApp Dev/swiftstay/" glob="*.ts"
```
Look for: relation includes, upsert patterns, transaction blocks.

## Steps

### 1. Identify the pattern needed
User describes what they're building. Match to a known pattern above.

### 2. Search existing projects
```
Grep pattern="<relevant-pattern>" path="SwiftApp Dev/"
```
Read the best matching files:
```
Read <matching-file>
```

### 3. Adapt to current project
When copying patterns across projects, check:
- Import paths (adjust for target project structure)
- Type definitions (match target project's interfaces)
- Naming conventions (match target project's style)
- Environment variables (different Supabase URLs, API keys)
- Component library (Tailwind classes, UI components)

### 4. Present adapted code
Show user the adapted code with:
- Source file it came from
- Changes made for current project
- Any manual steps needed (env vars, migrations, etc.)

---
**Version**: v1.1 | **Updated**: 2026-02-23
**Changes**: Added Laravel Eloquent (PokSystem) and Prisma ORM (SwiftStay) pattern sections.
