# Diagram Generator Runbook

**Trigger**: User mentions architecture, database, flow, system design, or explicitly asks for a diagram
**Format**: Mermaid syntax (renders on GitHub, VS Code, Notion, and most markdown viewers)

---

## Detection Rules

When the Adam talks about any of these topics, **automatically generate the relevant diagram** alongside your response:

| Adam talks about... | Generate |
|---------------------|----------|
| **architecture**, system design, components, how things connect | Architecture Diagram |
| **database**, tables, schema, ERD, relations, columns | ERD Diagram |
| **flow**, process, steps, workflow, user journey, sequence | Flowchart / Sequence Diagram |
| **API**, endpoints, request/response | API Flow Diagram |
| **deployment**, infrastructure, hosting, CI/CD | Deployment Diagram |

---

## Diagram Templates

### 1. Architecture Diagram

When discussing system architecture or component relationships:

```markdown
```mermaid
graph TB
    subgraph Frontend
        UI[Next.js App]
        Pages[Pages/Routes]
    end

    subgraph Backend
        API[API Routes]
        Auth[Authentication]
    end

    subgraph Database
        DB[(Supabase/PostgreSQL)]
    end

    UI --> Pages
    Pages --> API
    API --> Auth
    API --> DB
```​
```

**Steps**:
1. Identify all major components/services in the project
2. Group them into logical layers (Frontend, Backend, DB, External)
3. Draw connections with labeled arrows showing data flow
4. Use `subgraph` for grouping related components

---

### 2. ERD (Entity Relationship Diagram)

When discussing database schema, tables, or relations:

```markdown
```mermaid
erDiagram
    CUSTOMERS {
        uuid id PK
        string name
        string phone
        string email
        timestamp created_at
    }
    SERVICES {
        uuid id PK
        string name
        decimal price
        int duration_minutes
    }
    APPOINTMENTS {
        uuid id PK
        uuid customer_id FK
        uuid staff_id FK
        date appointment_date
        time appointment_time
        string status
    }
    CUSTOMERS ||--o{ APPOINTMENTS : "books"
    STAFF ||--o{ APPOINTMENTS : "assigned to"
    APPOINTMENTS }o--|| SERVICES : "for"
```​
```

**Steps**:
1. Read the project's database schema (Supabase types, Prisma schema, or migration files)
2. List all tables with their columns and types
3. Mark PK (primary key) and FK (foreign key)
4. Draw relationships: `||--o{` (one-to-many), `||--||` (one-to-one), `}o--o{` (many-to-many)

---

### 3. Flowchart

When discussing processes, user flows, or step-by-step logic:

```markdown
```mermaid
flowchart TD
    A[Start] --> B{User Action}
    B -->|Login| C[Auth Check]
    B -->|Browse| D[View Products]
    C -->|Success| E[Dashboard]
    C -->|Fail| F[Error Message]
    F --> B
    D --> G[Add to Cart]
    G --> H[Checkout]
    H --> I{Payment}
    I -->|Success| J[Order Confirmed]
    I -->|Fail| K[Retry Payment]
    K --> H
```​
```

**Steps**:
1. Identify the start and end points
2. Map each decision point as `{diamond}`
3. Map each action as `[rectangle]`
4. Label all edges with conditions
5. Show error/retry paths

---

### 4. Sequence Diagram

When discussing API calls, request/response flows, or multi-system interactions:

```markdown
```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Database

    User->>Frontend: Click Action
    Frontend->>API: POST /api/endpoint
    API->>Database: Query data
    Database-->>API: Return results
    API-->>Frontend: JSON response
    Frontend-->>User: Update UI
```​
```

**Steps**:
1. Identify all participants (User, Frontend, API, DB, External services)
2. Draw messages in chronological order
3. Use `->>` for requests, `-->>` for responses
4. Add `Note over` for important context

---

### 5. Deployment / Infrastructure Diagram

When discussing hosting, CI/CD, or infrastructure:

```markdown
```mermaid
graph LR
    subgraph Developer
        Code[Local Dev]
    end

    subgraph GitHub
        Repo[Repository]
        Actions[GitHub Actions]
    end

    subgraph Production
        Vercel[Vercel Edge]
        Supa[(Supabase)]
    end

    Code -->|git push| Repo
    Repo -->|trigger| Actions
    Actions -->|deploy| Vercel
    Vercel -->|query| Supa
```​
```

---

## Behavior Rules

1. **Auto-detect**: When the conversation topic matches a trigger, include the diagram WITHOUT the user asking explicitly
2. **Project-aware**: Read the actual project files to generate accurate diagrams (don't use generic placeholders)
3. **Mermaid format**: Always use Mermaid syntax inside triple-backtick code blocks with `mermaid` language tag
4. **Inline**: Place the diagram directly in your response, not in a separate file (unless user asks to save it)
5. **Save on request**: If user says "save diagram", write it to `insights/diagrams/YYYY-MM-DD-description.md`
6. **Iterate**: If the user says "update diagram" or points out issues, regenerate with corrections

## Reading Project Data for Accurate Diagrams

Before generating, gather real data:

```bash
# For Architecture: scan project structure
Glob pattern="**/page.tsx" or "**/route.ts"

# For ERD: read database schema
Read Supabase types file or Prisma schema
Grep pattern="CREATE TABLE" or "model " in migration/schema files

# For Flow: read component logic
Read the relevant page/component files

# For Deployment: check config
Read vercel.json, package.json, .github/workflows/
```

---

**Version**: v1.0
**Added**: 2026-02-13
**Triggers**: architecture, database, ERD, flow, flowchart, sequence, deployment, diagram
