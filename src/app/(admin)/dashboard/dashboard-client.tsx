"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import dynamic from "next/dynamic"
import { RiRefreshLine } from "@remixicon/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card"
import { PeriodSelector } from "@/components/admin/period-selector"
import { RecentOrdersTable, RecentOrdersTableSkeleton } from "@/components/admin/recent-orders-table"
import { formatCurrency } from "@/lib/utils"
import type { AdminStats, RevenuePoint, AdminOrderItem, Period } from "@/types/admin"

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((mod) => ({ default: mod.RevenueChart })),
  { ssr: false }
)

export function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [revenue, setRevenue] = useState<RevenuePoint[]>([])
  const [revenueLoading, setRevenueLoading] = useState(true)
  const [revenueError, setRevenueError] = useState<string | null>(null)

  const [orders, setOrders] = useState<AdminOrderItem[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  const [period, setPeriod] = useState<Period>("30d")

  const hasLoadedStats = useRef(false)
  const hasLoadedOrders = useRef(false)
  const hasLoadedRevenue = useRef(false)

  const fetchStats = useCallback(async () => {
    try {
      setStatsError(null)
      const res = await fetch("/api/admin/stats")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: AdminStats = await res.json()
      setStats(data)
      hasLoadedStats.current = true
    } catch (err) {
      if (!hasLoadedStats.current) {
        setStatsError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ")
      }
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    try {
      setOrdersError(null)
      const res = await fetch("/api/admin/orders?limit=5")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: { orders: AdminOrderItem[] } = await res.json()
      setOrders(data.orders)
      hasLoadedOrders.current = true
    } catch (err) {
      if (!hasLoadedOrders.current) {
        setOrdersError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ")
      }
    } finally {
      setOrdersLoading(false)
    }
  }, [])

  const fetchRevenue = useCallback(async (p: Period) => {
    try {
      setRevenueError(null)
      setRevenueLoading(true)
      const res = await fetch(`/api/admin/revenue?period=${p}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: RevenuePoint[] = await res.json()
      setRevenue(data)
      hasLoadedRevenue.current = true
    } catch (err) {
      if (!hasLoadedRevenue.current) {
        setRevenueError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ")
      }
      setRevenue([])
    } finally {
      setRevenueLoading(false)
    }
  }, [])

  const handlePeriodChange = useCallback(
    (p: Period) => {
      setPeriod(p)
      fetchRevenue(p)
    },
    [fetchRevenue]
  )

  useEffect(() => {
    void (async () => {
      await fetchStats()
      await fetchOrders()
      await fetchRevenue(period)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      void (async () => {
        await fetchStats()
        await fetchOrders()
      })()
    }, 30_000)
    return () => clearInterval(interval)
  }, [fetchStats, fetchOrders])

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">แดชบอร์ด</h1>
        <p className="text-muted-foreground">ภาพรวมของร้านค้าวันนี้</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statsLoading ? (
          <>
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
          </>
        ) : statsError ? (
          <div className="col-span-full flex items-center justify-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-destructive">
            <span>{statsError}</span>
            <button
              type="button"
              onClick={fetchStats}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              <RiRefreshLine className="size-3" />
              ลองใหม่
            </button>
          </div>
        ) : stats ? (
          <>
            <KpiCard
              label="ยอดขายวันนี้"
              value={formatCurrency(stats.todaySales)}
            />
            <KpiCard
              label="คำสั่งซื้อวันนี้"
              value={String(stats.todayOrders)}
            />
            <KpiCard
              label="รอดำเนินการ"
              value={String(stats.pendingOrders)}
            />
            <KpiCard
              label="สินค้าทั้งหมด"
              value={String(stats.totalProducts)}
            />
            <KpiCard
              label="ผู้ใช้งาน"
              value={String(stats.totalUsers)}
            />
          </>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>รายได้</CardTitle>
              <CardDescription>กราฟแสดงรายได้ย้อนหลัง</CardDescription>
            </div>
            <PeriodSelector period={period} onChange={handlePeriodChange} />
          </div>
        </CardHeader>
        <CardContent>
          {revenueLoading ? (
            <div className="flex h-80 items-center justify-center">
              <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : revenueError ? (
            <div className="flex h-80 flex-col items-center justify-center gap-3 text-destructive">
              <span>{revenueError}</span>
              <button
                type="button"
                onClick={() => fetchRevenue(period)}
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              >
                <RiRefreshLine className="size-3" />
                ลองใหม่
              </button>
            </div>
          ) : (
            <RevenueChart data={revenue} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
              <CardDescription>รายการคำสั่งซื้อ 5 รายการล่าสุด</CardDescription>
            </div>
            {ordersError && (
              <button
                type="button"
                onClick={fetchOrders}
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              >
                <RiRefreshLine className="size-3" />
                ลองใหม่
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <RecentOrdersTableSkeleton />
          ) : ordersError ? (
            <div className="flex h-48 items-center justify-center text-destructive">
              {ordersError}
            </div>
          ) : (
            <RecentOrdersTable orders={orders} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
