import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Github, Mail, Smartphone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Flow States
    const [view, setView] = useState<'login' | 'otp' | 'forgot-password' | 'reset-sent'>('login');
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

    // Form Data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login('email', { email });
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: string) => {
        setIsLoading(true);
        await login(provider as any);
        navigate('/');
    };

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setIsLoading(false);
            setView('otp');
        }, 1500);
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        // Simulate verification
        setTimeout(async () => {
            await login('phone', { phone });
            navigate('/');
        }, 1500);
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setView('reset-sent');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <Header />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex max-w-5xl w-full min-h-[600px] animate-in fade-in zoom-in-95 duration-300">

                    {/* LEFT PANEL: Hero Image */}
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                            alt="Luxury Hotel"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex flex-col justify-between p-12 text-white">
                            <div>
                                <h2 className="text-4xl font-extrabold mb-4">Welcome to NextGen</h2>
                                <p className="text-lg text-blue-100">Unlock exclusive prices, earn coins, and travel smarter.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold">Best Price Guarantee</p>
                                        <p className="text-xs text-blue-200">Find a lower price? We'll match it.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold">NextGen Coins</p>
                                        <p className="text-xs text-blue-200">Earn up to 5% back on every booking.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Form */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">

                        {/* VIEW: LOGIN / REGISTER */}
                        {view === 'login' && (
                            <div className="max-w-md mx-auto w-full space-y-6">
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold text-gray-900">Get Started</h1>
                                    <p className="text-slate-500 mt-2">Sign in to your account</p>
                                </div>

                                <Tabs defaultValue="signin" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                                        <TabsTrigger value="signin" className="text-base">Sign In</TabsTrigger>
                                        <TabsTrigger value="register" className="text-base">Register</TabsTrigger>
                                    </TabsList>

                                    {/* SIGN IN TAB */}
                                    <TabsContent value="signin" className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                placeholder="m@example.com"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">Password</Label>
                                                <button
                                                    onClick={() => setView('forgot-password')}
                                                    className="text-xs text-primary font-bold hover:underline"
                                                >
                                                    Forgot Password?
                                                </button>
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <Button onClick={handleLogin} className="w-full bg-primary h-11 text-base" disabled={isLoading}>
                                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log In'}
                                        </Button>
                                    </TabsContent>

                                    {/* REGISTER TAB */}
                                    <TabsContent value="register" className="space-y-4">
                                        <div className="flex gap-2 mb-4">
                                            <Button
                                                variant={authMethod === 'email' ? 'default' : 'outline'}
                                                onClick={() => setAuthMethod('email')}
                                                className="flex-1"
                                                size="sm"
                                            >
                                                <Mail className="w-4 h-4 mr-2" /> Email
                                            </Button>
                                            <Button
                                                variant={authMethod === 'phone' ? 'default' : 'outline'}
                                                onClick={() => setAuthMethod('phone')}
                                                className="flex-1"
                                                size="sm"
                                            >
                                                <Smartphone className="w-4 h-4 mr-2" /> Phone
                                            </Button>
                                        </div>

                                        {authMethod === 'email' ? (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label>Full Name</Label>
                                                    <Input placeholder="John Doe" />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Email</Label>
                                                    <Input placeholder="m@example.com" type="email" />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Password</Label>
                                                    <Input type="password" />
                                                </div>
                                                <Button onClick={handleLogin} className="w-full h-11" disabled={isLoading}>Create Account</Button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label>Phone Number</Label>
                                                    <div className="flex">
                                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm">
                                                            +855
                                                        </span>
                                                        <Input
                                                            className="rounded-l-none"
                                                            placeholder="12 345 678"
                                                            value={phone}
                                                            onChange={e => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <Button onClick={handleSendOtp} className="w-full h-11" disabled={isLoading}>
                                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send OTP Code'}
                                                </Button>
                                            </>
                                        )}
                                    </TabsContent>
                                </Tabs>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" onClick={() => handleSocialLogin('google')} className="gap-2">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        Google
                                    </Button>
                                    <Button variant="outline" onClick={() => handleSocialLogin('facebook')} className="gap-2">
                                        <svg className="w-5 h-5 text-blue-600 fill-current" viewBox="0 0 24 24">
                                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.73 1.354-2.73 2.809v1.162h4.438l-.634 3.667h-3.804v7.98h-4.996z"></path>
                                        </svg>
                                        Facebook
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* VIEW: OTP VERIFICATION */}
                        {view === 'otp' && (
                            <div className="max-w-md mx-auto w-full space-y-6 text-center animate-in slide-in-from-right-8">
                                <Button variant="ghost" className="absolute top-8 left-8" onClick={() => setView('login')}>
                                    <ArrowRight className="w-4 h-4 rotate-180 mr-2" /> Back
                                </Button>
                                <div>
                                    <h2 className="text-2xl font-bold">Verification Code</h2>
                                    <p className="text-slate-500 mt-2">We sent a code to <span className="font-bold text-gray-900">+855 12 345 678</span></p>
                                </div>

                                <div className="flex justify-center gap-3">
                                    {[0, 1, 2, 3].map((i) => (
                                        <Input
                                            key={i}
                                            className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:border-primary"
                                            maxLength={1}
                                            value={otp[i]}
                                            onChange={(e) => {
                                                const newOtp = [...otp];
                                                newOtp[i] = e.target.value;
                                                setOtp(newOtp);
                                                // Auto focus next
                                                if (e.target.value && i < 3) {
                                                    const nextInput = document.querySelector(`input[name=otp-${i + 1}]`) as HTMLInputElement;
                                                    nextInput?.focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>

                                <Button onClick={handleVerifyOtp} className="w-full h-11" disabled={isLoading}>
                                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
                                </Button>
                                <p className="text-sm text-slate-500">Didn't receive the code? <button className="text-primary font-bold">Resend</button></p>
                            </div>
                        )}

                        {/* VIEW: FORGOT PASSWORD */}
                        {view === 'forgot-password' && (
                            <div className="max-w-md mx-auto w-full space-y-6 animate-in slide-in-from-right-8">
                                <Button variant="ghost" className="absolute top-8 left-8" onClick={() => setView('login')}>
                                    <ArrowRight className="w-4 h-4 rotate-180 mr-2" /> Back
                                </Button>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold">Reset Password</h2>
                                    <p className="text-slate-500 mt-2">Enter your email and we'll send you a reset link.</p>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Email Address</Label>
                                    <Input placeholder="m@example.com" type="email" />
                                </div>

                                <Button onClick={handleForgotPassword} className="w-full h-11" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                                </Button>
                            </div>
                        )}

                        {/* VIEW: RESET SENT */}
                        {view === 'reset-sent' && (
                            <div className="max-w-md mx-auto w-full space-y-6 text-center animate-in slide-in-from-right-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                    <Mail className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Check your email</h2>
                                    <p className="text-slate-500 mt-2">We've sent a password reset link to your email.</p>
                                </div>
                                <Button onClick={() => setView('login')} variant="outline" className="w-full h-11">
                                    Back to Login
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
