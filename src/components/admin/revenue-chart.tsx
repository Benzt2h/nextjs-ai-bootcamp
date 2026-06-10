"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { RevenuePoint } from "@/types/admin"

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        ไม่มีข้อมูลรายได้
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="date"
          className="text-xs text-muted-foreground"
          tick={{ fill: "var(--muted-foreground)" }}
        />
        <YAxis
          className="text-xs text-muted-foreground"
          tick={{ fill: "var(--muted-foreground)" }}
          tickFormatter={(v: number) =>
            new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              notation: "compact",
            }).format(v)
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            color: "var(--card-foreground)",
          }}
          formatter={(value) =>
            new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(Number(value))
          }
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--primary)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "var(--primary)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
