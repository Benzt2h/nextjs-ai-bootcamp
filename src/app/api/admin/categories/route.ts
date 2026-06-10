import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import type { ApiResponse, CategoryOption } from "@/types/admin"

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" } satisfies ApiResponse<never>,
        { status: 401 }
      )
    }

    const categories = await prisma.categories.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })

    const data: CategoryOption[] = categories.map((c) => ({
      id: String(c.id),
      name: c.name!,
    }))

    return NextResponse.json({
      success: true,
      data,
    } satisfies ApiResponse<CategoryOption[]>)
  } catch {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}
