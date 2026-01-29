# Applivery Docs - Add Database Table Skill

## Description
Add a new table to the PostgreSQL database using Drizzle ORM.

## Instructions
1. Create schema file in `/packages/database/src/schema/`
2. Export from `/packages/database/src/schema/index.ts`
3. Generate and run migration

## Schema Structure
```typescript
// packages/database/src/schema/example.ts
import { pgTable, text, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { organizations } from './organizations'
import { users } from './users'

export const examples = pgTable('examples', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  createdBy: uuid('created_by')
    .references(() => users.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Define relations
export const examplesRelations = relations(examples, ({ one }) => ({
  organization: one(organizations, {
    fields: [examples.organizationId],
    references: [organizations.id],
  }),
  creator: one(users, {
    fields: [examples.createdBy],
    references: [users.id],
  }),
}))

// TypeScript types
export type Example = typeof examples.$inferSelect
export type NewExample = typeof examples.$inferInsert
```

## Export Schema
Add to `/packages/database/src/schema/index.ts`:
```typescript
export * from './example'
```

## Generate Migration
```bash
pnpm db:generate
```

## Apply Migration
```bash
pnpm db:migrate
```

## Common Column Types
- `uuid('id').primaryKey().defaultRandom()` - UUID primary key
- `text('name')` - Text/string
- `integer('count')` - Integer
- `boolean('is_active')` - Boolean
- `timestamp('created_at').defaultNow()` - Timestamp
- `json('metadata')` - JSON data
- `.notNull()` - Required field
- `.default(value)` - Default value
- `.references(() => table.id)` - Foreign key
