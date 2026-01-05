
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCompanies from '@/components/FeaturedCompanies';
import JobCategories from '@/components/JobCategories';
import JobLocations from '@/components/JobLocations';
import SmartCareerTools from '@/components/SmartCareerTools';
import TalentMarketplace from '@/components/TalentMarketplace';
import Footer from '@/components/Footer';

const Index = () => {
  // Initialize fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedCompanies />
        <JobCategories />
        <JobLocations />
        <SmartCareerTools />
        <TalentMarketplace />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
