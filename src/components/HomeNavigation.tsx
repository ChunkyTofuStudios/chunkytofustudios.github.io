import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./ui/link-button";

export function HomeNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ['services', 'titles', 'opensource', 'values', 'team', 'contact'];
      for (const section of sections) {
        const element = document.querySelector(`[data-section="${section}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', onClick: scrollToTop },
    { id: 'services', label: 'Services', onClick: () => scrollToSection('services') },
    { id: 'titles', label: 'Titles', onClick: () => scrollToSection('titles') },
    { id: 'opensource', label: 'Open Source', onClick: () => scrollToSection('opensource') },
    { id: 'values', label: 'Values', onClick: () => scrollToSection('values') },
    { id: 'team', label: 'Team', onClick: () => scrollToSection('team') },
    { id: 'contact', label: 'Contact', onClick: () => scrollToSection('contact') },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0,
          opacity: 1,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)'
        }}
        transition={{ 
          y: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.5 },
          backgroundColor: { duration: 0.3, ease: "easeInOut" }
        }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
          borderBottom: isScrolled ? '1px solid rgba(209, 213, 219, 0.6)' : '1px solid rgba(229, 231, 235, 0.4)',
          boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <LinkButton
              to="/"
              onNavigate={scrollToTop}
              className="flex items-center gap-3 cursor-pointer no-underline"
            >
              <motion.span
                className={`text-lg font-semibold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Chunky Tofu Studios
              </motion.span>
            </LinkButton>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={item.onClick}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === item.id || (item.id === 'home' && !activeSection)
                      ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg'
                      : isScrolled
                      ? 'text-gray-900 hover:text-purple-600 hover:bg-white hover:shadow-md'
                      : 'text-gray-800 hover:text-purple-600 hover:bg-white/90 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-900 hover:text-purple-600 hover:bg-white/60"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-300/50 backdrop-blur-lg shadow-lg bg-white/95"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={item.onClick}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeSection === item.id || (item.id === 'home' && !activeSection)
                        ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg'
                        : 'text-gray-900 hover:text-purple-600 hover:bg-white hover:shadow-md'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

