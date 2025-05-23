
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, Sun, Moon, Search, XIcon, LogIn, UserPlus, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import KASUPDALogo from '@/image/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-provider";

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const [planningOpen, setPlanningOpen] = useState(false);
  const planningHideTimer = useRef<number | null>(null);

  const [constructionOpen, setConstructionOpen] = useState(false);
  const constructionHideTimer = useRef<number | null>(null);

  const [eServiceOpen, setEServiceOpen] = useState(false);
  const eServiceHideTimer = useRef<number | null>(null);

  const [desktopSearchTerm, setDesktopSearchTerm] = useState("");
  const [isMobileSearchDialogOpen, setIsMobileSearchDialogOpen] = useState(false);
  const [isDesktopSearchInputVisible, setIsDesktopSearchInputVisible] = useState(false);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);

  const HOVER_DELAY = 150; // ms

  useEffect(() => {
    return () => {
      if (planningHideTimer.current) clearTimeout(planningHideTimer.current);
      if (constructionHideTimer.current) clearTimeout(constructionHideTimer.current);
      if (eServiceHideTimer.current) clearTimeout(eServiceHideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (isDesktopSearchInputVisible && desktopSearchInputRef.current) {
      desktopSearchInputRef.current.focus();
    }
  }, [isDesktopSearchInputVisible]);

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

  const planningHandlers = createMenuHandlers(setPlanningOpen, planningHideTimer, [setConstructionOpen, setEServiceOpen]);
  const constructionHandlers = createMenuHandlers(setConstructionOpen, constructionHideTimer, [setPlanningOpen, setEServiceOpen]);
  const eServiceHandlers = createMenuHandlers(setEServiceOpen, eServiceHideTimer, [setPlanningOpen, setConstructionOpen]);

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
    { href: "https://kasupdapermit.com", label: "Renew permit", external: true },
  ];
  
  const mainNavLinks = [
    { href: "/about", label: "About Us" },
    { href: "/news", label: "News and Publications" },
    { href: "/contact", label: "Contact Us" },
  ];

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    return cn(
      "transition-colors px-3 py-2 text-sm flex items-center",
      isActive
        ? "text-primary font-semibold"
        : "text-primary/70 hover:text-primary"
    );
  };

  const getDropdownTriggerClassName = (currentPathSegment: string, subLinks: { href: string }[], isOpen: boolean) => {
    const isActivePath = subLinks.some(link => pathname === link.href) || pathname.startsWith(currentPathSegment);
    return cn(
      "transition-colors px-3 py-2 h-auto font-normal text-sm focus-visible:ring-0 focus-visible:ring-offset-0",
      (isActivePath || isOpen)
        ? "text-primary font-semibold"
        : "text-primary/70 hover:text-primary"
    );
  };
  
  const getDropdownLinkClassName = (href: string) => {
    return cn(
      "text-sm",
      pathname === href ? "text-primary font-semibold" : "text-primary/90 hover:text-primary"
    );
  };

  const getMobileLinkClassName = (href: string) => {
    return cn(
      "block py-2 text-base px-3",
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

  const getMobileAccordionTriggerClassName = (subLinks: { href: string }[]) => {
    const isActivePath = subLinks.some(link => pathname === link.href);
    return cn(
      "transition-colors py-2 text-base font-normal hover:no-underline px-3",
      isActivePath
        ? "text-primary font-semibold"
        : "text-primary/70 hover:text-primary"
    );
  };

  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Desktop search submitted:", desktopSearchTerm);
    // Add actual search logic or navigation here
    // Optionally close the input: setIsDesktopSearchInputVisible(false);
  };
  
  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mobile Search submitted:", desktopSearchTerm); // Using same state for simplicity, can be separated
    setIsMobileSearchDialogOpen(false); 
  };

  const handleLanguageSelect = (language: string) => {
    console.log(`Language selected: ${language}. Actual translation not implemented.`);
    // In a real app, you would set the language state here and trigger translation.
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

          {!isDesktopSearchInputVisible && (
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className={getLinkClassName("/")}
              >
                Home
              </Link>

              <DropdownMenu open={planningOpen} onOpenChange={setPlanningOpen}>
                <DropdownMenuTrigger
                  asChild
                  onPointerEnter={planningHandlers.handleOpen}
                  onPointerLeave={planningHandlers.handleCloseWithDelay}
                >
                  <Button
                    variant="ghost"
                    className={getDropdownTriggerClassName("/planning", planningSubLinks, planningOpen)}
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
                      <Link href={link.href} className={getDropdownLinkClassName(link.href)}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={constructionOpen} onOpenChange={setConstructionOpen}>
                <DropdownMenuTrigger
                  asChild
                  onPointerEnter={constructionHandlers.handleOpen}
                  onPointerLeave={constructionHandlers.handleCloseWithDelay}
                >
                  <Button
                    variant="ghost"
                    className={getDropdownTriggerClassName("/construction", constructionSubLinks, constructionOpen)}
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
                      <Link href={link.href} className={getDropdownLinkClassName(link.href)}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu open={eServiceOpen} onOpenChange={setEServiceOpen}>
                <DropdownMenuTrigger
                  asChild
                  onPointerEnter={eServiceHandlers.handleOpen}
                  onPointerLeave={eServiceHandlers.handleCloseWithDelay}
                >
                  <Button
                    variant="ghost"
                    className={getDropdownTriggerClassName("/eservice", eServiceSubLinks, eServiceOpen)}
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
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={getDropdownLinkClassName(link.href)}>{link.label}</a>
                      ) : (
                        <Link href={link.href} className={getDropdownLinkClassName(link.href)}>{link.label}</Link>
                      )}
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
          )}

          {isDesktopSearchInputVisible && (
            <form onSubmit={handleDesktopSearchSubmit} className="flex items-center">
              <Input
                ref={desktopSearchInputRef}
                id="desktopInlineSearch"
                placeholder="Search KASUPDA Portal..."
                value={desktopSearchTerm}
                onChange={(e) => setDesktopSearchTerm(e.target.value)}
                className="h-9 w-60"
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="text-primary/70 hover:text-primary ml-2"
                onClick={() => {
                  setIsDesktopSearchInputVisible(false);
                  setDesktopSearchTerm(""); 
                }}
                aria-label="Close search"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </form>
          )}

          <div className="ml-auto flex items-center gap-2">
            {!isDesktopSearchInputVisible && (
               <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/apply-for-permit">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign up
                  </Link>
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
              </>
            )}
             {!isDesktopSearchInputVisible && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary/70 hover:text-primary"
                aria-label="Open search input"
                onClick={() => setIsDesktopSearchInputVisible(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-primary/70 hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            {/* Language Switcher Dropdown - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary/70 hover:text-primary" aria-label="Select language">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleLanguageSelect("English")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageSelect("Hausa")}>
                  Hausa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation Header Bar */}
        <Dialog open={isMobileSearchDialogOpen} onOpenChange={setIsMobileSearchDialogOpen}>
          <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={KASUPDALogo} alt="KASUPDA Logo" width={32} height={32} className="h-8 w-8" />
              <span className="font-bold text-primary">
                KASUPDA
              </span>
            </Link>
            <div className="flex items-center">
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary/70 hover:text-primary mr-1"
                  aria-label="Open search dialog"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-primary/70 hover:text-primary mr-1"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              {/* Language Switcher Dropdown - Mobile Trigger (inside main sheet) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary/70 hover:text-primary mr-1" aria-label="Select language">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => handleLanguageSelect("English")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleLanguageSelect("Hausa")}>
                    Hausa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle Menu"
                    className="text-primary/70 hover:text-primary"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0 pt-8 flex flex-col">
                  <nav className="flex-grow overflow-y-auto">
                    <Link
                      href="/"
                      className={getMobileLinkClassName("/")}
                    >
                      Home
                    </Link>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="planning-dev" className="border-b-0">
                        <AccordionTrigger className={cn(getMobileAccordionTriggerClassName(planningSubLinks), "px-3")}>
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
                        <AccordionTrigger className={cn(getMobileAccordionTriggerClassName(constructionSubLinks), "px-3")}>
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
                        <AccordionTrigger className={cn(getMobileAccordionTriggerClassName(eServiceSubLinks), "px-3")}>
                          e-service
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 pb-1">
                          {eServiceSubLinks.map((link) => (
                             link.external ? (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={getMobileSubLinkClassName(link.href)}>{link.label}</a>
                              ) : (
                                <Link key={link.label} href={link.href} className={getMobileSubLinkClassName(link.href)}>{link.label}</Link>
                              )
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {mainNavLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={getMobileLinkClassName(link.href)}
                      >
                         {link.label}
                      </Link>
                    ))}
                    <Separator className="my-4" />
                     <div className="px-3 space-y-2">
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4" /> Login
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" asChild>
                          <Link href="/apply-for-permit">
                            <UserPlus className="mr-2 h-4 w-4" /> Sign up
                          </Link>
                        </Button>
                      </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Search KASUPDA Portal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleMobileSearchSubmit}>
              <div className="grid gap-4 py-4">
                <Input
                  id="mobileSearch"
                  placeholder="Enter search term..."
                  value={desktopSearchTerm} 
                  onChange={(e) => setDesktopSearchTerm(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Search</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
