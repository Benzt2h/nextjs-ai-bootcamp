"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { AdminProduct, ApiResponse } from "@/types/admin"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: AdminProduct | null
  onDeleted: () => void
}

export function DeleteConfirmDialog({ open, onOpenChange, product, onDeleted }: Props) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!product) return
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" })
        const json: ApiResponse<{ id: string }> = await res.json()
        if (!json.success) throw new Error(json.error)
        toast.success("ลบสินค้าสำเร็จ")
        onDeleted()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "เกิดข้อผิดพลาด")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ยืนยันการลบสินค้า</DialogTitle>
          <DialogDescription>
            คุณต้องการลบสินค้า <strong>{product?.name}</strong> ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            ยกเลิก
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-1.5" />}
            ลบสินค้า
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
