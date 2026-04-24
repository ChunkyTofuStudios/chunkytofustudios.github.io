import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";
import { canonicalFor, metaForPath } from "../lib/seo";

import { HomeNavigation } from "./HomeNavigation";
import { HeroSection } from "./HeroSection";
import { TitlesSection } from "./TitlesSection";
import { OpenSourceSection } from "./OpenSourceSection";
import { ValuesSection } from "./ValuesSection";
import { TeamSection } from "./TeamSection";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";

import pixelBuddyLogo from '../assets/pixel_buddy_logo.png';
import dozyLogo from '../assets/dozy_logo.png';
import beehiveLogo from '../assets/beehive_logo.png';

// Lazy-load non-home routes so the landing page ships less JS.
const BeehivePage = lazy(() => import('./pages/BeehivePage').then(m => ({ default: m.BeehivePage })));
const PixelBuddyPage = lazy(() => import('./pages/PixelBuddyPage').then(m => ({ default: m.PixelBuddyPage })));
const DozyPage = lazy(() => import('./pages/DozyPage').then(m => ({ default: m.DozyPage })));
const MarkdownPage = lazy(() => import('./pages/MarkdownPage').then(m => ({ default: m.MarkdownPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BeehiveFirebaseAuthRedirect = lazy(() =>
  import('./pages/FirebaseAuthRedirect').then(m => ({ default: m.BeehiveFirebaseAuthRedirect }))
);

type AppSlug = 'beehive' | 'pixel-buddy' | 'dozy';
type PolicyPage = 'terms-and-conditions' | 'privacy-policy' | 'data-safety';

const APP_CONFIG: Record<AppSlug, {
  name: string;
  logo: string;
  themeColor: 'blue' | 'purple' | 'yellow';
  component: typeof BeehivePage;
}> = {
  beehive: { name: 'Beehive', logo: beehiveLogo, themeColor: 'yellow', component: BeehivePage },
  'pixel-buddy': { name: 'Pixel Buddy', logo: pixelBuddyLogo, themeColor: 'blue', component: PixelBuddyPage },
  dozy: { name: 'Dozy', logo: dozyLogo, themeColor: 'purple', component: DozyPage },
};

const POLICY_PAGES: PolicyPage[] = ['terms-and-conditions', 'privacy-policy', 'data-safety'];

// Scroll restoration following React Router guide.
// We disable the browser's native scroll restoration so it doesn't fight
// our manual scroll-to-top (otherwise, pressing Back from an app page
// lands the user at the previous scroll position on the homepage
// — usually way down at the Titles section — instead of the top).
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Track page views when route changes
function PageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

// Update document title + meta tags + canonical on route change so crawlers
// that do execute JS (Googlebot, Bingbot) see per-route SEO metadata.
function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    const canonical = canonicalFor(pathname);

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', meta.type ?? 'website');
    if (meta.ogImage) {
      upsertMeta('property', 'og:image', `https://chunkytofustudios.com${meta.ogImage}`);
      upsertMeta('name', 'twitter:image', `https://chunkytofustudios.com${meta.ogImage}`);
    }
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertLinkRel('canonical', canonical);
  }, [pathname]);

  return null;
}

function upsertMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function upsertLinkRel(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const HOMEPAGE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://chunkytofustudios.com/#org',
      name: 'Chunky Tofu Studios',
      url: 'https://chunkytofustudios.com',
      logo: 'https://chunkytofustudios.com/favicon.ico',
      sameAs: [
        'https://github.com/ChunkyTofuStudios',
        'https://www.linkedin.com/company/chunky-tofu-studios/',
        'https://x.com/Chunky_Tofu',
      ],
      description:
        'Indie app studio of developers across San Francisco, Princeton, Dublin, Istanbul, Mexico City, and Milan — crafting mobile experiences people love.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://chunkytofustudios.com/#website',
      url: 'https://chunkytofustudios.com',
      name: 'Chunky Tofu Studios',
      publisher: { '@id': 'https://chunkytofustudios.com/#org' },
    },
  ],
};

function HomePage() {
  return (
    <div className="min-h-screen">
      <JsonLd id="home" data={HOMEPAGE_JSONLD} />
      <HomeNavigation />
      <div data-section="home">
        <HeroSection />
      </div>
      <div data-section="titles">
        <TitlesSection />
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
      <Footer />
    </div>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  );
}

export function AppRouter() {
  return (
    <>
      <DocumentMeta />
      <ScrollToTop />
      <PageViewTracker />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {(Object.keys(APP_CONFIG) as AppSlug[]).flatMap((slug) => {
            const { component: AppComponent, name, logo, themeColor } = APP_CONFIG[slug];
            return [
              <Route key={slug} path={`/${slug}`} element={<AppComponent />} />,
              ...POLICY_PAGES.map((page) => (
                <Route
                  key={`${slug}/${page}`}
                  path={`/${slug}/${page}`}
                  element={
                    <MarkdownPage
                      app={slug}
                      pageType={page}
                      appLogo={logo}
                      appName={name}
                      themeColor={themeColor}
                    />
                  }
                />
              )),
            ];
          })}

          <Route path="/beehive/auth" element={<BeehiveFirebaseAuthRedirect />} />

          {/* 404 Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
