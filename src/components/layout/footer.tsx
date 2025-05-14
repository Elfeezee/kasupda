
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png'; 

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Image src={KASUPDALogo} alt="KASUPDA Logo" width={24} height={24} className="h-6 w-6" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KASUPDA. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
