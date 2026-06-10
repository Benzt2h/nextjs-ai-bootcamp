import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../generated/prisma/client"
import { hashPassword } from "@better-auth/utils/password"

async function seedAdmin() {
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
  const db = new PrismaClient({ adapter })

  const email = "admin@wha.app"
  const password = "Admin_1234"
  const userId = crypto.randomUUID()
  const accountId = crypto.randomUUID()

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin user already exists, updating role to admin")
    await db.user.update({ where: { email }, data: { role: "admin" } })
    await db.$disconnect()
    return
  }

  const hashed = await hashPassword(password)

  await db.user.create({
    data: {
      id: userId,
      name: "Admin",
      email,
      role: "admin",
      emailVerified: true,
    },
  })

  await db.account.create({
    data: {
      id: accountId,
      accountId: userId,
      providerId: "credential",
      userId,
      password: hashed,
    },
  })

  console.log(`Admin user created: ${email} / ${password}`)
  await db.$disconnect()
}

seedAdmin().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
