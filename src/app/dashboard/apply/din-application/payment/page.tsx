
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { saveApplication } from '@/app/actions/applicationActions';
import { CheckCircle, Loader, AlertTriangle, PartyPopper } from 'lucide-react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

function DinPaymentPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    
    const [formData, setFormData] = useState<any | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string; din: string; } | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                toast({ title: 'Authentication Error', description: 'You must be logged in to proceed.', variant: 'destructive' });
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router, toast]);
    
    useEffect(() => {
        const data = searchParams.get('formData');
        if (data) {
            try {
                setFormData(JSON.parse(data));
            } catch (error) {
                toast({ title: 'Error', description: 'Could not read form data.', variant: 'destructive' });
                router.back();
            }
        } else {
             toast({ title: 'Error', description: 'No form data provided.', variant: 'destructive' });
             router.back();
        }
    }, [searchParams, router, toast]);

    const handlePaymentSimulation = async () => {
        if (!formData || !user) {
            toast({ title: 'Error', description: 'Missing form data or user session.', variant: 'destructive' });
            return;
        }

        setIsSubmitting(true);
        
        const dataToSave = new FormData();
        dataToSave.append('type', "DIN Application");
        dataToSave.append('applicantName', `${formData.firstName} ${formData.surname}`);
        dataToSave.append('data', JSON.stringify(formData));
        dataToSave.append('userId', user.uid);

        try {
            const result = await saveApplication(dataToSave);

            if (result.success && result.applicationId) {
                // Simulate a unique DIN based on the application ID
                const uniquePart = result.applicationId.substring(0, 8).toUpperCase();
                const din = `KASUPDA-${uniquePart}`;
                setSubmissionResult({ success: true, message: "Your payment was successful and your DIN has been generated!", din });
                toast({ title: "Payment Successful!", description: "Your DIN has been generated." });
            } else {
                throw new Error(result.error || "An unknown error occurred during submission.");
            }
        } catch (error) {
            console.error("Payment/Submission failed:", error);
            const errorMessage = error instanceof Error ? error.message : "Could not process payment. Please try again.";
            setSubmissionResult({ success: false, message: errorMessage, din: '' });
            toast({ title: "Payment Failed", description: errorMessage, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submissionResult) {
        return (
             <Card className="w-full max-w-lg mx-auto">
                <CardHeader className='text-center'>
                    {submissionResult.success ? (
                         <PartyPopper className="mx-auto h-12 w-12 text-green-500" />
                    ) : (
                        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                    )}
                    <CardTitle className={submissionResult.success ? 'text-primary' : 'text-destructive'}>
                        {submissionResult.success ? "Application Complete!" : "Application Failed"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                     <p className="text-muted-foreground">{submissionResult.message}</p>
                    {submissionResult.success && (
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Your Developer Identification Number is:</p>
                            <p className="text-2xl font-bold tracking-widest text-primary">{submissionResult.din}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => router.push('/dashboard/my-applications')}>
                        View My Applications
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                    DIN Application Payment
                </CardTitle>
                <CardDescription>
                    Review your application and confirm payment to receive your DIN.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-md bg-muted/50">
                    <h3 className="font-semibold mb-2">Application For:</h3>
                    <p className="text-lg text-primary">{formData ? `${formData.title || ''} ${formData.firstName} ${formData.surname}` : 'Loading...'}</p>
                </div>
                <div className="p-4 border rounded-md bg-muted/50">
                     <h3 className="font-semibold mb-2">Payment Amount:</h3>
                     <p className="text-2xl font-bold">₦10,000.00</p>
                     <p className="text-xs text-muted-foreground">(This is a simulation. No real payment will be processed.)</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button 
                    onClick={handlePaymentSimulation} 
                    disabled={isSubmitting || !formData || !user}
                    className="w-full text-lg py-3"
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-5 w-5" /> Confirm Payment & Get DIN
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function DinPaymentPage() {
    return (
        <div className="container mx-auto px-2 sm:px-4 py-8">
            <Suspense fallback={<div className="text-center">Loading payment details...</div>}>
                <DinPaymentPageContent />
            </Suspense>
        </div>
    )
}
