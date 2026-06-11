import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-20 bg-background overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl text-center">
          <Badge
            asChild
            className="rounded-full border-border px-4 py-2 bg-card/40 hover:bg-card/60 transition-colors"
            variant="secondary"
          >
            <Link href="/course" className="flex items-center gap-2 text-foreground">
              เรียนรู้การพัฒนาเว็บกับเรา
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Badge>

          <h1 className="mx-auto mt-8 max-w-2xl font-heading text-5xl md:text-6xl lg:text-7xl tracking-tight font-medium text-foreground leading-tight">
            สร้างสิ่งที่ยอดเยี่ยม
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            แพลตฟอร์มสำหรับเรียนรู้และช้อปสินค้าคุณภาพ รวมความรู้และสินค้าไว้ในที่เดียว
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="gap-2">
              <Link href="/course">
                เริ่มเรียน
                <ArrowUpRight className="size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="/product">
                <CirclePlay className="size-5" />
                ดูสินค้า
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            ทำไมต้องเลือกเรา
          </h2>
          <p className="mt-4 text-center text-muted-foreground text-lg max-w-xl mx-auto">
            สิ่งที่ทำให้เราแตกต่าง
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>เนื้อหาคุณภาพ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  หลักสูตรออกแบบโดยผู้เชี่ยวชาญ อัพเดตเนื้อหาเสมอ
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>สินค้าคัดสรร</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  สินค้าคุณภาพจากแบรนด์ที่น่าเชื่อถือ ราคาเป็นธรรม
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ใช้งานง่าย</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  อินเทอร์เฟซเรียบง่าย ใช้งานสะดวก ไม่ต้องเรียนรู้เยอะ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
