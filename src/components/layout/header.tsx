import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Landmark } from "lucide-react"; // Changed MountainIcon to Landmark
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
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
              Services
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Guidelines
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Public Notices
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-6 ml-4"
            >
              <Landmark className="h-6 w-6 text-primary" />
              <span className="font-bold">KASUPDA</span>
            </Link>
            <div className="flex flex-col space-y-3 ml-4">
              <Link
                href="#"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Services
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Guidelines
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Public Notices
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
