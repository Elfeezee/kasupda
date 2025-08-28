

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X, Download, File as FileIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Reuse the StoredApplication type
export interface StoredApplication {
  id: string;
  type: string;
  applicantName: string;
  status: string;
  date: string;
  data: Record<string, any>; // This will hold the parsed JSON data
  userId?: string;
}

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

const badgeVariantsForStatus = ({ status }: { status: ApplicationStatus }) => {
    return { variant: (status === 'Approved' ? 'default' : status === 'Rejected' ? 'destructive' : status === 'Pending' ? 'secondary' : 'outline') as any };
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  const { variant } = badgeVariantsForStatus({ status });
  return <Badge variant={variant} className="capitalize">{status}</Badge>;
};

const DetailItem = ({ label, value }: { label: string; value: string | undefined | boolean | React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 py-2 border-b">
        <dt className="font-medium text-muted-foreground">{label}</dt>
        <dd className="md:col-span-2">
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}
        </dd>
    </div>
);

const DocumentItem = ({ name, file }: { name: string; file: { name: string; type: string, size: number } | undefined }) => (
     <li className="flex items-center justify-between p-3 rounded-md border bg-muted/50">
        <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{name}</span>
        </div>
        {file?.name ? (
           <div className='flex items-center gap-2'>
                <span className="text-xs text-muted-foreground truncate max-w-[150px]">{file.name}</span>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => alert(`This is a prototype. File download for '${file.name}' is not implemented.`)}>
                    <Download className="h-4 w-4" /> Download
                </Button>
           </div>
        ) : (
            <Badge variant="secondary">Not Uploaded</Badge>
        )}
    </li>
);

// This function now renders details from the 'data' sub-object
const renderDetails = (details: Record<string, any>) => {
    // Exclude special/internal keys from the main details list
    const detailEntries = Object.entries(details).filter(([key]) => !key.startsWith('doc') && key !== 'declaration');
    
    // Find all document objects, which should be under keys like 'docResidential', 'docOrg', etc.
    const docGroups = Object.entries(details)
        .filter(([key, value]) => key.startsWith('doc') && typeof value === 'object' && value !== null);

    const renderValue = (value: any): string | React.ReactNode => {
        if (value instanceof Date) return value.toLocaleDateString();
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (typeof value === 'object' && value !== null) {
            const checkedKeys = Object.keys(value).filter(k => (value as any)[k] === true);
            if (checkedKeys.length > 0 && !checkedKeys.some(k => typeof (value as any)[k] === 'object')) {
                 return checkedKeys.map(k => k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(', ') || 'None';
            }
            // A file object from our serialized data will have a name property
            if (value.name && value.size !== undefined) {
                 return <DocumentItem name="File" file={value} />;
            }
            return 'Complex object - view details below'; 
        }
        return String(value);
    };

    return (
      <>
        <dl className="space-y-2 text-sm">
            {detailEntries.map(([key, value]) => (
                <DetailItem key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} value={renderValue(value)} />
            ))}
        </dl>

        {docGroups.length > 0 && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Uploaded Documents</h3>
              <ul className="space-y-3">
                {docGroups.map(([groupKey, docObject]) => 
                    Object.entries(docObject).map(([docKey, docValue]) => (
                        <DocumentItem 
                            key={`${groupKey}-${docKey}`} 
                            name={docKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                            file={docValue as { name: string; type: string; size: number } | undefined} 
                        />
                    ))
                )}
              </ul>
            </div>
          </>
        )}
      </>
    );
};


export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;
  const [application, setApplication] = useState<StoredApplication | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchApplication = useCallback(async (appId: string) => {
    setLoading(true);
    try {
        const appDocRef = doc(db, 'applications', appId);
        const docSnap = await getDoc(appDocRef);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            setApplication({ id: docSnap.id, ...docData } as StoredApplication);
        } else {
            toast({ title: 'Not Found', description: 'Application does not exist.', variant: 'destructive' });
            setApplication(null);
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        toast({ title: 'Error', description: 'Failed to fetch application details.', variant: 'destructive' });
    } finally {
        setLoading(false);
    }
  }, [toast]);


  useEffect(() => {
    if (id) {
      fetchApplication(id as string);
    }
  }, [id, fetchApplication]);

  const handleStatusChange = async (newStatus: 'Approved' | 'Rejected') => {
    if (!application) return;

    try {
        const appDocRef = doc(db, 'applications', application.id);
        await updateDoc(appDocRef, { status: newStatus });

        // Optimistically update the UI
        setApplication(prevApp => prevApp ? { ...prevApp, status: newStatus } : null);
        
        toast({
            title: `Application ${newStatus}`,
            description: `The application (ID: ${application.id}) has been marked as ${newStatus}.`
        });
    } catch (error) {
        console.error("Error updating status:", error);
        toast({
            title: 'Error',
            description: 'Could not update the application status in the database.',
            variant: 'destructive',
        });
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading application details from database...</div>;
  }
  
  if (!application) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold">Application not found</h2>
        <Button onClick={() => router.back()} variant="link" className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => router.back()} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Applications
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                  <CardTitle className="text-2xl">{application.type}</CardTitle>
                  <CardDescription>ID: {application.id}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <StatusBadge status={application.status as ApplicationStatus} />
              </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Applicant: {application.applicantName}</h3>
            <Separator />
            <h3 className="text-lg font-semibold text-primary mb-4">Application Details</h3>
            {/* Pass the nested 'data' object to the renderer */}
            {renderDetails(application.data)}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="destructive" className="gap-2" onClick={() => handleStatusChange('Rejected')}>
                <X className="h-4 w-4" /> Reject Application
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange('Approved')}>
                <Check className="h-4 w-4" /> Approve Application
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
