
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { toast } = useToast();

    const handleActionClick = (actionName: string) => {
        toast({
            title: "Feature In Development",
            description: `${actionName} functionality is not yet implemented.`,
        });
    };
    
    // Placeholder data
    const userProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+234 801 234 5678",
        din: "KASUPDA-ABC12345",
        address: "No. 123, Ahmadu Bello Way, Kaduna"
    };

    return (
        <div className="space-y-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
                <UserCircle2 className="mr-3 h-7 w-7" /> My Profile
                </CardTitle>
                <CardDescription>
                View and manage your personal information and account settings.
                </CardDescription>
            </CardHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>This information is used for all your applications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-muted-foreground">Full Name</span>
                        <p className="font-medium">{userProfile.name}</p>
                    </div>
                     <div className="flex flex-col space-y-1">
                        <span className="text-sm text-muted-foreground">Developer Identification Number (DIN)</span>
                        <p className="font-medium">{userProfile.din}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-muted-foreground">Email Address</span>
                        <p className="font-medium">{userProfile.email}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-muted-foreground">Phone Number</span>
                        <p className="font-medium">{userProfile.phone}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-muted-foreground">Registered Address</span>
                        <p className="font-medium">{userProfile.address}</p>
                    </div>
                    <div className="pt-4 flex flex-col sm:flex-row gap-2">
                        <Button onClick={() => handleActionClick("Edit Profile")}>Edit Profile</Button>
                        <Button variant="outline" onClick={() => handleActionClick("Change Password")}>Change Password</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
