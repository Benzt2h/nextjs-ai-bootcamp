"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginSchema, type LoginFormValues } from "@/types/auth"

export default function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: LoginFormValues) {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      }, {
        onSuccess: (ctx) => {
          const user = (ctx.data as Record<string, unknown>)?.user as Record<string, unknown> | undefined
          if (user?.role === 'admin') {
            router.replace('/dashboard')
          } else {
            router.replace('/')
          }
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message ?? "เกิดข้อผิดพลาด")
        }
      })
    })
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-background px-4">
    <Card variant="elevated" className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>เข้าสู่ระบบ</CardTitle>
        <CardDescription>
          กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-email">อีเมล</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-password">
                    รหัสผ่าน
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button type="submit" form="form-login" className="w-full" disabled={isPending}>
          {isPending && <Spinner className="mr-1.5" />}
          {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          ยังไม่มีบัญชี?{" "}
          <Link href="/signup" className="underline underline-offset-4 hover:text-primary transition-colors">
            สมัครสมาชิก
          </Link>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}