import { ShieldCheck, Headset, CreditCard, Award } from 'lucide-react';

const benefits = [
    {
        icon: ShieldCheck,
        title: "Secure Booking",
        description: "Your data is protected with the highest security standards."
    },
    {
        icon: Headset,
        title: "24/7 Support",
        description: "Our team is here to help you anytime, anywhere."
    },
    {
        icon: CreditCard,
        title: "Best Price Guarantee",
        description: "Find a lower price? We'll match it."
    },
    {
        icon: Award,
        title: "Handpicked Hotels",
        description: "We verify every hotel to ensure quality service."
    }
];

const TrustSection = () => {
    return (
        <section className="py-12 bg-slate-50 border-y border-border/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Why Book With NextGen?</h2>
                    <p className="text-muted-foreground">We are dedicated to making your travel experience seamless.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-primary">
                                <benefit.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
