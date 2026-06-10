"use client"

import { ArrowUpRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import type { AdminOrderItem } from "@/types/admin"

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  delivered: "default",
  received: "secondary",
  processing: "default",
}

const statusLabel: Record<string, string> = {
  delivered: "จัดส่งแล้ว",
  received: "รับแล้ว",
  processing: "กำลังดำเนินการ",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function RecentOrdersTable({ orders }: { orders: AdminOrderItem[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        ไม่มีคำสั่งซื้อล่าสุด
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>รหัส</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>จำนวนเงิน</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">#{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{formatCurrency(order.amount)}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[order.status] ?? "default"}>
                {statusLabel[order.status] ?? order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(order.date)}
            </TableCell>
            <TableCell>
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <ArrowUpRight className="size-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function RecentOrdersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>รหัส</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>จำนวนเงิน</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </TableCell>
            <TableCell>
              <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </TableCell>
            <TableCell />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
