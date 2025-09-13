
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { saveApplication } from '@/app/actions/applicationActions';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

const stageApprovalSchema = z.object({
  // Applicant Details
  title: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  phone1: z.string().min(1, "Phone number is required").regex(/^\+?[0-9\s-()]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  
  // Project Details
  fileNumber: z.string().optional(),
  kdlNumber: z.string().optional(),
  docCO: z.any().optional(),

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
      title: "",
      firstName: "",
      middleName: "",
      surname: "",
      phone1: "",
      email: "",
      fileNumber: "",
      kdlNumber: "",
      docCO: undefined,
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
    formData.append('applicantName', `${data.firstName} ${data.surname}`);
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
            {/* Applicant Details Section */}
            <section>
              <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-4">Applicant Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} />
                    </div>
                    <div className="md:col-span-1">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input id="firstName" {...register("firstName")} />
                    {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input id="middleName" {...register("middleName")} />
                    </div>
                    <div>
                    <Label htmlFor="surname">Surname*</Label>
                    <Input id="surname" {...register("surname")} />
                    {errors.surname && <p className="text-destructive text-xs mt-1">{errors.surname.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Gender*</Label>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Male" id="male" />
                                <Label htmlFor="male" className="font-normal text-sm">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Female" id="female" />
                                <Label htmlFor="female" className="font-normal text-sm">Female</Label>
                                </div>
                            </RadioGroup>
                            )}
                        />
                        {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                </PopoverContent>
                            </Popover>
                            )}
                        />
                        {errors.dateOfBirth && <p className="text-destructive text-xs mt-1">{errors.dateOfBirth.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone1">Phone Number*</Label>
                        <Input id="phone1" type="tel" {...register("phone1")} />
                        {errors.phone1 && <p className="text-destructive text-xs mt-1">{errors.phone1.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                </div>
              </div>
            </section>
            
            <Separator />

            {/* Project Details Section */}
            <section>
              <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fileNumber">File Number</Label>
                        <Input id="fileNumber" {...register("fileNumber")} placeholder="Enter the file number" />
                        {errors.fileNumber && <p className="text-destructive text-xs mt-1">{errors.fileNumber.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="kdlNumber">KDL Number</Label>
                        <Input id="kdlNumber" {...register("kdlNumber")} placeholder="Enter the KDL number" />
                        {errors.kdlNumber && <p className="text-destructive text-xs mt-1">{errors.kdlNumber.message}</p>}
                    </div>
                </div>
                <div>
                    <Label htmlFor="docCO">C of O Upload</Label>
                    <Input
                        id="docCO"
                        type="file"
                        {...register("docCO")}
                        className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    {errors.docCO && <p className="text-destructive text-xs mt-1">{errors.docCO.message as string}</p>}
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
