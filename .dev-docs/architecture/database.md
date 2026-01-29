# Database Architecture

## Overview

We use PostgreSQL with Drizzle ORM for type-safe database access.

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│  organizations  │───────│   workspaces    │
│─────────────────│  1:N  │─────────────────│
│ id              │       │ id              │
│ slug (unique)   │       │ organization_id │
│ name            │       │ slug            │
│ logo_url        │       │ name            │
│ custom_domain   │       │ settings (JSON) │
│ settings (JSON) │       │ ai_provider     │
│ seo_config      │       │ github_repo     │
│ billing_status  │       └────────┬────────┘
└────────┬────────┘                │
         │                         │
         │ 1:N                     │ 1:N
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│ org_members     │       │   documents     │
│─────────────────│       │─────────────────│
│ organization_id │       │ id              │
│ user_id         │       │ workspace_id    │
│ role            │       │ parent_id       │
│ invited_at      │       │ slug            │
│ joined_at       │       │ title           │
└────────┬────────┘       │ content (TEXT)  │
         │                │ language        │
         │                │ is_published    │
         │                │ branch          │
         ▼                │ menu_order      │
┌─────────────────┐       │ seo_title       │
│     users       │       └────────┬────────┘
│─────────────────│                │
│ id              │                │ 1:N
│ email (unique)  │                ▼
│ name            │       ┌─────────────────┐
│ avatar_url      │       │ doc_versions    │
│ password_hash   │       │─────────────────│
│ settings (JSON) │       │ id              │
└─────────────────┘       │ document_id     │
                          │ content         │
                          │ version_number  │
                          │ commit_message  │
                          │ is_pinned       │
                          │ created_by      │
                          └─────────────────┘
```

## Tables Overview

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `organizations` | Top-level tenant | slug, name, custom_domain, billing_status |
| `workspaces` | Documentation project | name, default_language, ai_provider, github_repo |
| `documents` | Content pages | slug, title, content, is_published, branch |
| `document_versions` | Version history | content, version_number, is_pinned, commit_message |
| `navigation_items` | Sidebar structure | nav_type, label, order_index, parent_id |

### User & Auth Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | email, name, password_hash |
| `sessions` | Active sessions | user_id, expires_at |
| `organization_members` | Membership/roles | organization_id, user_id, role |
| `oauth_accounts` | Social logins | provider, provider_account_id |
| `api_keys` | API authentication | key_hash, scopes, expires_at |

### Analytics Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `page_views` | Traffic tracking | document_id, session_id, referrer, country |
| `search_queries` | Search analytics | query, results_count, clicked_document_id |
| `document_ratings` | Feedback | document_id, rating (thumbs_up/down) |
| `edit_suggestions` | User suggestions | document_id, suggested_content, status |

### AI & Assistant Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `assistant_questions` | Chat history | question, answer, helpful, document_ids |
| `document_gaps` | Missing content | topic, frequency, suggested_document_title |
| `content_imports` | External content | source_url, selector, auto_sync |

## Key Design Decisions

### 1. JSONB for Flexible Settings

```typescript
// Example: workspace settings
settings: {
  theme: { primaryColor: '#6366f1', darkMode: true },
  features: { chatbar: true, thumbsRating: true },
  seo: { siteName: 'My Docs' }
}
```

**Why**: Settings vary by workspace, JSONB allows schema evolution without migrations.

### 2. Soft Multi-Tenancy

All workspace-scoped tables include `workspace_id` or `organization_id`. Queries always filter by tenant.

```typescript
// Every query includes tenant filter
const docs = await db
  .select()
  .from(documents)
  .where(eq(documents.workspaceId, currentWorkspaceId));
```

### 3. Document Versioning

Every content change creates a new version:

```typescript
// On document update
await db.insert(documentVersions).values({
  documentId: doc.id,
  content: newContent,
  versionNumber: lastVersion + 1,
  createdBy: userId,
});
```

Pinned versions act as named commits for rollback points.

### 4. Navigation as Tree

Navigation uses adjacency list pattern:

```typescript
// Get navigation tree
const items = await db.select().from(navigationItems);
const tree = buildTree(items, null); // Recursive tree building
```

### 5. Translation Tracking

Documents can be translations of other documents:

```
Original (en) ◄──── Translation (es) [source_document_id]
                    Translation (pt) [source_document_id]
```

## Indexes

```sql
-- Performance-critical indexes
CREATE INDEX idx_documents_workspace ON documents(workspace_id);
CREATE INDEX idx_documents_slug ON documents(workspace_id, slug, language, branch);
CREATE INDEX idx_page_views_document ON page_views(document_id, created_at);
CREATE INDEX idx_navigation_workspace ON navigation_items(workspace_id, language);
```

## Migrations

Using Drizzle Kit for migrations:

```bash
# Generate migration from schema changes
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Push schema directly (development)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## Seeding

The seed script (`packages/database/src/seed.ts`) creates:

- Demo organization "Applivery"
- Demo workspace "Platform Documentation"
- Sample documents with MDX content
- Navigation structure (tabs, groups, items)
- 30 days of analytics data
- Sample feedback and assistant questions

## Dependencies

```json
{
  "drizzle-orm": "^0.38.2",
  "postgres": "^3.4.5",
  "drizzle-kit": "^0.30.1"
}
```
