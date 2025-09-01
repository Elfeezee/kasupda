
"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { loginWithEmail, type AuthState } from '@/app/actions/authActions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full text-lg py-3" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Bind the action with a null options object for default redirect behavior
  const loginAction = loginWithEmail.bind(null, {});
  const initialState: AuthState = { message: null, success: false, errors: null };
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.success && state.redirectTo) {
      toast({
        title: 'Login Successful!',
        description: 'Redirecting to your dashboard...',
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
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-var(--header-height,100px)-var(--footer-height,100px))]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your KASUPDA dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
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

          <div className="flex items-center justify-center space-x-4 my-8">
            <Separator className="flex-grow" />
            <span className="text-xs text-muted-foreground uppercase">OR</span>
            <Separator className="flex-grow" />
          </div>
          
          <Button 
            className="w-full flex items-center justify-center space-x-2 py-3 text-base" 
            variant="outline" 
            type="button" 
            onClick={() => { 
                toast({
                    title: 'Google Sign-In',
                    description: 'Google Sign-In is not implemented in this prototype.',
                });
             }}
          >
            <FcGoogle className="text-2xl" />
            <span>Login with Google</span>
          </Button>
        </CardContent>
        <CardFooter className="justify-center mt-2 pb-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/apply-for-permit" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
