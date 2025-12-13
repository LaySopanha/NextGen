import { useState } from 'react';
import {
    MessageCircle,
    Send,
    Mail,
    Phone,
    HelpCircle,
    FileText,
    CheckCircle2,
    Search,
    ChevronRight,
    MessageSquare,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Support = () => {
    const [ticketSubmitted, setTicketSubmitted] = useState(false);

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        setTicketSubmitted(true);
        // Simulate API call
        setTimeout(() => setTicketSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <Header />

            {/* Hero Section */}
            <div className="bg-primary text-white pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">How can we help you today?</h1>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Search for answers, browse help topics, or contact our support team directly.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg text-lg"
                            placeholder="Type your question here... (e.g. 'refund policy', 'change booking')"
                        />
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full space-y-16">

                {/* Quick Contact Channels */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Live Chat */}
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-blue-100 group">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-600 transition-colors">
                                    <MessageCircle className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <CardTitle className="text-lg">Live Chat</CardTitle>
                                <CardDescription>Instant help from our agents</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-3">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Available Now
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Chat</Button>
                            </CardContent>
                        </Card>

                        {/* Telegram */}
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-blue-100 group">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-sky-500 transition-colors">
                                    <Send className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                                </div>
                                <CardTitle className="text-lg">Telegram</CardTitle>
                                <CardDescription>Chat via Telegram App</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Replies in ~5 mins
                                </div>
                                <Button variant="outline" className="w-full border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700">
                                    Open Telegram
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Email */}
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-blue-100 group">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-indigo-600 transition-colors">
                                    <Mail className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <CardTitle className="text-lg">Email Support</CardTitle>
                                <CardDescription>Detailed inquiries</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Replies in ~24 hrs
                                </div>
                                <Button variant="outline" className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                                    support@nextgen.com
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Phone */}
                        <Card className="hover:shadow-lg transition-all cursor-pointer border-blue-100 group">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-600 transition-colors">
                                    <Phone className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                                </div>
                                <CardTitle className="text-lg">Phone Call</CardTitle>
                                <CardDescription>Urgent matters</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground mb-4">
                                    Mon-Fri, 9am - 6pm EST
                                </div>
                                <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700">
                                    +855 12 345 678
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            <AccordionItem value="item-1" className="border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-all">
                                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">How do I cancel my booking?</AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-4">
                                    You can cancel your booking by going to "My Trips" in your account dashboard. Select the booking you wish to cancel and click the "Cancel Booking" button. Please reviewed the cancellation policy of your specific hotel as fees may apply.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-all">
                                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">When will I get my refund?</AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-4">
                                    Refunds are typically processed within 3-5 business days depending on your bank. If you cancelled a "Free Cancellation" booking before the deadline, you will receive a 100% refund.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-all">
                                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">Can I change my dates?</AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-4">
                                    Date changes depend on hotel availability and policy. Go to "My Trips" and select "Change Dates". If new dates are more expensive, you will need to pay the difference.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-all">
                                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">Do you accept payment on arrival?</AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-4">
                                    Yes, many of our properties allow "Pay at Hotel". Look for the "No Prepayment Needed" tag when searching for hotels. However, a credit card may be required to secure the reservation.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-all">
                                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold">Is my payment secure?</AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-4">
                                    Absolutely. We use industry-standard SSL encryption and PCI-DSS compliant payment gateways. We never store your full credit card details on our servers.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className="mt-6 text-center">
                            <Button variant="link" className="text-primary">View all FAQs <ChevronRight className="w-4 h-4 ml-1" /></Button>
                        </div>
                    </div>

                    {/* Ticketing System Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <FileText className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-bold text-gray-900">Submit a Ticket</h2>
                            </div>

                            {ticketSubmitted ? (
                                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted!</h3>
                                    <p className="text-gray-500 mb-6">
                                        We've received your request and will get back to you shortly via email.
                                    </p>
                                    <Button onClick={() => setTicketSubmitted(false)} variant="outline">Submit Another</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitTicket} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Issue Type</label>
                                        <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                            <option>Booking Issue</option>
                                            <option>Refund Request</option>
                                            <option>Technical Problem</option>
                                            <option>Complaint</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Booking ID (Optional)</label>
                                        <Input placeholder="e.g. B-123456" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Subject</label>
                                        <Input placeholder="Brief summary of the issue" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Description</label>
                                        <Textarea
                                            placeholder="Please describe your issue in detail..."
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-primary font-bold py-6">
                                        Submit Ticket
                                    </Button>

                                    <p className="text-xs text-center text-gray-400 mt-4">
                                        By submitting this form, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Support;
