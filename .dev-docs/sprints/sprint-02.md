# Sprint 02: Editor Features (Planned)

**Status**: 📋 Planned
**Dependencies**: Sprint 01 complete
**Goal**: Complete the documentation editor with all custom components

## Objectives

1. 🔲 Create TipTap extensions for all doc components
2. 🔲 Implement slash command menu with component insertion
3. 🔲 Build navigation tree editor (drag & drop)
4. 🔲 Add version history UI with diff viewer
5. 🔲 Implement branch management (draft/published)
6. 🔲 Create external content import feature

## Planned Work

### 1. TipTap Extensions

Create custom TipTap nodes for documentation components:

```typescript
// packages/editor/src/extensions/callout.ts
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
});
```

Components to implement:
- [x] Basic formatting (bold, italic, code) - via StarterKit
- [x] Headings (H1-H3) - via StarterKit
- [x] Lists (bullet, numbered, task) - via StarterKit
- [x] Code blocks with syntax highlighting
- [ ] **Callout** - Info/warning/error boxes
- [ ] **Accordion** - Collapsible sections
- [ ] **AccordionGroup** - Multiple accordions
- [ ] **Tabs** - Tabbed content
- [ ] **Steps** - Numbered step sequence
- [ ] **Card** - Clickable card with icon
- [ ] **CardGroup** - Grid of cards
- [ ] **ParameterTable** - API parameters
- [ ] **RequestExample** - API request with method badge
- [ ] **ResponseExample** - API response with status
- [ ] **IconList** - List with icons
- [ ] **ExternalImport** - Import from URL

### 2. Slash Command Enhancement

Current slash menu is display-only. Need to:

```typescript
// When user selects a component from slash menu
onSelect: (item) => {
  switch (item.name) {
    case 'callout':
      editor.chain().focus().insertCallout({ type: 'info' }).run();
      break;
    case 'tabs':
      editor.chain().focus().insertTabs({ tabs: ['Tab 1', 'Tab 2'] }).run();
      break;
    // ...
  }
}
```

### 3. Navigation Tree Editor

Visual editor for sidebar structure:

```
┌─────────────────────────────────────┐
│ Navigation Editor                    │
├─────────────────────────────────────┤
│ 📑 Getting Started      [≡] [+] [×] │
│   └─ 📄 Introduction                │
│   └─ 📄 Quick Start                 │
│ 📑 API Reference        [≡] [+] [×] │
│   └─ 📁 Overview (expanded)         │
│      └─ 📄 Authentication           │
│   └─ 📁 Endpoints                   │
│      └─ 📄 Apps                     │
│      └─ 📄 Builds                   │
└─────────────────────────────────────┘
```

Features:
- Drag and drop reordering
- Create tabs, groups, links, dividers
- Link to documents or external URLs
- Toggle visibility
- Set custom icons

### 4. Version History UI

```
┌─────────────────────────────────────┐
│ Version History                      │
├─────────────────────────────────────┤
│ ⭐ v5 - "Pinned: Ready for review"  │
│    Jan 15, 2024 by Demo User        │
│    [Restore] [View Diff]            │
├─────────────────────────────────────┤
│ v4 - Auto-saved                     │
│    Jan 15, 2024 by Demo User        │
│    [Restore] [Pin]                  │
├─────────────────────────────────────┤
│ v3 - Auto-saved                     │
│    Jan 14, 2024 by Admin User       │
└─────────────────────────────────────┘
```

### 5. Branch Management

Support for draft branches:

```
Document: "API Overview"
├── main (published)
└── draft (work in progress)
```

UI controls:
- Create branch from current
- Switch between branches
- Merge draft to main (publish)
- Discard draft

### 6. External Content Import

Dialog for importing content from URLs:

```
┌─────────────────────────────────────┐
│ Import External Content              │
├─────────────────────────────────────┤
│ URL: https://example.com/docs/api   │
│                                      │
│ Selector: .main-content              │
│ Type: ○ CSS  ○ XPath  ○ ID          │
│                                      │
│ Preview:                             │
│ ┌─────────────────────────────────┐ │
│ │ [Extracted content preview...]  │ │
│ └─────────────────────────────────┘ │
│                                      │
│ [ ] Auto-sync every [24] hours      │
│                                      │
│ [Cancel]              [Import]       │
└─────────────────────────────────────┘
```

## Files to Create

```
packages/editor/
├── src/
│   ├── extensions/
│   │   ├── callout.ts
│   │   ├── accordion.ts
│   │   ├── tabs.ts
│   │   ├── steps.ts
│   │   ├── card.ts
│   │   ├── parameter-table.ts
│   │   ├── api-example.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── CalloutComponent.tsx
│   │   ├── AccordionComponent.tsx
│   │   ├── TabsComponent.tsx
│   │   └── ...
│   └── index.ts
└── package.json

apps/admin/src/components/
├── editor/
│   ├── NavigationEditor.tsx
│   ├── VersionHistory.tsx
│   ├── BranchSelector.tsx
│   └── ImportDialog.tsx
```

## API Changes

```typescript
// New endpoints
POST /api/documents/:id/branch     // Create branch
POST /api/documents/:id/merge      // Merge branches
POST /api/workspaces/:wid/import   // Import external content
GET  /api/workspaces/:wid/imports  // List imports
POST /api/imports/:id/sync         // Trigger sync
```

## Dependencies to Add

```json
{
  "@dnd-kit/core": "^6.x",          // Drag and drop
  "@dnd-kit/sortable": "^8.x",      // Sortable lists
  "diff": "^5.x",                    // Text diffing
  "cheerio": "^1.x",                 // HTML parsing (API)
  "puppeteer": "^22.x"               // Page scraping (API)
}
```

## Acceptance Criteria

- [ ] All 15+ components insertable via slash menu
- [ ] Components render correctly in editor and preview
- [ ] Navigation tree can be fully managed visually
- [ ] Version history shows diffs between versions
- [ ] Can create draft branch, edit, and publish
- [ ] External import extracts and saves content

## Estimated Effort

| Task | Complexity | Estimate |
|------|------------|----------|
| TipTap extensions | High | 3-4 days |
| Slash menu integration | Medium | 1-2 days |
| Navigation editor | High | 2-3 days |
| Version history UI | Medium | 1-2 days |
| Branch management | Medium | 1-2 days |
| External import | High | 2-3 days |

**Total**: ~12-16 days
