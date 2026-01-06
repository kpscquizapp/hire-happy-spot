import React from 'react';
import { Code, Headphones, Building2, TrendingUp, Heart, Palette, Database, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: number;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  jobCount: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'IT & Software',
    subtitle: 'Development, Testing, DevOps',
    icon: <Code className="h-5 w-5" />,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    jobCount: '12,450'
  },
  {
    id: 2,
    name: 'BPO / KPO',
    subtitle: 'Customer Service, Support',
    icon: <Headphones className="h-5 w-5" />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    jobCount: '8,230'
  },
  {
    id: 3,
    name: 'Banking & Finance',
    subtitle: 'Accounting, Investment',
    icon: <Building2 className="h-5 w-5" />,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    jobCount: '5,890'
  },
  {
    id: 4,
    name: 'Sales & Marketing',
    subtitle: 'Digital Marketing, Brand Dev',
    icon: <TrendingUp className="h-5 w-5" />,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    jobCount: '9,340'
  },
  {
    id: 5,
    name: 'Healthcare',
    subtitle: 'Medical, Pharma, Nursing',
    icon: <Heart className="h-5 w-5" />,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-500',
    jobCount: '4,120'
  },
  {
    id: 6,
    name: 'Design & Creative',
    subtitle: 'UI/UX, Graphic Design',
    icon: <Palette className="h-5 w-5" />,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    jobCount: '3,670'
  },
  {
    id: 7,
    name: 'Data & Analytics',
    subtitle: 'Data Science, ML, AI',
    icon: <Database className="h-5 w-5" />,
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    jobCount: '6,780'
  },
  {
    id: 8,
    name: 'HR & Recruitment',
    subtitle: 'Talent Acquisition, Training',
    icon: <Users className="h-5 w-5" />,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    jobCount: '2,340'
  }
];

const JobCategories = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Jobs by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore opportunities across diverse industries and roles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/jobs?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="bg-card border border-border/40 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${category.iconBg} ${category.iconColor} flex items-center justify-center rounded-xl mb-5`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.subtitle}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-primary">{category.jobCount}</span>
                <span className="text-sm text-muted-foreground">jobs</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-6 border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
