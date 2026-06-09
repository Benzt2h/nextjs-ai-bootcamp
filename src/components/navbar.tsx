import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { getSession } from "@/services/auth-service";
import LogoutButton from "./logout-button";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  const session = await getSession();

  return (
    <nav className="h-16 border-b border-border bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <Link href="/cart" className="flex items-center gap-2 font-bold text-sm uppercase tracking-[0.02em] text-primary hover:text-primary/80 transition-colors">
          <ShoppingBasket className="size-5" /> <CountCartItem /> ชิ้น
        </Link>

        <div className="flex items-center gap-3">
          
          {
            !session && (
              <>
                <Button asChild className="hidden sm:inline-flex" variant="secondary">
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">สมัครสมาชิก</Link>
                </Button>
              </>
            )
          }

          {
            session && (
              <>
                <div className="flex items-center mr-4 text-sm">
                  สวัสดี, {session.user.name}
                </div>
                <div>
                  <LogoutButton />
                </div>
              </>
            )
          }

          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
