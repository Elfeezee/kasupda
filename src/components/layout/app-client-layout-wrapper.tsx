
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

  return (
    <ThemeProvider>
      {!isDashboardPage && <Header />}
      <main className={cn(
        "flex-grow",
        !isDashboardPage && "container mx-auto px-4 py-8" 
      )}>
        {children}
      </main>
      {!isDashboardPage && <Footer />}
      <Toaster />
      <ScrollToTopButton />
    </ThemeProvider>
  );
}
