import { motion } from "motion/react";
import { Twitter, Github, Linkedin, ArrowRight, Code } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import companyLogo from '../assets/cts_logo.png';
import { LinkButton } from "./ui/link-button";
import { trackOutboundLink } from "../lib/analytics";

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface FooterProps {
  onAppClick?: (app: AppPage) => void;
}

export function Footer({ onAppClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/chunky-tofu-studios/",
      label: "LinkedIn Profile",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      icon: Twitter,
      href: "https://x.com/Chunky_Tofu",
      label: "X/Twitter Profile",
      hoverColor: "hover:from-blue-400 hover:to-cyan-500"
    },
    {
      icon: Github,
      href: "https://github.com/ChunkyTofuStudios",
      label: "GitHub Organization",
      hoverColor: "hover:from-gray-600 hover:to-gray-800"
    },
  ];

  const handleAppClick = (appPage: AppPage) => {
    if (onAppClick) {
      onAppClick(appPage);
    }
  };

  const handleSocialClick = (url: string, label?: string) => {
    trackOutboundLink(url, label);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          >
            🎨
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl p-2 bg-black"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src={companyLogo}
                  alt="Chunky Tofu Studios"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <span className="text-lg text-white">Chunky Tofu Studios</span>
            </div>

            {/* Updated motto */}
            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl px-4 py-2 mb-4 inline-block border border-purple-400/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-purple-200 font-medium">
                Building apps with texture
              </p>
            </motion.div>

            <p className="text-gray-400 leading-relaxed mb-6">
              Group of indie developers spread across six cities worldwide, creating delightful mobile experiences that users absolutely love.
            </p>

            {/* Location indicators */}
            <div className="flex flex-wrap gap-2">
              {[
                { city: "SF", flag: "🇺🇸" },
                { city: "Princeton", flag: "🇺🇸" },
                { city: "Dublin", flag: "🇮🇪" },
                { city: "Istanbul", flag: "🇹🇷" },
                { city: "Mexico City", flag: "🇲🇽" },
                { city: "Milan", flag: "🇮🇹" }
              ].map((location, index) => (
                <motion.div
                  key={location.city}
                  className="bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.8)" }}
                >
                  <span className="text-xs text-gray-300">
                    {location.flag} {location.city}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <h4 className="text-lg mb-6 text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Mobile App Development",
                "UI/UX based on UXR",
                "Cross-Platform Solutions",
                "Open Source Libraries"
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <h4 className="text-lg mb-6 text-white flex items-center gap-2">
              📱 Our Titles
            </h4>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <LinkButton
                  to="/dozy"
                  onNavigate={() => handleAppClick('dozy')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2 no-underline"
                >
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  Dozy
                </LinkButton>
              </motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <LinkButton
                  to="/pixel-buddy"
                  onNavigate={() => handleAppClick('pixel-buddy')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2 no-underline"
                >
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Pixel Buddy
                </LinkButton>
              </motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <LinkButton
                  to="/beehive"
                  onNavigate={() => handleAppClick('beehive')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2 no-underline"
                >
                  <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                  Beehive
                </LinkButton>
              </motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <button
                  onClick={() => {
                    const url = 'https://play.google.com/store/apps/developer?id=Chunky+Tofu+Studios';
                    trackOutboundLink(url, 'View All Apps');
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2"
                >
                  <ArrowRight className="w-3 h-3" />
                  View All Apps
                </button>
              </motion.li>
            </ul>
          </motion.div>

        </div>

        <motion.div
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social links on the left */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label, hoverColor }, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSocialClick(href, label)}
                  title={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-gray-800 hover:bg-gradient-to-r ${hoverColor} rounded-xl flex items-center justify-center transition-all duration-200`}
                >
                  <Icon className="w-5 h-5 text-gray-300" />
                </motion.button>
              ))}
            </div>

            {/* Copyright on the right */}
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Chunky Tofu Studios. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}