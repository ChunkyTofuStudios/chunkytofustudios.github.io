import { useState } from "react";
import { BeehivePage } from "./pages/BeehivePage";
import { PixelBuddyPage } from "./pages/PixelBuddyPage";
import { DozyPage } from "./pages/DozyPage";

import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { PortfolioSection } from "./PortfolioSection";
import { OpenSourceSection } from "./OpenSourceSection";
import { ValuesSection } from "./ValuesSection";
import { TeamSection } from "./TeamSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

type AppPage = 'home' | 'beehive' | 'pixelbuddy' | 'dozy';

export function AppRouter() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  const navigateToApp = (app: AppPage) => {
    setCurrentPage(app);
  };

  const navigateHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'beehive') {
    return <BeehivePage onBack={navigateHome} onAppClick={navigateToApp} />;
  }

  if (currentPage === 'pixelbuddy') {
    return <PixelBuddyPage onBack={navigateHome} onAppClick={navigateToApp} />;
  }

  if (currentPage === 'dozy') {
    return <DozyPage onBack={navigateHome} onAppClick={navigateToApp} />;
  }

  // Home page with modified PortfolioSection to handle navigation
  return (
    <div className="min-h-screen">
      <HeroSection onAppClick={navigateToApp} />
      <div data-section="services">
        <ServicesSection />
      </div>
      <div data-section="portfolio">
        <PortfolioSection onAppClick={navigateToApp} />
      </div>
      <div data-section="opensource">
        <OpenSourceSection />
      </div>
      <ValuesSection />
      <div data-section="team">
        <TeamSection />
      </div>
      <div data-section="contact">
        <ContactSection />
      </div>
      <Footer onAppClick={navigateToApp} />
    </div>
  );
}