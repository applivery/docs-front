# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Planned
- TipTap custom extensions for all doc components
- Slash command menu with actual component insertion
- Navigation tree visual editor with drag & drop
- Version history UI with diff viewer
- Branch management (draft/published)
- External content import via URL scraping

## [0.1.0] - 2024-01-XX - Foundation

### Added

#### Project Structure
- Initialized pnpm monorepo with Turborepo
- Created workspace structure: apps (api, admin, web) and packages (database, ui, config)
- Set up TypeScript configuration across all packages
- Configured Tailwind CSS with shared preset

#### Database (packages/database)
- Drizzle ORM setup with PostgreSQL
- Schema with 15 tables:
  - `organizations` - Multi-tenant organizations
  - `workspaces` - Documentation workspaces
  - `documents` - Content storage with language support
  - `document_versions` - Version history with pinning
  - `navigation_items` - Sidebar navigation tree
  - `users` - User accounts
  - `sessions` - Authentication sessions
  - `organization_members` - Role-based membership
  - `oauth_accounts` - Social login support
  - `api_keys` - API authentication
  - `document_ratings` - Feedback (thumbs up/down)
  - `edit_suggestions` - User-submitted edits
  - `page_views` - Analytics tracking
  - `search_queries` - Search analytics
  - `assistant_questions` - AI chat history
- Seed script with demo data (organization, workspace, documents, navigation, analytics)

#### API (apps/api)
- Hono server with Node.js adapter
- Authentication middleware (session + API key)
- CORS configuration
- REST endpoints:
  - `/api/auth` - Login, logout, registration, current user
  - `/api/workspaces` - CRUD operations
  - `/api/documents` - CRUD, publish/unpublish, versions, rollback
  - `/api/navigation` - Tree management, reordering
  - `/api/analytics` - Overview, page views, searches

#### Admin Dashboard (apps/admin)
- React 19 + Vite setup
- TailwindCSS styling
- Layout components (Sidebar, Header)
- Dashboard components:
  - StatsCards - Metric overview
  - PageViewsChart - Recharts visualization
  - PopularDocs - Top documents
  - TopSearches - Search queries
- Editor components:
  - TipTap editor with WYSIWYG/Markdown modes
  - EditorToolbar - Formatting controls
  - SlashMenu - Component insertion (20+ items)
- State management:
  - Zustand stores (auth, workspace) with persistence
  - TanStack Query setup
- API client wrapper

#### Public Docs (apps/web)
- Astro 5 with React islands
- DocsLayout with full page structure
- Navigation components (Header, Sidebar, TableOfContents, Footer)
- Documentation components (Callout, Card, CardGroup)
- Chatbar React island for AI assistant (scroll-triggered)
- Sample pages (Introduction, Quick Start)
- Dark mode support (system + manual)

#### UI Components (packages/ui)
- Radix UI + CVA components:
  - Button, Input, Card, Badge
  - Avatar, Dialog, Tabs, Toast
  - ThemeToggle

#### Infrastructure (docker/)
- Docker Compose with services:
  - PostgreSQL 16
  - Redis 7
  - Meilisearch 1.6
  - MinIO (S3-compatible storage)
- Setup script (scripts/setup.sh)
- Environment configuration (.env.example)

#### Documentation (.dev-docs/)
- Architecture documentation (overview, database, api, frontend)
- Sprint tracking (sprint-01, sprint-02)
- Setup guide
- This changelog

### Fixed
- Removed deprecated `version` attribute from docker-compose.yml

### Dependencies

#### Root
- turbo@^2.x
- typescript@^5.x
- prettier@^3.x

#### packages/database
- drizzle-orm@^0.36.x
- postgres@^3.x
- drizzle-kit@^0.29.x

#### apps/api
- hono@^4.x
- @hono/node-server@^1.x
- argon2@^0.41.x
- nanoid@^5.x

#### apps/admin
- react@^19.x
- vite@^6.x
- @tiptap/react@^2.x
- @tanstack/react-query@^5.x
- zustand@^5.x
- recharts@^2.x

#### apps/web
- astro@^5.x
- @astrojs/react@^4.x
- shiki@^1.x

## Notes

### Versioning Strategy
- Major: Breaking changes to API or data model
- Minor: New features, non-breaking additions
- Patch: Bug fixes, documentation updates

### Sprint Cadence
Each sprint focuses on a specific feature area:
- Sprint 01: Foundation (complete)
- Sprint 02: Editor Features (planned)
- Sprint 03: AI Integration (planned)
- Sprint 04: Advanced Features (planned)
