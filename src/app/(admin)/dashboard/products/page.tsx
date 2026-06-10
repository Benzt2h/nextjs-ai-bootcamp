import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { ProductsClient } from "./products-client"

export default async function AdminProductsPage() {
  await connection()
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  return <ProductsClient />
}
