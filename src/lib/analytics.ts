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

// Internal state so we don't emit events before GA is configured
let isLoading = false;
let isReady = false;
const pendingCalls: Array<() => void> = [];
let outboundTrackingInitialized = false;

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

function runWhenReady(callback: () => void) {
  if (isReady) {
    callback();
  } else {
    pendingCalls.push(callback);
  }
}

function markReady() {
  if (isReady) return;
  isReady = true;
  if (config.trackOutboundLinks && !outboundTrackingInitialized) {
    setupOutboundLinkTracking();
    outboundTrackingInitialized = true;
  }

  while (pendingCalls.length) {
    const next = pendingCalls.shift();
    next?.();
  }
}

/**
 * Initialize dataLayer and gtag function
 * This should be called early, before cookie consent, so consent updates can work
 * 
 * Also sets default consent mode to 'denied' so events are queued until consent is granted
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
  if (isLoading) {
    return;
  }

  // Ensure dataLayer is initialized
  initializeDataLayer();

  isLoading = true;

  // Queue the required commands immediately so they're the first entries in the dataLayer
  window.gtag('js', new Date());

  window.gtag('config', GA_MEASUREMENT_ID);

  const completeInitialization = () => {
    // Protect against multiple onload triggers
    if (isReady) return;

    // Re-issue config after the library is definitely available so Tag Assistant can see it
    window.gtag('config', GA_MEASUREMENT_ID);
    markReady();
    log('GA4 config executed after script load');
  };

  // Prevent double initialization - check if GA4 script is already loaded
  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`
  );
  if (existingScript) {
    completeInitialization();
    return;
  }

  // Load the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  // Also call config after script loads to ensure it's executed
  // This is a safety measure to ensure Google Tag Assistant detects the config
  script.onload = completeInitialization;

  // Handle script load errors
  script.onerror = () => {
    log('Failed to load GA4 script');
    isLoading = false;
  };

  document.head.appendChild(script);

  log('Initialized with ID:', GA_MEASUREMENT_ID);
}

/**
 * Track outbound link clicks
 * Uses GA4-compatible event format
 */
export function trackOutboundLink(url: string, label?: string) {
  // Kick off initialization if it hasn't happened yet
  if (!isLoading && !isReady) {
    initializeAnalytics();
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

  // GA4-compatible event format for outbound links
  // Using descriptive event name that Google Tag Assistant will recognize
  const payload = {
    event_category: 'outbound',
    event_label: label || url,
    link_url: url,
    link_domain: linkDomain,
    transport_type: 'beacon',
    send_to: GA_MEASUREMENT_ID,
  };

  runWhenReady(() => {
    window.gtag('event', 'click', payload);
    log('Outbound link tracked:', { url, label, linkDomain });
  });
}

/**
 * Track page view
 * Call this when the route changes in a SPA
 */
export function trackPageView(path: string, title?: string) {
  // Kick off initialization if it hasn't happened yet
  if (!isLoading && !isReady) {
    initializeAnalytics();
  }

  // GA4 page_view event
  const payload = {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
    send_to: GA_MEASUREMENT_ID,
  };

  runWhenReady(() => {
    window.gtag('event', 'page_view', payload);
    log('Page view tracked:', { path, title: title || document.title });
  });
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  // Kick off initialization if it hasn't happened yet
  if (!isLoading && !isReady) {
    initializeAnalytics();
  }

  const payload = { ...params, send_to: GA_MEASUREMENT_ID };

  runWhenReady(() => {
    window.gtag('event', eventName, payload);
    log('Event:', { eventName, params });
  });
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
