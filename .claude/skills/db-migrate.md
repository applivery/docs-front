# Applivery Docs - Database Migration Skill

## Description
Generate and run database migrations using Drizzle ORM.

## Instructions
When schema changes are made in `/packages/database/src/schema/`, generate and apply migrations.

## Commands

### Generate a new migration
```bash
pnpm db:generate
```

### Apply pending migrations
```bash
pnpm db:migrate
```

### Push schema directly (development only)
```bash
pnpm db:push
```

### Open Drizzle Studio to browse data
```bash
pnpm db:studio
```

### Seed the database with sample data
```bash
pnpm db:seed
```

## Schema Location
- Schema files: `/packages/database/src/schema/`
- Main tables: organizations, workspaces, documents, users, sessions, navigation_items, etc.

## Notes
- Always generate migrations for production changes
- Use `db:push` only for rapid local development
- Drizzle Studio runs on http://localhost:4983
