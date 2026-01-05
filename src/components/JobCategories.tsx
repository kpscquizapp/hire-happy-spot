
import React from 'react';
import { Code, Headphones, Building2, TrendingUp, Heart, Palette, Database, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  jobCount: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'IT & Software',
    icon: <Code className="h-6 w-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    jobCount: '12,450'
  },
  {
    id: 2,
    name: 'BPO / KPO',
    icon: <Headphones className="h-6 w-6" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    jobCount: '8,230'
  },
  {
    id: 3,
    name: 'Banking & Finance',
    icon: <Building2 className="h-6 w-6" />,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    jobCount: '5,680'
  },
  {
    id: 4,
    name: 'Sales & Marketing',
    icon: <TrendingUp className="h-6 w-6" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    jobCount: '9,340'
  },
  {
    id: 5,
    name: 'Healthcare',
    icon: <Heart className="h-6 w-6" />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    jobCount: '4,120'
  },
  {
    id: 6,
    name: 'Design & Creative',
    icon: <Palette className="h-6 w-6" />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    jobCount: '3,890'
  },
  {
    id: 7,
    name: 'Data & Analytics',
    icon: <Database className="h-6 w-6" />,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    jobCount: '6,540'
  },
  {
    id: 8,
    name: 'Education',
    icon: <GraduationCap className="h-6 w-6" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    jobCount: '2,760'
  }
];

const JobCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Jobs by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore opportunities across diverse industries and roles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/jobs?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group fade-in-section"
            >
              <div className={`w-12 h-12 ${category.iconBg} ${category.iconColor} flex items-center justify-center rounded-xl mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{category.jobCount} jobs</p>
              <span className="text-primary text-sm font-medium inline-flex items-center group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
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
