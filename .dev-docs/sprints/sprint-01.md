# Sprint 01: Foundation

**Status**: ✅ Complete
**Duration**: Initial setup
**Goal**: Establish project foundation with working development environment

## Objectives

1. ✅ Initialize monorepo structure
2. ✅ Set up database schema
3. ✅ Create API foundation
4. ✅ Build admin dashboard shell
5. ✅ Create public docs site
6. ✅ Configure Docker environment

## Completed Work

### 1. Monorepo Structure

Created pnpm workspace with Turborepo:

```
applivery-docs/
├── apps/
│   ├── api/          ✅ Hono REST API
│   ├── admin/        ✅ React dashboard
│   ├── web/          ✅ Astro docs site
│   └── mcp-server/   📁 Placeholder
├── packages/
│   ├── database/     ✅ Drizzle schema
│   ├── ui/           ✅ Component library
│   ├── config/       ✅ Shared configs
│   ├── editor/       📁 Placeholder
│   ├── auth/         📁 Placeholder
│   └── ai/           📁 Placeholder
└── docker/           ✅ Docker Compose
```

### 2. Database Schema (15 tables)

- `organizations` - Multi-tenant root
- `workspaces` - Documentation projects
- `documents` - Content with versioning
- `document_versions` - Change history
- `navigation_items` - Sidebar structure
- `users` - User accounts
- `sessions` - Auth sessions
- `organization_members` - Roles
- `oauth_accounts` - Social login
- `api_keys` - API authentication
- `document_ratings` - Thumbs up/down
- `edit_suggestions` - User contributions
- `page_views` - Analytics
- `search_queries` - Search tracking
- `assistant_questions` - Chat history

### 3. API Endpoints

| Endpoint | Methods | Purpose |
|----------|---------|---------|
| `/api/auth/*` | POST | Register, login, logout |
| `/api/auth/me` | GET | Current user |
| `/api/workspaces` | GET, POST | List, create |
| `/api/workspaces/:id` | GET, PATCH, DELETE | CRUD |
| `/api/documents/workspace/:id` | GET | List docs |
| `/api/documents/:id` | GET, PATCH, DELETE | CRUD |
| `/api/documents/:id/publish` | POST | Publish |
| `/api/documents/:id/versions` | GET | History |
| `/api/documents/:id/rollback/:vid` | POST | Restore |
| `/api/navigation/workspace/:id` | GET | Nav tree |
| `/api/navigation` | POST | Create item |
| `/api/navigation/reorder` | POST | Reorder |
| `/api/analytics/workspace/:id/*` | GET | Stats |

### 4. Admin Dashboard

Components created:
- `Sidebar` - Navigation with workspace switcher
- `Header` - Search, theme toggle, user menu
- `StatsCards` - Metrics overview
- `PageViewsChart` - Traffic visualization (Recharts)
- `PopularDocs` - Top documents list
- `TopSearches` - Search analytics
- `Editor` - TipTap with WYSIWYG/Markdown modes
- `EditorToolbar` - Formatting buttons
- `SlashMenu` - Block insertion (20+ components)

### 5. Public Docs Site

Astro components:
- `DocsLayout` - Page wrapper with SEO
- `Header` - Logo, search, theme toggle
- `Sidebar` - Navigation tree
- `TableOfContents` - On-page navigation
- `Footer` - Links and copyright
- `Chatbar` - AI assistant (React island)
- `Callout` - Info/warning/error boxes
- `Card` - Clickable card
- `CardGroup` - Grid of cards

Pages:
- `/` - Introduction
- `/quickstart` - Getting started

### 6. Seed Data

Mock workspace with:
- 5 sample documents (Introduction, Quick Start, API Overview, Apps API, MDM Setup)
- Navigation structure (3 tabs, nested groups)
- 30 days of analytics data
- Sample feedback and search queries

## Files Created

Total: ~80 files

Key files:
- `package.json` - Root package
- `turbo.json` - Turborepo config
- `docker/docker-compose.yml` - Services
- `packages/database/src/schema/*.ts` - Database tables
- `packages/database/src/seed.ts` - Sample data
- `packages/ui/src/components/*.tsx` - UI components
- `apps/api/src/index.ts` - API entry
- `apps/api/src/routes/*.ts` - API routes
- `apps/admin/src/App.tsx` - Dashboard app
- `apps/admin/src/components/**/*.tsx` - Dashboard components
- `apps/web/src/layouts/DocsLayout.astro` - Docs layout
- `apps/web/src/pages/*.astro` - Doc pages

## Known Issues

1. **Docker not running** - User needs Docker Desktop running
2. **Version attribute warning** - Removed from docker-compose.yml

## Dependencies Added

### Root
- turbo, typescript, prettier

### Database Package
- drizzle-orm, postgres, drizzle-kit, tsx

### API App
- hono, @hono/node-server, @hono/zod-validator, zod, nanoid, argon2

### Admin App
- react, react-dom, @tanstack/react-query
- @tiptap/react, @tiptap/starter-kit, @tiptap/extension-*
- recharts, zustand, lucide-react
- tailwindcss, @tailwindcss/typography, vite

### Web App
- astro, @astrojs/react, @astrojs/tailwind
- react, react-dom, lucide-react, shiki

## Next Sprint

See [Sprint 02: Editor Features](./sprint-02.md)

## How to Test This Sprint

```bash
# 1. Ensure Docker Desktop is running

# 2. Start services
cd /Users/paulo/Documents/tools/docs
docker compose -f docker/docker-compose.yml up -d

# 3. Install dependencies
pnpm install

# 4. Push database schema
pnpm db:push

# 5. Seed sample data
pnpm db:seed

# 6. Start development
pnpm dev

# Access:
# - Admin: http://localhost:5173
# - API: http://localhost:3000
# - Docs: http://localhost:4321
```
