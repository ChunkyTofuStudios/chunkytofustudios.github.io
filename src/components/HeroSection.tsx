import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ChevronDown, Smartphone, ArrowRight, Zap, Star, Sparkles, Heart, Code } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import companyLogo from 'figma:asset/aa55f8629a4c518a9b5e7b51719f1e3ccbca2804.png';
import appsMockup from 'figma:asset/116035988358f04c3cc9352d02d16def93847856.png';

type AppPage = 'home' | 'beehive' | 'pixelbuddy' | 'dozy';

interface HeroSectionProps {
  onAppClick?: (app: AppPage) => void;
}

export function HeroSection({ onAppClick }: HeroSectionProps) {
  const scrollToServices = () => {
    const servicesSection = document.querySelector('[data-section="services"]');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewApps = () => {
    window.open('https://play.google.com/store/apps/developer?id=Chunky+Tofu+Studios', '_blank', 'noopener,noreferrer');
  };

  const handleContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gray-50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [180, 270, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Icons - Updated with texture theme */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            {['📱', '🎨', '⚡', '🌟', '💫', '🔥', '💎', '✨'][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left lg:text-left"
          >
            {/* Logo and company name */}
            <motion.div
              className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="w-16 h-16 bg-black rounded-3xl shadow-lg p-3"
                whileHover={{ scale: 1.1, rotate: 10 }}
                animate={{
                  boxShadow: ["0 4px 20px rgba(0, 0, 0, 0.08)", "0 8px 30px rgba(0, 0, 0, 0.12)", "0 4px 20px rgba(0, 0, 0, 0.08)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img 
                  src={companyLogo} 
                  alt="Chunky Tofu Studios" 
                  className="w-full h-full object-contain scale-125"
                />
              </motion.div>
              <div>
                <h1 className="text-2xl text-gray-900 tracking-tight font-medium">Chunky Tofu Studios</h1>
                <div className="flex items-center gap-1 text-gray-600">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-medium">Indie Mobile Developers</span>
                  <Heart className="w-4 h-4 fill-current text-red-500 ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Motto */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >

            </motion.div>

            {/* Main headline - UPDATED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-6xl md:text-7xl lg:text-8xl text-gray-900 tracking-tight leading-none mb-6 font-semibold">
                Building apps
                <br />
                with texture
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                We're a group of <span className="text-gray-900 font-medium">indie developers</span> spread across 
                <span className="text-gray-900 font-medium"> six cities worldwide</span>, 
                creating delightful mobile experiences that users absolutely love.
              </p>
            </motion.div>

            {/* Location badges */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {[
                { city: "San Francisco", flag: "🇺🇸", color: "from-blue-500/10 to-blue-600/10 border-blue-200" },
                { city: "Princeton", flag: "🇺🇸", color: "from-green-500/10 to-green-600/10 border-green-200" },
                { city: "Dublin", flag: "🇮🇪", color: "from-orange-500/10 to-orange-600/10 border-orange-200" },
                { city: "Istanbul", flag: "🇹🇷", color: "from-red-500/10 to-red-600/10 border-red-200" },
                { city: "Mexico City", flag: "🇲🇽", color: "from-purple-500/10 to-purple-600/10 border-purple-200" },
                { city: "Milan", flag: "🇮🇹", color: "from-indigo-500/10 to-indigo-600/10 border-indigo-200" }
              ].map((location, index) => (
                <motion.div
                  key={location.city}
                  className="glass px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05, y: -2 }}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" },
                    scale: { duration: 0.2 }
                  }}
                >
                  <span className="text-sm font-medium text-gray-700">
                    {location.flag} {location.city}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: ["0 0 20px rgba(147, 51, 234, 0.4)", "0 0 40px rgba(147, 51, 234, 0.6)", "0 0 20px rgba(147, 51, 234, 0.4)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl border-0 transition-all duration-300 font-medium group relative overflow-hidden"
                  onClick={() => {
                    const portfolioSection = document.querySelector('[data-section="portfolio"]');
                    if (portfolioSection) {
                      portfolioSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Our Apps
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass border border-gray-200 text-gray-900 hover:bg-gray-50 px-8 py-4 text-lg rounded-2xl transition-all duration-200 font-medium"
                  onClick={() => {
                    const contactSection = document.querySelector('[data-section="contact"]');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Work With Us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative flex justify-center items-center">
              {/* Apps Mockup Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative max-w-5xl mx-auto scale-130"
              >
                <ImageWithFallback 
                  src={appsMockup}
                  alt="Chunky Tofu Studios mobile apps mockup - BeeHive, Pixel Buddy, and Dozy"
                  className="w-full h-auto drop-shadow-2xl"
                />
                
                {/* Interactive overlay areas for each app */}
                <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4">
                  {/* BeeHive - Left phone */}
                  <div 
                    className="cursor-pointer rounded-3xl hover:bg-yellow-500/10 transition-colors duration-300"
                    onClick={() => onAppClick ? onAppClick('beehive') : window.open('https://play.google.com/store/apps/details?id=com.chunkytofustudios.beehive&hl=en_IE', '_blank')}
                    title="View BeeHive"
                  />
                  
                  {/* Pixel Buddy - Center phone */}
                  <div 
                    className="cursor-pointer rounded-3xl hover:bg-blue-500/10 transition-colors duration-300"
                    onClick={() => onAppClick ? onAppClick('pixelbuddy') : window.open('https://play.google.com/store/apps/details?id=com.chunkytofustudios.pixel_buddy&hl=en_IE', '_blank')}
                    title="View Pixel Buddy"
                  />
                  
                  {/* Dozy - Right phone */}
                  <div 
                    className="cursor-pointer rounded-3xl hover:bg-purple-500/10 transition-colors duration-300"
                    onClick={() => onAppClick ? onAppClick('dozy') : window.open('https://play.google.com/store/apps/details?id=com.chunkytofustudios.destiwake&hl=en_IE', '_blank')}
                    title="View Dozy"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Energetic Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full p-4 shadow-xl border border-white/20"
        animate={{ 
          y: [0, 12, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToServices}
        whileHover={{ scale: 1.2, rotate: 5 }}
      >
        <ChevronDown className="w-6 h-6 text-purple-600" />
      </motion.button>
    </section>
  );
}