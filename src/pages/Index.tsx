
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCompanies from '@/components/FeaturedCompanies';
import HighlightedJob from '@/components/HighlightedJob';
import TopIndustries from '@/components/TopIndustries';
import PopularCategories from '@/components/PopularCategories';
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
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturedCompanies />
        <HighlightedJob />
        <TopIndustries />
        <PopularCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
