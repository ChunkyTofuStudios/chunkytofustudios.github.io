import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BeehivePage } from "./pages/BeehivePage";
import { PixelBuddyPage } from "./pages/PixelBuddyPage";
import { DozyPage } from "./pages/DozyPage";
import { MarkdownPage } from "./pages/MarkdownPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { trackPageView } from "../lib/analytics";

import { HomeNavigation } from "./HomeNavigation";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { TitlesSection } from "./TitlesSection";
import { OpenSourceSection } from "./OpenSourceSection";
import { ValuesSection } from "./ValuesSection";
import { TeamSection } from "./TeamSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

import pixelBuddyLogo from '../assets/pixel_buddy_logo.png';
import dozyLogo from '../assets/dozy_logo.png';
import beehiveLogo from '../assets/beehive_logo.png';


type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

// Scroll restoration following React Router guide
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Track page views when route changes
function PageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Track page view when pathname changes
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

// Update document title when route changes (for client-side navigation)
function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Map routes to their titles based on the HTML files
    const titleMap: Record<string, string> = {
      '/': 'Chunky Tofu Studios',
      '/dozy': 'Dozy - Chunky Tofu Studios',
      '/pixel-buddy': 'Pixel Buddy - Chunky Tofu Studios',
      '/beehive': 'Beehive - Chunky Tofu Studios',
    };

    // Find matching title (exact match or starts with)
    let title = titleMap[pathname];

    // If no exact match, check if pathname starts with any route
    if (!title) {
      for (const [route, routeTitle] of Object.entries(titleMap)) {
        if (route !== '/' && pathname.startsWith(route)) {
          title = routeTitle;
          break;
        }
      }
    }

    // Update title if found
    if (title) {
      document.title = title;
    }
  }, [pathname]);

  return null;
}

function HomePage() {
  const navigate = useNavigate();

  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else {
      navigate(`/${app}`);
    }
  };

  return (
    <div className="min-h-screen">
      <HomeNavigation />
      <div data-section="home">
        <HeroSection onAppClick={navigateToApp} />
      </div>
      <div data-section="services">
        <ServicesSection />
      </div>
      <div data-section="titles">
        <TitlesSection onAppClick={navigateToApp} />
      </div>
      <div data-section="opensource">
        <OpenSourceSection />
      </div>
      <div data-section="values">
        <ValuesSection />
      </div>
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

  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else {
      navigate(`/${app}`);
    }
  };

  return <BeehivePage onAppClick={navigateToApp} />;
}

function PixelBuddyPageWrapper() {
  const navigate = useNavigate();

  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else {
      navigate(`/${app}`);
    }
  };

  return <PixelBuddyPage onAppClick={navigateToApp} />;
}

function DozyPageWrapper() {
  const navigate = useNavigate();

  const navigateToApp = (app: AppPage) => {
    if (app === 'home') {
      navigate('/');
    } else {
      navigate(`/${app}`);
    }
  };

  return <DozyPage onAppClick={navigateToApp} />;
}

function PixelBuddyTermsPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="pixel-buddy"
      pageType="terms-and-conditions"
      appLogo={pixelBuddyLogo}
      appName="Pixel Buddy"
      themeColor="blue"
      onAppClick={navigateToApp}
    />
  );
}

function PixelBuddyPrivacyPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="pixel-buddy"
      pageType="privacy-policy"
      appLogo={pixelBuddyLogo}
      appName="Pixel Buddy"
      themeColor="blue"
      onAppClick={navigateToApp}
    />
  );
}

function PixelBuddyDataSafetyPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="pixel-buddy"
      pageType="data-safety"
      appLogo={pixelBuddyLogo}
      appName="Pixel Buddy"
      themeColor="blue"
      onAppClick={navigateToApp}
    />
  );
}

function DozyTermsPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="dozy"
      pageType="terms-and-conditions"
      appLogo={dozyLogo}
      appName="Dozy"
      themeColor="purple"
      onAppClick={navigateToApp}
    />
  );
}

function DozyPrivacyPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="dozy"
      pageType="privacy-policy"
      appLogo={dozyLogo}
      appName="Dozy"
      themeColor="purple"
      onAppClick={navigateToApp}
    />
  );
}

function DozyDataSafetyPageWrapper() {
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="dozy"
      pageType="data-safety"
      appLogo={dozyLogo}
      appName="Dozy"
      themeColor="purple"
      onAppClick={navigateToApp}
    />
  );
}

function BeehiveTermsPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="beehive"
      pageType="terms-and-conditions"
      appLogo={beehiveLogo}
      appName="Beehive"
      themeColor="yellow"
      onAppClick={navigateToApp}
    />
  );
}

function BeehivePrivacyPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="beehive"
      pageType="privacy-policy"
      appLogo={beehiveLogo}
      appName="Beehive"
      themeColor="yellow"
      onAppClick={navigateToApp}
    />
  );
}

function BeehiveDataSafetyPageWrapper() {
  const navigate = useNavigate();
  const navigateToApp = (app: AppPage) => {
    if (app === 'home') navigate('/');
    else navigate(`/${app}`);
  };

  return (
    <MarkdownPage
      app="beehive"
      pageType="data-safety"
      appLogo={beehiveLogo}
      appName="Beehive"
      themeColor="yellow"
      onAppClick={navigateToApp}
    />
  );
}

export function AppRouter() {
  return (
    <>
      <DocumentTitle />
      <ScrollToTop />
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Pixel Buddy Routes */}
        <Route path="/pixel-buddy" element={<PixelBuddyPageWrapper />} />
        <Route path="/pixel-buddy/terms-and-conditions" element={<PixelBuddyTermsPageWrapper />} />
        <Route path="/pixel-buddy/privacy-policy" element={<PixelBuddyPrivacyPageWrapper />} />
        <Route path="/pixel-buddy/data-safety" element={<PixelBuddyDataSafetyPageWrapper />} />

        {/* Dozy Routes */}
        <Route path="/dozy" element={<DozyPageWrapper />} />
        <Route path="/dozy/terms-and-conditions" element={<DozyTermsPageWrapper />} />
        <Route path="/dozy/privacy-policy" element={<DozyPrivacyPageWrapper />} />
        <Route path="/dozy/data-safety" element={<DozyDataSafetyPageWrapper />} />

        {/* Beehive Routes */}
        <Route path="/beehive" element={<BeehivePageWrapper />} />
        <Route path="/beehive/terms-and-conditions" element={<BeehiveTermsPageWrapper />} />
        <Route path="/beehive/privacy-policy" element={<BeehivePrivacyPageWrapper />} />
        <Route path="/beehive/data-safety" element={<BeehiveDataSafetyPageWrapper />} />

        {/* 404 Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}