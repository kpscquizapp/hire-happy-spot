import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EmployerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'employer') {
      navigate('/find-talent');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(email, password, 'employer');
        if (success) {
          toast.success('Welcome back!');
          navigate('/find-talent');
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        const success = await signup(email, password, name, 'employer');
        if (success) {
          toast.success('Account created successfully!');
          navigate('/find-talent');
        } else {
          toast.error('Email already registered');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto w-full">
            <Card className="border-blue-100 shadow-2xl">
              <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg p-4 sm:p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  {isLogin ? 'Employer Login' : 'Employer Sign Up'}
                </CardTitle>
                <CardDescription className="text-blue-50 text-sm sm:text-base">
                  {isLogin ? 'Access your employer dashboard and manage your hiring' : 'Create an account to start hiring top talent'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your Company"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Company Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="company@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <Link to="/forgot-password" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-5 sm:py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : isLogin ? 'Sign In to Dashboard' : 'Create Account'}
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Candidate Login Link */}
            <div className="mt-6 text-center">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="py-4">
                  <p className="text-sm text-neutral-600 mb-2">
                    Looking for a job?
                  </p>
                  <Link 
                    to="/candidate-login" 
                    className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2"
                  >
                    Candidate Login →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmployerLogin;
