
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X, Download, File as FileIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getApplicationById, type StoredApplication } from '@/lib/application-store';

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

const badgeVariantsForStatus = ({ status }: { status: ApplicationStatus }) => {
    return { variant: (status === 'Approved' ? 'default' : status === 'Rejected' ? 'destructive' : status === 'Pending' ? 'secondary' : 'outline') as any };
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  const { variant } = badgeVariantsForStatus({ status });
  return <Badge variant={variant} className="capitalize">{status}</Badge>;
};

const DetailItem = ({ label, value }: { label: string; value: string | undefined | boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 py-2 border-b">
        <dt className="font-medium text-muted-foreground">{label}</dt>
        <dd className="md:col-span-2">
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}
        </dd>
    </div>
);

const DocumentItem = ({ name, file }: { name: string; file: File | undefined }) => (
     <li className="flex items-center justify-between p-3 rounded-md border bg-muted/50">
        <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{name}</span>
        </div>
        {file ? (
           <div className='flex items-center gap-2'>
                <span className="text-xs text-muted-foreground truncate max-w-[150px]">{file.name}</span>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => alert(`Simulating download for: ${file.name}`)}>
                    <Download className="h-4 w-4" /> Download
                </Button>
           </div>
        ) : (
            <Badge variant="secondary">Not Uploaded</Badge>
        )}
    </li>
);

const renderDetails = (details: Record<string, any>) => {
    const detailEntries = Object.entries(details).filter(([key]) => !key.startsWith('doc') && key !== 'declaration');
    const docEntries = Object.entries(details).filter(([key]) => key.startsWith('doc'));

    const renderValue = (value: any): string => {
        if (value instanceof Date) return value.toLocaleDateString();
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (typeof value === 'object' && value !== null) return Object.keys(value).filter(k => (value as any)[k]).join(', ') || 'None';
        return String(value);
    };

    return (
      <>
        <dl className="space-y-2 text-sm">
            {detailEntries.map(([key, value]) => (
                <DetailItem key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} value={renderValue(value)} />
            ))}
        </dl>

        {docEntries.length > 0 && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Uploaded Documents</h3>
              <ul className="space-y-3">
                {docEntries.map(([key, docObject]) => {
                  if (typeof docObject !== 'object' || docObject === null) return null;
                  return Object.entries(docObject).map(([docKey, docFile]) => (
                    <DocumentItem key={`${key}-${docKey}`} name={docKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} file={docFile as File | undefined} />
                  ));
                })}
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
  const { id } = params;
  const [application, setApplication] = useState<StoredApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const appData = getApplicationById(id as string);
      setApplication(appData);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading application details...</div>;
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
            <h3 className="text-lg font-semibold text-primary mb-4">Application Details</h3>
            {renderDetails(application.data)}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="destructive" className="gap-2">
                <X className="h-4 w-4" /> Reject Application
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4" /> Approve Application
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
