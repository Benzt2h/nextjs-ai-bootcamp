"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact"

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })

        const data = await res.json()

        if (!data.success) {
          toast.error(data.error ?? "เกิดข้อผิดพลาด")
          return
        }

        form.reset()
        setIsSuccess(true)
      } catch {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง")
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="size-12 text-green-500" />
        <h3 className="text-lg font-semibold">ส่งข้อความสำเร็จ</h3>
        <p className="text-muted-foreground">
          ขอบคุณที่ติดต่อมา เราจะตอบกลับโดยเร็วที่สุด
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อของคุณ" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <FormLabel>ข้อความ</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="พิมพ์ข้อความที่ต้องการ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
        </Button>
      </form>
    </Form>
  )
}
