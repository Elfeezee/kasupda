
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png';
import { Facebook, Twitter, Instagram, MapPin, Phone } from 'lucide-react'; // Added Phone icon

// SVG for TikTok icon
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor" // Changed to currentColor to respect link color
    className="h-5 w-5"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-1.06-.6-1.9-1.44-2.46-2.45a4.9 4.9 0 01-1.02-2.82c.03-1.13.31-2.25.9-3.22.47-.75.99-1.46 1.56-2.13.01-2.9.01-5.8-.01-8.7.01-1.33.23-2.65.71-3.88.79-2.05 2.72-3.52 4.79-3.96 1.06-.23 2.16-.18 3.21.02zM10.01 6.82c-.33 1.38-.33 2.82.01 4.21.33 1.38.99 2.68 1.94 3.75V6.52c-.44.28-.85.62-1.23.99-.24.23-.47.47-.72.71zm4.18 8.36c.34-1.41.33-2.87-.01-4.29-.33-1.41-.99-2.7-1.93-3.78v6.77c.41-.31.78-.68 1.13-1.06.25-.27.5-.56.81-.74z"/>
  </svg>
);


export default function Footer() {
  const kasupdaAddress = "No. 1 KASUPDA Road, Off Independence Way, Kaduna, Nigeria";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kasupdaAddress)}`;

  const physicalAddress = "No 4 Bida Road, Business District Area, Kaduna State.";
  const hotline = "09037236253";

  return (
    <footer className="border-t border-border/40 bg-background/95 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:gap-4 md:px-6">
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-2">
          <div className="flex items-center gap-2">
            <Image src={KASUPDALogo} alt="KASUPDA Logo" width={24} height={24} className="h-6 w-6" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} KASUPDA. All rights reserved.
            </p>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{physicalAddress}</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Phone className="h-4 w-4 shrink-0" />
            <span>Hotline: {hotline}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-700 transition-colors">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="X (formerly Twitter)" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-pink-600 hover:text-pink-700 transition-colors">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="TikTok" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <TikTokIcon />
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
            href="/faq"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
            prefetch={false}
          >
            <MapPin className="mr-1 h-4 w-4" /> Map
          </Link>
        </nav>
      </div>
    </footer>
  );
}
