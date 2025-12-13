import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-1/2 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-white/90">Keep exploring</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Get Special Offers & Travel Inspiration</h2>
                        <p className="text-white/80 text-lg">Subscribe to our newsletter and save up to 50% on your next trip.</p>
                    </div>

                    <div className="md:w-1/2 w-full max-w-md">
                        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 rounded-xl focus-visible:ring-offset-0 focus-visible:ring-white/30"
                            />
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold h-12 rounded-xl">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-white/60 text-xs mt-3 ml-1">
                            By subscribing, you agree to our Terms & Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
