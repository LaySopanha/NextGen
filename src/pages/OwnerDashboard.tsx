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
    ArrowUpRight,
    MapPin,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Chart
const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
];

const OwnerDashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50/50 font-sans">
            <Header />

            {/* Main Content - Added generous padding-top (pt-28) to clear fixed header safely */}
            <main className="container mx-auto px-4 py-8 pt-28">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Partner</h1>
                        <p className="text-slate-500 mt-1">Here's what's happening with your properties today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="bg-white hover:bg-slate-50">
                            Download Report
                        </Button>
                        <Button className="bg-primary hover:bg-blue-700 gap-2 shadow-sm">
                            <Plus className="w-4 h-4" /> List New Property
                        </Button>
                    </div>
                </div>

                {/* KPI Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <Wallet className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">$12,450.00</div>
                            <div className="flex items-center text-xs mt-1 text-green-600 bg-green-50 w-fit px-1.5 py-0.5 rounded font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +20.1% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Active Bookings</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                <CalendarCheck className="h-4 w-4 text-indigo-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">24</div>
                            <div className="flex items-center text-xs mt-1 text-slate-500">
                                <span className="text-indigo-600 font-medium mr-1">+3</span> new today
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Available Rooms</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-amber-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">12</div>
                            <div className="flex items-center text-xs mt-1 text-slate-500">
                                84% occupancy rate
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Guest Rating</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center">
                                <Star className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">4.8</div>
                            <div className="flex items-center text-xs mt-1 text-slate-500">
                                Based on 124 reviews
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TabsList className="bg-white border border-slate-200 p-1 h-auto rounded-lg">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-md px-4 py-2">
                                <LayoutDashboard className="w-4 h-4 mr-2" /> Overview
                            </TabsTrigger>
                            <TabsTrigger value="properties" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-md px-4 py-2">
                                <Building2 className="w-4 h-4 mr-2" /> My Properties
                            </TabsTrigger>
                            <TabsTrigger value="bookings" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 rounded-md px-4 py-2">
                                <Users className="w-4 h-4 mr-2" /> Bookings
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="overview" className="space-y-6">
                        {/* Chart Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="col-span-2 border-none shadow-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg text-slate-900">Revenue Overview</CardTitle>
                                            <CardDescription>Daily revenue performance for current week</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 text-xs">Last 7 Days</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data}>
                                                <defs>
                                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(value) => `$${value}`} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    itemStyle={{ color: '#1e293b' }}
                                                />
                                                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-1 border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-slate-900">Recent Activity</CardTitle>
                                    <CardDescription>Latest actions and updates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[9px] before:w-[2px] before:bg-slate-100">
                                        {[
                                            { title: 'New Booking #2451', desc: 'Siem Reap Resort • 2 mins ago', icon: CalendarCheck, color: 'text-blue-500' },
                                            { title: 'Payment Received', desc: '$450.00 from John Doe', icon: Wallet, color: 'text-green-500' },
                                            { title: 'New 5★ Review', desc: 'Great stay! Loved the pool.', icon: Star, color: 'text-yellow-500' },
                                            { title: 'Room Maintenance', desc: 'Room 304 marked as clean', icon: CheckCircle2, color: 'text-slate-400' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-3 relative">
                                                <div className={`mt-0.5 relative z-10 w-5 h-5 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center shrink-0`}>
                                                    <item.icon className={`w-3 h-3 ${item.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="w-full mt-6 text-xs font-medium text-slate-500 h-8">
                                        View All Activity
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="properties">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {['Siem Reap Resort & Spa', 'Phnom Penh Boutique Hotel'].map((hotel, i) => (
                                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
                                    <div className="relative h-48">
                                        <img src={`https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3">
                                            <Badge className="bg-white/90 text-slate-900 hover:bg-white shadow-sm backdrop-blur-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                                                Active
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{hotel}</h3>
                                                <div className="flex items-center text-xs text-slate-500">
                                                    <MapPin className="w-3 h-3 mr-1" /> Siem Reap, Cambodia
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 my-4 py-4 border-t border-b border-slate-50">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-0.5">Total Revenue</p>
                                                <p className="font-bold text-slate-900">$12,400</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-0.5">Occupancy</p>
                                                <p className="font-bold text-slate-900">85%</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button className="flex-1 bg-slate-900 hover:bg-slate-800 h-9">
                                                Manage
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9">
                                                <Settings className="w-4 h-4 text-slate-600" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Card */}
                            <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer group h-full min-h-[400px]">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Plus className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1">List New Property</h3>
                                <p className="text-sm text-slate-500 text-center max-w-[200px]">Start earning by listing your hotel or home on NextGen</p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default OwnerDashboard;
