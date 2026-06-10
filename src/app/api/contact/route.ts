import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations/contact"

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.issues
        .map((i) => i.message)
        .join(", ")

      return NextResponse.json(
        { success: false, error: message } satisfies ApiResponse<never>,
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL ?? process.env.SMTP_USER

    if (!receiverEmail) {
      return NextResponse.json(
        { success: false, error: "ยังไม่ได้ตั้งค่าอีเมลผู้รับ" } satisfies ApiResponse<never>,
        { status: 500 }
      )
    }

    await resend.emails.send({
      from: `Contact Form <${process.env.SMTP_USER}>`,
      to: receiverEmail,
      subject: `ข้อความติดต่อจาก ${name}`,
      replyTo: email,
      html: `
        <h2>ข้อความติดต่อใหม่</h2>
        <p><strong>ชื่อ:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ข้อความ:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json(
      { success: true, data: { message: "ส่งข้อความสำเร็จ" } } satisfies ApiResponse<{ message: string }>
    )
  } catch (error) {
    console.error("Contact form error:", error)

    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" } satisfies ApiResponse<never>,
      { status: 500 }
    )
  }
}
