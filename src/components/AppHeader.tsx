import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./ui/link-button";
import { motion } from "motion/react";

interface AppHeaderProps {
  appSlug: string;
  appName: string;
  appLogo: string;
}

export function AppHeader({ appSlug, appName, appLogo }: AppHeaderProps) {
  const location = useLocation();

  const navPages = [
    { path: `/${appSlug}/data-safety`, label: 'Data Safety' },
    { path: `/${appSlug}/privacy-policy`, label: 'Privacy Policy' },
    { path: `/${appSlug}/terms-and-conditions`, label: 'Terms & Conditions' },
  ];

  const isCurrentPage = (path: string) => location.pathname === path;

  // Determine if we're on the main app page or a subpage
  const isOnAppPage = location.pathname === `/${appSlug}` || location.pathname === `/${appSlug}/`;
  const backPath = isOnAppPage ? '/' : `/${appSlug}`;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        pointerEvents: 'none',
        paddingTop: '12px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow:
            '0 8px 32px rgba(29, 29, 31, 0.08), 0 2px 8px rgba(29, 29, 31, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        }}
      >
        <div className="px-3 sm:px-5">
          <div className="flex items-center justify-between h-14 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <LinkButton to={backPath} className="no-underline">
                <motion.button
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors"
                  style={{
                    color: '#4a4a4f',
                    background: 'rgba(29, 29, 31, 0.04)',
                    border: '1px solid rgba(29, 29, 31, 0.06)',
                  }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </motion.button>
              </LinkButton>

              <LinkButton
                to={`/${appSlug}`}
                className="flex items-center gap-2 no-underline hover:opacity-90 transition-opacity min-w-0"
              >
                <ImageWithFallback
                  src={appLogo}
                  alt={`${appName} Logo`}
                  className="w-8 h-8 rounded-xl shadow-sm object-contain shrink-0"
                />
                <span
                  className="text-[15px] font-semibold tracking-tight truncate"
                  style={{ color: '#1d1d1f' }}
                >
                  {appName}
                </span>
              </LinkButton>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navPages.map((page) => {
                const isActive = isCurrentPage(page.path);
                return (
                  <LinkButton
                    key={page.path}
                    to={page.path}
                    className="no-underline"
                  >
                    <motion.span
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-block px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200"
                      style={{
                        color: isActive ? '#1d1d1f' : '#4a4a4f',
                        background: isActive ? 'rgba(29, 29, 31, 0.06)' : 'transparent',
                        border: isActive
                          ? '1px solid rgba(29, 29, 31, 0.08)'
                          : '1px solid transparent',
                        boxShadow: isActive ? 'inset 0 1px 0 rgba(255, 255, 255, 0.6)' : 'none',
                      }}
                    >
                      {page.label}
                    </motion.span>
                  </LinkButton>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
