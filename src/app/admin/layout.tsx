
import type { Metadata } from 'next';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/layout/admin-sidebar';
import { usePathname } from 'next/navigation';


export const metadata: Metadata = {
  title: 'KASUPDA Admin Dashboard',
  description: 'Manage KASUPDA applications, users, and services.',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[calc(100vh-var(--header-height,60px)-var(--footer-height,60px))]">
          <Sidebar 
            collapsible="icon" 
            className="border-r"
          >
            <AdminSidebar />
          </Sidebar>
          <SidebarInset className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/30">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
  );
}
