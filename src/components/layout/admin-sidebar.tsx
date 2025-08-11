
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
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ArrowLeftToLine,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { state, setOpenMobile } = useSidebar();

  const handleLogout = () => {
    setOpenMobile(false); 
    router.push('/');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out from the admin panel.' });
  };
  
  const handleExitAdmin = () => {
    setOpenMobile(false);
    router.push('/dashboard');
    toast({ title: 'Exiting Admin View', description: 'Returning to your user dashboard.' });
  };

  const handleNavigation = (href: string, label: string, disabled?: boolean) => {
    setOpenMobile(false);
    if (disabled) {
      toast({
        title: 'Feature Pending',
        description: `${label} is not yet implemented.`,
      });
      return;
    }
    router.push(href);
  };

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Image src="/image/logo.png" alt="KASUPDA Logo" width={32} height={32} />
          <div className={cn("font-bold text-lg text-primary", state === 'collapsed' && "hidden")}>
            Admin Panel
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => handleNavigation(item.href, item.label, item.disabled)}
                isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleExitAdmin}
              tooltip={state === 'collapsed' ? "Exit Admin" : undefined}
            >
              <ArrowLeftToLine className="h-5 w-5" />
              <span className={cn(state === 'collapsed' && "hidden")}>Exit to App</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
