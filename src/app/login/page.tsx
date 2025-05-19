
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"; // Import useToast

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;
    const email = emailInput ? emailInput.value.trim() : '';
    
    if (email) {
      toast({ // Add toast message
        title: 'Login Successful (Simulated)',
        description: 'Redirecting to your dashboard...',
      });
      router.push(`/dashboard?name=${encodeURIComponent(email.split('@')[0] || 'User')}`);
    } else {
      toast({ // Add toast for missing email
        title: 'Login Error',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      console.warn("Email not entered for login.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-var(--header-height,100px)-var(--footer-height,100px))]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your KASUPDA dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full text-lg py-3">
              Login
            </Button>
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
