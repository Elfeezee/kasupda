
"use client"; // Add "use client" if not already present for hooks

import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png';
import { Facebook, Twitter, Instagram, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

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
              &copy; {currentYear ? currentYear : new Date().getFullYear()}{/* Fallback to direct call during SSR/initial render before effect runs */} KASUPDA. All rights reserved.
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
          {/* TikTok SVG Icon */}
          <Link href="#" aria-label="TikTok" className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.38 1.92-3.54 2.96-5.91 3.02-1.92.05-3.84-.07-5.75-.12-1.31-.03-2.6-.71-3.53-1.71A4.91 4.91 0 01.03 21.1c-.19-1.33-.01-2.69.68-3.89.69-1.2 1.8-2.07 3.11-2.5.39-.13.79-.23 1.19-.33.08-2.18.02-4.36.01-6.54-.01-1.28.27-2.52.88-3.66.99-1.85 2.73-3.02 4.76-3.22.76-.07 1.53-.08 2.29-.05v4.02c-.61.01-1.23.02-1.84.05-.8.04-1.58.16-2.32.39-.87.28-1.66.74-2.26 1.36-.59.61-.97 1.36-1.12 2.19-.12.69-.11 1.39-.11 2.09.02 2.18.01 4.36.01 6.54.01.78.02 1.57.02 2.35 0 .07 0 .14-.01.21.09.04.18.08.27.12.36.16.72.32 1.08.47.84.35 1.74.55 2.64.61.93.07 1.86.02 2.77-.12.82-.12 1.6-.43 2.26-.91.69-.51 1.19-1.18 1.48-1.94.29-.76.4-1.58.41-2.41a12.75 12.75 0 00-.01-2.41c.02-2.18.01-4.36.01-6.54.01-1.8-.01-3.59.01-5.39z"/>
            </svg>
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

