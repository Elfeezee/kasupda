
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userName = searchParams.get('name') || 'User'; // 'User' as a fallback

  // Placeholder user information
  const permitStatus = 'Pending Review';
  const [applicationDate, setApplicationDate] = useState<string | null>(null);

  useEffect(() => {
    // Set the date only on the client-side after hydration
    setApplicationDate(new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []); // Empty dependency array ensures this runs once on mount

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens, etc.
    // For now, just redirect to homepage.
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Welcome, {userName}!</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="bg-card shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">Your Permit Application</h2>
        <p className="text-muted-foreground mb-2">
          Status: <span className="font-medium text-foreground">{permitStatus}</span>
        </p>
        <p className="text-muted-foreground">
          Application Date: {' '}
          {applicationDate ? (
            <span className="font-medium text-foreground">{applicationDate}</span>
          ) : (
            <span className="font-medium text-foreground">Loading date...</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
