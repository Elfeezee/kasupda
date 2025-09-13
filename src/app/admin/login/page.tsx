
"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={isSubmitting}>
      {isSubmitting ? 'Logging in...' : 'Login to Admin Panel'}
    </Button>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to the admin dashboard.
        router.push('/admin/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: 'Admin Login Successful!',
        description: 'Redirecting to the admin dashboard...',
      });
      // The onAuthStateChanged listener will handle the redirect.
    } catch (err: any) {
      let errorMessage = "An unknown error occurred.";
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Please enter a valid email address.";
          break;
        default:
          errorMessage = "Failed to log in. Please try again later.";
          console.error("Admin Login Error:", err);
          break;
      }
      setError(errorMessage);
      toast({
        title: 'Login Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/40 min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Image src="/image/logo.png" alt="KASUPDA Logo" width={48} height={48} />
            </div>
          <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <ShieldCheck className="h-8 w-8" />
            Admin Portal
          </CardTitle>
          <CardDescription>Enter your credentials to access the management dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="admin@kasupda.gov.ng" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            {error && <p className="text-destructive text-xs mt-1 text-center">{error}</p>}
            
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
          
          <div className="text-center mt-6 text-sm">
            <Link href="#" className="text-primary hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="justify-center mt-2 pb-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            &larr; Back to Main Site
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
