import { motion } from "motion/react";
import { ArrowUpRight, Mail, Linkedin, Twitter, Github, Gamepad2, Newspaper, Briefcase, HeartHandshake } from "lucide-react";
import { HomeNavigation } from "../HomeNavigation";
import { Footer } from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { trackOutboundLink } from "../../lib/analytics";
import { SocialButton, type SocialBrand } from "../ui/social-button";

import photo1 from "../../assets/team_photo/1.webp";
import photo2 from "../../assets/team_photo/2.webp";
import photo3 from "../../assets/team_photo/3.webp";
import photo4 from "../../assets/team_photo/4.webp";
import photo5 from "../../assets/team_photo/5.webp";
import photo6 from "../../assets/team_photo/6.webp";
import photo7 from "../../assets/team_photo/7.webp";
import photo8 from "../../assets/team_photo/8.webp";

const teamPhotos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

type AppPage = "home" | "beehive" | "pixel-buddy" | "dozy";

const socialLinks: Array<{
  brand: SocialBrand;
  icon: typeof Linkedin;
  label: string;
  href: string;
}> = [
  {
    brand: 'linkedin',
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/chunky-tofu-studios/",
  },
  {
    brand: 'twitter',
    icon: Twitter,
    label: "X / Twitter",
    href: "https://x.com/Chunky_Tofu",
  },
  {
    brand: 'github',
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ChunkyTofuStudios",
  },
];

const contactEntries = [
  {
    icon: Mail,
    title: "General",
    description: "Got something to say? Drop us a line.",
    action: { label: "hello@chunkytofustudios.com", href: "mailto:hello@chunkytofustudios.com" },
  },
  {
    icon: Gamepad2,
    title: "App Support",
    description: "Having trouble with one of our apps? Visit the support page for your app.",
    links: [
      { label: "Beehive Support", href: "/beehive" },
      { label: "Pixel Buddy Support", href: "/pixel-buddy" },
      { label: "Dozy Support", href: "/dozy" },
    ],
  },
  {
    icon: Newspaper,
    title: "Press & Media",
    description: "For press inquiries, interviews, or media requests.",
    action: { label: "press@chunkytofustudios.com", href: "mailto:press@chunkytofustudios.com" },
  },
  {
    icon: HeartHandshake,
    title: "Publishing",
    description: "Interested in publishing with us? Get in touch.",
    action: { label: "publishing@chunkytofustudios.com", href: "mailto:publishing@chunkytofustudios.com" },
  },
  {
    icon: Briefcase,
    title: "Careers",
    description: "Want to join the team? Check out open roles on LinkedIn.",
    action: {
      label: "View Open Roles",
      href: "https://www.linkedin.com/company/chunky-tofu-studios/jobs/",
      external: true,
    },
  },
];

export function ContactPage() {
  const navigate = useNavigate();

  const navigateToApp = (app: AppPage) => {
    if (app === "home") navigate("/");
    else navigate(`/${app}`);
  };

  const trackExternal = (href: string, label?: string) => {
    trackOutboundLink(href, label);
  };

  return (
    <div className="min-h-screen bg-white">
      <HomeNavigation />

      {/* Hero — scrolling team carousel as blurred background */}
      {/* mt-16 pushes the hero fully below the fixed nav bar */}
      <div className="relative overflow-hidden mt-10 min-h-[220px] md:min-h-[330px]" style={{ backgroundColor: "#151515" }}>
        {/* Background: auto-scrolling carousel, blurred */}
        {/* Tiles are scaled to fill the container height: 320px tall, width = 320 * (344/214) ≈ 515px */}
        <div className="absolute inset-0 flex" style={{ filter: "blur(2px)", transform: "scale(1.05)" }}>
          <motion.div
            className="flex gap-4"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            {[...teamPhotos, ...teamPhotos].map((src, i) => (
              <div
                key={`${i < teamPhotos.length ? "a" : "b"}-${i % teamPhotos.length}`}
                className="shrink-0 overflow-hidden"
                style={{ width: 515, height: 320 }}
              >
                <img
                  src={src}
                  alt={`Team member ${(i % teamPhotos.length) + 1}`}
                  className="w-full h-full"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(21, 21, 21, 0.3)" }} />

        {/* Foreground: heading */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            We'd be happy to hear from you!
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl py-16">

        {/* Social links — front and center */}
        <motion.div
          className="flex justify-center gap-4 mb-16 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {socialLinks.map(({ brand, icon, label, href }) => (
            <SocialButton
              key={label}
              brand={brand}
              icon={icon}
              href={href}
              label={label}
              size="lg"
              showLabel
              onClick={() => trackExternal(href, label)}
            />
          ))}
        </motion.div>

        {/* Contact entries */}
        <div className="space-y-6">
          {contactEntries.map((entry, index) => (
            <motion.div
              key={entry.title}
              className="flex gap-5 p-6 rounded-3xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-11 h-11 shrink-0 bg-gray-900 rounded-2xl flex items-center justify-center mt-0.5">
                <entry.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{entry.title}</h2>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{entry.description}</p>
                {"action" in entry && entry.action && (
                  entry.action.external ? (
                    <a
                      href={entry.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        const action = entry.action;
                        if (action) trackExternal(action.href, action.label);
                      }}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      {entry.action.label}
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <a
                      href={entry.action.href}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      {entry.action.label}
                    </a>
                  )
                )}
                {"links" in entry && entry.links && (
                  <div className="flex flex-wrap gap-3">
                    {entry.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer onAppClick={navigateToApp} />
    </div>
  );
}
