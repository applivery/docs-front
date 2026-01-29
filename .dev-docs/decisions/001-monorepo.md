# ADR 001: Monorepo with pnpm Workspaces + Turborepo

## Status
Accepted

## Context
We need a project structure that supports:
- Multiple applications (API, Admin, Public Docs, MCP Server)
- Shared packages (database, UI, config)
- Efficient builds and development
- Good developer experience

## Decision
Use a monorepo approach with:
- **pnpm workspaces** for dependency management
- **Turborepo** for task orchestration and caching

## Rationale

### Why Monorepo?
1. **Code sharing**: Shared database schema, UI components, and config across apps
2. **Atomic changes**: Update database schema and all consuming apps in one commit
3. **Simplified dependency management**: Single lockfile, consistent versions
4. **Better DX**: One clone, one install, run all apps

### Why pnpm?
1. **Disk efficiency**: Symlinked packages save space
2. **Strict dependencies**: Prevents phantom dependencies
3. **Fast**: Parallel downloads, content-addressable storage
4. **Workspace support**: Native, mature workspace handling

### Why Turborepo?
1. **Build caching**: Skip unchanged packages
2. **Parallel execution**: Run independent tasks concurrently
3. **Task orchestration**: Define dependencies between build steps
4. **Remote caching**: Share build cache across team (optional)

## Alternatives Considered

### Polyrepo (separate repositories)
- Pro: Clear boundaries, independent deployment
- Con: Difficult to share code, cross-repo changes are painful

### Nx
- Pro: More features, better IDE integration
- Con: More complex, steeper learning curve, overkill for our size

### Lerna (alone)
- Pro: Mature, well-known
- Con: Slower, less maintained, pnpm has native workspace support

## Consequences

### Positive
- Single source of truth for all code
- Shared tooling and configuration
- Efficient CI/CD with caching

### Negative
- Larger repository size
- Need to manage package boundaries carefully
- All developers need all apps locally (can be mitigated)

## Structure

```
applivery-docs/
├── apps/
│   ├── api/          # Hono REST API
│   ├── admin/        # React admin dashboard
│   ├── web/          # Astro public docs
│   └── mcp-server/   # MCP integration
├── packages/
│   ├── database/     # Drizzle schema + client
│   ├── ui/           # Shared components
│   ├── config/       # Shared config
│   ├── editor/       # TipTap extensions
│   ├── auth/         # Auth utilities
│   └── ai/           # AI integration
└── docker/           # Development services
```
