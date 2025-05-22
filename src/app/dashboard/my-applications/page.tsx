
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListChecks, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Ensure cn is imported

// Mock data for submitted applications
const mockApplications = [
  {
    id: 'APP-2023-001',
    name: 'Residential Building Permit - Plot 123, GRA',
    type: 'Grant of Building Permission',
    date: '2023-10-15',
    status: 'Pending' as const,
  },
  {
    id: 'APP-2023-002',
    name: 'Temporary Structure - Event at Murtala Square',
    type: 'Temporary Building Permit',
    date: '2023-09-28',
    status: 'Approved' as const,
  },
  {
    id: 'APP-2023-003',
    name: 'Billboard Installation - Ahmadu Bello Way',
    type: 'Outdoor Advertisement Licensing',
    date: '2023-10-05',
    status: 'Rejected' as const,
  },
  {
    id: 'CMP-2023-001',
    name: 'Noise Complaint - Ungwan Rimi',
    type: 'Complaint Application',
    date: '2023-10-20',
    status: 'Processing' as const,
  },
];

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

interface StatusBadgeProps extends VariantProps<typeof badgeVariantsForStatus> {
  status: ApplicationStatus;
  className?: string;
}

const badgeVariantsForStatus = ({ status }: { status: ApplicationStatus }) => {
  return {
    variant: (
      status === 'Approved' ? 'default' : // Using 'default' for green (primary)
      status === 'Rejected' ? 'destructive' :
      status === 'Pending' ? 'secondary' : // Using 'secondary' for muted/pending
      status === 'Processing' ? 'outline' : // Using 'outline' or another variant for processing
      'default' // Fallback
    ) as "default" | "destructive" | "secondary" | "outline" | null | undefined,
  };
};

const StatusIcon = ({ status }: { status: ApplicationStatus }) => {
  if (status === 'Approved') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (status === 'Rejected') return <XCircle className="h-4 w-4 text-red-500" />;
  if (status === 'Pending') return <Clock className="h-4 w-4 text-yellow-500" />;
  if (status === 'Processing') return <AlertCircle className="h-4 w-4 text-blue-500" />; // Example for processing
  return null;
};


const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { variant } = badgeVariantsForStatus({ status });
  return <Badge variant={variant} className={cn("capitalize", className)}>{status}</Badge>;
};


export default function MyApplicationsPage() {
  return (
    <div className="space-y-8">
      <CardHeader className="px-0 pt-0"> {/* Adjusted padding */}
        <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
          <ListChecks className="mr-3 h-7 w-7" /> My Submitted Applications
        </CardTitle>
        <CardDescription>
          Track the status of all your permit applications and complaints.
        </CardDescription>
      </CardHeader>

      {mockApplications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">You have not submitted any applications yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockApplications.map((app) => (
            <Card key={app.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">{app.type}</CardTitle>
                  <StatusIcon status={app.status} />
                </div>
                <CardDescription className="text-xs">{app.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>ID:</strong> {app.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Submitted:</strong> {new Date(app.date).toLocaleDateString()}
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground mr-2"><strong>Status:</strong></p>
                  <StatusBadge status={app.status} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
