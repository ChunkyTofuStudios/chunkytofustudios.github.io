import { Routes, Route, useNavigate } from "react-router-dom";
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

function HomePage() {
  const navigate = useNavigate();

  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else if (app === 'pixelbuddy') {
      navigate('/pixel-buddy');
    } else {
      navigate(`/${app}`);
    }
  };

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

function BeehivePageWrapper() {
  const navigate = useNavigate();

  const navigateHome = () => navigate('/');
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else if (app === 'pixelbuddy') {
      navigate('/pixel-buddy');
    } else {
      navigate(`/${app}`);
    }
  };

  return <BeehivePage onBack={navigateHome} onAppClick={navigateToApp} />;
}

function PixelBuddyPageWrapper() {
  const navigate = useNavigate();

  const navigateHome = () => navigate('/');
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else if (app === 'pixelbuddy') {
      navigate('/pixel-buddy');
    } else {
      navigate(`/${app}`);
    }
  };

  return <PixelBuddyPage onBack={navigateHome} onAppClick={navigateToApp} />;
}

function DozyPageWrapper() {
  const navigate = useNavigate();

  const navigateHome = () => navigate('/');
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else if (app === 'pixelbuddy') {
      navigate('/pixel-buddy');
    } else {
      navigate(`/${app}`);
    }
  };

  return <DozyPage onBack={navigateHome} onAppClick={navigateToApp} />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/beehive" element={<BeehivePageWrapper />} />
      <Route path="/pixel-buddy" element={<PixelBuddyPageWrapper />} />
      <Route path="/dozy" element={<DozyPageWrapper />} />
    </Routes>
  );
}