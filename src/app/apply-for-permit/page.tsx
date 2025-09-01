
"use client";

import React, { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { signUpWithEmail, type AuthState } from '@/app/actions/authActions';


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
  
  const initialState: AuthState = { message: null, success: false, errors: null };
  const [state, formAction] = useActionState(signUpWithEmail, initialState);

  useEffect(() => {
    if (state.success) {
      if (state.redirectTo) {
        toast({
            title: 'Sign Up Successful!',
            description: state.message || 'Redirecting to login...',
        });
        router.push(state.redirectTo);
      }
    } else if (state.message) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
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
               {state.errors?.applicantName && <p className="text-destructive text-xs mt-1">{state.errors.applicantName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
               {state.errors?.email && <p className="text-destructive text-xs mt-1">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="e.g., +2348012345678" required />
               {state.errors?.phone && <p className="text-destructive text-xs mt-1">{state.errors.phone[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a strong password (min. 6 characters)" required />
               {state.errors?.password && <p className="text-destructive text-xs mt-1">{state.errors.password[0]}</p>}
            </div>
            
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
            onClick={() => { 
                toast({
                    title: 'Google Sign-Up',
                    description: 'Google Sign-Up is not implemented in this prototype.',
                });
             }}
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
