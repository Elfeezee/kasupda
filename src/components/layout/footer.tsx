
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png';
import { Facebook, Twitter, Instagram } from 'lucide-react';

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
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-700 transition-colors">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="X (formerly Twitter)" className="text-black hover:text-gray-800 transition-colors">
            {/* Using Twitter icon for X as lucide-react might not have a dedicated X icon */}
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-pink-600 hover:text-pink-700 transition-colors">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>

        {/* Original nav links */}
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
