
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar'; // For mobile toggle
import { HomeIcon, ChevronsRight, Construction, Megaphone, MessageSquareWarning, ListChecks, UserCircle2, ReceiptText, FolderArchive, FileText, CheckCircle2, XCircle, FileClock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    href: '#' // Placeholder
  },
  {
    id: 'outdoor-advertisement-licensing',
    name: 'Outdoor Advertisement Licensing',
    description: 'Apply for licenses for billboards, signage, and other outdoor advertisements.',
    icon: <Megaphone className="h-8 w-8 text-primary mb-2" />,
    href: '#' // Placeholder
  },
  {
    id: 'complaint-application',
    name: 'Complaint Application',
    description: 'Submit a formal complaint regarding building code violations or planning issues.',
    icon: <MessageSquareWarning className="h-8 w-8 text-primary mb-2" />,
    href: '#' // Placeholder
  },
];

const dashboardSections = [
  {
    id: 'application-status',
    name: 'Application Status',
    description: 'Track the progress of your submitted permit applications.',
    icon: <ListChecks className="h-8 w-8 text-primary mb-2" />,
    href: '#submitted-applications-section',
    actionText: 'View Applications'
  },
  {
    id: 'my-profile',
    name: 'My Profile',
    description: 'View and manage your account details and preferences.',
    icon: <UserCircle2 className="h-8 w-8 text-primary mb-2" />,
    href: '#', 
    actionText: 'Manage Profile'
  },
  {
    id: 'payment-history',
    name: 'Payment History',
    description: 'Review your transaction history for fees and other payments.',
    icon: <ReceiptText className="h-8 w-8 text-primary mb-2" />,
    href: '#',
    actionText: 'View Payments'
  },
  {
    id: 'my-documents',
    name: 'My Documents',
    description: 'Access your submitted documents and issued permits or certificates.',
    icon: <FolderArchive className="h-8 w-8 text-primary mb-2" />,
    href: '#', 
    actionText: 'View Documents'
  },
];

interface SubmittedApplication {
  id: string;
  name: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Review';
  dateSubmitted: string;
  applicationId: string;
  permitType: string;
}

const mockApplications: SubmittedApplication[] = [
  {
    id: 'app1',
    permitType: 'Residential Building Permit',
    name: 'Plot 123, Ungwan Rimi, Kaduna',
    status: 'Pending',
    dateSubmitted: 'October 25, 2023',
    applicationId: 'KAS/BP/2023/001',
  },
  {
    id: 'app2',
    permitType: 'Outdoor Advertisement License',
    name: 'Billboard - Ahmadu Bello Way',
    status: 'Approved',
    dateSubmitted: 'September 01, 2023',
    applicationId: 'KAS/AD/2023/005',
  },
  {
    id: 'app3',
    permitType: 'Temporary Structure Permit',
    name: 'Event Tent - Murtala Square',
    status: 'Rejected',
    dateSubmitted: 'October 20, 2023',
    applicationId: 'KAS/TS/2023/012',
  },
  {
    id: 'app4',
    permitType: 'Residential Building Permit',
    name: 'No. 45, Barnawa Complex',
    status: 'In Review',
    dateSubmitted: 'November 02, 2023',
    applicationId: 'KAS/BP/2023/008',
  },
];

const StatusIcon = ({ status }: { status: SubmittedApplication['status'] }) => {
  switch (status) {
    case 'Approved':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'Pending':
      return <FileClock className="h-5 w-5 text-yellow-500" />;
    case 'Rejected':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'In Review':
      return <FileText className="h-5 w-5 text-blue-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const StatusBadge = ({ status }: { status: SubmittedApplication['status'] }) => {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  if (status === 'Approved') variant = 'default'; 
  else if (status === 'Pending') variant = 'secondary'; 
  else if (status === 'Rejected') variant = 'destructive';
  else if (status === 'In Review') variant = 'outline';

  let className = "";
  if (status === 'Approved') className = "bg-green-100 text-green-700 border-green-300";
  else if (status === 'Pending') className = "bg-yellow-100 text-yellow-700 border-yellow-300";
  else if (status === 'In Review') className = "bg-blue-100 text-blue-700 border-blue-300";
  else if (status === 'Rejected') className = "bg-red-100 text-red-700 border-red-300";

  return <Badge variant={variant} className={cn("capitalize", className)}>{status}</Badge>;
};

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const userName = searchParams.get('name') || 'User';

  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(format(new Date(), "MMMM d, yyyy"));
  }, []);

  const handleSelectPermitType = (href: string, permitName: string, sectionId?: string) => {
    if (href === '#') {
      toast({
        title: 'Feature Pending',
        description: `The form or page for '${permitName}' is not yet implemented.`,
      });
    } else if (href.startsWith('#') && sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            toast({ title: 'Info', description: `Section '${permitName}' is on this page.`});
        }
    }
     else {
      router.push(href);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" /> {/* Mobile sidebar toggle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Welcome, {userName}!</h1>
            {currentDate && <p className="text-muted-foreground text-sm sm:text-base">Today is {currentDate}.</p>}
          </div>
        </div>
        {/* Logout button is now in the sidebar */}
      </div>

      {/* Permit Application Selection Section */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Start New Application</h2>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
          Select the type of permit you wish to apply for from the options below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {permitTypes.map((permit) => (
            <Card key={permit.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                {permit.icon}
                <CardTitle className="text-base sm:text-lg">{permit.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-xs sm:text-sm">{permit.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPermitType(permit.href, permit.name)} 
                  className="w-full text-sm sm:text-base"
                  size="sm"
                >
                  Select & Proceed
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-10 sm:my-12" />

      {/* My Submitted Applications Section */}
      <div id="submitted-applications-section" className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">My Submitted Applications</h2>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
          Overview of your recent permit applications and their current status.
        </p>
        {mockApplications.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {mockApplications.map((app) => (
              <Card key={app.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base sm:text-lg mb-1">{app.permitType}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Details: {app.name}</CardDescription>
                    </div>
                    <StatusIcon status={app.status} />
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm pt-0 pb-2 sm:pb-4">
                  <div>
                    <span className="font-medium text-muted-foreground">Application ID: </span>
                    <span>{app.applicationId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Submitted: </span>
                    <span>{app.dateSubmitted}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-muted-foreground mr-2">Status: </span>
                    <StatusBadge status={app.status} />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 text-primary text-xs sm:text-sm">
                    View Details
                    <ChevronsRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center text-sm sm:text-base">You have no submitted applications yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Separator className="my-10 sm:my-12" />

      {/* Dashboard Management Sections */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Manage Your Activities</h2>
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
          Access your application statuses, profile, payments, and documents.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {dashboardSections.map((section) => (
            <Card key={section.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                {section.icon}
                <CardTitle className="text-base sm:text-lg">{section.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-xs sm:text-sm">{section.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectPermitType(section.href, section.name, section.href.startsWith('#') ? section.href.substring(1) : undefined)}
                  className="w-full text-sm sm:text-base"
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
