import { useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Twitter, Github, Linkedin, ArrowRight, Building2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import companyLogo from '../assets/cts_logo.png';
import beehiveLogo from '../assets/beehive_logo.webp';
import pixelBuddyLogo from '../assets/pixel_buddy_logo.webp';
import dozyLogo from '../assets/dozy_logo.webp';
import { LinkButton } from "./ui/link-button";
import { SocialButton, type SocialBrand } from "./ui/social-button";
import { trackOutboundLink } from "../lib/analytics";

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface FooterProps {
  onAppClick?: (app: AppPage) => void;
}

export function Footer({ onAppClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // Subtle floating pattern of app logos in the footer background.
  // Positions randomized once per mount so they don't reshuffle on re-render.
  const appLogos = [beehiveLogo, pixelBuddyLogo, dozyLogo];
  const floatingLogos = useMemo(
    () => Array.from({ length: 9 }, (_, i) => ({
      src: appLogos[i % appLogos.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 48 + Math.round(Math.random() * 40),
    })),
    // appLogos is module-scoped (constant refs), so mount-only is correct.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const socialLinks: Array<{ brand: SocialBrand; icon: typeof Linkedin; href: string; label: string }> = [
    { brand: 'linkedin', icon: Linkedin, href: "https://www.linkedin.com/company/chunky-tofu-studios/", label: "LinkedIn Profile" },
    { brand: 'twitter', icon: Twitter, href: "https://x.com/Chunky_Tofu", label: "X/Twitter Profile" },
    { brand: 'github', icon: Github, href: "https://github.com/ChunkyTofuStudios", label: "GitHub Organization" },
  ];

  const handleAppClick = (appPage: AppPage) => {
    if (onAppClick) {
      onAppClick(appPage);
    } else {
      navigate(appPage === 'home' ? '/' : `/${appPage}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
      {/* Background — drifting pattern of app logos at low opacity */}
      <div className="absolute inset-0" aria-hidden>
        {floatingLogos.map((logo, i) => (
          <motion.img
            key={i}
            src={logo.src}
            alt=""
            className="absolute rounded-2xl opacity-[0.06]"
            style={{
              left: logo.left,
              top: logo.top,
              width: logo.size,
              height: logo.size,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 14 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
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
              className="bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-2xl px-4 py-2 mb-4 inline-block border border-purple-400/30"
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
              ].map((location, _) => (
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
              <Building2 className="w-5 h-5" />
              Company
            </h4>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <LinkButton
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2 no-underline"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Contact Us
                </LinkButton>
              </motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <button
                  type="button"
                  onClick={() => {
                    const url = 'https://www.linkedin.com/company/chunky-tofu-studios/jobs/';
                    trackOutboundLink(url, 'Careers');
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Careers
                </button>
              </motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <button
                  type="button"
                  onClick={() => {
                    const url = 'https://github.com/ChunkyTofuStudios';
                    trackOutboundLink(url, 'Open Source');
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  Open Source
                </button>
              </motion.li>
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
                  aria-label="View all apps by Chunky Tofu Studios on Google Play"
                  onClick={() => {
                    const url = 'https://play.google.com/store/apps/developer?id=Chunky+Tofu+Studios';
                    trackOutboundLink(url, 'View All Apps');
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="group text-gray-400 hover:text-white transition-colors duration-200 text-sm text-left flex items-center gap-2"
                >
                  View All Apps
                  <ArrowRight
                    className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
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
              {socialLinks.map(({ brand, icon, href, label }) => (
                <SocialButton
                  key={brand}
                  brand={brand}
                  icon={icon}
                  href={href}
                  label={label}
                  onClick={() => trackOutboundLink(href, label)}
                />
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