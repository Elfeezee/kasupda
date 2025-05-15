
"use client";

import React, { useState, useRef, useEffect } from "react";
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

  const [planningOpen, setPlanningOpen] = useState(false);
  const planningHideTimer = useRef<number | null>(null);

  const [constructionOpen, setConstructionOpen] = useState(false);
  const constructionHideTimer = useRef<number | null>(null);

  const [eServiceOpen, setEServiceOpen] = useState(false);
  const eServiceHideTimer = useRef<number | null>(null);

  const [dataCenterOpen, setDataCenterOpen] = useState(false);
  const dataCenterHideTimer = useRef<number | null>(null);

  const HOVER_DELAY = 150; // ms

  useEffect(() => {
    return () => {
      if (planningHideTimer.current) clearTimeout(planningHideTimer.current);
      if (constructionHideTimer.current) clearTimeout(constructionHideTimer.current);
      if (eServiceHideTimer.current) clearTimeout(eServiceHideTimer.current);
      if (dataCenterHideTimer.current) clearTimeout(dataCenterHideTimer.current);
    };
  }, []);

  const createMenuHandlers = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    hideTimerRef: React.MutableRefObject<number | null>,
    otherSetters: React.Dispatch<React.SetStateAction<boolean>>[]
  ) => {
    const handleOpen = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      otherSetters.forEach(setter => setter(false)); // Close other menus
      setOpen(true);
    };
    const handleCloseWithDelay = () => {
      hideTimerRef.current = window.setTimeout(() => {
        setOpen(false);
      }, HOVER_DELAY);
    };
    const cancelHide = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
    return { handleOpen, handleCloseWithDelay, cancelHide };
  };

  const planningHandlers = createMenuHandlers(setPlanningOpen, planningHideTimer, [setConstructionOpen, setEServiceOpen, setDataCenterOpen]);
  const constructionHandlers = createMenuHandlers(setConstructionOpen, constructionHideTimer, [setPlanningOpen, setEServiceOpen, setDataCenterOpen]);
  const eServiceHandlers = createMenuHandlers(setEServiceOpen, eServiceHideTimer, [setPlanningOpen, setConstructionOpen, setDataCenterOpen]);
  const dataCenterHandlers = createMenuHandlers(setDataCenterOpen, dataCenterHideTimer, [setPlanningOpen, setConstructionOpen, setEServiceOpen]);


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

  const mainNavLinks = [
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
      label: "Contact Us",
    },
  ];

  const getLinkClassName = (href: string) => {
    return cn(
      "transition-colors px-3 py-2 text-sm",
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
      "block py-1.5 px-3",
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

            {/* Planning and Development Dropdown */}
            <DropdownMenu open={planningOpen} onOpenChange={setPlanningOpen}>
              <DropdownMenuTrigger
                asChild
                onPointerEnter={planningHandlers.handleOpen}
                onPointerLeave={planningHandlers.handleCloseWithDelay}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal text-sm focus-visible:ring-0 focus-visible:ring-offset-0",
                    pathname.startsWith("/planning") || planningSubLinks.some(link => pathname === link.href) || planningOpen
                      ? "text-primary font-semibold" 
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Planning and Development
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onPointerEnter={planningHandlers.cancelHide}
                onPointerLeave={planningHandlers.handleCloseWithDelay}
              >
                {planningSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Construction Dropdown */}
            <DropdownMenu open={constructionOpen} onOpenChange={setConstructionOpen}>
              <DropdownMenuTrigger
                asChild
                onPointerEnter={constructionHandlers.handleOpen}
                onPointerLeave={constructionHandlers.handleCloseWithDelay}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal text-sm focus-visible:ring-0 focus-visible:ring-offset-0",
                     (pathname.startsWith("/construction") || constructionSubLinks.some(link => pathname === link.href) || constructionOpen)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Construction
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onPointerEnter={constructionHandlers.cancelHide}
                onPointerLeave={constructionHandlers.handleCloseWithDelay}
              >
                {constructionSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                     <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* e-service Dropdown */}
            <DropdownMenu open={eServiceOpen} onOpenChange={setEServiceOpen}>
              <DropdownMenuTrigger
                asChild
                onPointerEnter={eServiceHandlers.handleOpen}
                onPointerLeave={eServiceHandlers.handleCloseWithDelay}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal text-sm focus-visible:ring-0 focus-visible:ring-offset-0",
                    (pathname.startsWith("/eservice") || eServiceSubLinks.some(link => pathname === link.href) || eServiceOpen)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  e-service
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onPointerEnter={eServiceHandlers.cancelHide}
                onPointerLeave={eServiceHandlers.handleCloseWithDelay}
              >
                {eServiceSubLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                     <Link href={link.href} className={cn(pathname === link.href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary")}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Data Center Dropdown */}
            <DropdownMenu open={dataCenterOpen} onOpenChange={setDataCenterOpen}>
              <DropdownMenuTrigger
                asChild
                onPointerEnter={dataCenterHandlers.handleOpen}
                onPointerLeave={dataCenterHandlers.handleCloseWithDelay}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors px-3 py-2 h-auto font-normal text-sm focus-visible:ring-0 focus-visible:ring-offset-0",
                    (pathname.startsWith("/data-center") || dataCenterSubLinks.some(link => pathname === link.href) || dataCenterOpen)
                      ? "text-primary font-semibold"
                      : "text-primary/70 hover:text-primary"
                  )}
                >
                  Data Center
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onPointerEnter={dataCenterHandlers.cancelHide}
                onPointerLeave={dataCenterHandlers.handleCloseWithDelay}
              >
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
              <nav className="flex flex-col space-y-1">
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
