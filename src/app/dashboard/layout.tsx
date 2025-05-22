
import type { Metadata } from 'next';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/layout/dashboard-sidebar';

export const metadata: Metadata = {
  title: 'KASUPDA Dashboard',
  description: 'Manage your KASUPDA applications and services.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-[calc(100vh-var(--header-height,60px)-var(--footer-height,60px))]"> {/* Adjusted default heights slightly */}
        <Sidebar 
          collapsible="icon" 
          className="border-r bg-red-500 dark:bg-red-700" // Added bright background for debugging
        >
          <DashboardSidebar />
        </Sidebar>
        <SidebarInset className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
