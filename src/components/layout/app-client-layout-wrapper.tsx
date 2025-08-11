
"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import { ThemeProvider } from '@/context/theme-provider';
import { cn } from '@/lib/utils';

export default function AppClientLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isAdminPage = pathname.startsWith('/admin');

  // Determine if header and footer should be shown
  const showHeaderFooter = !isDashboardPage && !isAdminPage;

  return (
    <ThemeProvider>
      {showHeaderFooter && <Header />}
      <main className={cn(
        "flex-grow",
        // Apply container styles only to non-dashboard/non-admin pages
        !isDashboardPage && !isAdminPage && "container mx-auto px-4 py-8" 
      )}>
        {children}
      </main>
      {showHeaderFooter && <Footer />}
      <Toaster />
      <ScrollToTopButton />
    </ThemeProvider>
  );
}
