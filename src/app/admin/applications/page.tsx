
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ListFilter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';


type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

// Mock data for applications
const mockApplications = [
  { id: 'APP-2023-001', applicantName: 'Muhammad Kabir', type: 'Building Permit Individual', date: '2023-10-15', status: 'Pending' as ApplicationStatus },
  { id: 'APP-2023-002', applicantName: 'Acme Inc.', type: 'Building permit for organization', date: '2023-10-14', status: 'Approved' as ApplicationStatus },
  { id: 'APP-2023-003', applicantName: 'Jane Smith', type: 'Street Naming Permit', date: '2023-10-12', status: 'Rejected' as ApplicationStatus },
  { id: 'APP-2023-004', applicantName: 'TeleCom Co.', type: 'Mast Permit', date: '2023-10-11', status: 'Processing' as ApplicationStatus },
  { id: 'APP-2023-005', applicantName: 'Creative Signs', type: 'Outdoor Advertisement Permit', date: '2023-10-10', status: 'Approved' as ApplicationStatus },
  { id: 'APP-2023-006', applicantName: 'Local Market', type: 'Shop Owners Permit', date: '2023-10-09', status: 'Pending' as ApplicationStatus },
  { id: 'APP-2023-007', applicantName: 'Global Structs', type: 'Outdoor Advertisement Structure Permit', date: '2023-10-08', status: 'Approved' as ApplicationStatus },
];

const badgeVariantsForStatus = ({ status }: { status: ApplicationStatus }) => {
  return {
    variant: (
      status === 'Approved' ? 'default' :
      status === 'Rejected' ? 'destructive' :
      status === 'Pending' ? 'secondary' :
      status === 'Processing' ? 'outline' :
      'default'
    ) as "default" | "destructive" | "secondary" | "outline" | null | undefined,
  };
};

interface StatusBadgeProps extends VariantProps<typeof badgeVariantsForStatus> {
  status: ApplicationStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { variant } = badgeVariantsForStatus({ status });
  return <Badge variant={variant} className={cn("capitalize", className)}>{status}</Badge>;
};


export default function ManageApplicationsPage() {
  const router = useRouter();

  const handleViewDetails = (appId: string) => {
    router.push(`/admin/applications/${appId}`);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Applications</CardTitle>
          <CardDescription>View, filter, and manage all submitted applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by applicant name or ID..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ListFilter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Approved</DropdownMenuItem>
                <DropdownMenuItem>Rejected</DropdownMenuItem>
                <DropdownMenuItem>Processing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.applicantName}</TableCell>
                    <TableCell className="text-sm">{app.type}</TableCell>
                    <TableCell>{format(new Date(app.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <StatusBadge status={app.status} />
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(app.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem>Reject</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
