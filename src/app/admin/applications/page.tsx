
'use client';

import React, { useState, useEffect } from 'react';
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
import { getApplications, type StoredApplication, updateApplicationStatus } from '@/lib/application-store';
import { useToast } from '@/hooks/use-toast';


type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

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
  const { toast } = useToast();
  const [applications, setApplications] = useState<StoredApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<StoredApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  
  // Function to load applications, can be recalled to refresh data
  const loadApplications = () => {
    const loadedApplications = getApplications();
    setApplications(loadedApplications);
    // Initially, the filtered list is the full list
    setFilteredApplications(loadedApplications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    let result = applications;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(app =>
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter(app => app.status === statusFilter);
    }
    
    setFilteredApplications(result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

  }, [searchTerm, statusFilter, applications]);


  const handleViewDetails = (appId: string) => {
    router.push(`/admin/applications/${appId}`);
  };

  const handleStatusChange = (appId: string, newStatus: 'Approved' | 'Rejected') => {
    const updatedApplication = updateApplicationStatus(appId, newStatus);
    if (updatedApplication) {
      loadApplications(); // Refresh the list from storage
      toast({
        title: `Application ${newStatus}`,
        description: `The application (ID: ${appId}) has been marked as ${newStatus}.`
      });
    } else {
      toast({
        title: 'Error',
        description: 'Could not update the application status.',
        variant: 'destructive',
      });
    }
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
              <Input 
                placeholder="Search by applicant name or ID..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ListFilter className="h-4 w-4" />
                  Filter ({statusFilter})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('All')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Approved')}>Approved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Rejected')}>Rejected</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Processing')}>Processing</DropdownMenuItem>
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
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium text-xs">{app.id}</TableCell>
                      <TableCell>{app.applicantName}</TableCell>
                      <TableCell className="text-sm">{app.type}</TableCell>
                      <TableCell>{format(new Date(app.date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <StatusBadge status={app.status as ApplicationStatus} />
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
                            <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Approved')}>Approve</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(app.id, 'Rejected')}>Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No applications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
