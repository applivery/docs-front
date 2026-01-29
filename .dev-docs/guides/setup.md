# Local Development Setup Guide

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 20+ | JavaScript runtime |
| pnpm | 9+ | Package manager |
| Docker Desktop | Latest | Database services |

### Installing Prerequisites

**Node.js**: Download from [nodejs.org](https://nodejs.org) or use nvm:
```bash
nvm install 20
nvm use 20
```

**pnpm**: Install globally:
```bash
npm install -g pnpm
```

**Docker Desktop**: Download from [docker.com](https://www.docker.com/products/docker-desktop/)

## Setup Steps

### 1. Start Docker Desktop

**Important**: Docker Desktop must be running before executing the setup script.

On macOS:
- Open Docker Desktop from Applications
- Wait for the whale icon in the menu bar to show "Docker Desktop is running"

You can verify Docker is running:
```bash
docker info
```

If you see "Cannot connect to the Docker daemon", Docker is not running.

### 2. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd applivery-docs

# Run the automated setup
./scripts/setup.sh
```

The setup script will:
1. Check for required tools
2. Create `.env` from `.env.example`
3. Install dependencies with pnpm
4. Start Docker services (PostgreSQL, Redis, Meilisearch, MinIO)
5. Run database migrations
6. Seed sample data

### 3. Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Start Docker services
docker compose -f docker/docker-compose.yml up -d

# Wait for services to be ready
docker compose -f docker/docker-compose.yml ps

# Push database schema
pnpm db:push

# Seed demo data
pnpm db:seed
```

### 4. Start Development

```bash
# Start all apps
pnpm dev
```

This starts:
- **API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173
- **Documentation Site**: http://localhost:4321

## Docker Services

The docker-compose.yml provides:

| Service | Port | Purpose |
|---------|------|---------|
| PostgreSQL | 5432 | Primary database |
| Redis | 6379 | Caching and sessions |
| Meilisearch | 7700 | Full-text search |
| MinIO | 9000, 9001 | S3-compatible storage |

### Managing Docker Services

```bash
# Start services
docker compose -f docker/docker-compose.yml up -d

# Stop services
docker compose -f docker/docker-compose.yml down

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Reset everything (deletes data)
docker compose -f docker/docker-compose.yml down -v
```

## Troubleshooting

### "Cannot connect to the Docker daemon"

Docker Desktop is not running. Start it and wait for initialization.

### Port already in use

Another service is using the port. Either stop that service or modify the ports in `docker/docker-compose.yml`.

### Database connection failed

1. Check Docker services: `docker compose -f docker/docker-compose.yml ps`
2. Verify PostgreSQL is healthy
3. Check `.env` database URL matches docker-compose settings

### pnpm install fails

```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules
pnpm install
```

## Demo Credentials

After seeding, use these credentials:

- **Email**: demo@applivery.com
- **Organization**: applivery
- **Workspace**: platform

## Database Tools

Access Drizzle Studio for database inspection:
```bash
pnpm db:studio
```

Opens at http://localhost:4983

## Next Steps

1. Review the [Architecture Overview](../architecture/overview.md)
2. Check the [Current Sprint](../sprints/sprint-02.md) for planned work
3. Read the [API Documentation](../architecture/api.md)
