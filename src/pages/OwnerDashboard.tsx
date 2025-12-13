import { useState } from 'react';
import {
    LayoutDashboard,
    Building2,
    CalendarCheck,
    Wallet,
    Settings,
    Plus,
    TrendingUp,
    Users,
    Star,
    MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const OwnerDashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
                        <p className="text-gray-500">Manage your properties and bookings</p>
                    </div>
                    <Button className="bg-primary hover:bg-blue-700 gap-2">
                        <Plus className="w-4 h-4" /> Add New Property
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,450</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+234</div>
                            <p className="text-xs text-muted-foreground">+180 new bookings</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">84%</div>
                            <p className="text-xs text-muted-foreground">+4% from last week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Guest Rating</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.8</div>
                            <p className="text-xs text-muted-foreground">Based on 124 reviews</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="properties">My Properties</TabsTrigger>
                        <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
                        <TabsTrigger value="finance">Finance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your property performance this week.</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                {/* Placeholder Chart Area */}
                                <div className="h-[200px] w-full bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200 text-slate-400 text-sm">
                                    Activity Chart Visualization
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="properties">
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Listings</CardTitle>
                                <CardDescription>Manage your property details, pricing, and availability.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {['Siem Reap Resort & Spa', 'Phnom Penh Boutique Hotel'].map((hotel, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-slate-200 rounded-md overflow-hidden">
                                                    <img src={`https://placehold.co/100x100?text=${i + 1}`} alt="Property" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{hotel}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                                                        <span>• ID: KH-00{i + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right hidden md:block">
                                                    <div className="font-bold text-gray-900">$12,400</div>
                                                    <div className="text-xs text-gray-500">Total Revenue</div>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <Settings className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default OwnerDashboard;
