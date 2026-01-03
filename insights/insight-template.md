# ★ Insight Template

**How to use**: Copy this template when documenting completed work

---

## Format Structure

```markdown
★ Insight
Summary - [Task Name] ([Pattern/Technique Used]):

| Issue                    | Root Cause                | Solution                        |
|--------------------------|---------------------------|---------------------------------|
| [What was wrong]         | [Why it happened]         | [How you fixed it]              |
| [Second problem]         | [Why it occurred]         | [Fix implemented]               |
| [Third issue]            | [Root cause]              | [Resolution]                    |

Files Modified:
1. [file-path] - [Description of changes]
2. [file-path] - [Description of changes]
3. [file-path] - [Description of changes]

Credit: Inspired by [source/pattern/reference] 🔥
```

---

## Example: Stock Metadata Display

```markdown
★ Insight
Summary - Stock Detail Metadata Display (Data-Driven UI Pattern):

| Issue                      | Root Cause                    | Solution                           |
|----------------------------|-------------------------------|-----------------------------------|
| Missing company info       | Only price data displayed     | Add 3 metadata panels             |
| No fundamental analysis    | Basic chart only              | Company Fundamentals section      |
| Trading context unclear    | No ESG/Syariah/Rating info    | Trading Information panel         |

Files Modified:
1. src/pages/StockDetail.jsx - Added 3 comprehensive metadata sections (200+ lines)
2. src/data/malaysianStocks.js - Extended with P/E, Beta, ESG, dividend data
3. CLAUDE.md - Streamlined activation to 75 lines for faster load

Credit: Inspired by Bloomberg Terminal & Yahoo Finance UI patterns 📊
```

---

## Example: Bug Fix

```markdown
★ Insight
Summary - Cart State Sync Bug (Kiyoraka Pattern + SSR Fix):

| Issue                    | Root Cause                      | Solution                           |
|--------------------------|---------------------------------|------------------------------------|
| State tidak share        | useState SSR hydration mismatch | Module-level ref (Kiyoraka)        |
| Computed tidak reactive  | Module-level computed auto-unwrap| Explicit .value access             |
| Badge tidak show         | SSR render empty, client no update| <ClientOnly> wrapper              |

Files Modified:
1. composables/useCart.ts - Kiyoraka pattern dengan module-level state & computed
2. components/CartButton.vue - <ClientOnly> + explicit .value access
3. components/KitabCartSidebar.vue - Explicit .value untuk semua cart values

Credit: Inspired by Kiyoraka's Fantasy-Book-E-Commerce localStorage cart pattern 🔥
```

---

## Guidelines

**When to Create Insights:**
- ✅ After fixing complex bugs
- ✅ After implementing major features
- ✅ After solving difficult problems
- ✅ After learning new patterns/techniques
- ✅ After deployment success

**Keep it:**
- 📊 **Structured** - Use the table format
- 🎯 **Focused** - 3-5 main issues max
- 💡 **Actionable** - Solutions should be clear
- 🔥 **Credited** - Mention inspiration/sources
- 📝 **Brief** - File changes summary only

**File Naming:**
`YYYY-MM-DD-brief-description.md`

Examples:
- `2026-01-03-stock-metadata-display.md`
- `2026-01-03-tokwi-streamline.md`
- `2026-01-04-auth-bug-fix.md`

---

## Auto-Generation

TOKWI can generate insights automatically when you use:

```bash
"generate insight"         # Create insight from current session
"save insight"            # Auto-format and save
"show insights"           # List all saved insights
"insight for [project]"   # Generate for specific project
```

---

**Version**: v1.0 - TOKWI Insight Generator
**Pattern**: Inspired by developer documentation best practices
**Purpose**: Capture knowledge, track progress, build portfolio
