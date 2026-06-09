import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-background">

      <div className="relative z-10 max-w-3xl text-center">
        <Badge
          asChild
          variant="secondary"
        >
          <Link href="#">
            Just released v1.0.0 <ArrowUpRight className="ml-1 size-3.5" />
          </Link>
        </Badge>

        <h1 className="mx-auto mt-6 max-w-xl font-heading font-black text-[56px] leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[64px] md:text-[72px]">
          Ship better UI without&nbsp;the&nbsp;hassle
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-[1.75] md:text-xl">
          Instead of starting from scratch every time, use thoughtfully designed
          blocks that give you a solid foundation for any UI.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg">
            Get Started <ArrowUpRight className="ml-1 h-5! w-5!" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
          >
            <CirclePlay className="h-5! w-5!" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
