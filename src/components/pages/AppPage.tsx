import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AppHeader } from "../AppHeader";
import { JsonLd } from "../JsonLd";
import { useEmojiBurst } from "../ui/emoji-burst";
import googlePlayButtonImg from '../../assets/play_store_logo.png';
import appStoreButtonImg from '../../assets/app_store_logo.png';
import { trackOutboundLink } from "../../lib/analytics";

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AppPageConfig {
  // App identity
  name: string;
  slug: string;
  logo: string;
  screenshot?: string;        // legacy single-screenshot (still used as fallback)
  screenshots?: string[];     // new: up to 3 screenshots for the gallery trio

  // App details
  category: string;
  categoryColor: string; // e.g., "yellow", "blue", "purple"
  subtitle: string;
  description: string;

  // Store links
  playStoreUrl: string;
  appStoreUrl: string;

  // Features
  features: Feature[];
  featuresTitle: string;
  featuresSubtitle: string;

  // Colors
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  customColor?: string; // Optional hex color for primary accent
}

interface AppPageProps {
  config: AppPageConfig;
  onAppClick?: (app: AppPage) => void;
}

export function AppPage({ config, onAppClick }: AppPageProps) {
  const { trigger: burst, overlay: burstOverlay } = useEmojiBurst();

  const handlePlayStoreClick = (e: React.MouseEvent) => {
    burst(e.clientX, e.clientY);
    trackOutboundLink(config.playStoreUrl, `${config.name} - Google Play`);
    // Small delay so users catch the burst before the tab switches focus away.
    window.setTimeout(() => window.open(config.playStoreUrl, "_blank"), 180);
  };

  const handleAppStoreClick = (e: React.MouseEvent) => {
    burst(e.clientX, e.clientY);
    trackOutboundLink(config.appStoreUrl, `${config.name} - App Store`);
    window.setTimeout(() => window.open(config.appStoreUrl, "_blank"), 180);
  };

  // Helper function to lighten a hex color
  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * percent));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent));
    const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Helper function to darken a hex color
  const darkenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.floor((num >> 16) * (1 - percent));
    const g = Math.floor(((num >> 8) & 0x00FF) * (1 - percent));
    const b = Math.floor((num & 0x0000FF) * (1 - percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: config.name,
    description: config.description,
    applicationCategory: config.category,
    operatingSystem: 'iOS, Android',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    installUrl: [config.playStoreUrl, config.appStoreUrl],
    publisher: {
      '@type': 'Organization',
      name: 'Chunky Tofu Studios',
      url: 'https://chunkytofustudios.com',
    },
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {burstOverlay}
      <JsonLd id={`app-${config.slug}`} data={jsonLd} />
      <AppHeader
        appSlug={config.slug}
        appName={config.name}
        appLogo={config.logo}
      />

      {/* Hero Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageWithFallback
                    src={config.logo}
                    alt={config.name}
                    className="w-16 h-16 rounded-2xl shadow-lg object-contain"
                  />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-semibold text-gray-900 mb-2">{config.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white border-0 px-2 py-1 text-sm">Free</Badge>
                    <Badge
                      variant="outline"
                      className={config.customColor ? "text-sm" : `border-${config.categoryColor}-300 text-${config.categoryColor}-700 bg-${config.categoryColor}-50 text-sm`}
                      style={config.customColor ? {
                        borderColor: lightenColor(config.customColor, 0.5),
                        color: darkenColor(config.customColor, 0.2),
                        backgroundColor: `${config.customColor}1A`
                      } : {}}
                    >
                      {config.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                  {config.subtitle}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {config.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handlePlayStoreClick}
                  aria-label={`Download ${config.name} on Google Play`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  className="cursor-pointer"
                >
                  <ImageWithFallback
                    src={googlePlayButtonImg}
                    alt=""
                    className="h-14 w-auto"
                  />
                </motion.button>
                <motion.button
                  onClick={handleAppStoreClick}
                  aria-label={`Download ${config.name} on the App Store`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  className="cursor-pointer"
                >
                  <ImageWithFallback
                    src={appStoreButtonImg}
                    alt=""
                    className="h-14 w-auto"
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Mockup — 3-phone gallery trio (or single-screenshot fallback) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              {(() => {
                const shots = config.screenshots && config.screenshots.length > 0
                  ? config.screenshots
                  : (config.screenshot ? [config.screenshot] : []);

                if (shots.length >= 2) {
                  const [left, center, right] = [shots[0], shots[1] ?? shots[0], shots[2] ?? shots[1] ?? shots[0]];
                  return (
                    <div
                      className="relative w-full max-w-xl h-[440px] md:h-[520px]"
                      style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
                    >
                      {/* Left phone */}
                      <motion.div
                        className="absolute left-[3%] top-[10%] w-[40%] z-10"
                        initial={{ opacity: 0, y: 40, rotateY: 12 }}
                        animate={{ opacity: 1, y: 0, rotateY: 12 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -10, scale: 1.05, rotateY: 4, zIndex: 30 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <ImageWithFallback src={left} alt={`${config.name} screenshot 1`} className="w-full h-auto" />
                      </motion.div>

                      {/* Center phone */}
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 top-[-2%] w-[46%] z-20"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -10, scale: 1.05, zIndex: 30 }}
                      >
                        <ImageWithFallback src={center} alt={`${config.name} screenshot 2`} className="w-full h-auto" />
                      </motion.div>

                      {/* Right phone */}
                      <motion.div
                        className="absolute right-[3%] top-[16%] w-[40%] z-10"
                        initial={{ opacity: 0, y: 40, rotateY: -12 }}
                        animate={{ opacity: 1, y: 0, rotateY: -12 }}
                        transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -10, scale: 1.05, rotateY: -4, zIndex: 30 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <ImageWithFallback src={right} alt={`${config.name} screenshot 3`} className="w-full h-auto" />
                      </motion.div>
                    </div>
                  );
                }

                // Single-screenshot fallback
                return (
                  <motion.div
                    className="relative max-w-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={shots[0]}
                      alt={`${config.name} App Screenshot`}
                      className="w-full h-auto"
                    />
                  </motion.div>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-12 lg:py-16 bg-gradient-to-b to-white"
        style={config.customColor ? {
          backgroundImage: `linear-gradient(to bottom, ${config.customColor}0D, white)`
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {config.featuresTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {config.featuresSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div
                        className="w-12 h-12 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={config.customColor ? {
                          background: `linear-gradient(to bottom right, ${config.customColor}, ${darkenColor(config.customColor, 0.2)})`
                        } : {}}
                      >
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer onAppClick={onAppClick} />
    </div>
  );
}

