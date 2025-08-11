
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
} from 'recharts';

const overviewCards = [
  { title: "Total Applications", value: "1,250", icon: FileText },
  { title: "Pending Applications", value: "75", icon: Clock },
  { title: "Approved Applications", value: "980", icon: CheckCircle2 },
  { title: "Registered Users", value: "2,400", icon: Users },
];

const applicationData = [
  { name: 'Building', pending: 40, approved: 240, rejected: 30 },
  { name: 'Temporary', pending: 25, approved: 510, rejected: 50 },
  { name: 'Mast', pending: 5, approved: 120, rejected: 10 },
  { name: 'Street Naming', pending: 5, approved: 110, rejected: 5 },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and statistics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map(card => (
          <Card key={card.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-primary" />
            Application Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" stackId="a" fill="hsl(var(--primary))" name="Approved" />
                <Bar dataKey="pending" stackId="a" fill="hsl(var(--accent))" name="Pending" />
                <Bar dataKey="rejected" stackId="a" fill="hsl(var(--destructive))" name="Rejected" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
