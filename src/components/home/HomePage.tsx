import React from 'react';
import { HeroSection } from './HeroSection';
import { PhilosophySection } from './PhilosophySection';
import { ClientTrust } from './ClientTrust';
import { ServicesMatrix } from './ServicesMatrix';
import { FeaturedProjectsSection } from './FeaturedProjectsSection';
import { ROICalculator } from './ROICalculator';
import { TestimonialsSlider } from './TestimonialsSlider';
import { CtaSection } from './CtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ClientTrust />
      <PhilosophySection />
      <ServicesMatrix />
      <FeaturedProjectsSection />
      <ROICalculator />
      <TestimonialsSlider />
      <CtaSection />
    </div>
  );
};
