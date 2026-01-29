# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                     │
├─────────────────┬─────────────────┬─────────────────────────────────────┤
│   Public Docs   │  Admin Dashboard │        External APIs               │
│   (Astro SSG)   │   (React SPA)    │     (API Key Auth)                 │
│   Port: 4321    │   Port: 5173     │                                    │
└────────┬────────┴────────┬─────────┴─────────────┬───────────────────────┘
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         API SERVER (Hono)                                │
│                           Port: 3000                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  Routes:                                                                 │
│  - /api/auth/*        Authentication & sessions                         │
│  - /api/workspaces/*  Workspace CRUD                                    │
│  - /api/documents/*   Document management                               │
│  - /api/navigation/*  Navigation tree                                   │
│  - /api/analytics/*   Usage tracking                                    │
│                                                                          │
│  Middleware:                                                             │
│  - CORS (cross-origin requests)                                         │
│  - Auth (session/API key validation)                                    │
│  - Rate limiting (planned)                                              │
└────────┬───────────────────┬───────────────────┬────────────────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   PostgreSQL    │ │     Redis       │ │   Meilisearch   │
│   Port: 5432    │ │   Port: 6379    │ │   Port: 7700    │
│                 │ │                 │ │                 │
│ - Organizations │ │ - Sessions      │ │ - Full-text     │
│ - Workspaces    │ │ - Cache         │ │   search        │
│ - Documents     │ │ - Rate limits   │ │ - Document      │
│ - Users         │ │                 │ │   indexing      │
│ - Analytics     │ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘

┌─────────────────┐
│   MinIO (S3)    │
│ Ports: 9000/01  │
│                 │
│ - File uploads  │
│ - Assets        │
│ - Exports       │
└─────────────────┘
```

## Technology Choices

### Why This Stack?

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Astro** | Public docs site | SSG for SEO, fast loading, minimal JS |
| **React** | Admin dashboard | Rich interactivity, component ecosystem |
| **Hono** | API server | Lightweight, fast, edge-ready, TypeScript-first |
| **PostgreSQL** | Primary database | Relational data, JSONB for flexibility, multi-tenant |
| **Drizzle ORM** | Database access | Type-safe, SQL-like, good DX |
| **TipTap** | Rich text editor | Extensible, ProseMirror-based, collaborative-ready |
| **Redis** | Caching/sessions | Fast, proven, pub/sub for real-time |
| **Meilisearch** | Search | Fast, typo-tolerant, easy to use |
| **Turborepo** | Monorepo | Fast builds, caching, dependency management |

## Monorepo Structure

```
applivery-docs/
├── apps/                    # Deployable applications
│   ├── api/                 # REST API (Node.js + Hono)
│   ├── admin/               # Admin dashboard (React + Vite)
│   ├── web/                 # Public docs (Astro)
│   └── mcp-server/          # AI integration server
│
├── packages/                # Shared packages
│   ├── database/            # Schema, migrations, client
│   ├── ui/                  # React component library
│   ├── editor/              # TipTap editor package
│   ├── auth/                # Authentication utilities
│   ├── ai/                  # AI/translation services
│   └── config/              # Shared configs (TS, Tailwind, ESLint)
│
├── docker/                  # Docker configurations
├── scripts/                 # Utility scripts
└── .dev-docs/               # Development documentation
```

## Data Flow

### Document Editing Flow

```
User edits document in Admin
         │
         ▼
┌─────────────────┐
│  TipTap Editor  │ ──── Autosave every 5s
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PATCH /api/    │
│  documents/:id  │
└────────┬────────┘
         │
         ├──▶ Update document content
         │
         └──▶ Create new version (if content changed)
                    │
                    ▼
            ┌─────────────┐
            │  Meilisearch│ ──── Index updated
            └─────────────┘
```

### Public Docs Request Flow

```
User visits docs.example.com/quickstart
         │
         ▼
┌─────────────────┐
│  Astro (SSG)    │ ──── Pre-rendered HTML
└────────┬────────┘
         │
         ▼
Static HTML served (fast!)
         │
         ▼
React hydration for interactive components:
  - Search (Cmd+K)
  - Theme toggle
  - Chatbar assistant
  - Feedback ratings
```

## Multi-Tenancy Model

```
Organization (Tenant)
    │
    ├── Settings (branding, domain, billing)
    ├── Members (users with roles)
    ├── API Keys (for integrations)
    │
    └── Workspaces (multiple docs projects)
            │
            ├── Documents (content)
            │       ├── Versions (history)
            │       └── Translations (i18n)
            │
            ├── Navigation (sidebar structure)
            ├── Settings (AI, GitHub, theme)
            └── Analytics (views, searches)
```

## Security Architecture

### Authentication

1. **Web Sessions**: Cookie-based with Lucia Auth
2. **API Keys**: Bearer token for integrations
3. **OAuth**: Google, GitHub (planned)

### Authorization

Role-based access control (RBAC):

| Role | Permissions |
|------|-------------|
| Owner | Full access, billing, delete org |
| Admin | Manage members, settings, all content |
| Editor | Create/edit documents, publish |
| Viewer | Read-only access |

### Data Isolation

- Row-level security in PostgreSQL
- Organization ID in all queries
- API middleware validates tenant access

## Next: Detailed Documentation

- [Database Schema](./database.md)
- [API Design](./api.md)
- [Frontend Architecture](./frontend.md)
