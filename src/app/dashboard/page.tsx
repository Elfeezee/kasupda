
'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar'; // For mobile toggle
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarDays, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'User';

  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(format(new Date(), "MMMM d, yyyy"));
    
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" /> {/* Mobile sidebar toggle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Welcome, {userName}!</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              This is your central hub for managing KASUPDA services.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Date</CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentDate || 'Loading date...'}
            </div>
            <p className="text-xs text-muted-foreground">
              As of your last page load.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Time</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentTime || 'Loading time...'}
            </div>
             <p className="text-xs text-muted-foreground">
              Kaduna local time.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar navigation to apply for permits, check your application status, manage your profile, or access other KASUPDA services.
          </p>
        </CardContent>
      </Card>
      
      {/* Temporary Admin Access Card */}
      <Card className="shadow-lg bg-secondary/50 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between">
            <div className='space-y-1.5'>
                <CardTitle className="flex items-center text-primary">
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Admin Access
                </CardTitle>
                <CardDescription>
                    For administrative use only. Access the system management dashboard.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/dashboard">
                    Go to Admin <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardHeader>
      </Card>

    </div>
  );
};

export default DashboardPage;
