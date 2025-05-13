import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Landmark } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex md:flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              KASUPDA
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Apply for permit
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Renew permit
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Public notice
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About Us
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Header Bar */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="font-bold">
              KASUPDA
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 pt-8">
              <nav className="flex flex-col space-y-3 ml-4">
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Apply for permit
                </Link>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Renew permit
                </Link>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Public notice
                </Link>
                <Link
                  href="#"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  About Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
