
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png';
import { Facebook, Twitter, Instagram, MapPin, Phone } from 'lucide-react'; // Added Phone icon

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
        </div>

        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
