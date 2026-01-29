# Frontend Architecture

## Overview

The platform has two frontend applications:

1. **Admin Dashboard** (`apps/admin/`) - React SPA for content management
2. **Public Docs** (`apps/web/`) - Astro static site for documentation

## Admin Dashboard

### Technology Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| TailwindCSS | Styling |
| TanStack Query | Server state management |
| Zustand | Client state management |
| TipTap | Rich text editor |
| Recharts | Data visualization |
| React Router | Routing |

### Directory Structure

```
apps/admin/src/
├── main.tsx              # Entry point
├── App.tsx               # Root component with routing
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx   # Main navigation
│   │   └── Header.tsx    # Top bar with search
│   ├── dashboard/
│   │   ├── StatsCards.tsx      # Metric cards
│   │   ├── PageViewsChart.tsx  # Analytics chart
│   │   ├── PopularDocs.tsx     # Top documents
│   │   └── TopSearches.tsx     # Search queries
│   └── editor/
│       ├── Editor.tsx          # TipTap editor
│       ├── EditorToolbar.tsx   # Formatting tools
│       └── SlashMenu.tsx       # Command palette
├── pages/
│   ├── Dashboard.tsx     # Overview page
│   ├── Documents.tsx     # Document list
│   ├── Editor.tsx        # Document editor
│   └── Settings.tsx      # Workspace settings
├── stores/
│   ├── auth.ts           # Authentication state
│   └── workspace.ts      # Current workspace
├── lib/
│   └── api.ts            # API client
└── types/
    └── index.ts          # TypeScript types
```

### State Management

**Server State (TanStack Query)**:
- Documents, workspaces, analytics
- Automatic caching and invalidation
- Optimistic updates

```typescript
const { data: documents } = useQuery({
  queryKey: ['documents', workspaceId],
  queryFn: () => api.getDocuments(workspaceId)
});
```

**Client State (Zustand)**:
- Authentication status
- Current workspace
- UI preferences

```typescript
// stores/auth.ts
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

### Editor Architecture

The editor uses TipTap (ProseMirror wrapper) with custom extensions:

```
TipTap Editor
├── StarterKit (basic formatting)
├── Placeholder
├── Link
├── Typography
├── CodeBlockLowlight
└── Custom Extensions (Sprint 2)
    ├── Callout
    ├── Tabs
    ├── Accordion
    ├── Steps
    └── ...
```

**Dual Mode Support**:
- WYSIWYG mode: Direct rich text editing
- Markdown mode: Plain text with preview

### Routing

```typescript
<Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/documents" element={<Documents />} />
  <Route path="/documents/:id" element={<EditorPage />} />
  <Route path="/settings/*" element={<Settings />} />
</Routes>
```

## Public Documentation Site

### Technology Stack

| Technology | Purpose |
|------------|---------|
| Astro 5 | Static site generator |
| React | Interactive islands |
| TailwindCSS | Styling |
| MDX | Markdown with components |

### Directory Structure

```
apps/web/src/
├── layouts/
│   └── DocsLayout.astro      # Main layout
├── components/
│   ├── common/
│   │   ├── Header.astro      # Site header
│   │   ├── Footer.astro      # Site footer
│   │   └── ThemeToggle.tsx   # Dark mode (React)
│   ├── navigation/
│   │   ├── Sidebar.astro     # Doc navigation
│   │   └── TableOfContents.astro
│   ├── docs/
│   │   ├── Callout.astro     # Info boxes
│   │   ├── Card.astro        # Clickable cards
│   │   ├── CardGroup.astro   # Card grid
│   │   ├── Tabs.astro        # Tabbed content
│   │   └── ...
│   └── feedback/
│       └── Chatbar.tsx       # AI assistant (React)
├── pages/
│   ├── index.astro           # Home/Introduction
│   ├── quickstart.astro      # Quick start guide
│   └── [...slug].astro       # Dynamic doc pages
└── styles/
    └── globals.css           # Global styles
```

### Astro Islands

React components used for interactivity:

```astro
---
import Chatbar from '../components/feedback/Chatbar.tsx';
---

<Chatbar client:visible />
```

Hydration strategies:
- `client:visible` - Hydrate when visible in viewport
- `client:idle` - Hydrate when browser is idle
- `client:load` - Hydrate immediately

### Documentation Components

**Callout** - Information boxes with variants:
```astro
<Callout type="warning" title="Important">
  This is a warning message.
</Callout>
```
Types: `info`, `warning`, `error`, `success`, `tip`

**CardGroup** - Responsive card grid:
```astro
<CardGroup cols={2}>
  <Card title="Feature 1" href="/docs/feature-1" icon="🚀" />
  <Card title="Feature 2" href="/docs/feature-2" icon="📦" />
</CardGroup>
```

**Tabs** - Tabbed content sections (planned)
**Steps** - Numbered sequences (planned)
**Accordion** - Collapsible sections (planned)

### SEO Features

- Automatic meta tags
- Open Graph support
- JSON-LD structured data
- XML sitemap generation
- robots.txt

### Dark Mode

System-aware with manual toggle:

```typescript
// ThemeToggle.tsx
useEffect(() => {
  const isDark = localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
}, []);
```

## Shared UI Package

The `packages/ui/` provides reusable components:

```
packages/ui/src/
├── button.tsx
├── input.tsx
├── card.tsx
├── badge.tsx
├── avatar.tsx
├── dialog.tsx
├── tabs.tsx
├── toast.tsx
├── theme-toggle.tsx
└── globals.css
```

Built with:
- Radix UI primitives (accessibility)
- CVA (class-variance-authority) for variants
- TailwindCSS for styling

## Build Pipeline

```
Source Files
    │
    ├─> TypeScript Compilation
    │
    ├─> Tailwind CSS Processing
    │
    ├─> Vite Bundle (Admin)
    │   └─> dist/
    │
    └─> Astro Build (Web)
        └─> dist/
```

## Performance Considerations

**Admin Dashboard**:
- Code splitting per route
- Lazy loading for editor
- Query caching with TanStack Query
- Optimistic UI updates

**Public Docs**:
- Static HTML generation
- Minimal JavaScript (islands)
- Image optimization
- Asset caching headers
