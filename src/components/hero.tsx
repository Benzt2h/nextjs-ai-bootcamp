import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-background overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        {/* Badge */}
        <Badge
          asChild
          className="rounded-full border-border px-4 py-2 bg-card/40 hover:bg-card/60 transition-colors"
          variant="secondary"
        >
          <Link href="#" className="flex items-center gap-2 text-foreground">
            ✨ Just released v1.0.0
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Badge>

        {/* Main heading - Aether display-lg */}
        <h1 className="mx-auto mt-8 max-w-3xl font-heading text-5xl md:text-6xl lg:text-7xl tracking-tight font-medium text-foreground leading-tight">
          Ship better UI without the hassle
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          Instead of starting from scratch every time, use thoughtfully designed
          blocks that give you a solid foundation for any UI.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            Get Started
            <ArrowUpRight className="size-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <CirclePlay className="size-5" />
            Watch Demo
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-12 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4">Used by leading design teams</p>
          <div className="flex justify-center gap-8 flex-wrap opacity-60">
            {["Company A", "Company B", "Company C"].map((company) => (
              <div key={company} className="text-sm font-medium text-foreground/50">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
