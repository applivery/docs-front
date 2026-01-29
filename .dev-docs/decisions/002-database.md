# ADR 002: PostgreSQL with Drizzle ORM

## Status
Accepted

## Context
We need a database solution that supports:
- Multi-tenant data isolation
- Document versioning with history
- Complex relationships (navigation trees)
- Full-text search capabilities
- Type-safe queries from TypeScript

## Decision
Use **PostgreSQL** as the database with **Drizzle ORM** for the query layer.

## Rationale

### Why PostgreSQL?
1. **JSONB support**: Store flexible document content and settings
2. **Full-text search**: Built-in ts_vector for search (Meilisearch for advanced)
3. **Recursive CTEs**: Navigate hierarchical data (navigation trees)
4. **ACID compliance**: Reliable transactions for versioning
5. **Mature ecosystem**: Excellent tooling, monitoring, backups
6. **Proven scale**: Handles millions of rows efficiently

### Why Drizzle ORM?
1. **Type safety**: Full TypeScript inference from schema
2. **SQL-like**: Closer to SQL than Prisma, easier to optimize
3. **Performance**: Minimal runtime overhead
4. **Migrations**: Built-in migration generation
5. **Drizzle Studio**: Visual database browser

## Alternatives Considered

### Prisma
- Pro: More popular, better documentation
- Con: Heavier runtime, less SQL control, slower queries

### Kysely
- Pro: Excellent type safety, pure SQL builder
- Con: No migrations, less ecosystem

### MongoDB
- Pro: Flexible schema, easier document storage
- Con: No ACID transactions, harder to join data, less suitable for relational data

### SQLite (Turso)
- Pro: Edge-compatible, simpler deployment
- Con: Less features, not suitable for heavy multi-tenant workloads

## Schema Design

### Multi-tenancy
```
organizations (1) → (N) workspaces (1) → (N) documents
                                    ↓
                              navigation_items
```

### Versioning
```
documents (1) → (N) document_versions
```
Each save creates a version. Pinned versions are preserved; others can be pruned.

### Navigation
```
navigation_items
  └── parent_id → navigation_items (self-referential)
```
Hierarchical tree with position ordering per parent.

## Consequences

### Positive
- Type-safe queries catch errors at compile time
- Efficient queries with Drizzle's SQL-like API
- Full PostgreSQL feature access (JSONB, arrays, etc.)
- Easy migrations with drizzle-kit

### Negative
- Need PostgreSQL server (Docker for dev, managed for prod)
- Drizzle is newer, smaller community than Prisma
- Some advanced features require raw SQL

## Connection Strategy

```typescript
// packages/database/src/client.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });
```

Development: Docker PostgreSQL on port 5432
Production: Managed PostgreSQL (Neon, Supabase, RDS)
