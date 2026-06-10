import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { productApiSchema } from "@/lib/validations/product"
import type { ApiResponse, AdminProduct } from "@/types/admin"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" } satisfies ApiResponse<never>,
        { status: 401 }
      )
    }

    const { id } = await params
    const productId = Number(id)

    const existing = await prisma.products.findUnique({
      where: { id: productId },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "ไม่พบสินค้า" } satisfies ApiResponse<never>,
        { status: 404 }
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

    const product = await prisma.products.update({
      where: { id: productId },
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

    return NextResponse.json({ success: true, data } satisfies ApiResponse<AdminProduct>)
  } catch {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" } satisfies ApiResponse<never>,
        { status: 401 }
      )
    }

    const { id } = await params
    const productId = Number(id)

    const existing = await prisma.products.findUnique({
      where: { id: productId },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "ไม่พบสินค้า" } satisfies ApiResponse<never>,
        { status: 404 }
      )
    }

    const count = await prisma.order_items.count({
      where: { product_id: productId },
    })

    if (count > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่สามารถลบสินค้านี้ได้ เนื่องจากมีคำสั่งซื้อที่เกี่ยวข้อง ${count} รายการ`,
        } satisfies ApiResponse<never>,
        { status: 409 }
      )
    }

    await prisma.products.delete({ where: { id: productId } })

    return NextResponse.json(
      { success: true, data: { id } } satisfies ApiResponse<{ id: string }>,
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}
