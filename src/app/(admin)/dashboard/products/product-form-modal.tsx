"use client"

import { useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectNative } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { productSchema, type ProductFormValues } from "@/lib/validations/product"
import type { AdminProduct, CategoryOption, ApiResponse } from "@/types/admin"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: AdminProduct | null
  categories: CategoryOption[]
  onSaved: () => void
}

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
}

export function ProductFormModal({ open, onOpenChange, product, categories, onSaved }: Props) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        product
          ? {
              name: product.name,
              description: product.description ?? "",
              price: product.price,
              categoryId: product.categoryId,
            }
          : defaultValues
      )
    }
  }, [open, product, form])

  async function onSubmit(values: ProductFormValues) {
    startTransition(async () => {
      try {
        const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products"
        const method = product ? "PUT" : "POST"
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        const json: ApiResponse<AdminProduct> = await res.json()
        if (!json.success) throw new Error(json.error)
        toast.success(product ? "อัปเดตสินค้าสำเร็จ" : "เพิ่มสินค้าสำเร็จ")
        onSaved()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "เกิดข้อผิดพลาด")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}</DialogTitle>
          <DialogDescription>
            {product ? "แก้ไขรายละเอียดสินค้า" : "กรอกรายละเอียดสินค้าใหม่"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <FormLabel>ชื่อสินค้า</FormLabel>
                  <FormControl>
                    <Input placeholder="กรอกชื่อสินค้า" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <FormLabel>รายละเอียด (ไม่จำเป็น)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="กรอกรายละเอียดสินค้า"
                      rows={3}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <FormLabel>ราคา (บาท)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <FormLabel>หมวดหมู่</FormLabel>
                  <FormControl>
                    <SelectNative {...field}>
                      <option value="">-- เลือกหมวดหมู่ --</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </SelectNative>
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                ยกเลิก
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner className="mr-1.5" />}
                {product ? "บันทึก" : "เพิ่มสินค้า"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
