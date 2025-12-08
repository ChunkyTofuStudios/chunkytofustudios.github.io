/**
 * Google Analytics 4 - Centralized Analytics Module
 * 
 * All analytics configuration is controlled from this single file.
 * Page views are tracked explicitly using React Router's useLocation hook.
 * Outbound links are tracked automatically via event delegation.
 */

const GA_MEASUREMENT_ID = 'G-REYS4TKJBK';

// Configuration
const config = {
  debug: import.meta.env.DEV, // Enable debug logging in development
  trackOutboundLinks: true,
};

// Type declarations for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Debug logger - only logs in development when debug is enabled
 */
function log(message: string, data?: unknown) {
  if (config.debug) {
    console.log(`[Analytics] ${message}`, data ?? '');
  }
}

/**
 * Initialize dataLayer and gtag function
 * This should be called early, before cookie consent, so consent updates can work
 */
export function initializeDataLayer() {
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function if it doesn't exist
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    log('gtag function defined');
  }
}

/**
 * Initialize Google Analytics
 * Call this once when the app starts
 * 
 * IMPORTANT: initializeDataLayer() should be called first (before cookie consent)
 * to ensure gtag is available for consent updates.
 */
export function initializeAnalytics() {
  // Ensure dataLayer is initialized
  initializeDataLayer();

  // Prevent double initialization - check if GA4 script is already loaded
  if (document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    log('Already initialized, skipping');
    return;
  }

  // Set initial timestamp
  window.gtag('js', new Date());

  // Configure GA4 - page views are automatic
  window.gtag('config', GA_MEASUREMENT_ID);

  // Load the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  log('Initialized with ID:', GA_MEASUREMENT_ID);

  // Setup outbound link tracking
  if (config.trackOutboundLinks) {
    setupOutboundLinkTracking();
  }
}

/**
 * Track outbound link clicks
 * Uses GA4-compatible event format
 */
export function trackOutboundLink(url: string, label?: string) {
  if (!window.gtag) {
    log('gtag not initialized, skipping outbound link');
    return;
  }

  // Safely parse URL to extract domain
  let linkDomain = '';
  try {
    const parsedUrl = new URL(url);
    linkDomain = parsedUrl.hostname;
  } catch {
    // If URL parsing fails, try with current origin as base
    try {
      const parsedUrl = new URL(url, window.location.origin);
      linkDomain = parsedUrl.hostname;
    } catch {
      // If still fails, use empty string
      linkDomain = '';
    }
  }

  // GA4-compatible event format
  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: label || url,
    link_url: url,
    link_domain: linkDomain,
    transport_type: 'beacon',
  });

  log('Outbound link tracked:', { url, label, linkDomain });
}

/**
 * Track page view
 * Call this when the route changes in a SPA
 */
export function trackPageView(path: string, title?: string) {
  if (!window.gtag) {
    log('gtag not initialized, skipping page view');
    return;
  }

  // GA4 page_view event
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });

  log('Page view tracked:', { path, title: title || document.title });
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!window.gtag) {
    log('gtag not initialized, skipping event');
    return;
  }

  window.gtag('event', eventName, params);
  log('Event:', { eventName, params });
}

/**
 * Check if a URL is external
 */
function isExternalUrl(url: string): boolean {
  try {
    const link = new URL(url, window.location.origin);
    return link.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

/**
 * Setup automatic outbound link tracking via event delegation
 * This captures clicks on all external links without needing to wrap them
 */
function setupOutboundLinkTracking() {
  document.addEventListener('click', (event) => {
    const anchor = (event.target as Element).closest('a');

    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    if (isExternalUrl(href)) {
      const label = anchor.textContent?.trim() || anchor.getAttribute('aria-label') || href;
      trackOutboundLink(href, label);
    }
  });

  log('Outbound link tracking enabled.');
}
