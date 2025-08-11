
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

// Mock data - in a real app, this would be fetched based on the [id]
const mockApplicationDetails = {
    'APP-2023-001': {
        id: 'APP-2023-001', applicantName: 'John Doe', type: 'Building Permit Individual', date: '2023-10-15', status: 'Pending' as ApplicationStatus,
        details: {
            "First Name": "John", "Surname": "Doe", "Gender": "Male", "Date of Birth": "1985-05-20", "Phone 1": "08012345678", "Email": "john.doe@example.com",
            "Plot Address": "Plot 123, GRA, Kaduna", "Land Use": "Residential",
        },
        documents: [
            { name: "Land title document", uploaded: true },
            { name: "Site Analysis Report (SAR)", uploaded: true },
            { name: "Complete working Drawings", uploaded: false },
            { name: "Means of ID of applicant", uploaded: true },
        ]
    },
    // Add other application details here if needed
};

const badgeVariantsForStatus = ({ status }: { status: ApplicationStatus }) => {
    return { variant: (status === 'Approved' ? 'default' : status === 'Rejected' ? 'destructive' : status === 'Pending' ? 'secondary' : 'outline') as any };
};

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  const { variant } = badgeVariantsForStatus({ status });
  return <Badge variant={variant} className="capitalize">{status}</Badge>;
};


const DetailItem = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 py-2 border-b">
        <dt className="font-medium text-muted-foreground">{label}</dt>
        <dd className="md:col-span-2">{value || 'N/A'}</dd>
    </div>
);


export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // In a real app, you'd fetch this data. Using mock data for now.
  const application = (mockApplicationDetails as any)[id as string];

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
                  <CardTitle className="text-2xl">Application Details</CardTitle>
                  <CardDescription>ID: {application.id}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <StatusBadge status={application.status} />
              </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Applicant Information</h3>
            <dl className="space-y-2 text-sm">
                {Object.entries(application.details).map(([key, value]) => (
                    <DetailItem key={key} label={key} value={value as string} />
                ))}
            </dl>
          </div>

          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Uploaded Documents</h3>
            <ul className="space-y-3">
                {application.documents.map((doc, index) => (
                    <li key={index} className="flex items-center justify-between p-3 rounded-md border bg-muted/50">
                        <span className="text-sm font-medium">{doc.name}</span>
                        {doc.uploaded ? (
                           <Button variant="outline" size="sm" className="gap-2">
                               <Download className="h-4 w-4" /> Download
                           </Button>
                        ) : (
                            <Badge variant="secondary">Not Uploaded</Badge>
                        )}
                    </li>
                ))}
            </ul>
          </div>
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
