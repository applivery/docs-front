# Applivery Docs - Build Skill

## Description
Build all apps and packages for production deployment.

## Commands

### Build everything
```bash
pnpm build
```

### Build specific app
```bash
pnpm --filter @applivery-docs/api build
pnpm --filter @applivery-docs/admin build
pnpm --filter @applivery-docs/web build
```

### Build specific package
```bash
pnpm --filter @applivery-docs/database build
pnpm --filter @applivery-docs/ui build
pnpm --filter @applivery-docs/editor build
```

## Build Output
- **API**: `/apps/api/dist/`
- **Admin**: `/apps/admin/dist/`
- **Web**: `/apps/web/dist/`

## Type Checking
```bash
pnpm typecheck
```

## Linting
```bash
pnpm lint
```

## Format Code
```bash
pnpm format
```

## Clean Build Artifacts
```bash
pnpm clean
```

## Turborepo Caching
Turborepo caches build outputs. To clear cache:
```bash
pnpm turbo clean
```

## Production Checklist
1. Run `pnpm lint` - Fix any linting issues
2. Run `pnpm typecheck` - Fix any type errors
3. Run `pnpm build` - Build all apps
4. Test production builds locally
5. Set production environment variables
