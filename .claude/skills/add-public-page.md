# Applivery Docs - Add Public Page Skill

## Description
Create a new page for the public documentation site (Astro 5).

## Instructions
1. Create page in `/apps/web/src/pages/`
2. Use existing layouts and components
3. Optionally add to navigation

## Page Structure (Astro)
```astro
---
// apps/web/src/pages/example.astro
import BaseLayout from '../layouts/BaseLayout.astro'
import { contentService } from '../services/content'

const { workspace } = Astro.locals
const data = await contentService.getData(workspace.id)
---

<BaseLayout title="Example Page">
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Example Page</h1>

    <div class="prose dark:prose-invert max-w-none">
      <!-- Content here -->
    </div>
  </main>
</BaseLayout>
```

## Page with React Islands
```astro
---
// apps/web/src/pages/interactive.astro
import BaseLayout from '../layouts/BaseLayout.astro'
import InteractiveComponent from '../components/InteractiveComponent'
---

<BaseLayout title="Interactive Page">
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Interactive Page</h1>

    <!-- React component with client hydration -->
    <InteractiveComponent client:load />

    <!-- Or lazy load when visible -->
    <InteractiveComponent client:visible />
  </main>
</BaseLayout>
```

## React Component
```tsx
// apps/web/src/components/InteractiveComponent.tsx
import { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 border rounded">
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  )
}
```

## Dynamic Routes
```astro
---
// apps/web/src/pages/docs/[...slug].astro
export async function getStaticPaths() {
  const docs = await getAllDocs()
  return docs.map(doc => ({
    params: { slug: doc.slug },
    props: { doc }
  }))
}

const { doc } = Astro.props
---

<BaseLayout title={doc.title}>
  <article set:html={doc.content} />
</BaseLayout>
```

## Client Directives
- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when browser is idle
- `client:visible` - Hydrate when component is visible
- `client:media="(max-width: 768px)"` - Hydrate on media query match
- `client:only="react"` - Skip SSR, client render only

## Existing Layouts
- `BaseLayout.astro` - Full page with header/footer
- `DocsLayout.astro` - Documentation with sidebar
