'use client'

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

export default function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const clearCart = useCartStore((state) => state.clearCart)

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            clearCart()
            router.push('/')
          },
          onError: (ctx) => {
            toast.error(ctx.error?.message ?? "เกิดข้อผิดพลาด")
          }
        }
      })
    })
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleLogout} disabled={isPending}>
      {isPending && <Spinner className="mr-1.5" />}
      {isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
    </Button>
  )
}
