<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 + React 19 — breaking changes exist

APIs, conventions, and file structure may differ from training data. Read relevant guides in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Contents: `01-app`, `02-pages`, `03-architecture`, `04-community`, `index.md`
<!-- END:nextjs-agent-rules -->

# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (run `npx prisma generate` first if `generated/` is missing)
- `npm run lint` — ESLint v9 flat config (Next.js core-web-vitals + TypeScript)

No test, format, or typecheck scripts. No CI/CD.

## Architecture

### Stack
- **Framework:** Next.js 16.2.7, React 19.2.7
- **DB:** MariaDB via Prisma v7 (`@prisma/adapter-mariadb`)
- **Auth:** better-auth 1.6.11 (email+password, Prisma adapter)
- **Styling:** Tailwind CSS v4 (CSS-based config via `@import "tailwindcss"`, no `tailwind.config.*`)
- **UI:** shadcn/radix-luma style, remixicon icon library
- **State:** zustand (cart) with localStorage persistence

### Route groups
- `src/app/(front)/` — main site: `/`, `/about`, `/course`, `/product`, `/cart`
- `src/app/(auth)/` — `/login`, `/signup`

Each route group has its own `<html>`/`<body>` — **no shared root layout**. Do not add a root `layout.tsx` without restructuring both groups.

### Path alias
`@/*` → `./src/*` (standard Next.js)

### API routes
`src/app/api/auth/[...all]/route.ts` — better-auth handler exported as `POST` and `GET`.

## Prisma

- **Schema:** `prisma/schema.prisma` — was `db pull`'d from an existing DB, no migrations exist
- **Generated client:** `generated/prisma/` (gitignored), custom output via `output = "../generated/prisma"` in schema
- **Import path in code:** `../../generated/prisma/client` (relative from `src/lib/prisma.ts`)
- **Before build or after schema changes:** run `npx prisma generate`
- **Prisma config:** `prisma.config.ts` (v7 config file, loads `.env` via `dotenv/config`)
- **Singleton:** `src/lib/prisma.ts` uses `globalThis` pattern to prevent hot-reload duplicates

## Auth (better-auth)

- **Server:** `src/lib/auth.ts` — email+password enabled, no email verification, min 8-char password
- **Client:** `src/lib/auth-client.ts` — for client components
- Uses Prisma adapter with MySQL provider

## Cart

- Client-side only via zustand store (`src/lib/cart-store.ts`)
- Persisted to localStorage under key `skill-cart`
- No server-side cart or DB table for cart

## Docker

3-stage build (deps → builder → runner), Node 24 Alpine. Copies standalone output, `generated/` Prisma client, and `prisma/` schema to runner. Non-root `nextjs` user. See `Dockerfile` for details.

## Conventions

- UI labels are in **Thai**
- `cn()` helper in `src/lib/utils.ts` (clsx + tailwind-merge) for class merging
- Course data fetched from `https://api.codingthailand.com/api/course` with 60s ISR revalidate
- Remote image domains allowed: `www.fffuel.co`, `api.codingthailand.com`
- No tests, no CI, no formatting config exists

### Coding policy

- Create file name use '-' like 'auth-client.ts' not use '.'
- can use 'npx prisma db push' but ask user to use always

### Startup 

- Use skill 'pordee' when user prompt with thai lang