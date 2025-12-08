import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AppHeader } from "../AppHeader";
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
  screenshot: string;

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
  const handlePlayStoreClick = () => {
    trackOutboundLink(config.playStoreUrl, `${config.name} - Google Play`);
    window.open(config.playStoreUrl, "_blank");
  };

  const handleAppStoreClick = () => {
    trackOutboundLink(config.appStoreUrl, `${config.name} - App Store`);
    window.open(config.appStoreUrl, "_blank");
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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.gradientFrom} via-white ${config.gradientTo}`}>
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <ImageWithFallback
                    src={googlePlayButtonImg}
                    alt="Get it on Google Play"
                    className="h-14 w-auto"
                  />
                </motion.button>
                <motion.button
                  onClick={handleAppStoreClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <ImageWithFallback
                    src={appStoreButtonImg}
                    alt="Download on the App Store"
                    className="h-14 w-auto"
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                className="relative max-w-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))' }}
              >
                <ImageWithFallback
                  src={config.screenshot}
                  alt={`${config.name} App Screenshot`}
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
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

