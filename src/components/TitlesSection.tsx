import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./ui/link-button";
import { trackOutboundLink } from "../lib/analytics";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

import dozyLogo from '../assets/dozy_logo.png';
import pixelBuddyLogo from '../assets/pixel_buddy_logo.png';
import beehiveLogo from '../assets/beehive_logo.png';
import googlePlayButtonImg from '../assets/play_store_logo.png';
import appStoreButtonImg from '../assets/app_store_logo.png';

// 3 mocks per app
import beehive1 from '../assets/beehive_1.png';
import beehive2 from '../assets/beehive_2.png';
import beehive3 from '../assets/beehive_3.png';
import pixelBuddy1 from '../assets/pixel_buddy_1.png';
import pixelBuddy2 from '../assets/pixel_buddy_2.png';
import pixelBuddy3 from '../assets/pixel_buddy_3.png';
import dozy1 from '../assets/dozy_1.png';
import dozy2 from '../assets/dozy_2.png';
import dozy3 from '../assets/dozy_3.png';

interface AppData {
  title: string;
  description: string;
  logo: string;
  screenshots: string[];
  tags: string[];
  platform: string;
  playStoreUrl: string;
  appStoreUrl: string;
  category: string;
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    discord?: string;
  };
}

const apps: AppData[] = [
  {
    title: "Beehive",
    description: "A strategic word puzzle game. Build your vocabulary with challenging daily puzzles and hexagonal gameplay.",
    logo: beehiveLogo,
    screenshots: [beehive1, beehive2, beehive3],
    tags: ["Flutter", "Puzzle", "Word Game"],
    platform: "iOS & Android",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.beehive&utm_source=cts&utm_medium=web&utm_campaign=landingpage",
    appStoreUrl: "https://apps.apple.com/us/app/beehive-word-puzzle-challenge/id6737005539",
    category: "Games",
    socialMedia: {
      instagram: "https://instagram.com/beehivegame",
      tiktok: "https://tiktok.com/@beehive.game",
      youtube: "https://www.youtube.com/@beehivegame",
      discord: "https://discord.gg/F5hESWNkVR",
    }
  },
  {
    title: "Pixel Buddy",
    description: "A delightful pixel art coloring book app with hundreds of beautiful designs to bring to life.",
    logo: pixelBuddyLogo,
    screenshots: [pixelBuddy1, pixelBuddy2, pixelBuddy3],
    tags: ["Flutter", "Coloring Book", "Pixel Art"],
    platform: "iOS & Android",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.pixel_buddy&utm_source=cts&utm_medium=web&utm_campaign=landingpage",
    appStoreUrl: "https://apps.apple.com/us/app/pixel-buddy-coloring-book/id6451399345?uo=4",
    category: "Games",
    socialMedia: {
      instagram: "https://instagram.com/pixelbuddy_game",
      tiktok: "https://www.tiktok.com/@pixelbuddy.game",
      youtube: "https://www.youtube.com/@PixelBuddyOfficial",
    }
  },
  {
    title: "Dozy",
    description: "The ultimate companion for long-distance commuters — designed to make travel time productive and enjoyable.",
    logo: dozyLogo,
    screenshots: [dozy1, dozy2, dozy3],
    tags: ["Flutter", "Public Transit", "Productivity"],
    platform: "iOS & Android",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.destiwake&utm_source=cts&utm_medium=web&utm_campaign=landingpage",
    appStoreUrl: "https://apps.apple.com/app/apple-store/id6736437794?pt=106088813&ct=landingpage&mt=8",
    category: "Utilities",
    socialMedia: {
      instagram: "https://www.instagram.com/dozyapp",
      tiktok: "https://www.tiktok.com/@dozyapp",
    }
  }
];

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface TitlesSectionProps {
  onAppClick?: (app: AppPage) => void;
}

// Fanned phone trio — same layout language as the hero section.
function PhoneTrio({
  screenshots,
  title,
}: {
  screenshots: string[];
  title: string;
}) {
  const [left, center, right] = [
    screenshots[0],
    screenshots[1] ?? screenshots[0],
    screenshots[2] ?? screenshots[1] ?? screenshots[0],
  ];

  return (
    <div
      className="relative w-full max-w-xl h-[440px] md:h-[520px] mx-auto"
      style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
    >
      {/* Left phone */}
      <motion.div
        className="absolute left-[3%] top-[10%] w-[40%] z-10"
        initial={{ opacity: 0, y: 40, rotateY: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 12 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -12, scale: 1.05, rotateY: 4, zIndex: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <ImageWithFallback
          src={left}
          alt={`${title} screenshot 1`}
          className="w-full h-auto block"
        />
      </motion.div>

      {/* Center phone (front) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[-2%] w-[46%] z-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -12, scale: 1.05, zIndex: 30 }}
      >
        <ImageWithFallback
          src={center}
          alt={`${title} screenshot 2`}
          className="w-full h-auto block"
        />
      </motion.div>

      {/* Right phone */}
      <motion.div
        className="absolute right-[3%] top-[16%] w-[40%] z-10"
        initial={{ opacity: 0, y: 40, rotateY: -12 }}
        whileInView={{ opacity: 1, y: 0, rotateY: -12 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -12, scale: 1.05, rotateY: -4, zIndex: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <ImageWithFallback
          src={right}
          alt={`${title} screenshot 3`}
          className="w-full h-auto block"
        />
      </motion.div>
    </div>
  );
}

// New Learn More button — matte dark pill, arrow slides right on hover
function LearnMoreButton({
  to,
  onNavigate,
  label = "Learn More",
}: {
  to: string;
  onNavigate?: () => void;
  label?: string;
}) {
  return (
    <LinkButton to={to} onNavigate={onNavigate} className="no-underline inline-block">
      <motion.span
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center gap-2 pl-6 pr-5 py-3 rounded-full text-[15px] font-semibold tracking-tight overflow-hidden"
        style={{
          color: '#ffffff',
          background: 'linear-gradient(180deg, #2a2a2d 0%, #1d1d1f 100%)',
          boxShadow:
            '0 10px 24px rgba(29, 29, 31, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Sheen sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
          style={{
            background:
              'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
          }}
        />
        <span className="relative z-10">{label}</span>
        <span
          aria-hidden
          className="relative z-10 inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1"
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </motion.span>
    </LinkButton>
  );
}

export function TitlesSection({ onAppClick }: TitlesSectionProps) {
  const appMap: Record<string, AppPage> = {
    'Beehive': 'beehive',
    'Pixel Buddy': 'pixel-buddy',
    'Dozy': 'dozy'
  };

  const handlePlayStoreClick = (url: string, appName?: string) => {
    trackOutboundLink(url, appName ? `${appName} - Google Play` : 'Google Play');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAppStoreClick = (url: string, appName?: string) => {
    trackOutboundLink(url, appName ? `${appName} - App Store` : 'App Store');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAppNavigation = (appTitle: string): string => {
    const pathMap: Record<string, string> = {
      'Beehive': '/beehive',
      'Pixel Buddy': '/pixel-buddy',
      'Dozy': '/dozy'
    };
    return pathMap[appTitle] || '/';
  };

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg"></div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <h2 className="text-6xl md:text-7xl text-gray-900 tracking-tight mb-6 font-semibold">
              Our Titles
            </h2>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the mobile apps we've crafted with passion and user-first principles.
            Each app represents hours of love, code, and creativity.
          </p>
        </motion.div>

        <div className="space-y-32">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* App Gallery — fanned trio like the hero */}
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <PhoneTrio
                    screenshots={app.screenshots}
                    title={app.title}
                  />
                </div>

                {/* App Info */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge
                      className="mb-4 bg-gray-900 text-white border-0 px-4 py-2 text-sm font-medium rounded-full"
                    >
                      {app.category}
                    </Badge>

                    <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
                      {app.title}
                    </h3>

                    <p className="text-xl text-gray-600 leading-relaxed mb-6">
                      {app.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {app.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tagIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-sm border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors rounded-full px-3 py-1"
                          >
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Social Media Links */}
                    <div className="flex justify-center lg:justify-start gap-4 mb-6">
                      {app.socialMedia.instagram && (
                        <motion.a
                          href={app.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Instagram className="w-5 h-5" />
                        </motion.a>
                      )}
                      {app.socialMedia.tiktok && (
                        <motion.a
                          href={app.socialMedia.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <TikTokIcon className="w-5 h-5" />
                        </motion.a>
                      )}
                      {/* Only show Discord for Beehive */}
                      {app.title === "Beehive" && app.socialMedia.discord && (
                        <motion.a
                          href={app.socialMedia.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="flex gap-3 sm:gap-4 items-center">
                        {app.playStoreUrl && (
                          <motion.button
                            onClick={() => handlePlayStoreClick(app.playStoreUrl, app.title)}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-pointer transition-shadow"
                            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }}
                          >
                            <ImageWithFallback
                              src={googlePlayButtonImg}
                              alt="Get it on Google Play"
                              className="h-14 w-auto"
                            />
                          </motion.button>
                        )}
                        {app.appStoreUrl && (
                          <motion.button
                            onClick={() => handleAppStoreClick(app.appStoreUrl, app.title)}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-pointer transition-shadow"
                            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }}
                          >
                            <ImageWithFallback
                              src={appStoreButtonImg}
                              alt="Download on the App Store"
                              className="h-14 w-auto"
                            />
                          </motion.button>
                        )}
                      </div>

                      <LearnMoreButton
                        to={handleAppNavigation(app.title)}
                        onNavigate={() => onAppClick?.(appMap[app.title])}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
