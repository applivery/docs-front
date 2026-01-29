# Applivery Docs - Development Skill

## Description
Start the development environment for Applivery Docs.

## Instructions
1. First, ensure Docker services are running for the database and other dependencies
2. Start the development servers for all apps

## Commands
```bash
# Start Docker services (PostgreSQL, Redis, Meilisearch, MinIO)
docker compose -f docker/docker-compose.yml up -d

# Start all apps in development mode
pnpm dev
```

## Services
- **API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173
- **Public Docs**: http://localhost:4321
- **Drizzle Studio**: http://localhost:4983 (when running `pnpm db:studio`)
- **Meilisearch**: http://localhost:8888
- **MinIO Console**: http://localhost:9001

## Notes
- Run `pnpm install` if dependencies are not installed
- Run `pnpm db:migrate` if database migrations are pending
- Check `.env` file exists (copy from `.env.example` if needed)
