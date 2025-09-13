
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { saveApplication } from '@/app/actions/applicationActions';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

const stageApprovalSchema = z.object({
  // Project Details
  originalPermitId: z.string().min(5, "Original Permit ID is required"),
  
  // Declaration
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration to submit the application."
  })
});

type StageApprovalFormValues = z.infer<typeof stageApprovalSchema>;

export default function StageApprovalPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        } else {
            toast({ title: 'Authentication Error', description: 'You must be logged in to apply.', variant: 'destructive' });
            router.push('/login?redirectTo=/dashboard/apply/stage-approval');
        }
    });
    return () => unsubscribe();
  }, [router, toast]);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<StageApprovalFormValues>({
    resolver: zodResolver(stageApprovalSchema),
    mode: "onChange",
    defaultValues: {
      originalPermitId: "",
      declaration: false,
    }
  });

  const onSubmit = async (data: StageApprovalFormValues) => {
     if (!user) {
        toast({ title: "Error", description: "You must be logged in to submit.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('type', "Stage Approval Application");
    // Use user's display name from auth, or a fallback
    formData.append('applicantName', user.displayName || user.email || "KASUPDA Applicant");
    formData.append('userId', user.uid);
    formData.append('data', JSON.stringify(data, (key, value) => {
        if (value instanceof FileList) {
            return Array.from(value).map(file => ({ name: file.name, size: file.size, type: file.type }));
        }
        return value;
    }));

    try {
        const result = await saveApplication(formData);

        if (result.success) {
             toast({
                title: "Application Submitted!",
                description: `Your stage approval application has been received. ID: ${result.applicationId}`,
            });
            router.push('/dashboard/my-applications');
        } else {
            throw new Error(result.error || "An unknown error occurred.");
        }
    } catch (error) {
        console.error("Submission failed:", error);
        toast({
            title: "Submission Failed",
            description: error instanceof Error ? error.message : "Could not submit the application.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  if (!user) {
      return <div className="text-center p-8">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
            Stage Approval Application
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Apply for inspection and approval for a completed stage of your construction project.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            {/* Project Details Section */}
            <section>
              <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                    <Label htmlFor="originalPermitId">Original Building Permit ID*</Label>
                    <Input id="originalPermitId" {...register("originalPermitId")} placeholder="Enter the ID of your approved building permit" />
                    {errors.originalPermitId && <p className="text-destructive text-xs mt-1">{errors.originalPermitId.message}</p>}
                </div>
              </div>
            </section>

            <Separator />
            
            {/* Declaration Section */}
            <section>
                <h3 className="text-lg font-semibold text-primary">Declaration</h3>
                <div className="flex items-start space-x-3 p-4 border rounded-md bg-muted/30 mt-2">
                    <Controller
                        name="declaration"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="declaration"
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1"
                            />
                        )}
                    />
                    <Label htmlFor="declaration" className="font-normal text-sm leading-snug">
                        I declare that the information provided is true and that the construction stage for which I seek approval complies with the plans specified in the original building permit.
                    </Label>
                </div>
                {errors.declaration && <p className="text-destructive text-xs mt-1 px-1">{errors.declaration.message}</p>}
            </section>

          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full sm:w-auto py-3 text-base"
              disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Stage Approval Application'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
