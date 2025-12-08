import { useEffect } from "react";
import { AppRouter } from "./components/AppRouter";
import { initializeDataLayer } from "./lib/analytics";
import { initializeCookieConsent } from "./lib/cookie_consent";
import { initializeAnalytics } from "./lib/analytics";

export default function App() {
  useEffect(() => {
    // Initialize in the correct order for Google Consent Mode:
    // 1. dataLayer and gtag function (required for cookie consent)
    initializeDataLayer();

    // 2. Cookie consent (needs gtag to update consent)
    initializeCookieConsent();

    // 3. Google Analytics (after dataLayer and cookie consent are set up)
    initializeAnalytics();
  }, []);

  return <AppRouter />;
}