
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInput, // Example usage, can be removed if not needed
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FilePlus2,
  ListChecks,
  UserCircle2,
  ReceiptText,
  FolderArchive,
  LogOut,
  Search,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import Image from 'next/image';
import KASUPDALogo from '@/image/logo.png';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/apply/residential-building-permit', label: 'Apply for Permit', icon: FilePlus2 }, // Example link
  { href: '/dashboard#submitted-applications-section', label: 'My Applications', icon: ListChecks },
  { href: '/dashboard/profile', label: 'My Profile', icon: UserCircle2, disabled: true }, // Placeholder
  { href: '/dashboard/payments', label: 'Payment History', icon: ReceiptText, disabled: true }, // Placeholder
  { href: '/dashboard/documents', label: 'My Documents', icon: FolderArchive, disabled: true }, // Placeholder
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { state, setOpenMobile } = useSidebar();

  const handleLogout = () => {
    setOpenMobile(false); // Close sidebar on mobile if open
    router.push('/');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  const handleNavigation = (href: string, label: string, disabled?: boolean) => {
    setOpenMobile(false); // Close sidebar on mobile
    if (disabled) {
      toast({
        title: 'Feature Pending',
        description: `${label} is not yet implemented.`,
      });
      return;
    }
    if (href.includes('#')) {
      // Handle in-page links smoothly
      const elementId = href.split('#')[1];
      if (pathname === href.split('#')[0]) { // If already on the page
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(href); // Navigate to page then scroll (may need effect on target page)
      }
    } else {
      router.push(href);
    }
  };


  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image src={KASUPDALogo} alt="KASUPDA Logo" width={32} height={32} />
          <div className={cn("font-semibold text-lg text-primary", state === 'collapsed' && "hidden")}>
            KASUPDA
          </div>
        </div>
        {/* Example Search, can be removed or enhanced */}
        {/* <div className={cn("mt-4", state === 'collapsed' && "hidden")}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput placeholder="Search..." className="pl-8" />
          </div>
        </div> */}
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => handleNavigation(item.href, item.label, item.disabled)}
                isActive={pathname === item.href.split('#')[0]}
                tooltip={state === 'collapsed' ? item.label : undefined}
                aria-disabled={item.disabled}
                className={cn(item.disabled && "opacity-50 cursor-not-allowed")}
              >
                <item.icon className="h-5 w-5" />
                <span className={cn(state === 'collapsed' && "hidden")}>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator className="my-1" />

      <SidebarFooter className="p-2">
        {/* Example settings/help links - can be removed or adapted */}
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => { setOpenMobile(false); router.push('#'); toast({title: "Settings clicked"});}}
              tooltip={state === 'collapsed' ? "Settings" : undefined}
            >
              <Settings className="h-5 w-5" />
              <span className={cn(state === 'collapsed' && "hidden")}>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => { setOpenMobile(false); router.push('#'); toast({title: "Help clicked"});}}
              tooltip={state === 'collapsed' ? "Help & Support" : undefined}
            >
              <LifeBuoy className="h-5 w-5" />
              <span className={cn(state === 'collapsed' && "hidden")}>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="my-1" /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip={state === 'collapsed' ? "Logout" : undefined}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span className={cn(state === 'collapsed' && "hidden")}>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
