import type { Metadata } from "next"
import { Mail, Phone, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ส่งข้อความหรือสอบถามข้อมูล ติดต่อทีมงานของเรา",
}

export default function ContactPage() {
  return (
    <main>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ติดต่อเรา
          </h1>
          <p className="mt-3 text-muted-foreground">
            ส่งข้อความหรือสอบถามข้อมูล ติดต่อทีมงานของเรา
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  contact@example.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">เบอร์โทร</p>
                <p className="text-sm text-muted-foreground">
                  02-123-4567
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">เวลาทำการ</p>
                <p className="text-sm text-muted-foreground">
                  จันทร์ - ศุกร์ 9:00 - 18:00 น.
                </p>
              </div>
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground">
              มีคำถาม ข้อเสนอแนะ หรือต้องการความช่วยเหลือ
              กรุณากรอกแบบฟอร์มด้านข้าง แล้วเราจะติดต่อกลับ
            </p>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
