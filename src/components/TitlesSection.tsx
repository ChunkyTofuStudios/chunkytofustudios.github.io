import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./ui/link-button";
import { SocialButton } from "./ui/social-button";
import { TikTokIcon } from "./ui/tiktok-icon";
import { useEmojiBurst } from "./ui/emoji-burst";
import { trackOutboundLink } from "../lib/analytics";

import dozyLogo from '../assets/dozy_logo.webp';
import pixelBuddyLogo from '../assets/pixel_buddy_logo.webp';
import beehiveLogo from '../assets/beehive_logo.webp';
import googlePlayButtonImg from '../assets/play_store_logo.png';
import appStoreButtonImg from '../assets/app_store_logo.png';

// 3 mocks per app
import beehive1 from '../assets/beehive_1.webp';
import beehive2 from '../assets/beehive_2.webp';
import beehive3 from '../assets/beehive_3.webp';
import pixelBuddy1 from '../assets/pixel_buddy_1.webp';
import pixelBuddy2 from '../assets/pixel_buddy_2.webp';
import pixelBuddy3 from '../assets/pixel_buddy_3.webp';
import dozy1 from '../assets/dozy_1.webp';
import dozy2 from '../assets/dozy_2.webp';
import dozy3 from '../assets/dozy_3.webp';

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
  // Brand accent used to tint the card background (2-3% wash).
  accentColor: string;
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
    accentColor: "#FBBC04",
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
    accentColor: "#3B82F6",
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
    category: "Transportation",
    accentColor: "#8B5CF6",
    socialMedia: {
      instagram: "https://www.instagram.com/dozyapp",
      tiktok: "https://www.tiktok.com/@dozyapp",
    }
  }
];


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
    screenshots[2] ?? screenshots[1] ?? screenshots[0],
    screenshots[1] ?? screenshots[0],
  ];

  return (
    <div
      className="relative w-full max-w-xl h-[440px] md:h-[520px] mx-auto"
      style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
    >
      {/* Left phone */}
      <motion.div
        className="absolute left-[3%] top-[12%] w-[40%] z-10"
        initial={{ opacity: 0, y: 40, rotateY: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 12 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -12, scale: 1.05, rotateY: 4, zIndex: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 20px 24px rgba(15, 23, 42, 0.18)) drop-shadow(0 4px 6px rgba(15, 23, 42, 0.08))',
        }}
      >
        <ImageWithFallback
          src={left}
          alt={`${title} screenshot 1`}
          className="w-full h-auto block"
        />
      </motion.div>

      {/* Center phone (front) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[-4%] w-[46%] z-20"
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
        className="absolute right-[3%] top-[22%] w-[40%] z-10"
        initial={{ opacity: 0, y: 40, rotateY: -12 }}
        whileInView={{ opacity: 1, y: 0, rotateY: -12 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        whileHover={{ y: -12, scale: 1.05, rotateY: -4, zIndex: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 20px 24px rgba(15, 23, 42, 0.18)) drop-shadow(0 4px 6px rgba(15, 23, 42, 0.08))',
        }}
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
        whileTap={{ scale: 0.92 }}
        className="group relative inline-flex items-center gap-2 pl-6 pr-5 py-3 rounded-full text-[15px] font-semibold tracking-tight"
        style={{
          color: '#ffffff',
          background: 'linear-gradient(180deg, #2a2a2d 0%, #1d1d1f 100%)',
          boxShadow:
            '0 10px 24px rgba(29, 29, 31, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.35)',
        }}
      >
        <span>{label}</span>
        <span
          aria-hidden
          className="inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1"
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </motion.span>
    </LinkButton>
  );
}

export function TitlesSection() {
  const { trigger: burst, overlay: burstOverlay } = useEmojiBurst();

  const handlePlayStoreClick = (e: React.MouseEvent, url: string, appName?: string) => {
    burst(e.clientX, e.clientY);
    trackOutboundLink(url, appName ? `${appName} - Google Play` : 'Google Play');
    window.setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 180);
  };

  const handleAppStoreClick = (e: React.MouseEvent, url: string, appName?: string) => {
    burst(e.clientX, e.clientY);
    trackOutboundLink(url, appName ? `${appName} - App Store` : 'App Store');
    window.setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 180);
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
      {burstOverlay}
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

        <div className="space-y-20">
          {apps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] px-6 py-16 lg:px-12 lg:py-20 overflow-hidden"
              style={{
                // Subtle brand wash — a diagonal gradient fading to transparent
                // so the card reads as "tinted white" rather than a colored block.
                background: `linear-gradient(135deg, ${app.accentColor}12 0%, ${app.accentColor}06 45%, transparent 85%)`,
              }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
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
                        <SocialButton
                          brand="instagram"
                          icon={Instagram}
                          href={app.socialMedia.instagram}
                          label={`${app.title} on Instagram`}
                        />
                      )}
                      {app.socialMedia.tiktok && (
                        <SocialButton
                          brand="tiktok"
                          icon={TikTokIcon}
                          href={app.socialMedia.tiktok}
                          label={`${app.title} on TikTok`}
                        />
                      )}
                      {/* Only show Discord for Beehive */}
                      {app.title === "Beehive" && app.socialMedia.discord && (
                        <SocialButton
                          brand="discord"
                          icon={MessageCircle}
                          href={app.socialMedia.discord}
                          label={`${app.title} on Discord`}
                        />
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="flex gap-3 sm:gap-4 items-center">
                        {app.playStoreUrl && (
                          <motion.button
                            onClick={(e) => handlePlayStoreClick(e, app.playStoreUrl, app.title)}
                            aria-label={`Download ${app.title} on Google Play`}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.92 }}
                            className="cursor-pointer transition-shadow"
                            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }}
                          >
                            <ImageWithFallback
                              src={googlePlayButtonImg}
                              alt=""
                              className="h-14 w-auto"
                            />
                          </motion.button>
                        )}
                        {app.appStoreUrl && (
                          <motion.button
                            onClick={(e) => handleAppStoreClick(e, app.appStoreUrl, app.title)}
                            aria-label={`Download ${app.title} on the App Store`}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.92 }}
                            className="cursor-pointer transition-shadow"
                            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }}
                          >
                            <ImageWithFallback
                              src={appStoreButtonImg}
                              alt=""
                              className="h-14 w-auto"
                            />
                          </motion.button>
                        )}
                      </div>

                      <LearnMoreButton to={handleAppNavigation(app.title)} />
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
