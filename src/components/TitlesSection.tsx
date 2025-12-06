import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Apple Icon Component
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
  </svg>
);

import dozyLogo from '../assets/dozy_logo.png';
import pixelBuddyLogo from '../assets/pixel_buddy_logo.png';
import beehiveLogo from '../assets/beehive_logo.png';
import dozyScreenshot from '../assets/dozy_ss.png';
import beehiveScreenshot from '../assets/beehive_ss.png';
import pixelBuddyScreenshot from '../assets/pixel_buddy_ss.png';
import googlePlayButtonImg from '../assets/play_store_logo.png';
import appStoreButtonImg from '../assets/app_store_logo.png';

const apps = [
  {
    title: "Beehive",
    description: "A strategic word puzzle game. Build your vocabulary with challenging daily puzzles and hexagonal gameplay.",
    logo: beehiveLogo,
    screenshot: beehiveScreenshot,
    tags: ["Flutter", "Puzzle", "Word Game"],
    platform: "iOS & Android",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.beehive&utm_source=cts&utm_medium=web&utm_campaign=landingpage",
    appStoreUrl: "https://testflight.apple.com/join/5WeUgnQ1",
    gradient: "from-yellow-500 to-orange-600",
    category: "Games",
    color: "orange",
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
    screenshot: pixelBuddyScreenshot,
    tags: ["Flutter", "Coloring Book", "Pixel Art"],
    platform: "iOS & Android",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.pixel_buddy&utm_source=cts&utm_medium=web&utm_campaign=landingpage",
    appStoreUrl: "https://apps.apple.com/us/app/pixel-buddy-coloring-book/id6451399345?uo=4",
    gradient: "from-green-500 to-blue-600",
    category: "Games",
    color: "blue",
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
    screenshot: dozyScreenshot,
    tags: ["Flutter", "Public Transit", "Productivity"],
    platform: "iOS & Android",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.destiwake&utm_source=cts&utm_medium=web&utm_campaign=landingpage",
    appStoreUrl: "https://apps.apple.com/app/apple-store/id6736437794?pt=106088813&ct=landingpage&mt=8",
    gradient: "from-indigo-500 to-purple-600",
    category: "Utilities",
    color: "purple",
    socialMedia: {
      instagram: "https://www.instagram.com/dozyapp",
      tiktok: "https://www.tiktok.com/@dozyapp",
    }
  }
];

const colorSchemes = {
  purple: "from-purple-500/10 to-pink-500/10",
  blue: "from-blue-500/10 to-cyan-500/10",
  orange: "from-orange-500/10 to-red-500/10"
};

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface TitlesSectionProps {
  onAppClick?: (app: AppPage) => void;
}

export function TitlesSection({ onAppClick }: TitlesSectionProps) {
  const handlePlayStoreClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAppStoreClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAppNavigation = (appTitle: string) => {
    if (!onAppClick) return;
    
    const appMap: Record<string, AppPage> = {
      'Beehive': 'beehive',
      'Pixel Buddy': 'pixel-buddy',
      'Dozy': 'dozy'
    };
    
    const appKey = appMap[appTitle];
    if (appKey) {
      onAppClick(appKey);
    }
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
                {/* App Mockup */}
                <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`${app.title === 'Pixel Buddy' ? 'max-w-xl' : 'max-w-lg'}`}>
                    <ImageWithFallback 
                      src={app.screenshot} 
                      alt={`${app.title} app mockup`}
                      className={`${app.title === 'Pixel Buddy' ? 'w-[50%]' : 'w-[60%]'} h-auto mx-auto ${app.title === 'Pixel Buddy' ? 'drop-shadow-2xl' : 'drop-shadow-2xl'}`}
                      style={app.title === 'Pixel Buddy' ? { filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.35))' } : undefined}
                    />
                  </div>
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
                      {/* Only show Discord for Beehive */}
                      {app.title === "Beehive" && (
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
                    <div className="flex gap-4 flex-wrap items-center">
                      {app.playStoreUrl && (
                        <motion.button
                          onClick={() => handlePlayStoreClick(app.playStoreUrl)}
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
                      )}
                      {app.appStoreUrl && (
                        <motion.button
                          onClick={() => handleAppStoreClick(app.appStoreUrl)}
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
                      )}
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          size="lg"
                          onClick={() => handleAppNavigation(app.title)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-2xl border-0 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                        >
                          <ArrowRight className="w-5 h-5 mr-2" />
                          Learn More
                        </Button>
                      </motion.div>
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