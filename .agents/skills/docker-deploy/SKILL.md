---
name: docker-deploy
description: >
  Use this skill when deploying the Next.js app via Docker to production or staging.
  Triggers on: "deploy", "docker build", "docker compose", "ขึ้น production",
  "deploy production", "build docker", "build image", or any request to create
  a production Docker image and run the container.
---

# Docker Deploy Guide

## Architecture Overview

Docker build uses a **3-stage multi-stage build** (`Dockerfile`):

| Stage  | Base Image       | Purpose                                      |
|--------|------------------|----------------------------------------------|
| deps   | node:24-alpine   | Install dependencies via `npm ci`            |
| builder| node:24-alpine   | Generate Prisma client + `npm run build`     |
| runner | node:24-alpine   | Minimal runtime, non-root `nextjs` user      |

## Deploy Checklist

### Pre-Build
- [ ] `.env.production` has all required variables (DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, RESEND_API_KEY)
- [ ] `DATABASE_URL` points to the real production database (not `localhost`)
- [ ] `BETTER_AUTH_URL` matches the production domain (e.g. `https://example.com`, not `http://localhost:3001`)
- [ ] `BETTER_AUTH_SECRET` is a secure random string (not the default from `.env.example`)
- [ ] `RESEND_API_KEY` is a real key, not `TEST`
- [ ] `prisma/schema.prisma` matches the production database schema
- [ ] `npm run lint` passes
- [ ] No non-production `.env` files in Docker build context
- [ ] `.dockerignore` excludes node_modules, .git, .next, .env (except .env.production)

### Build Image
- [ ] `npx prisma generate` succeeds in build stage
- [ ] `npm run build` succeeds in build stage (Next.js standalone output)
- [ ] Image size is reasonable (alpine + standalone ~150-300MB)
- [ ] No secrets leaked in image layers

### Runtime
- [ ] Container runs as non-root user (`nextjs`, uid 1001)
- [ ] Port 3000 exposed and mapped correctly
- [ ] Database connection pool size is appropriate (`connection_limit=5`)
- [ ] Health check is configured (if available)

## Build & Run

**Before every build, ask the user: "What version number do you want?" (e.g. 1.0.0, 1.0.1, 1.1.0)**

```bash
# 1. Build image (use version tag, never use :latest in production)
docker build -t nextjs-wha-app:{{VERSION}} .

# 2. Run container (production)
docker run -d \
  --restart=always \
  --name my-nextjs-wha-app \
  --env-file .env.production \
  -p 3001:3000 \
  nextjs-wha-app:{{VERSION}}

# 3. Check logs
docker logs -f my-nextjs-wha-app

# 4. Stop & remove
docker stop my-nextjs-wha-app && docker rm my-nextjs-wha-app
```

### Key Flags

| Flag | Description |
|------|-------------|
| `-d` | Run container in background (detached mode) |
| `--restart=always` | Auto-restart container on crash or when Docker daemon starts (after host reboot) — required for production |
| `--name my-nextjs-wha-app` | Assign a fixed container name for easy reference (must be unique; delete old container first if reusing the name) |
| `--env-file .env.production` | Load environment variables from `.env.production` |
| `-p 3001:3000` | Map host port 3001 → container port 3000 (`HOST:CONTAINER`) |
| `nextjs-wha-app:{{VERSION}}` | Image with version tag (never use `:latest` in production — you can't track which version is deployed) |

> **Warning:** `docker run 3001:3000` without `-p` — port mapping will not work. Docker treats `3001:3000` as a command argument, not a port mapping. Always use `-p 3001:3000`.

### Local Dev with Docker (DB on Host Machine)

A container cannot reach the host's `localhost`. Use `host.docker.internal` instead:

```bash
# In .env.production use:
# DATABASE_URL=mysql://root:pass@host.docker.internal:3306/wha_ecommerce?connection_limit=5&pool_timeout=30

docker run -d \
  --name my-nextjs-wha-app \
  --env-file .env.production \
  --add-host=host.docker.internal:host-gateway \
  -p 3001:3000 \
  nextjs-wha-app:{{VERSION}}
```

### Redeploy (update container after building a new image)

```bash
docker stop my-nextjs-wha-app && docker rm my-nextjs-wha-app
docker run -d \
  --restart=always \
  --name my-nextjs-wha-app \
  --env-file .env.production \
  -p 3001:3000 \
  nextjs-wha-app:{{VERSION}}
```

## Environment Variables (Production)

| Variable            | Required | Example                                      | Notes                                  |
|---------------------|----------|----------------------------------------------|----------------------------------------|
| `DATABASE_URL`      | Yes      | `mysql://user:pass@host:3306/db`             | MariaDB connection string              |
| `BETTER_AUTH_SECRET`| Yes      | random 32+ char string                       | Auth signing key — never use the default |
| `BETTER_AUTH_URL`   | Yes      | `https://your-domain.com`                    | Public URL of the app                  |
| `RESEND_API_KEY`    | Yes      | `re_xxxxxxxxxxxx`                            | Email service API key                  |

## Common Issues

### Prisma Client not found
- Verify `generated/` directory is copied into the runner stage
- Verify `prisma/` schema is copied into the runner stage

### Database connection refused
- On a real server: `DATABASE_URL` must not use `localhost` or `host.docker.internal`
- Ensure the database server accepts connections from the container's IP
- Check firewall / security group rules

### Standalone build breaks
- `next.config.ts` must have `output: "standalone"` (already set)
- Do not use `getServerSideProps` or incompatible Pages Router APIs

### Image build slow
- `.dockerignore` should exclude `.next/`, `node_modules/`, `.git/` to reduce build context size
- Prisma generate should cache when schema hasn't changed
