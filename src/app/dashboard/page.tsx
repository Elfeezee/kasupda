
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, Building, HomeIcon, ChevronsRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

const permitTypes = [
  { 
    id: 'residential-building-permit', 
    name: 'Residential Building Permit', 
    description: 'Apply for permits related to new residential constructions, extensions, or major renovations.',
    icon: <HomeIcon className="h-8 w-8 text-primary mb-2" />,
    href: '/dashboard/apply/residential-building-permit'
  },
  { 
    id: 'commercial', 
    name: 'Commercial/Industrial Permit', 
    description: 'Permits for commercial buildings, industrial facilities, warehouses, and mixed-use developments.',
    icon: <Building className="h-8 w-8 text-primary mb-2" />,
    href: '#' // Placeholder for now
  },
  { 
    id: 'land_division', 
    name: 'Land Division/Subdivision Permit', 
    description: 'Applications for dividing or subdividing plots of land as per zoning regulations.',
    icon: <FileText className="h-8 w-8 text-primary mb-2" />,
    href: '#' // Placeholder for now
  },
  { 
    id: 'fence_permit', 
    name: 'Fence/Wall Permit', 
    description: 'Permits required for constructing or modifying boundary fences or walls.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary mb-2"><path d="M14 11H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V12a1 1 0 0 0-1-1Z"></path><path d="M22 11V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"></path><path d="M14 11V3"></path><path d="M10 11V3"></path><path d="M6 11V3"></path><path d="M18 9V3"></path></svg>,
    href: '#' // Placeholder for now
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
        title: 'Permit Selected',
        description: `Form for ${permitName} is pending implementation.`,
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

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Start Your Application</h2>
        <p className="text-muted-foreground mb-6">
          Select the type of permit you wish to apply for from the options below. Each permit type has a specific form and requirements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
    </div>
  );
};

export default DashboardPage;
