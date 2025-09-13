
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { z } from 'zod';

const SignUpSchema = z.object({
  applicantName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).regex(/^\+?[0-9\s-()]+$/, { message: 'Invalid phone number format.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={isSubmitting}>
      {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
    </Button>
  );
}

export default function ApplyForPermitPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is already logged in, redirect them.
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleManualSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const validatedFields = SignUpSchema.safeParse(formData);

    if (!validatedFields.success) {
      const fieldErrors: Record<string, string | undefined> = {};
      for (const [key, value] of Object.entries(validatedFields.error.flatten().fieldErrors)) {
        fieldErrors[key] = value?.[0];
      }
      setErrors(fieldErrors);
      toast({
        title: 'Validation Error',
        description: 'Please check the fields below.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    const { applicantName, email, phone, password } = validatedFields.data;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their name and phone number
      await updateProfile(userCredential.user, {
        displayName: applicantName,
        // The phoneNumber property on the user object is read-only on client,
        // it can only be set via specific phone auth flows.
        // We can store it in our database (e.g. Firestore) later if needed.
      });

      toast({
        title: 'Sign Up Successful!',
        description: 'You can now log in.',
      });
      router.push(`/login?name=${encodeURIComponent(applicantName)}`);

    } catch (error: any) {
      let errorMessage = 'Could not sign up. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email address already exists.';
      }
      setErrors({ general: errorMessage });
      toast({
        title: 'Sign Up Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Google Sign-Up Successful!',
        description: `Redirecting to dashboard...`,
      });
      // The onAuthStateChanged listener will handle the redirect.
    } catch (error) {
       console.error("Google Sign-Up Error:", error);
       toast({
        title: 'Google Sign-Up Error',
        description: 'Could not sign up with Google. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-var(--header-height,100px)-var(--footer-height,100px))]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Your Profile</CardTitle>
          <CardDescription>Apply for permits and manage your applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSignUp} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input id="applicantName" name="applicantName" placeholder="Enter your full name" required value={formData.applicantName} onChange={handleInputChange} />
              {errors.applicantName && <p className="text-destructive text-xs mt-1">{errors.applicantName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleInputChange} />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="e.g., +2348012345678" required value={formData.phone} onChange={handleInputChange} />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a strong password (min. 6 characters)" required value={formData.password} onChange={handleInputChange} />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>
            
            {errors.general && <p className="text-destructive text-xs mt-1 text-center">{errors.general}</p>}
            
            <SubmitButton isSubmitting={isSubmitting} />
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
            onClick={handleGoogleSignUp}
          >
            <FcGoogle className="text-2xl" />
            <span>Sign Up with Google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
