import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Building2, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Marketplace = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,179,176,0.1),transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4">
                <span className="bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full">
                  B2B Talent Exchange
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Bench Talent Marketplace
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect companies with bench employees to companies with short-term project needs. 
                Reduce idle costs and meet urgent demands quickly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/list-bench-talent')}>
                  <Building2 className="mr-2 h-5 w-5" />
                  List Bench Talent
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/find-talent')}>
                  <Search className="mr-2 h-5 w-5" />
                  Find Talent
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A streamlined B2B platform for talent exchange
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">List Your Bench</h3>
                <p className="text-muted-foreground">
                  Companies post available bench employees with skills, experience, and rates
                </p>
              </div>
              
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Matching</h3>
                <p className="text-muted-foreground">
                  Smart algorithms match talent with project requirements instantly
                </p>
              </div>
              
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Contract & Deploy</h3>
                <p className="text-muted-foreground">
                  Streamlined contracting, onboarding, and project management
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join the marketplace and optimize your talent resources today
            </p>
            <Button size="lg" variant="secondary">
              Create Company Account
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
