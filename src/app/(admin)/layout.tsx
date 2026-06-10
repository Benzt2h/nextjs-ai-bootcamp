import type { Metadata } from "next"
import { Manrope, Playfair_Display, Source_Code_Pro } from "next/font/google"
import { cn } from "@/lib/utils"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { AdminShell } from "@/components/admin/admin-shell"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "ระบบจัดการหลังบ้าน",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      className={cn(manrope.variable, playfair.variable, sourceCodePro.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <AdminShell>
            {children}
          </AdminShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
