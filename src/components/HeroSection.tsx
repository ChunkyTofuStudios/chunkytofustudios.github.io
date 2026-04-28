import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import companyLogo from '../assets/cts_logo.png';
import beehiveHero from '../assets/beehive_hero.webp';
import dozyHero from '../assets/dozy_hero.webp';
import pbHero from '../assets/pixel_buddy_hero.webp';

export function HeroSection() {
  const scrollToTitles = () => {
    const el = document.querySelector('[data-section="titles"]');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cities = ["San Francisco", "Princeton", "Dublin", "Istanbul", "Mexico City", "Milan"];

  // Cursor parallax — phones subtly tilt toward the mouse. Springed so motion
  // feels organic, not robotic.
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const tiltY = useTransform(springX, [-1, 1], [-6, 6]);
  const tiltX = useTransform(springY, [-1, 1], [4, -4]);
  const driftX = useTransform(springX, [-1, 1], [-8, 8]);
  const driftY = useTransform(springY, [-1, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="min-h-screen flex flex-col justify-start items-center relative overflow-x-hidden bg-[#fafafa]">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 pt-28 pb-12 max-w-7xl relative z-10">
        {/* Top line - tagline ticker */}
        <motion.div
          className="overflow-hidden mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="flex items-center gap-8 text-sm text-gray-400 tracking-widest uppercase">
            <motion.div
              className="flex gap-8 whitespace-nowrap"
              animate={{ x: [0, -400] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(3)].map((_, i) => (
                <span key={i} className="flex items-center gap-8">
                  {cities.map((city) => (
                    <span key={`${i}-${city}`} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      {city}
                    </span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left - Typography */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black rounded-xl p-2">
                  <img src={companyLogo} alt="Chunky Tofu Studios" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm text-gray-500 tracking-wide uppercase">Chunky Tofu Studios</span>
              </div>

              <h1
                className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] text-gray-900 mb-8"
                style={{ fontWeight: 600 }}
              >
                {['Building', 'apps with'].map((word, i) => (
                  <motion.span
                    key={word}
                    className="block"
                    initial={{ opacity: 0, y: 40, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.12,
                      type: 'spring',
                      stiffness: 140,
                      damping: 12,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="block italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-[length:200%_auto]"
                  initial={{ opacity: 0, y: 50, rotate: -4, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    backgroundPosition: ["0% center", "200% center"],
                  }}
                  transition={{
                    opacity: { delay: 0.4, duration: 0.3 },
                    y: { delay: 0.4, type: 'spring', stiffness: 160, damping: 10 },
                    rotate: { delay: 0.4, type: 'spring', stiffness: 160, damping: 10 },
                    scale: { delay: 0.4, type: 'spring', stiffness: 160, damping: 10 },
                    backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
                  }}
                >
                  texture.
                </motion.span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mb-10">
                We're indie developers spread across six cities,
                crafting mobile experiences people actually love using.
              </p>

              {/* CTA row */}
              <div className="flex items-center gap-6 flex-wrap">
                <motion.button
                  onClick={scrollToTitles}
                  className="group flex items-center gap-3 bg-gray-900 text-white px-7 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <span>See our work</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    const el = document.querySelector('[data-section="team"]');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.92 }}
                >
                  Meet the team
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right - Mockup trio */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={stageRef}
              className="relative h-[440px] md:h-[520px]"
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
                rotateX: tiltX,
                rotateY: tiltY,
                x: driftX,
                y: driftY,
              }}
            >
              {/* Dozy - back left */}
              <Link
                to="/dozy"
                title="View Dozy"
                className="no-underline"
              >
                <motion.div
                  className="absolute left-[3%] top-[12%] w-[40%] z-10 cursor-pointer"
                  initial={{ opacity: 0, y: 60, rotateY: 12 }}
                  animate={{ opacity: 1, y: 0, rotateY: 12 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformStyle: 'preserve-3d',
                    filter: 'drop-shadow(0 24px 28px rgba(15, 23, 42, 0.18)) drop-shadow(0 4px 6px rgba(15, 23, 42, 0.08))',
                  }}
                >
                  <ImageWithFallback src={dozyHero} alt="Dozy commute companion app — iOS and Android" className="w-full h-auto" />
                </motion.div>
              </Link>

              {/* Beehive - center front */}
              <Link
                to="/beehive"
                title="View Beehive"
                className="no-underline"
              >
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-[-4%] w-[46%] z-20 cursor-pointer"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ImageWithFallback src={beehiveHero} alt="Beehive word puzzle game — iOS and Android" className="w-full h-auto" />
                </motion.div>
              </Link>

              {/* Pixel Buddy - back right */}
              <Link
                to="/pixel-buddy"
                title="View Pixel Buddy"
                className="no-underline"
              >
                <motion.div
                  className="absolute right-[3%] top-[22%] w-[40%] z-10 cursor-pointer"
                  initial={{ opacity: 0, y: 60, rotateY: -12 }}
                  animate={{ opacity: 1, y: 0, rotateY: -12 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformStyle: 'preserve-3d',
                    filter: 'drop-shadow(0 24px 28px rgba(15, 23, 42, 0.18)) drop-shadow(0 4px 6px rgba(15, 23, 42, 0.08))',
                  }}
                >
                  <ImageWithFallback src={pbHero} alt="Pixel Buddy pixel art coloring book — iOS and Android" className="w-full h-auto" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}
