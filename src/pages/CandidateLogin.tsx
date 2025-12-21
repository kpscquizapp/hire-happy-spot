import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const CandidateLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [lookingForContract, setLookingForContract] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await login(email, password, 'candidate');
      if (success) {
        toast.success('Welcome back!');
        navigate('/job-recommendations');
      } else {
        toast.error('Invalid email or password');
      }
    } else {
      if (!name || !email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
      const success = await signup(email, password, name, 'candidate', lookingForContract);
      if (success) {
        toast.success('Account created successfully!');
        navigate('/job-recommendations');
      } else {
        toast.error('Email already exists');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-neutral-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:pt-32 sm:pb-20">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto w-full">
            <Card className="shadow-xl border-0 w-full">
              <CardHeader className="space-y-2 text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-t-lg p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-blue-50 text-sm sm:text-base">
                  {isLogin ? 'Sign in to continue your job search' : 'Join HIRION to find your dream job'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="contract" 
                        checked={lookingForContract}
                        onCheckedChange={(checked) => setLookingForContract(checked as boolean)}
                      />
                      <Label 
                        htmlFor="contract" 
                        className="text-sm font-normal cursor-pointer"
                      >
                        I'm looking for contract/temporary jobs
                      </Label>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex justify-end">
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">
                      {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CandidateLogin;
