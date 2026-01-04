import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { LinkButton } from "./ui/link-button";
import { useIsNarrowScreen } from "./ui/use-mobile";
import { useNavigate, useLocation } from "react-router-dom";

export function HomeNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isMobile = useIsNarrowScreen();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      let foundSection = '';
      for (const section of navItems.map((item) => item.id)) {
        const element = document.querySelector(`[data-section="${section}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            foundSection = section;
            break;
          }
        }
      }
      setActiveSection(foundSection);
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

  const handleNavigationClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);

    // Check if we're on the home page
    const isOnHomePage = location.pathname === '/';

    if (sectionId === 'home') {
      if (isOnHomePage) {
        scrollToTop();
      } else {
        navigate('/');
      }
    } else {
      if (isOnHomePage) {
        // Already on home, just scroll to section
        scrollToSection(sectionId);
      } else {
        // Navigate to home first, then scroll to section after navigation
        navigate('/');
        // Wait for navigation and render, then scroll
        setTimeout(() => {
          const element = document.querySelector(`[data-section="${sectionId}"]`);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'titles', label: 'Titles' },
    { id: 'opensource', label: 'Open Source' },
    { id: 'values', label: 'Values' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      style={{
        // Use inline styles for critical positioning to ensure they work
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        backgroundColor: isScrolled ? 'rgba(33, 33, 33, 0.88)' : 'rgba(33, 33, 33, 0.95)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(8px)',
        borderBottom: isScrolled ? '1px solid rgba(55, 65, 81, 0.6)' : '1px solid rgba(55, 65, 81, 0.4)',
        boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LinkButton
            to="/"
            className="flex items-center gap-3 cursor-pointer no-underline"
          >
            <motion.span
              className="text-lg font-semibold transition-colors duration-300 text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Chunky Tofu Studios
            </motion.span>
          </LinkButton>

          {/* Desktop Navigation - Only rendered on desktop */}
          {!isMobile && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigationClick(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === item.id
                    ? 'text-white bg-gray-600/60'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-md'
                    }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          )}

          {/* Mobile Menu Button - Only rendered on mobile */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-purple-400 hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Only shown on mobile when open */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-700/50 backdrop-blur-lg shadow-lg bg-gray-900/95"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigationClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === item.id || (item.id === 'home' && !activeSection)
                    ? 'text-white bg-gray-600/60'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-md'
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
    </header>
  );
}

