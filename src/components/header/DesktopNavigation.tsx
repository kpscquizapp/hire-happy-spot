import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  Search, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  GraduationCap,
  Users,
  UserPlus,
  Building2,
  Sparkles,
  Target,
  ClipboardCheck,
  Video,
  BarChart3,
  FileCheck,
  Handshake,
  Award,
  BookOpen,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface DesktopNavigationProps {
  isDark?: boolean;
}

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
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
  const { user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItemWithDropdown[] = [
    {
      label: translations.candidates,
      href: '/jobs',
      sections: [
        {
          title: 'Job Search',
          items: [
            { label: 'Browse Jobs', href: '/jobs', icon: <Search className="w-4 h-4" />, description: 'Explore thousands of opportunities' },
            { label: 'Job Recommendations', href: '/job-recommendations', icon: <Sparkles className="w-4 h-4" />, description: 'AI-powered job matches' },
            { label: 'Saved Jobs', href: '/jobs?saved=true', icon: <FileText className="w-4 h-4" />, description: 'View your bookmarked jobs' },
          ]
        },
        {
          title: 'Career Development',
          items: [
            { label: 'Career Path Planner', href: '/career-path', icon: <TrendingUp className="w-4 h-4" />, description: 'Plan your career journey' },
            { label: 'Skills Assessment', href: '/skills-assessment', icon: <Award className="w-4 h-4" />, description: 'Validate your skills' },
            { label: 'Learning Resources', href: '/resources', icon: <GraduationCap className="w-4 h-4" />, description: 'Upskill with courses' },
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
            { label: 'Browse Talent', href: '/find-talent', icon: <Users className="w-4 h-4" />, description: 'Discover skilled professionals' },
            { label: 'Talent Profiles', href: '/talent/1', icon: <FileCheck className="w-4 h-4" />, description: 'View detailed profiles' },
            { label: 'AI Matching', href: '/find-talent?ai=true', icon: <Sparkles className="w-4 h-4" />, description: 'Smart talent recommendations' },
          ]
        },
        {
          title: 'Register Talent',
          items: [
            { label: 'List Your Talent', href: '/list-bench-talent', icon: <UserPlus className="w-4 h-4" />, description: 'Add bench resources' },
            { label: 'Register as Talent', href: '/register-talent', icon: <Briefcase className="w-4 h-4" />, description: 'Create your profile' },
          ]
        }
      ]
    },
    {
      label: translations.employers,
      href: '/employer',
      sections: [
        {
          title: 'Hiring Solutions',
          items: [
            { label: 'Post a Job', href: '/employer/post-job', icon: <FileText className="w-4 h-4" />, description: 'Create job listings' },
            { label: 'Hire Full-Time', href: '/employer/hire-full-time', icon: <Users className="w-4 h-4" />, description: 'Permanent positions' },
            { label: 'Hire Interns', href: '/employer/hire-interns', icon: <GraduationCap className="w-4 h-4" />, description: 'Internship programs' },
            { label: 'Contract Hiring', href: '/employer/contract-hiring', icon: <Handshake className="w-4 h-4" />, description: 'Flexible contracts' },
          ]
        },
        {
          title: 'AI Tools',
          items: [
            { label: 'AI Screening', href: '/employer/ai-screening', icon: <Target className="w-4 h-4" />, description: 'Automated candidate screening' },
            { label: 'AI Interviews', href: '/employer/ai-interviews', icon: <Video className="w-4 h-4" />, description: 'Virtual AI interviews' },
            { label: 'Talent Analytics', href: '/employer/dashboard', icon: <BarChart3 className="w-4 h-4" />, description: 'Hiring insights & metrics' },
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
            { label: 'Resume Building', href: '/services/resume', icon: <FileText className="w-4 h-4" />, description: 'Professional resume help' },
            { label: 'Interview Coaching', href: '/services/coaching', icon: <MessageSquare className="w-4 h-4" />, description: 'Ace your interviews' },
            { label: 'Career Counseling', href: '/services/counseling', icon: <BookOpen className="w-4 h-4" />, description: 'Expert guidance' },
          ]
        },
        {
          title: 'For Employers',
          items: [
            { label: 'Recruitment Services', href: '/services/recruitment', icon: <Building2 className="w-4 h-4" />, description: 'End-to-end hiring' },
            { label: 'Background Checks', href: '/services/background', icon: <ClipboardCheck className="w-4 h-4" />, description: 'Verify candidates' },
            { label: 'HR Consulting', href: '/services/consulting', icon: <HelpCircle className="w-4 h-4" />, description: 'Strategic HR support' },
          ]
        }
      ]
    }
  ];

  return (
    <nav className="hidden md:flex items-center gap-1">
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
              "flex items-center gap-1 px-4 py-2 font-medium text-sm transition-all duration-200 rounded-lg",
              isDark 
                ? "text-gray-300 hover:text-white hover:bg-white/10" 
                : "text-foreground hover:text-primary hover:bg-primary/5",
              activeDropdown === item.label && (isDark ? "text-white bg-white/10" : "text-primary bg-primary/5")
            )}
          >
            {item.label}
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              activeDropdown === item.label && "rotate-180"
            )} />
          </Link>

          {/* Dropdown Menu */}
          <div className={cn(
            "absolute top-full left-0 pt-2 transition-all duration-200 z-50",
            activeDropdown === item.label 
              ? "opacity-100 visible translate-y-0" 
              : "opacity-0 invisible -translate-y-2"
          )}>
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[480px]">
              <div className="grid grid-cols-2 gap-0">
                {item.sections.map((section, sectionIndex) => (
                  <div 
                    key={section.title || sectionIndex} 
                    className={cn(
                      "p-4",
                      sectionIndex === 1 && "bg-gray-50/50"
                    )}
                  >
                    {section.title && (
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-1">
                      {section.items.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/5 transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            {dropdownItem.icon}
                          </span>
                          <div>
                            <span className="block text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                              {dropdownItem.label}
                            </span>
                            {dropdownItem.description && (
                              <span className="block text-xs text-gray-500 mt-0.5">
                                {dropdownItem.description}
                              </span>
                            )}
                          </div>
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
