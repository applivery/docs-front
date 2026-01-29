# Applivery Docs - Add API Route Skill

## Description
Create a new API route in the Hono-based API server.

## Instructions
1. Create route file in `/apps/api/src/routes/`
2. Define route handlers using Hono patterns
3. Register the route in the main app

## Route Structure
```typescript
// apps/api/src/routes/example.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '@applivery-docs/database'
import { requireAuth } from '../middleware/auth'

const app = new Hono()

// GET endpoint
app.get('/', requireAuth, async (c) => {
  const user = c.get('user')
  // Query database
  const data = await db.query.yourTable.findMany({
    where: (t, { eq }) => eq(t.organizationId, user.organizationId)
  })
  return c.json({ data })
})

// POST endpoint with validation
const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
})

app.post('/', requireAuth, zValidator('json', createSchema), async (c) => {
  const body = c.req.valid('json')
  // Insert into database
  const [result] = await db.insert(yourTable).values(body).returning()
  return c.json({ data: result }, 201)
})

export default app
```

## Register Route
Add to `/apps/api/src/index.ts`:
```typescript
import exampleRoutes from './routes/example'
app.route('/api/example', exampleRoutes)
```

## Available Middleware
- `requireAuth` - Requires authenticated session or API key
- `rateLimit.standard` - Standard rate limiting
- `rateLimit.public` - Rate limiting for public endpoints

## Response Patterns
```typescript
// Success
return c.json({ data: result })

// Created
return c.json({ data: result }, 201)

// Error
return c.json({ error: 'Not found' }, 404)
```
