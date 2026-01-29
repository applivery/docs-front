# API Architecture

## Overview

The API is built with [Hono](https://hono.dev/), a lightweight, fast web framework for the Edge. It provides RESTful endpoints for all platform operations.

## Technology Stack

- **Framework**: Hono
- **Runtime**: Node.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Validation**: Zod (planned)

## Base URL

```
Development: http://localhost:3000/api
Production: https://api.docs.applivery.com/api
```

## Authentication

### Session-Based (Web Apps)

For browser-based applications, authentication uses HTTP-only cookies with session tokens.

```typescript
// Login
POST /api/auth/login
Body: { email, password }
Response: { user, session } + Set-Cookie header

// Logout
POST /api/auth/logout
Response: { success: true } + Clear-Cookie header

// Get current user
GET /api/auth/me
Response: { user }
```

### API Key (Integrations)

For programmatic access, use API keys in the Authorization header.

```bash
curl -H "Authorization: Bearer apk_xxxxx" https://api.docs.applivery.com/api/...
```

API keys are scoped to workspaces with specific permissions:
- `read` - Read-only access
- `write` - Create and update
- `admin` - Full access including delete

## Middleware Stack

```
Request
  │
  ├─> Logger (request logging)
  │
  ├─> CORS (cross-origin handling)
  │
  ├─> Auth (session/API key validation)
  │
  └─> Route Handler
```

## API Routes

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Authenticate user |
| POST | `/logout` | End session |
| GET | `/me` | Get current user |
| POST | `/register` | Create account |

### Workspaces (`/api/workspaces`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List user's workspaces |
| POST | `/` | Create workspace |
| GET | `/:id` | Get workspace details |
| PATCH | `/:id` | Update workspace |
| DELETE | `/:id` | Delete workspace |
| GET | `/:id/members` | List members |
| POST | `/:id/members` | Invite member |

### Documents (`/api/documents`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List documents |
| POST | `/` | Create document |
| GET | `/:id` | Get document |
| PATCH | `/:id` | Update document |
| DELETE | `/:id` | Delete document |
| POST | `/:id/publish` | Publish document |
| POST | `/:id/unpublish` | Unpublish document |
| GET | `/:id/versions` | Get version history |
| POST | `/:id/versions/:vid/restore` | Restore version |

### Navigation (`/api/navigation`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get navigation tree |
| PUT | `/` | Update full navigation |
| POST | `/items` | Create nav item |
| PATCH | `/items/:id` | Update nav item |
| DELETE | `/items/:id` | Delete nav item |
| POST | `/reorder` | Reorder items |

### Analytics (`/api/analytics`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/overview` | Dashboard stats |
| GET | `/page-views` | Page view data |
| GET | `/searches` | Search queries |
| POST | `/track` | Track event |

## Response Format

### Success Response

```json
{
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Server Error |

## Rate Limiting (Planned)

- **Anonymous**: 60 requests/minute
- **Authenticated**: 1000 requests/minute
- **API Key**: Based on plan

## Versioning Strategy

The API uses URL-based versioning for major changes:

```
/api/v1/documents
/api/v2/documents
```

Currently all endpoints are v1 (implicit).

## File Structure

```
apps/api/src/
├── index.ts              # Entry point, app setup
├── routes/
│   ├── auth.ts           # Authentication routes
│   ├── workspaces.ts     # Workspace management
│   ├── documents.ts      # Document CRUD
│   ├── navigation.ts     # Navigation management
│   └── analytics.ts      # Analytics tracking
├── middleware/
│   ├── auth.ts           # Auth middleware
│   └── cors.ts           # CORS configuration
├── lib/
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript types
```

## Future Endpoints (Sprint 2+)

```typescript
// Branch management
POST /api/documents/:id/branch     // Create branch
POST /api/documents/:id/merge      // Merge branches

// External imports
POST /api/workspaces/:wid/import   // Import from URL
GET  /api/workspaces/:wid/imports  // List imports
POST /api/imports/:id/sync         // Trigger sync

// AI features
POST /api/ai/translate             // Translate content
POST /api/ai/suggest               // Get suggestions
GET  /api/ai/questions             // Top questions

// Search
GET  /api/search                   // Full-text search
POST /api/search/index             // Reindex workspace
```
