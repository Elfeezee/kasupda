
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, HomeIcon, ChevronsRight, Construction, Megaphone, MessageSquareWarning, ListChecks, UserCircle2, ReceiptText, FolderArchive } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const permitTypes = [
  {
    id: 'grant-building-permission',
    name: 'Grant of Building Permission Application',
    description: 'For new constructions, extensions, or major building alterations.',
    icon: <HomeIcon className="h-8 w-8 text-primary mb-2" />,
    href: '/dashboard/apply/residential-building-permit'
  },
  {
    id: 'temporary-building-permit',
    name: 'Temporary Building Permit Application',
    description: 'Permits for structures intended for short-term use or specific events.',
    icon: <Construction className="h-8 w-8 text-primary mb-2" />,
    href: '#'
  },
  {
    id: 'outdoor-advertisement-licensing',
    name: 'Outdoor Advertisement Licensing',
    description: 'Apply for licenses for billboards, signage, and other outdoor advertisements.',
    icon: <Megaphone className="h-8 w-8 text-primary mb-2" />,
    href: '#'
  },
  {
    id: 'complaint-application',
    name: 'Complaint Application',
    description: 'Submit a formal complaint regarding building code violations or planning issues.',
    icon: <MessageSquareWarning className="h-8 w-8 text-primary mb-2" />,
    href: '#'
  },
];

const dashboardSections = [
  {
    id: 'application-status',
    name: 'Application Status',
    description: 'Track the progress of your submitted permit applications.',
    icon: <ListChecks className="h-8 w-8 text-primary mb-2" />,
    href: '#', // Placeholder, will be '/dashboard/applications' or similar
    actionText: 'View Applications'
  },
  {
    id: 'my-profile',
    name: 'My Profile',
    description: 'View and manage your account details and preferences.',
    icon: <UserCircle2 className="h-8 w-8 text-primary mb-2" />,
    href: '#', // Placeholder, will be '/dashboard/profile'
    actionText: 'Manage Profile'
  },
  {
    id: 'payment-history',
    name: 'Payment History',
    description: 'Review your transaction history for fees and other payments.',
    icon: <ReceiptText className="h-8 w-8 text-primary mb-2" />,
    href: '#', // Placeholder, will be '/dashboard/payments'
    actionText: 'View Payments'
  },
  {
    id: 'my-documents',
    name: 'My Documents',
    description: 'Access your submitted documents and issued permits or certificates.',
    icon: <FolderArchive className="h-8 w-8 text-primary mb-2" />,
    href: '#', // Placeholder, will be '/dashboard/documents'
    actionText: 'View Documents'
  },
];

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const userName = searchParams.get('name') || 'User';

  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(format(new Date(), "MMMM d, yyyy"));
  }, []);

  const handleLogout = () => {
    router.push('/');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };

  const handleSelectPermitType = (href: string, permitName: string) => {
    if (href === '#') {
      toast({
        title: 'Feature Pending',
        description: `The form or page for '${permitName}' is not yet implemented.`,
      });
    } else {
      router.push(href);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome, {userName}!</h1>
          {currentDate && <p className="text-muted-foreground">Today is {currentDate}.</p>}
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Permit Application Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Start New Application</h2>
        <p className="text-muted-foreground mb-6">
          Select the type of permit you wish to apply for from the options below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {permitTypes.map((permit) => (
            <Card key={permit.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                {permit.icon}
                <CardTitle>{permit.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{permit.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPermitType(permit.href, permit.name)} 
                  className="w-full"
                >
                  Select & Proceed
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      {/* Dashboard Management Sections */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Manage Your Activities</h2>
        <p className="text-muted-foreground mb-6">
          Access your application statuses, profile, payments, and documents.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardSections.map((section) => (
            <Card key={section.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                {section.icon}
                <CardTitle>{section.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  onClick={() => handleSelectPermitType(section.href, section.name)} // Using same handler for simplicity
                  className="w-full"
                >
                  {section.actionText}
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
