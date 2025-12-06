/**
 * Google Analytics 4 - Centralized Analytics Module
 * 
 * All analytics configuration is controlled from this single file.
 * Page views are tracked automatically by GA4.
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
 * Initialize Google Analytics
 * Call this once when the app starts
 */
export function initializeAnalytics() {
  // Prevent double initialization
  if (window.gtag) {
    log('Already initialized, skipping');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

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
 */
function trackOutboundLink(url: string, label?: string) {
  if (!window.gtag) {
    log('gtag not initialized, skipping outbound link');
    return;
  }

  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: label || url,
    transport_type: 'beacon',
    outbound_url: url,
  });

  log('Outbound link:', { url, label });
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

  log('Outbound link tracking enabled');
}
