---
name: project-onboarding
description: Use when a new developer asks about setup project, how to get started, what tech stack is used. Triggers on "โปรเจกต์นี้ตั้งค่าอย่างไร", "โปรเจกต์เริ่มต้นอย่างไร". or any orientation question from someone unfamiliar with the codebase.
compatibility: Use Node.js 22+
license: MIT
metadata: 
    authors: 
        - name: Benzt2h
        - version: 1.0.0
---

## First-Time Setup

```bash
# 1. Install Deps
npm install

# 2. Copy env
cp .env.example .env

# 3. Pull DB Schema (Prisma ORM)
npx prisma db pull

# 4. Generate Prisma Client
npx prisma generate

# 5. Check lint
npm run lint
```

## Gotchas

- Don't skip step setup steps, especially the Prisma ones. The app relies on the generated Prisma client and DB schema.
- Make sure to run Docker DB container before running the app, as it relies on the database connection.
- Expian how to run the project and use npm run dev to start the development server.

## Output

- if asked about project setup, return the above instructions.