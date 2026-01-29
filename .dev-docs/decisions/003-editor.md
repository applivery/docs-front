# ADR 003: TipTap for Rich Text Editor

## Status
Accepted

## Context
We need a rich text editor that supports:
- WYSIWYG editing experience
- Markdown editing mode
- Custom documentation components (callouts, tabs, etc.)
- Slash command menu for inserting blocks
- Version history integration
- Collaborative editing (future)

## Decision
Use **TipTap** (ProseMirror wrapper) as the editor framework.

## Rationale

### Why TipTap?
1. **ProseMirror foundation**: Battle-tested, well-documented core
2. **Extension system**: Clean API for custom nodes and marks
3. **React integration**: First-class React support via @tiptap/react
4. **Slash commands**: Easy to implement with Suggestion extension
5. **JSON output**: Structured content for versioning and storage
6. **Collaboration ready**: Y.js integration available
7. **Active development**: Regular updates, good community

### Extension Architecture
```
TipTap Editor
├── StarterKit (built-in)
│   ├── Document, Paragraph, Text
│   ├── Bold, Italic, Strike, Code
│   ├── Heading (H1-H3)
│   ├── Bullet List, Ordered List
│   ├── Blockquote, Code Block
│   └── Horizontal Rule
├── Additional Extensions
│   ├── Placeholder
│   ├── Link
│   ├── Typography
│   └── CodeBlockLowlight
└── Custom Extensions (Sprint 2)
    ├── Callout
    ├── Tabs
    ├── Accordion
    ├── Steps
    ├── Card / CardGroup
    ├── ParameterTable
    └── RequestExample / ResponseExample
```

## Alternatives Considered

### Slate.js
- Pro: Very flexible, React-native
- Con: Lower-level, more work to build features, less stable API

### Lexical (Meta)
- Pro: Good performance, modern architecture
- Con: Younger ecosystem, less documentation

### Editor.js
- Pro: Simple block-based editing
- Con: Limited formatting, harder to customize, JSON output not as flexible

### CKEditor
- Pro: Full-featured, enterprise-ready
- Con: Complex licensing, heavy bundle, harder to customize

### Monaco Editor
- Pro: Excellent for code
- Con: Code-focused, not suitable for rich documentation

## Custom Extension Pattern

```typescript
// Example: Callout extension
import { Node } from '@tiptap/core';

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',

  addAttributes() {
    return {
      type: { default: 'info' }, // info, warning, error, success, tip
      title: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-callout': '', ...HTMLAttributes }, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
```

## Dual Mode Support

### WYSIWYG Mode
- TipTap editor with custom rendering
- Visual formatting tools
- Drag-and-drop block reordering

### Markdown Mode
- Plain textarea with syntax highlighting
- Real-time preview panel
- Converts between HTML and Markdown

```typescript
// Mode switching
const [mode, setMode] = useState<'wysiwyg' | 'markdown'>('wysiwyg');

if (mode === 'markdown') {
  return <MarkdownEditor content={content} onChange={setContent} />;
}
return <TipTapEditor content={content} onChange={setContent} />;
```

## Consequences

### Positive
- Rich, flexible editing experience
- Clean extension API for documentation components
- JSON storage enables versioning and diffing
- Collaboration support path available

### Negative
- Learning curve for ProseMirror concepts
- Custom components require significant development
- Bundle size (~100KB+ for full editor)

## Integration Points

### Storage
```
Editor JSON → Document content column (JSONB or text)
```

### Versioning
```
Each save → New document_version row with content snapshot
```

### Rendering (Public Docs)
```
TipTap JSON → Custom Astro components
```
