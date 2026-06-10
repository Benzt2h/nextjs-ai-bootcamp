"use client"

import { useState, useEffect, useCallback } from "react"
import { RiAddLine, RiSearchLine, RiPencilLine, RiDeleteBinLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import { formatCurrency } from "@/lib/utils"
import type { AdminProduct, CategoryOption, PaginatedProducts, ApiResponse } from "@/types/admin"
import { ProductFormModal } from "./product-form-modal"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

const PAGE_SIZE = 10

export function ProductsClient() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [inputVal, setInputVal] = useState("")
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null)

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({ page: String(page) })
      if (search) params.set("search", search)
      const res = await fetch(`/api/admin/products?${params}`)
      const json: ApiResponse<PaginatedProducts> = await res.json()
      if (!json.success) throw new Error(json.error)
      setProducts(json.data.products)
      setTotal(json.data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ")
    } finally {
      setLoading(false)
    }
  }, [page, search])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const json: ApiResponse<CategoryOption[]> = await res.json()
      if (json.success) setCategories(json.data)
    } catch {
      // categories load silently
    }
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(inputVal)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [inputVal])

  function handleCreate() {
    setEditProduct(null)
    setFormOpen(true)
  }

  function handleEdit(product: AdminProduct) {
    setEditProduct(product)
    setFormOpen(true)
  }

  function handleSaved() {
    setFormOpen(false)
    fetchProducts()
    fetchCategories()
  }

  function handleDeleted() {
    setDeleteTarget(null)
    fetchProducts()
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">สินค้า</h1>
          <p className="text-muted-foreground">จัดการรายการสินค้าทั้งหมด</p>
        </div>
        <Button onClick={handleCreate}>
          <RiAddLine />
          เพิ่มสินค้า
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาสินค้า..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Spinner className="size-6" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <p className="text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchProducts}>
                ลองใหม่
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <p className="text-muted-foreground">
                {search ? "ไม่พบสินค้าที่ค้นหา" : "ยังไม่มีสินค้า"}
              </p>
              {!search && (
                <Button variant="outline" size="sm" onClick={handleCreate}>
                  <RiAddLine />
                  เพิ่มสินค้าชิ้นแรก
                </Button>
              )}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อสินค้า</TableHead>
                    <TableHead>หมวดหมู่</TableHead>
                    <TableHead className="text-right">ราคา</TableHead>
                    <TableHead className="w-[100px]">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.categoryName}</TableCell>
                      <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleEdit(p)}
                          >
                            <RiPencilLine className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setDeleteTarget(p)}
                          >
                            <RiDeleteBinLine className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-muted-foreground">
                    หน้า {page} จาก {totalPages} ({total} รายการ)
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      ก่อนหน้า
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      ถัดไป
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ProductFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        categories={categories}
        onSaved={handleSaved}
      />

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => { if (!open) setDeleteTarget(null) }}
        product={deleteTarget}
        onDeleted={handleDeleted}
      />
    </div>
  )
}
