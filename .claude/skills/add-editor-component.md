# Applivery Docs - Add Editor Component Skill

## Description
Create a new TipTap editor component/extension for the rich text editor.

## Instructions
1. Create extension in `/packages/editor/src/extensions/`
2. Create React component in `/packages/editor/src/components/`
3. Register in the editor configuration
4. Add to slash command menu

## Extension Structure
```typescript
// packages/editor/src/extensions/example.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ExampleComponent } from '../components/ExampleComponent'

export interface ExampleOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    example: {
      setExample: (attrs: { title?: string }) => ReturnType
    }
  }
}

export const Example = Node.create<ExampleOptions>({
  name: 'example',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      title: {
        default: 'Example',
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => ({ 'data-title': attributes.title }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="example"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'example' }, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setExample: (attrs) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs,
          content: [{ type: 'paragraph' }],
        })
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ExampleComponent)
  },
})
```

## Component Structure
```tsx
// packages/editor/src/components/ExampleComponent.tsx
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

export function ExampleComponent({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className="example-wrapper">
      <div className="example-header">
        <input
          value={node.attrs.title}
          onChange={(e) => updateAttributes({ title: e.target.value })}
          className="example-title-input"
        />
      </div>
      <NodeViewContent className="example-content" />
    </NodeViewWrapper>
  )
}
```

## Add to Editor
In `/packages/editor/src/index.ts`:
```typescript
import { Example } from './extensions/example'

export const extensions = [
  // ... existing extensions
  Example,
]
```

## Add to Slash Command Menu
In `/apps/admin/src/components/editor/SlashCommandMenu.tsx`:
```typescript
const commands = [
  // ... existing commands
  {
    name: 'Example',
    description: 'Add an example block',
    icon: ExampleIcon,
    command: ({ editor }) => editor.chain().focus().setExample({}).run(),
  },
]
```

## Existing Components
- Callout (info, warning, error, success, tip)
- CodeSnippet (syntax highlighting)
- Tabs
- Accordion
- Steps
- Card / CardGroup
- ApiParam
- RequestExample / ResponseExample
