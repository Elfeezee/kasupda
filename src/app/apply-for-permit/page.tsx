
"use client";

import React from 'react';
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
// Removed: import { signUpWithEmail, type SignUpState } from '@/app/actions/authActions';
// Removed: import { useActionState } from 'react';


function SubmitButton() {
  const { pending } = useFormStatus(); // This will always be false now without a server action
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={pending} aria-disabled={pending}>
      {pending ? 'Creating Profile...' : 'Create Profile'}
    </Button>
  );
}

export default function ApplyForPermitPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const applicantName = formData.get('applicantName') as string || 'User';
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    // Basic client-side validation (can be expanded)
    if (!applicantName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }


    toast({
      title: 'Profile Created (Simulated)',
      description: 'Redirecting to your dashboard...',
    });
    router.push(`/dashboard?name=${encodeURIComponent(applicantName)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-var(--header-height,100px)-var(--footer-height,100px))]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Your Profile</CardTitle>
          <CardDescription>Apply for permits and manage your applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input id="applicantName" name="applicantName" placeholder="Enter your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="e.g., 08012345678" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a strong password (min. 6 characters)" required />
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
