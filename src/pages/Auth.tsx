import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Chrome, Mail } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Auth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showResend, setShowResend] = useState(false);
  const { user, signInWithGoogle, signInWithPhone, verifyOtp, signUpWithEmail, signInWithEmail, resendConfirmation } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signInWithPhone(phone);
    if (!error) {
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await verifyOtp(phone, otp);
    setLoading(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = emailSchema.safeParse({ email, password });
    
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    if (isSignUp) {
      const result = await signUpWithEmail(email, password);
      if (result?.needsConfirmation) {
        setShowResend(true);
      }
    } else {
      await signInWithEmail(email, password);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">Welcome to Alvaio</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="google">
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Phone className="mr-2 h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            {/* Email/Password Tab */}
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading} size="lg">
                  {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Sign Up' : 'Sign In')}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setShowResend(false);
                  }}
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
                {showResend && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      setLoading(true);
                      await resendConfirmation(email);
                      setLoading(false);
                    }}
                    disabled={loading || !email}
                  >
                    Resend Confirmation Email
                  </Button>
                )}
                {isSignUp && (
                  <p className="text-xs text-muted-foreground text-center">
                    Note: Check spam folder if you don't receive the confirmation email
                  </p>
                )}
              </form>
            </TabsContent>

            {/* Google Tab */}
            <TabsContent value="google">
              <Button
                onClick={signInWithGoogle}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </TabsContent>

            {/* Phone Tab */}
            <TabsContent value="phone" className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 7011441159"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter your phone number with country code (e.g., +91)
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading} size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      disabled={loading}
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the verification code sent to {phone}
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading} size="lg">
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                    }}
                  >
                    Use a different phone number
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
