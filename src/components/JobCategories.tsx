
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
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    jobCount: '12,450'
  },
  {
    id: 2,
    name: 'BPO / KPO',
    subtitle: 'Customer Service, Support',
    icon: <Headphones className="h-5 w-5" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    jobCount: '8,230'
  },
  {
    id: 3,
    name: 'Banking & Finance',
    subtitle: 'Accounting, Investment',
    icon: <Building2 className="h-5 w-5" />,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    jobCount: '5,890'
  },
  {
    id: 4,
    name: 'Sales & Marketing',
    subtitle: 'Digital Marketing, Brand Dev',
    icon: <TrendingUp className="h-5 w-5" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    jobCount: '9,340'
  },
  {
    id: 5,
    name: 'Healthcare',
    subtitle: 'Medical, Pharma, Nursing',
    icon: <Heart className="h-5 w-5" />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    jobCount: '4,120'
  },
  {
    id: 6,
    name: 'Design & Creative',
    subtitle: 'UI/UX, Graphic Design',
    icon: <Palette className="h-5 w-5" />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    jobCount: '3,670'
  },
  {
    id: 7,
    name: 'Data & Analytics',
    subtitle: 'Data Science, ML, AI',
    icon: <Database className="h-5 w-5" />,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    jobCount: '6,780'
  },
  {
    id: 8,
    name: 'HR & Recruitment',
    subtitle: 'Talent Acquisition, Training',
    icon: <Users className="h-5 w-5" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    jobCount: '2,340'
  }
];

const JobCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Browse Jobs by Category
          </h2>
          <p className="text-muted-foreground">
            Explore opportunities across diverse industries and roles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/jobs?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className={`w-11 h-11 ${category.iconBg} ${category.iconColor} flex items-center justify-center rounded-xl mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-0.5">{category.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{category.subtitle}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">{category.jobCount}</span>
                <span className="text-xs text-muted-foreground">jobs</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="rounded-full px-8 py-5 border-primary/30 text-primary hover:bg-primary/5">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
