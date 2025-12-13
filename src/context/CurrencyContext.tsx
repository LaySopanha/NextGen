import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'KHR';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    exchangeRate: number;
    formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [exchangeRate, setExchangeRate] = useState(4100); // Default fallback

    // Simulate "Automatic Exchange Rate Update"
    useEffect(() => {
        // In a real app, this would fetch from an API
        const fetchRate = () => {
            // Mocking a live rate that fluctuates slightly to look "automatic"
            const baseRate = 4100;
            const fluctuation = Math.floor(Math.random() * 20) - 10;
            setExchangeRate(baseRate + fluctuation);
        };

        fetchRate();
        const interval = setInterval(fetchRate, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (priceInUSD: number) => {
        if (currency === 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(priceInUSD);
        } else {
            // Round to nearest 100 for cleaner KHR prices
            const converted = Math.ceil((priceInUSD * exchangeRate) / 100) * 100;
            return new Intl.NumberFormat('km-KH', {
                style: 'currency',
                currency: 'KHR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(converted);
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
    return context;
};
