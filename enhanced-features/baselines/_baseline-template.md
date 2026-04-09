# Project Baseline — [PROJECT NAME]

**Version**: v1.0 | **Created**: [YYYY-MM-DD]
**Stack**: [stack]
**Deploy**: [platform + URL]

---

## Quality Rules

| Rule | Threshold |
|------|-----------|
| Minimum score to deploy | X/10 |
| Max MEDIUM before deploy | X |
| Max LOW before deploy | X |
| AUTO-FAIL tolerance | 0 (always) |

---

## Project-Specific Zero Tolerance

> Adds to global rules in `_global-rules.md` — does not replace them.

- [pattern]: [why it's zero tolerance for this project]

---

## Accepted Exceptions

> Patterns that would normally fail but are intentionally allowed.

| Pattern | File | Reason |
|---------|------|--------|
| [pattern] | [file:line] | [reason] |

---

## Stack-Specific Checks

### [Framework 1]
- [rule 1]
- [rule 2]

### [Framework 2]
- [rule 1]
- [rule 2]

---

## Performance Benchmarks

| Metric | Threshold |
|--------|-----------|
| DB queries per request | max X |
| Page load (LCP) | < Xs |
| API response time | < Xms |

---

## Review History

| Date | Score | HIGH | MED | LOW | Status | Notes |
|------|-------|------|-----|-----|--------|-------|
| [YYYY-MM-DD] | X/10 | X | X | X | PASS/FAIL | [summary] |
