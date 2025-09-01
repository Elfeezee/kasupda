
"use client";

import React, { useEffect } from 'react';
import { useFormStatus, useActionState } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { loginWithEmail, type AuthState } from '@/app/actions/authActions';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={pending}>
      {pending ? 'Logging in...' : 'Login to Admin Panel'}
    </Button>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // We specify the redirectTo path for the login action
  const loginAction = loginWithEmail.bind(null, { redirectTo: '/admin/dashboard' });
  const initialState: AuthState = { message: null, success: false, errors: null };
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    // This effect handles the result of the form submission
    if (state.success && state.redirectTo) {
      toast({
        title: 'Admin Login Successful!',
        description: 'Redirecting to the admin dashboard...',
      });
      router.push(state.redirectTo);
    } else if (!state.success && state.message) {
      toast({
        title: 'Login Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, router, toast]);

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
          <form action={formAction} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="admin@kasupda.gov.ng" required />
              {state.errors?.email && <p className="text-destructive text-xs mt-1">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
              {state.errors?.password && <p className="text-destructive text-xs mt-1">{state.errors.password[0]}</p>}
            </div>
            
            <SubmitButton />
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
