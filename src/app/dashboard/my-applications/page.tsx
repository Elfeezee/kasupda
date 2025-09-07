
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListChecks, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast.tsx';
import { auth, db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Reuse the type definition
import type { StoredApplication } from '@/app/admin/applications/page';


type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

interface StatusBadgeProps extends VariantProps<typeof badgeVariantsForStatus> {
  status: ApplicationStatus;
  className?: string;
}

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

const StatusIcon = ({ status }: { status: ApplicationStatus }) => {
  if (status === 'Approved') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (status === 'Rejected') return <XCircle className="h-4 w-4 text-red-500" />;
  if (status === 'Pending') return <Clock className="h-4 w-4 text-yellow-500" />;
  if (status === 'Processing') return <AlertCircle className="h-4 w-4 text-blue-500" />;
  return null;
};


const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { variant } = badgeVariantsForStatus({ status });
  return <Badge variant={variant} className={cn("capitalize", className)}>{status}</Badge>;
};


function MyApplicationsPageComponent() {
  const { toast } = useToast();
  const router = useRouter();
  const [applications, setApplications] = useState<StoredApplication[]>([]);
  const [loading, setLoading] = useState(true); // Manages data fetching state
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false); // Manages auth state check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true); // Auth state confirmed
      if (!currentUser) {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return; // Don't fetch if no user

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const appsRef = collection(db, "applications");
        const q = query(
          appsRef, 
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const userApps = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as StoredApplication));
        setApplications(userApps);
      } catch (error) {
        console.error("Error fetching user applications:", error);
        toast({
          title: "Error",
          description: "Could not fetch your applications from the database.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [user, toast]);

  // Initial un-hydrated state or loading auth
  if (!authChecked || !user) {
    return (
        <div className="space-y-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
                <ListChecks className="mr-3 h-7 w-7" /> My Submitted Applications
                </CardTitle>
                <CardDescription>
                Verifying your session...
                </CardDescription>
            </CardHeader>
            <Card><CardContent className="pt-6">Loading...</CardContent></Card>
        </div>
    );
  }
  
  // Logged in, show applications or loading/empty state
  return (
    <div className="space-y-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
          <ListChecks className="mr-3 h-7 w-7" /> My Submitted Applications
        </CardTitle>
        <CardDescription>
          Track the status of all your permit applications and complaints.
          {user && ` (Viewing for: ${user.displayName || user.email})`}
        </CardDescription>
      </CardHeader>

      {loading ? (
         <Card><CardContent className="pt-6">Loading your applications...</CardContent></Card>
      ) : applications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">You have not submitted any applications yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <Card key={app.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">{app.type}</CardTitle>
                  <StatusIcon status={app.status as ApplicationStatus} />
                </div>
                <CardDescription className="text-xs">Applicant: {app.applicantName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>ID:</strong> {app.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Submitted:</strong> {app.date ? format(parseISO(app.date), 'dd/MM/yyyy') : 'N/A'}
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground mr-2"><strong>Status:</strong></p>
                  <StatusBadge status={app.status as ApplicationStatus} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


// A wrapper component is needed because hooks like useToast and useEffect need to be in a Client Component.
export default function MyApplicationsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MyApplicationsPageComponent />
        </Suspense>
    )
}
