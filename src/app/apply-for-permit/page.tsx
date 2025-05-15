
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

export default function ApplyForPermitPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem('applicantName') as HTMLInputElement | null;
    const name = nameInput ? nameInput.value.trim() : '';
    
    if (name) {
      // Navigate to dashboard, or handle submission
      // For now, we'll simulate going to a dashboard page
      window.location.href = `/dashboard?name=${encodeURIComponent(name)}`;
    } else {
      // Handle case where name is not entered, perhaps show an error
      console.warn("Applicant name not entered.");
      // You might want to show a toast or an inline error message here.
      // Example: alert("Please enter your name.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Apply for Permit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-gray-600">Create your profile to apply for permits and access your dashboard.</p>
          </div>
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input id="applicantName" name="applicantName" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input id="contactEmail" name="contactEmail" type="email" placeholder="Enter your email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input id="contactPhone" name="contactPhone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create a password" />
            </div>

            <Button type="submit" className="w-full whitespace-normal">Create Profile</Button>
            <div className="flex items-center justify-center space-x-4 my-6">
              <Separator className="flex-grow w-1/3" />
              <span className="text-xs text-gray-500 uppercase shrink-0">OR</span>
              <Separator className="flex-grow w-1/3" />
            </div>
          </form>
          {/* Google Sign-up button is placed below the form */}
          <Button 
            className="w-full flex items-center justify-center space-x-2 mt-4" 
            variant="outline" 
            type="button" // Ensure it doesn't submit the form
            onClick={() => { /* Handle Google Sign-up logic here */ console.log("Google Sign-up clicked");}}
          >
            <FcGoogle className="text-xl" />
            <span>Sign Up with Google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
