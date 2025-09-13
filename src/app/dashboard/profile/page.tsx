
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, query, collection, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [profileData, setProfileData] = useState({ name: '', email: '', phone: '', din: 'Not available', address: 'Not available' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(true);
                
                // Base profile from Auth
                let profile = {
                    name: currentUser.displayName || 'N/A',
                    email: currentUser.email || 'N/A',
                    phone: currentUser.phoneNumber || 'N/A',
                    din: 'Not available',
                    address: 'Not available'
                };

                try {
                    // Query for DIN application to get DIN
                    const dinQuery = query(
                        collection(db, "applications"),
                        where("userId", "==", currentUser.uid),
                        where("type", "==", "DIN Application"),
                        orderBy("date", "desc"),
                        limit(1)
                    );
                    const dinSnapshot = await getDocs(dinQuery);
                    if (!dinSnapshot.empty) {
                        const dinApp = dinSnapshot.docs[0];
                        const uniquePart = dinApp.id.substring(0, 8).toUpperCase();
                        profile.din = `KASUPDA-${uniquePart}`;
                    }

                    // Query for the latest application to get address
                     const latestAppQuery = query(
                        collection(db, "applications"),
                        where("userId", "==", currentUser.uid),
                        orderBy("date", "desc"),
                        limit(1)
                    );
                    const latestAppSnapshot = await getDocs(latestAppQuery);
                     if (!latestAppSnapshot.empty) {
                        const appData = latestAppSnapshot.docs[0].data().data; // Get the nested data object
                        if(appData.appStreetName && appData.appCityTown) {
                           profile.address = `${appData.appHouseNo || ''} ${appData.appStreetName}, ${appData.appDistrict || ''}, ${appData.appCityTown}, ${appData.appState}`.replace(/ ,/g,',').replace(/ +/g,' ').trim();
                        } else if(appData.siteStreetName && appData.siteCityTown) {
                             profile.address = `${appData.siteStreetName}, ${appData.siteCityTown}, ${appData.siteLGA}`.trim();
                        }
                    }

                } catch (error) {
                    console.error("Error fetching profile details from Firestore:", error);
                    toast({
                        title: "Error",
                        description: "Could not fetch detailed profile information.",
                        variant: "destructive"
                    });
                }
                
                setProfileData(profile);
                setLoading(false);

            } else {
                // Handle not logged in
                setUser(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [toast]);

    const handleActionClick = (actionName: string) => {
        toast({
            title: "Feature In Development",
            description: `${actionName} functionality is not yet implemented.`,
        });
    };
    
    const ProfileItem = ({ label, value, isLoading }: { label: string; value: string; isLoading: boolean }) => (
         <div className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">{label}</span>
            {isLoading ? <Skeleton className="h-5 w-48" /> : <p className="font-medium">{value || 'N/A'}</p>}
        </div>
    );

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
                    <ProfileItem label="Full Name" value={profileData.name} isLoading={loading} />
                    <ProfileItem label="Developer Identification Number (DIN)" value={profileData.din} isLoading={loading} />
                    <ProfileItem label="Email Address" value={profileData.email} isLoading={loading} />
                    <ProfileItem label="Phone Number" value={profileData.phone} isLoading={loading} />
                    <ProfileItem label="Registered Address" value={profileData.address} isLoading={loading} />
                    
                    <div className="pt-4 flex flex-col sm:flex-row gap-2">
                        <Button onClick={() => handleActionClick("Edit Profile")} disabled={loading}>Edit Profile</Button>
                        <Button variant="outline" onClick={() => handleActionClick("Change Password")} disabled={loading}>Change Password</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
