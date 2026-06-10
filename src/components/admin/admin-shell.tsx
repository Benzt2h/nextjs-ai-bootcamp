"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiMenuLine,
  RiDashboardLine,
  RiShoppingBagLine,
} from "@remixicon/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import LogoutButton from "@/components/logout-button"

const navItems = [
  {
    href: "/dashboard",
    label: "แดชบอร์ด",
    icon: RiDashboardLine,
  },
  {
    href: "/dashboard/products",
    label: "สินค้า",
    icon: RiShoppingBagLine,
  },
]

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-card"
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <RiMenuLine className="size-5" />
              <span className="sr-only">เปิดเมนู</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>เมนูจัดการ</SheetTitle>
            </SheetHeader>
            <SidebarNav onNavigate={() => setOpen(false)} />
            <div className="mt-auto px-6 pb-6">
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="font-heading text-sm font-medium">
          Admin
        </Link>

        <div className="ml-auto">
          <LogoutButton />
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
