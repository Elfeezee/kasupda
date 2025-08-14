
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
import { format } from 'date-fns';
import { getApplications, type StoredApplication } from '@/lib/application-store';

// Define a user structure based on application data
interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'Applicant' | 'Admin'; // Simple roles for now
  joined: string; // Date of first application
  applicationCount: number;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AppUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Derive user list from applications in local storage
    const applications = getApplications();
    const userMap = new Map<string, AppUser>();

    applications.forEach(app => {
      const applicantEmail = app.data.email || `${app.applicantName.replace(/\s+/g, '.').toLowerCase()}@example.com`; // Fallback email
      
      if (userMap.has(applicantEmail)) {
        const existingUser = userMap.get(applicantEmail)!;
        existingUser.applicationCount += 1;
        // Keep the earliest application date as the join date
        if (new Date(app.date) < new Date(existingUser.joined)) {
          existingUser.joined = app.date;
        }
      } else {
        userMap.set(applicantEmail, {
          id: `USR-${userMap.size + 1}`,
          name: app.applicantName,
          email: applicantEmail,
          role: 'Applicant',
          joined: app.date,
          applicationCount: 1,
        });
      }
    });

    const derivedUsers = Array.from(userMap.values()).sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
    setUsers(derivedUsers);
    setFilteredUsers(derivedUsers);
  }, []);

  useEffect(() => {
    let result = users;
    if (searchTerm) {
      result = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, users]);


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
                {filteredUsers.length > 0 ? (
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
                        <TableCell>{format(new Date(user.joined), 'dd/MM/yyyy')}</TableCell>
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
