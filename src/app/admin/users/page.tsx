
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Search, UserPlus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { format, parseISO } from 'date-fns';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { StoredApplication } from '../applications/page';


// Define a user structure based on application data
interface AppUser {
  id: string; // Using userId as the unique ID
  name: string;
  email: string;
  role: 'Applicant' | 'Admin'; // Simple roles for now
  joined: string; // Date of first application
  applicationCount: number;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const deriveUsersFromApplications = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "applications"), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);
        const applications = querySnapshot.docs.map(doc => doc.data() as Omit<StoredApplication, 'id'>);

        const userMap = new Map<string, AppUser>();

        applications.forEach(app => {
          // A user is uniquely identified by their userId
          const userId = app.userId;
          if (!userId) return; // Skip if no user ID

          if (userMap.has(userId)) {
            const existingUser = userMap.get(userId)!;
            existingUser.applicationCount += 1;
            // No need to update join date since we are ordering by asc date
          } else {
            userMap.set(userId, {
              id: userId,
              name: app.applicantName,
              // Attempt to get email from data, otherwise create a placeholder
              email: app.data.email || app.data.orgEmail || `user-${userId.substring(0,5)}@kasupda.gov.ng`,
              role: 'Applicant',
              joined: app.date,
              applicationCount: 1,
            });
          }
        });

        const derivedUsers = Array.from(userMap.values()).sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
        setUsers(derivedUsers);
      } catch (error) {
          console.error("Failed to derive users from Firestore:", error);
      } finally {
          setLoading(false);
      }
    };
    
    deriveUsersFromApplications();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>View, search, and manage user accounts derived from applications.</CardDescription>
            </div>
            <Button className="gap-2" disabled>
              <UserPlus className="h-4 w-4" /> Add New User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Apps</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                            Loading user data from database...
                        </TableCell>
                    </TableRow>
                ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40.png?text=${user.name.charAt(0)}`} alt={user.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                        </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.joined ? format(parseISO(user.joined), 'dd/MM/yyyy') : 'N/A'}</TableCell>
                        <TableCell>{user.applicationCount}</TableCell>
                        <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem disabled>Edit User</DropdownMenuItem>
                            <DropdownMenuItem disabled>View Applications</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" disabled>Delete User</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                     <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                            No users found. Submit an application to see users here.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
