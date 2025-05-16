
"use client";

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { signUpWithEmail, type SignUpState } from '@/app/actions/authActions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={pending} aria-disabled={pending}>
      {pending ? 'Creating Profile...' : 'Create Profile'}
    </Button>
  );
}

export default function ApplyForPermitPage() {
  const router = useRouter();
  const { toast } = useToast();

  const initialState: SignUpState = { message: null, errors: null, success: false };
  const [state, formAction] = useFormState(signUpWithEmail, initialState);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? (state.pendingConfirmation ? 'Pending Confirmation' : 'Success') : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router, toast]);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-var(--header-height,100px)-var(--footer-height,100px))]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Your Profile</CardTitle>
          <CardDescription>Apply for permits and manage your applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input id="applicantName" name="applicantName" placeholder="Enter your full name" required />
              {state?.errors?.applicantName && (
                <p className="text-sm text-destructive">{state.errors.applicantName.join(', ')}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
               {state?.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="e.g., 08012345678" required />
              {state?.errors?.phone && (
                <p className="text-sm text-destructive">{state.errors.phone.join(', ')}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a strong password (min. 6 characters)" required />
              {state?.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password.join(', ')}</p>
              )}
            </div>

            {state?.errors?.general && (
              <p className="text-sm text-destructive text-center">{state.errors.general.join(', ')}</p>
            )}
            
            <SubmitButton />
          </form>
          
          <div className="my-6 text-center">
             <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                Login
                </Link>
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 my-6">
            <Separator className="flex-grow" />
            <span className="text-xs text-muted-foreground uppercase shrink-0">OR</span>
            <Separator className="flex-grow" />
          </div>
          
          <Button 
            className="w-full flex items-center justify-center space-x-2 py-3 text-base" 
            variant="outline" 
            type="button" 
            onClick={() => { console.log("Google Sign-up clicked. Not implemented."); /* Handle Google Sign-up logic here */ }}
          >
            <FcGoogle className="text-2xl" />
            <span>Sign Up with Google</span>
          </Button>
        </CardContent>
         <CardFooter className="justify-center mt-2 pb-6">
          {/* Footer content can be added here if needed, or removed if empty */}
        </CardFooter>
      </Card>
    </div>
  );
}

