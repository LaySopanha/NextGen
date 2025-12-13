import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const HotelStickyNav = () => {
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const past = window.scrollY > 140;
            setShowNav(prev => (prev !== past ? past : prev));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'rooms', label: 'Rooms' },
        { id: 'amenities', label: 'Amenities' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'policies', label: 'Policies' },
    ];

    return (
        <div className={`fixed left-0 right-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-transform duration-200 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.id}
                            spy={true}
                            smooth={true}
                            offset={-110}
                            duration={400}
                            className="py-3 text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer border-b-2 border-transparent hover:border-primary transition-colors whitespace-nowrap"
                            activeClass="text-primary border-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelStickyNav;
