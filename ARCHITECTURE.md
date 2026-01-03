# 🏗️ TOKWI Architecture - Folder Relationship Map

**Complete structure of TOKWI v4.1 memory system**

---

## 📊 Architecture Diagram

```
E:\Project-AI-MemoryCore-main/
│
├── 🎯 ACTIVATION LAYER (Entry Points)
│   ├── CLAUDE.md              # Trigger instructions (auto-loaded by Claude)
│   ├── master-memory.md       # Complete system (loaded via "Tokwi")
│   └── ACTIVATION-TEST.md     # Testing protocol
│
├── 🧠 CORE IDENTITY (Always Essential)
│   └── main/
│       ├── identity-core.md         # Who is Tokwi
│       ├── relationship-memory.md   # Who is Adam
│       ├── developer-guild-card.md  # Progress tracking
│       └── current-session.md       # Active session RAM
│
├── ⚙️ CAPABILITIES (Referenced, Load on Demand)
│   └── enhanced-features/  (31 files)
│       ├── memory-library-system.md
│       ├── predictive-assistance-engine.md
│       ├── cross-project-learning-transfer.md
│       ├── flow-mode-system.md
│       ├── delivery-pipeline-automation.md
│       └── [26 more feature specs...]
│
├── 📚 TEMPORAL MEMORY (Session History)
│   ├── daily-diary/
│   │   ├── 2025-10-02-swiftsalon-auth-csv-import.md
│   │   ├── 2025-10-28-contractor-website-deployment.md
│   │   ├── 2026-01-01-stock-monitor-pwa-deployment.md
│   │   └── [Daily session logs...]
│   │
│   └── memory-archive/  (Compressed old sessions)
│       ├── compact-log.md
│       ├── MASJIDCONNECT_COMPLETE_2025-10-09.md
│       ├── HERO_COMIC_RPG_SESSION_2025-10-12.md
│       └── [Archived sessions...]
│
├── 🔬 EXPERIMENTAL FEATURES (Prototypes)
│   └── Feature/
│       └── Time-based-Aware-System/
│           └── README.md  # Time-awareness prototype
│
├── ★ INSIGHTS (Portfolio Documentation) 🆕
│   └── insights/
│       ├── insight-template.md
│       ├── code-review-template.md
│       ├── 2026-01-03-stock-metadata-tokwi-streamline.md
│       └── README.md
│
└── 📋 PROJECTS & CONTEXT
    ├── ProjectBrief/  # Project specifications
    ├── SwiftApp Dev/  # Active projects
    └── current-session.md  # Active work tracker
```

---

## 🔗 Relationship Flow

### 1️⃣ **Activation Flow**

```
User types "Tokwi"
    ↓
CLAUDE.md (auto-loaded trigger)
    ↓
Read master-memory.md
    ↓
Load main/ core files
    ↓
Reference enhanced-features/ (31 capabilities)
    ↓
✅ TOKWI v4.1 Activated
```

---

### 2️⃣ **Memory Hierarchy**

```
LEVEL 1: ALWAYS ACTIVE
├── main/identity-core.md          (Who is Tokwi)
├── main/relationship-memory.md    (Who is Adam)
└── main/current-session.md        (Current work)

LEVEL 2: REFERENCED (Load on Demand)
├── enhanced-features/*.md         (31 feature specs)
└── master-memory.md               (Complete system blueprint)

LEVEL 3: TEMPORAL (Historical Context)
├── daily-diary/*.md               (Session logs by date)
└── current-session.md             (Today's active session)

LEVEL 4: ARCHIVED (Compressed History)
└── memory-archive/*.md            (Old sessions, compressed)

LEVEL 5: EXPERIMENTAL (Future Features)
└── Feature/Time-based-Aware-System/  (Prototypes)

LEVEL 6: PORTFOLIO (Documentation) 🆕
└── insights/*.md                  (Auto-generated insights)
```

---

## 📂 Folder Purposes

### 🎯 **main/** - Core Identity (4 files)

**Purpose**: Essential files that define who Tokwi is and who Adam is

**Files**:
1. `identity-core.md` - Tokwi's personality, purpose, communication style
2. `relationship-memory.md` - Adam's preferences, patterns, work style
3. `developer-guild-card.md` - Gamified progress tracking (skills, achievements)
4. `current-session.md` - Active session working memory (RAM)

**When Loaded**: Always (part of core activation)

**Relationship**:
- Referenced by `master-memory.md`
- Updated through conversations
- Foundation for all interactions

---

### ⚙️ **enhanced-features/** - Capability Specs (31 files)

**Purpose**: Documentation of all 24 TOKWI capabilities

**Examples**:
- `memory-library-system.md` - Knowledge organization (v2.2)
- `predictive-assistance-engine.md` - Proactive help (v3.0)
- `flow-mode-system.md` - Flow state guardian (v4.0)
- `delivery-pipeline-automation.md` - One-command deploy (v4.0)

**When Loaded**: Referenced by master-memory.md, loaded on demand

**Relationship**:
- Linked from `master-memory.md` (v2.2, v3.0, v4.0, v4.1 sections)
- Implementation specs for each capability
- Documentation, not active code

---

### 📚 **daily-diary/** - Session History (Temporal)

**Purpose**: Daily session logs, chronological record of all work

**Format**: `YYYY-MM-DD-brief-description.md`

**Examples**:
- `2025-10-02-swiftsalon-auth-csv-import.md`
- `2025-10-28-contractor-website-deployment.md`
- `2026-01-01-stock-monitor-pwa-deployment.md`

**When Used**:
- Auto-created after significant sessions
- Referenced when reviewing past work
- Load via "load diary [date]" command

**Relationship**:
- Child of temporal memory system
- Feeds into `memory-archive/` when compressed
- Linked from `current-session.md`

---

### 🗜️ **memory-archive/** - Compressed History

**Purpose**: Old sessions compressed to save context space

**Contains**:
- Completed project summaries
- Archived debugging sessions
- Compact logs (context pruning records)

**When Used**:
- When context exceeds limits
- Load via "restore archived [name]"
- Historical reference only

**Relationship**:
- Receives compressed data from `daily-diary/`
- Long-term storage (not actively loaded)
- Searchable via grep/find

---

### 🔬 **Feature/Time-based-Aware-System/** - Experimental

**Purpose**: Prototype features being tested

**Status**: Experimental, not in production

**Contains**:
- Feature proof-of-concepts
- Research documentation
- Beta implementations

**When Used**:
- When testing new capabilities
- Research and development

**Relationship**:
- Separate from main system
- May graduate to `enhanced-features/` if successful
- Not loaded during normal activation

---

### ★ **insights/** - Portfolio Documentation 🆕 v4.1

**Purpose**: Auto-generated structured insights for portfolio

**Contains**:
- `insight-template.md` - Bug fix & feature template
- `code-review-template.md` - Code review template
- `YYYY-MM-DD-description.md` - Auto-generated insights

**When Used**:
- After significant work ("generate insight")
- Code reviews ("security review")
- Building portfolio

**Relationship**:
- Newest addition (v4.1)
- Links back to projects in `SwiftApp Dev/`
- Referenced in `daily-diary/` sessions
- Part of knowledge capture system

---

## 🔄 Data Flow

### Session Start Flow:
```
1. Claude loads CLAUDE.md (auto)
2. User types "Tokwi"
3. Read master-memory.md
4. Load main/identity-core.md
5. Load main/relationship-memory.md
6. Load main/current-session.md
7. Reference enhanced-features/ (not loaded, just aware)
✅ Ready to work!
```

### During Session Flow:
```
User works on project
    ↓
TOKWI tracks in main/current-session.md
    ↓
Uses capabilities from enhanced-features/
    ↓
References past work from daily-diary/
    ↓
Generates insights to insights/
    ↓
✅ Knowledge captured!
```

### Session End Flow:
```
Session ends
    ↓
current-session.md summarized
    ↓
Saved to daily-diary/YYYY-MM-DD-name.md
    ↓
If significant: insight generated
    ↓
Old sessions compressed to memory-archive/
    ↓
✅ Memory preserved!
```

---

## 📊 Size & Scope

| Folder | Files | Purpose | Load Frequency |
|--------|-------|---------|----------------|
| **main/** | 4 | Core identity | Always |
| **enhanced-features/** | 31 | Capability docs | Referenced |
| **daily-diary/** | ~10-20 | Session logs | On demand |
| **memory-archive/** | ~20-30 | Old sessions | Rarely |
| **Feature/** | 1 | Experimental | Never (dev only) |
| **insights/** | 3+ | Portfolio | On demand |

---

## 🎯 Single Source of Truth

```
CLAUDE.md (75 lines)
    ↓ Points to
master-memory.md (500+ lines)
    ↓ References
main/ + enhanced-features/ + insights/
    ↓ Fed by
daily-diary/ → memory-archive/
    ↓ Experimental
Feature/
```

**Flow**:
- CLAUDE.md = Trigger
- master-memory.md = Blueprint
- main/ = Identity
- enhanced-features/ = Capabilities
- daily-diary/ = History
- memory-archive/ = Archive
- insights/ = Portfolio
- Feature/ = R&D

---

## 💡 Key Insights

**What Gets Loaded:**
- ✅ CLAUDE.md (auto by Claude)
- ✅ master-memory.md (via "Tokwi")
- ✅ main/ files (core identity)
- ⏸️ enhanced-features/ (referenced, not loaded)
- ⏸️ daily-diary/ (on demand)
- ⏸️ memory-archive/ (rarely)
- ❌ Feature/ (never, dev only)
- ⏸️ insights/ (on demand)

**What Gets Written:**
- ✅ main/current-session.md (during session)
- ✅ daily-diary/ (session summaries)
- ✅ insights/ (auto-generated)
- ✅ memory-archive/ (compressed history)

**What's Static Documentation:**
- 📚 enhanced-features/ (feature specs)
- 📚 CLAUDE.md (trigger instructions)
- 📚 master-memory.md (system blueprint)

---

## 🚀 Evolution Path

```
v1.0: Basic memory (main/ only)
    ↓
v2.2: Added enhanced-features/ (8 modules)
    ↓
v3.0: Added daily-diary/ temporal tracking (9 modules)
    ↓
v4.0: Added vibe coding (6 modules)
    ↓
v4.1: Added insights/ portfolio 🆕 (1 module)
    ↓
Future: Feature/ prototypes graduate to enhanced-features/
```

---

## 📋 Commands by Folder

```bash
# main/
"Tokwi"                    # Loads core identity
"update memory"            # Updates relationship-memory.md

# enhanced-features/
"enhancement status"       # Check active capabilities
"load enhancements"        # Explicit load

# daily-diary/
"load diary [date]"        # Load specific session
"show progress"            # Review recent work

# memory-archive/
"restore archived [name]"  # Load compressed session
"compact now"              # Archive old sessions

# insights/ 🆕
"generate insight"         # Create new insight
"show insights"           # List all insights
"review [project]"        # Code review insight
```

---

**Version**: v4.1 - Complete Architecture
**Updated**: 2026-01-03
**Total Folders**: 6 active + 1 experimental
**Total Files**: 50+ (core) + 31 (features) + 20+ (history)
**Purpose**: Single source of truth for TOKWI system structure

💜 **Understand the architecture, navigate efficiently!**
