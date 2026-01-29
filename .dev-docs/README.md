# Development Documentation

This folder contains internal documentation for the Applivery Docs development team.

## Structure

```
.dev-docs/
├── README.md                 # This file
├── CHANGELOG.md              # Version history and changes
├── architecture/             # System architecture documentation
│   ├── overview.md           # High-level architecture
│   ├── database.md           # Database schema details
│   ├── api.md                # API design decisions
│   └── frontend.md           # Frontend architecture
├── sprints/                  # Sprint planning and tracking
│   ├── sprint-01.md          # Foundation sprint
│   ├── sprint-02.md          # Editor features
│   └── ...
├── decisions/                # Architecture Decision Records (ADRs)
│   ├── 001-monorepo.md       # Why monorepo
│   ├── 002-database.md       # Database choice
│   └── ...
└── guides/                   # Development guides
    ├── setup.md              # Local setup guide
    ├── contributing.md       # Contribution guidelines
    └── deployment.md         # Deployment guide
```

## Quick Links

### Architecture
- [System Overview](./architecture/overview.md)
- [Database Schema](./architecture/database.md)
- [API Design](./architecture/api.md)
- [Frontend Architecture](./architecture/frontend.md)

### Sprints
- [Sprint 01: Foundation](./sprints/sprint-01.md) - ✅ Complete
- [Sprint 02: Editor Features](./sprints/sprint-02.md) - 📋 Planned

### Decisions (ADRs)
- [001: Monorepo Structure](./decisions/001-monorepo.md)
- [002: PostgreSQL + Drizzle](./decisions/002-database.md)
- [003: TipTap Editor](./decisions/003-editor.md)

### Guides
- [Local Setup](./guides/setup.md)

### Changelog
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## Current Status

**Sprint 1: Foundation** - ✅ Complete

See [Sprint 01 Documentation](./sprints/sprint-01.md) for completed work.

**Sprint 2: Editor Features** - 📋 Planned

See [Sprint 02 Documentation](./sprints/sprint-02.md) for upcoming work.

## Prerequisites

Before running the project:

1. **Docker Desktop** must be running (required for database services)
2. Node.js 20+
3. pnpm 9+

## Quick Start

```bash
# Ensure Docker Desktop is running first!
./scripts/setup.sh

# Or manually:
pnpm install
docker compose -f docker/docker-compose.yml up -d
pnpm db:push
pnpm db:seed
pnpm dev
```
