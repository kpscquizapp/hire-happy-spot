import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DesktopNavigationProps {
  isDark?: boolean;
}

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface NavItemWithDropdown {
  label: string;
  href: string;
  sections: DropdownSection[];
}

const DesktopNavigation = ({ isDark = false }: DesktopNavigationProps) => {
  const { translations } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItemWithDropdown[] = [
    {
      label: translations.candidates,
      href: '/jobs',
      sections: [
        {
          title: 'Job Search',
          items: [
            { label: 'Browse Jobs', href: '/jobs', description: 'Explore opportunities' },
            { label: 'Job Recommendations', href: '/job-recommendations', description: 'AI-powered matches' },
            { label: 'Saved Jobs', href: '/jobs?saved=true', description: 'Your bookmarked jobs' },
          ]
        },
        {
          title: 'Career Growth',
          items: [
            { label: 'Career Path Planner', href: '/career-path', description: 'Plan your journey' },
            { label: 'Skills Assessment', href: '/skills-assessment', description: 'Validate your skills' },
            { label: 'Learning Resources', href: '/resources', description: 'Upskill yourself' },
          ]
        }
      ]
    },
    {
      label: translations.talentMarketplace,
      href: '/marketplace',
      sections: [
        {
          title: 'Find Talent',
          items: [
            { label: 'Browse Talent', href: '/find-talent', description: 'Discover professionals' },
            { label: 'Talent Profiles', href: '/talent/1', description: 'View detailed profiles' },
            { label: 'AI Matching', href: '/find-talent?ai=true', description: 'Smart recommendations' },
          ]
        },
        {
          title: 'Register',
          items: [
            { label: 'List Your Talent', href: '/list-bench-talent', description: 'Add bench resources' },
            { label: 'Register as Talent', href: '/register-talent', description: 'Create your profile' },
          ]
        }
      ]
    },
    {
      label: translations.employers,
      href: '/employer',
      sections: [
        {
          title: 'Hiring',
          items: [
            { label: 'Post a Job', href: '/employer/post-job', description: 'Create job listings' },
            { label: 'Hire Full-Time', href: '/employer/hire-full-time', description: 'Permanent positions' },
            { label: 'Hire Interns', href: '/employer/hire-interns', description: 'Internship programs' },
            { label: 'Contract Hiring', href: '/employer/contract-hiring', description: 'Flexible contracts' },
          ]
        },
        {
          title: 'AI Tools',
          items: [
            { label: 'AI Screening', href: '/employer/ai-screening', description: 'Automated screening' },
            { label: 'AI Interviews', href: '/employer/ai-interviews', description: 'Virtual interviews' },
            { label: 'Analytics', href: '/employer/dashboard', description: 'Hiring insights' },
          ]
        }
      ]
    },
    {
      label: translations.services,
      href: '/services',
      sections: [
        {
          title: 'For Candidates',
          items: [
            { label: 'Resume Building', href: '/services/resume', description: 'Professional help' },
            { label: 'Interview Coaching', href: '/services/coaching', description: 'Ace interviews' },
            { label: 'Career Counseling', href: '/services/counseling', description: 'Expert guidance' },
          ]
        },
        {
          title: 'For Employers',
          items: [
            { label: 'Recruitment', href: '/services/recruitment', description: 'End-to-end hiring' },
            { label: 'Background Checks', href: '/services/background', description: 'Verify candidates' },
            { label: 'HR Consulting', href: '/services/consulting', description: 'Strategic support' },
          ]
        }
      ]
    }
  ];

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() => setActiveDropdown(item.label)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            to={item.href}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
              isDark 
                ? "text-white/80 hover:text-white hover:bg-white/10" 
                : "text-foreground hover:text-primary hover:bg-primary/5",
              activeDropdown === item.label && (isDark ? "text-white bg-white/10" : "text-primary bg-primary/5")
            )}
          >
            {item.label}
            <ChevronDown className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              activeDropdown === item.label && "rotate-180"
            )} />
          </Link>

          {/* Dropdown Menu */}
          <div className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 z-50",
            activeDropdown === item.label 
              ? "opacity-100 visible translate-y-0" 
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          )}>
            <div className="bg-navy-900 rounded-xl shadow-2xl border border-white/10 overflow-hidden min-w-[420px]">
              <div className="grid grid-cols-2">
                {item.sections.map((section, sectionIndex) => (
                  <div 
                    key={section.title || sectionIndex} 
                    className={cn(
                      "p-5",
                      sectionIndex === 1 && "bg-white/5"
                    )}
                  >
                    {section.title && (
                      <h3 className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-3 px-2">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-0.5">
                      {section.items.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="block text-sm font-medium text-white group-hover:text-primary transition-colors">
                            {dropdownItem.label}
                          </span>
                          {dropdownItem.description && (
                            <span className="block text-xs text-white/50 mt-0.5">
                              {dropdownItem.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default DesktopNavigation;