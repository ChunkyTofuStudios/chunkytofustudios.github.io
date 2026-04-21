import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      const offset = 96; // Account for floating navbar + top gap
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

    const isOnHomePage = location.pathname === '/';

    if (sectionId === 'home') {
      if (isOnHomePage) {
        scrollToTop();
      } else {
        navigate('/');
      }
    } else {
      if (isOnHomePage) {
        scrollToSection(sectionId);
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(`[data-section="${sectionId}"]`);
          if (element) {
            const offset = 96;
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
    { id: 'titles', label: 'Titles' },
    { id: 'opensource', label: 'Open Source' },
    { id: 'values', label: 'Values' },
    { id: 'team', label: 'Team' },
  ];

  // Glassmorphic styles — tuned to match the #fafafa Apple-style homepage
  const glassBackground = isScrolled
    ? 'rgba(255, 255, 255, 0.65)'
    : 'rgba(255, 255, 255, 0.5)';
  const glassBlur = isScrolled ? 'blur(24px) saturate(180%)' : 'blur(18px) saturate(160%)';
  const glassBorder = isScrolled
    ? '1px solid rgba(255, 255, 255, 0.7)'
    : '1px solid rgba(255, 255, 255, 0.55)';
  const glassShadow = isScrolled
    ? '0 8px 32px rgba(29, 29, 31, 0.08), 0 2px 8px rgba(29, 29, 31, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
    : '0 4px 20px rgba(29, 29, 31, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        pointerEvents: 'none', // let clicks fall through around the pill
        paddingTop: isScrolled ? '12px' : '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        transition: 'padding 0.3s ease',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto', // re-enable within the pill
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '9999px',
          background: glassBackground,
          backdropFilter: glassBlur,
          WebkitBackdropFilter: glassBlur,
          border: glassBorder,
          boxShadow: glassShadow,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease',
        }}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <LinkButton
              to="/"
              className="flex items-center gap-2 cursor-pointer no-underline"
            >
              <motion.span
                className="text-[15px] font-semibold tracking-tight"
                style={{ color: '#1d1d1f' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Chunky Tofu Studios
              </motion.span>
            </LinkButton>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex items-center gap-1 relative">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigationClick(item.id)}
                      className="relative px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200"
                      style={{
                        color: isActive ? '#1d1d1f' : '#4a4a4f',
                      }}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'rgba(29, 29, 31, 0.06)',
                            border: '1px solid rgba(29, 29, 31, 0.08)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full transition-colors"
                style={{
                  color: '#1d1d1f',
                  background: isMobileMenuOpen ? 'rgba(29, 29, 31, 0.06)' : 'transparent',
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                borderTop: '1px solid rgba(29, 29, 31, 0.08)',
                overflow: 'hidden',
              }}
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    activeSection === item.id || (item.id === 'home' && !activeSection);
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigationClick(item.id)}
                      className="w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                      style={{
                        color: isActive ? '#1d1d1f' : '#4a4a4f',
                        background: isActive ? 'rgba(29, 29, 31, 0.06)' : 'transparent',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
