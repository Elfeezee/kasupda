
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle2, XCircle, BarChart as BarChartIcon } from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from 'recharts';
import { db } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import type { StoredApplication } from '../applications/page'; // Import the type from the applications page

// This function processes applications to get statistics
const processApplicationData = (applications: StoredApplication[]) => {
  const stats = {
    total: applications.length,
    pending: 0,
    approved: 0,
    rejected: 0,
    byType: {} as Record<string, { pending: number; approved: number; rejected: number; total: number }>,
  };

  applications.forEach(app => {
    // Overall status counts
    if (app.status === 'Approved') stats.approved++;
    else if (app.status === 'Rejected') stats.rejected++;
    else stats.pending++; // Includes 'Pending' and 'Processing'

    // Group by type for the chart
    const simpleType = app.type.split('(')[0].trim(); // e.g., "Building Permit (Individual)" -> "Building Permit"
    if (!stats.byType[simpleType]) {
      stats.byType[simpleType] = { pending: 0, approved: 0, rejected: 0, total: 0 };
    }
    stats.byType[simpleType].total++;
    if (app.status === 'Approved') stats.byType[simpleType].approved++;
    else if (app.status === 'Rejected') stats.byType[simpleType].rejected++;
    else stats.byType[simpleType].pending++;
  });
  
  return {
      overview: [
        { title: "Total Applications", value: stats.total.toString(), icon: FileText },
        { title: "Pending Applications", value: stats.pending.toString(), icon: Clock },
        { title: "Approved Applications", value: stats.approved.toString(), icon: CheckCircle2 },
        { title: "Rejected Applications", value: stats.rejected.toString(), icon: XCircle },
      ],
      chartData: Object.entries(stats.byType).map(([name, data]) => ({
          name: name.replace(' Permit', ''), // Shorten label for chart
          approved: data.approved,
          pending: data.pending,
          rejected: data.rejected
      }))
  };
};


export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = React.useState<{ overview: any[], chartData: any[] }>({ overview: [], chartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StoredApplication));
            const processedData = processApplicationData(apps);
            setDashboardData(processedData);
        } catch (error) {
            console.error("Failed to fetch applications for dashboard:", error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchApplications();
  }, []);
  
  const overviewCards = loading ? [
      { title: "Total Applications", value: "...", icon: FileText },
      { title: "Pending Applications", value: "...", icon: Clock },
      { title: "Approved Applications", value: "...", icon: CheckCircle2 },
      { title: "Rejected Applications", value: "...", icon: XCircle },
  ] : dashboardData.overview;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and statistics from the database.</p>
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
            <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
            Application Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
             {loading ? (
                 <div className="flex items-center justify-center h-full text-muted-foreground">
                    Loading chart data...
                </div>
             ) : dashboardData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" stackId="a" fill="hsl(var(--primary))" name="Approved" />
                    <Bar dataKey="pending" stackId="a" fill="hsl(var(--accent))" name="Pending" />
                    <Bar dataKey="rejected" stackId="a" fill="hsl(var(--destructive))" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    No application data to display.
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
