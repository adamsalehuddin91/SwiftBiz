# ★ Code Review Insight Template

**For documenting code reviews, refactoring, and analysis**

---

## Format: Code Review Insight

```markdown
★ Insight - Code Review
Summary - [Project/Module Name] Review ([Focus Area]):

| Issue Found             | Why It's a Problem           | Recommended Fix              |
|------------------------|------------------------------|------------------------------|
| [Code smell/bug]       | [Impact on system]           | [How to improve]             |
| [Security issue]       | [Vulnerability risk]         | [Security fix]               |
| [Performance problem]  | [Bottleneck cause]           | [Optimization approach]      |

Files Reviewed:
1. [file-path] - [Issues found / Rating]
2. [file-path] - [Issues found / Rating]
3. [file-path] - [Issues found / Rating]

Overall Assessment:
- Code Quality: [Rating 1-5] ⭐⭐⭐
- Security: [Rating 1-5] ⭐⭐⭐⭐
- Performance: [Rating 1-5] ⭐⭐⭐
- Best Practices: [Rating 1-5] ⭐⭐⭐⭐⭐

Priority Actions:
1. [High priority fix]
2. [Medium priority improvement]
3. [Nice to have enhancement]

Patterns Observed: [List patterns - good and bad]
```

---

## Example 1: Security Review

```markdown
★ Insight - Code Review
Summary - SwiftSalon Authentication Review (Security Audit):

| Issue Found                  | Why It's a Problem              | Recommended Fix                    |
|------------------------------|--------------------------------|------------------------------------|
| Passwords stored in plaintext | Database breach = all leaked   | Use bcrypt with salt              |
| No rate limiting on login    | Brute force attacks possible    | Add express-rate-limit            |
| JWT secret in code           | Secret exposed in Git           | Move to environment variables      |
| No input sanitization        | SQL injection vulnerable        | Use Prisma ORM or parameterized    |

Files Reviewed:
1. src/auth/login.ts - **CRITICAL**: Plaintext passwords, no rate limit
2. src/config/jwt.ts - **HIGH**: Hardcoded secret
3. src/api/user.ts - **MEDIUM**: Missing input validation
4. src/middleware/auth.ts - **LOW**: Could be more robust

Overall Assessment:
- Code Quality: ⭐⭐⭐ (3/5)
- Security: ⭐⭐ (2/5) - CRITICAL ISSUES
- Performance: ⭐⭐⭐⭐ (4/5)
- Best Practices: ⭐⭐⭐ (3/5)

Priority Actions:
1. **URGENT**: Hash all passwords with bcrypt (affects all users)
2. **HIGH**: Move JWT secret to .env (security leak)
3. **MEDIUM**: Add rate limiting (prevent brute force)
4. **LOW**: Input validation (defense in depth)

Patterns Observed:
- ❌ Security-first mindset missing
- ✅ Good code structure and organization
- ❌ Configuration mixed with code
- ✅ Consistent error handling
```

---

## Example 2: Performance Review

```markdown
★ Insight - Code Review
Summary - Stock Monitor Performance Review (Optimization Analysis):

| Issue Found                    | Why It's a Problem                | Recommended Fix                      |
|-------------------------------|----------------------------------|--------------------------------------|
| N+1 query in stock list       | 200+ stocks = 200+ DB queries    | Add batch loading / JOIN             |
| No pagination                 | Loading all 200 stocks at once   | Implement virtual scrolling          |
| No caching on API calls       | Every render = new API call      | Add React Query with 5min cache      |
| Large bundle size (2.5MB)     | Slow initial load                | Code splitting + lazy loading        |

Files Reviewed:
1. src/pages/StockDashboard.jsx - **CRITICAL**: N+1 query, no pagination
2. src/services/stockApi.js - **HIGH**: No caching strategy
3. src/components/StockTable.jsx - **MEDIUM**: Renders all rows
4. webpack.config.js - **MEDIUM**: No code splitting

Overall Assessment:
- Code Quality: ⭐⭐⭐⭐ (4/5)
- Security: ⭐⭐⭐⭐⭐ (5/5)
- Performance: ⭐⭐ (2/5) - NEEDS WORK
- Best Practices: ⭐⭐⭐⭐ (4/5)

Priority Actions:
1. **URGENT**: Fix N+1 query (200x DB load reduction)
2. **HIGH**: Add React Query caching (5x faster perceived speed)
3. **HIGH**: Implement virtual scrolling (handle 1000+ stocks)
4. **MEDIUM**: Code splitting (reduce initial bundle 60%)

Patterns Observed:
- ❌ No performance optimization strategy
- ✅ Clean component structure
- ❌ Missing modern data fetching patterns
- ✅ Good TypeScript usage
- ✅ Responsive design
```

---

## Example 3: Code Quality Review

```markdown
★ Insight - Code Review
Summary - MasjidConnect Codebase Review (Maintainability):

| Issue Found                      | Why It's a Problem                | Recommended Fix                    |
|---------------------------------|----------------------------------|-----------------------------------|
| 500+ line components            | Hard to understand & test         | Break into smaller components      |
| Duplicate logic in 5 files      | Bug fixes need 5 changes          | Create shared utility functions    |
| No TypeScript types             | Runtime errors, no autocomplete   | Migrate to TypeScript gradually    |
| Magic numbers everywhere        | Unclear intent ("what is 86400?") | Extract to named constants         |

Files Reviewed:
1. src/components/Dashboard.jsx - **HIGH**: 650 lines, needs split
2. src/utils/date.js - **MEDIUM**: Duplicated in 4 other files
3. src/services/*.js - **MEDIUM**: No type safety
4. src/config/constants.js - **LOW**: Missing important constants

Overall Assessment:
- Code Quality: ⭐⭐⭐ (3/5) - Room for improvement
- Security: ⭐⭐⭐⭐ (4/5)
- Performance: ⭐⭐⭐⭐ (4/5)
- Best Practices: ⭐⭐⭐ (3/5)

Priority Actions:
1. **HIGH**: Refactor Dashboard component (split into 5-6 smaller)
2. **MEDIUM**: Create shared date utilities (DRY principle)
3. **MEDIUM**: Add JSDoc types as first step to TypeScript
4. **LOW**: Extract magic numbers to constants file

Patterns Observed:
- ❌ Component sizes too large
- ❌ Lots of code duplication
- ✅ Consistent naming conventions
- ✅ Good folder structure
- ✅ Proper error handling
```

---

## Commands for Code Reviews

```bash
# Review specific file
"review [file-path]"               # Deep analysis of single file
"generate review insight"          # Create code review insight

# Review entire project
"review project [name]"            # Full codebase review
"security review"                  # Focus on security issues
"performance review"               # Focus on performance
"code quality review"              # Focus on maintainability

# After review
"save review insight"              # Save formatted insight
"show review insights"             # List all review insights
```

---

## Rating Scale

**⭐ (1/5)** - Critical issues, needs immediate attention
**⭐⭐ (2/5)** - Major problems, should fix soon
**⭐⭐⭐ (3/5)** - Acceptable with improvements needed
**⭐⭐⭐⭐ (4/5)** - Good quality, minor issues only
**⭐⭐⭐⭐⭐ (5/5)** - Excellent, best practices followed

---

## Priority Levels

**🔴 CRITICAL** - Security vulnerabilities, data loss risks
**🟠 HIGH** - Performance issues, major bugs
**🟡 MEDIUM** - Code quality, maintainability
**🟢 LOW** - Nice to have, polish

---

## When to Use Code Review Insights

- ✅ Before merging large PRs
- ✅ Onboarding to new codebase
- ✅ Before major refactoring
- ✅ Security audits
- ✅ Performance investigations
- ✅ Knowledge sharing with team

---

**Version**: v1.0 - TOKWI Code Review Insights
**Purpose**: Document code quality, find issues, track improvements
**Format**: Inspired by professional code review practices

💜 **Review smart, document findings, improve continuously!**
