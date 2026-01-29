# Applivery Docs - Test Skill

## Description
Run tests across the project.

## Commands

### Run all tests
```bash
pnpm test
```

### Run tests for specific app/package
```bash
pnpm --filter @applivery-docs/api test
pnpm --filter @applivery-docs/admin test
pnpm --filter @applivery-docs/database test
```

### Run tests in watch mode
```bash
pnpm test -- --watch
```

### Run tests with coverage
```bash
pnpm test -- --coverage
```

## Testing Stack
- **Unit Tests**: Vitest
- **Component Tests**: React Testing Library
- **API Tests**: Hono test utilities

## Writing Tests

### API Route Test
```typescript
// apps/api/src/routes/__tests__/example.test.ts
import { describe, it, expect } from 'vitest'
import { testClient } from 'hono/testing'
import app from '../../index'

describe('Example API', () => {
  it('should return data', async () => {
    const res = await testClient(app).api.example.$get()
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.data).toBeDefined()
  })
})
```

### React Component Test
```tsx
// apps/admin/src/components/__tests__/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('should render and handle clicks', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalled()
  })
})
```

## Test Database
Tests use a separate test database. Set `DATABASE_URL` in test environment or use in-memory SQLite for unit tests.

## Continuous Integration
Tests run automatically on PR via GitHub Actions.
