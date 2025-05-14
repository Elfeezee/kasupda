
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

export default function Header() {
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
    { href: "#", label: "Apply for permit" },
    { href: "#", label: "Renew permit" },
  ];

  const mainNavLinks = [
    {
      href: "#",
      label: "About Us",
    },
    {
      href: "#",
      label: "News and Publications",
    },
    {
      href: "#",
      label: "Contact Us",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex md:flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={KASUPDALogo} alt="KASUPDA Logo" width={32} height={32} className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block">
              KASUPDA
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="transition-colors hover:text-foreground/80 text-foreground/60 px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  Planning and Development
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {planningSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="transition-colors hover:text-foreground/80 text-foreground/60 px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  Construction
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {constructionSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="transition-colors hover:text-foreground/80 text-foreground/60 px-3 py-2 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  e-service
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {eServiceSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {mainNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60 px-3 py-2"
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
              <nav className="flex flex-col space-y-1 ml-4">
                <Accordion type="multiple" collapsible className="w-full">
                  <AccordionItem value="planning-dev" className="border-b-0">
                    <AccordionTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 text-base font-normal hover:no-underline">
                      Planning and Development
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {planningSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block py-1.5 transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="construction" className="border-b-0">
                    <AccordionTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 text-base font-normal hover:no-underline">
                      Construction
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {constructionSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block py-1.5 transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="e-service" className="border-b-0">
                    <AccordionTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 text-base font-normal hover:no-underline">
                      e-service
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-1">
                      {eServiceSubLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block py-1.5 transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {mainNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60 py-2 text-base px-3" 
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
