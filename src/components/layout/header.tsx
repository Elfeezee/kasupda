
"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();

  const planningSubLinks = [
    { href: "#", label: "Master plan" },
    { href: "#", label: "Approved layout" },
    { href: "#", label: "Zoning" },
  ];

  const constructionSubLinks = [
    { href: "#", label: "Building Permit" },
    { href: "#", label: "Inspection and Completion" },
  ];

  const eServiceSubLinks = [
    { href: "/apply-for-permit", label: "Apply for permit" },
    { href: "#", label: "Renew permit" },
  ];

  const dataCenterSubLinks = [
    { href: "#", label: "Lab" },
    { href: "#", label: "Soil Test" },
    { href: "#", label: "Integrity Test" },
  ];

  const mainNavLinks = [ // This is the line that needs to be changed
    {
      href: "/about",
      label: "About Us",
    },
    {
      href: "/news",
      label: "News and Publications",
    },
    {
      href: "/contact",
      label: "Contact Us", // This is the line that needs to be changed
    },
  ];

  const getLinkClassName = (href: string) => {
    return cn(
      "transition-colors px-3 py-2",
      pathname === href
        ? "text-primary font-semibold"
        : "text-primary/70 hover:text-primary"
    );
  };

  const getMobileLinkClassName = (href: string) => {
    return cn(
      "py-2 text-base px-3",
      pathname === href
        ? "text-primary font-semibold"
        : "text-primary/70 hover:text-primary"
    );
  };
  
  const getMobileSubLinkClassName = (href: string) => {
    return cn(
      "block py-1.5 px-3", // Added px-3 for consistency
      pathname === href
        ? "text-primary font-semibold"
        : "text-primary/70 hover:text-primary" 
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex md:flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={KASUPDALogo} alt="KASUPDA Logo" width={32} height={32} className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block text-primary">
              KASUPDA
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className={getLinkClassName("/")}
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
                    pathname.startsWith("/planning") || planningSubLinks.some(link => pathname === link.href) 
                      ? "text-primary font-semibold" 
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Planning and Development
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {planningSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
                     pathname.startsWith("/construction") || constructionSubLinks.some(link => pathname === link.href)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Construction
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {constructionSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                     <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
                    pathname.startsWith("/eservice") || eServiceSubLinks.some(link => pathname === link.href)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  e-service
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {eServiceSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                     <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Data Center Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
                    pathname.startsWith("/data-center") || dataCenterSubLinks.some(link => pathname === link.href)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Data Center
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dataCenterSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Data Center Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
                    pathname.startsWith("/data-center") || dataCenterSubLinks.some(link => pathname === link.href)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Data Center
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dataCenterSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={getLinkClassName(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Header Bar */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
             <Image src={KASUPDALogo} alt="KASUPDA Logo" width={32} height={32} className="h-8 w-8" />
            <span className="font-bold text-primary">
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
              <nav className="flex flex-col space-y-1"> {/* Removed ml-4 */}
                <Link
                  href="/"
                  className={getMobileLinkClassName("/")}
                >
                  Home
                </Link>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="planning-dev" className="border-b-0">
                    <AccordionTrigger className={cn(
                      "transition-colors py-2 text-base font-normal hover:no-underline px-3",
                      pathname.startsWith("/planning") || planningSubLinks.some(link => pathname === link.href)
                        ? "text-primary font-semibold"
                        : "text-primary/70 hover:text-primary"
                    )}>
                      Planning and Development
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {planningSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={getMobileSubLinkClassName(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="construction" className="border-b-0">
                    <AccordionTrigger className={cn(
                      "transition-colors py-2 text-base font-normal hover:no-underline px-3",
                      pathname.startsWith("/construction") || constructionSubLinks.some(link => pathname === link.href)
                        ? "text-primary font-semibold"
                        : "text-primary/70 hover:text-primary"
                    )}>
                      Construction
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {constructionSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={getMobileSubLinkClassName(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="e-service" className="border-b-0">
                    <AccordionTrigger className={cn(
                      "transition-colors py-2 text-base font-normal hover:no-underline px-3",
                       pathname.startsWith("/eservice") || eServiceSubLinks.some(link => pathname === link.href)
                        ? "text-primary font-semibold"
                        : "text-primary/70 hover:text-primary"
                    )}>
                      e-service
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {eServiceSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={getMobileSubLinkClassName(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  {/* Data Center Accordion Item */}
                  <AccordionItem value="data-center" className="border-b-0">
                    <AccordionTrigger className={cn(
                      "transition-colors py-2 text-base font-normal hover:no-underline px-3",
                      pathname.startsWith("/data-center") || dataCenterSubLinks.some(link => pathname === link.href)
                        ? "text-primary font-semibold"
                        : "text-primary/70 hover:text-primary"
                    )}>
                      Data Center
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {dataCenterSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={getMobileSubLinkClassName(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getMobileLinkClassName(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
