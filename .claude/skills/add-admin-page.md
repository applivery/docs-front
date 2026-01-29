# Applivery Docs - Add Admin Page Skill

## Description
Create a new page in the Admin dashboard (React 19 + Vite).

## Instructions
1. Create page component in `/apps/admin/src/pages/`
2. Add route in `/apps/admin/src/App.tsx`
3. Optionally add navigation link in sidebar

## Page Structure
```tsx
// apps/admin/src/pages/ExamplePage.tsx
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@applivery-docs/ui'

export function ExamplePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const res = await fetch('/api/example', { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Example Page</h1>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Your content here */}
        </CardContent>
      </Card>
    </div>
  )
}
```

## Add Route
In `/apps/admin/src/App.tsx`:
```tsx
import { ExamplePage } from './pages/ExamplePage'

// Inside Routes
<Route path="/example" element={<ExamplePage />} />
```

## Add to Sidebar (optional)
In `/apps/admin/src/components/layout/Sidebar.tsx`:
```tsx
const navItems = [
  // ... existing items
  { icon: YourIcon, label: 'Example', href: '/example' },
]
```

## State Management
- Use `useAuthStore` for auth state
- Use `useWorkspaceStore` for current workspace
- Use TanStack Query for server state

## UI Components
Import from `@applivery-docs/ui`:
- Button, Input, Card, Badge, Avatar
- Dialog, Tabs, Toast
- ThemeToggle
