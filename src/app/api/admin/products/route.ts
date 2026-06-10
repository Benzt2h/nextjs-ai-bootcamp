import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { productApiSchema } from "@/lib/validations/product"
import type { ApiResponse, AdminProduct, PaginatedProducts } from "@/types/admin"

const PAGE_SIZE = 10

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" } satisfies ApiResponse<never>,
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const page = Math.max(1, Number(searchParams.get("page")) || 1)

    const where = search
      ? { name: { contains: search } }
      : {}

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where,
        include: { categories: { select: { name: true } } },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        orderBy: { id: "desc" },
      }),
      prisma.products.count({ where }),
    ])

    const data: AdminProduct[] = products.map((p) => ({
      id: String(p.id),
      name: p.name!,
      description: p.description,
      price: Number(p.price),
      categoryId: String(p.category_id),
      categoryName: p.categories!.name!,
    }))

    return NextResponse.json({
      success: true,
      data: { products: data, total, page, pageSize: PAGE_SIZE },
    } satisfies ApiResponse<PaginatedProducts>)
  } catch {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" } satisfies ApiResponse<never>,
        { status: 401 }
      )
    }

    const body = await request.json()
    const parsed = productApiSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(", ")
      return NextResponse.json(
        { success: false, error: message } satisfies ApiResponse<never>,
        { status: 400 }
      )
    }

    const product = await prisma.products.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description || null,
        price: parsed.data.price,
        category_id: Number(parsed.data.categoryId),
      },
      include: { categories: { select: { name: true } } },
    })

    const data: AdminProduct = {
      id: String(product.id),
      name: product.name!,
      description: product.description,
      price: Number(product.price),
      categoryId: String(product.category_id),
      categoryName: product.categories!.name!,
    }

    return NextResponse.json(
      { success: true, data } satisfies ApiResponse<AdminProduct>,
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}
