import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LinkButton } from "./ui/link-button";

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
  // Back goes to home if on app page, otherwise goes to app page
  const backPath = isOnAppPage ? '/' : `/${appSlug}`;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(33, 33, 33, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(55, 65, 81, 0.6)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <LinkButton
              to={backPath}
              className="no-underline"
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </LinkButton>
            <LinkButton
              to={`/${appSlug}`}
              className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity"
            >
              <ImageWithFallback
                src={appLogo}
                alt={`${appName} Logo`}
                className="w-10 h-10 rounded-xl shadow-lg object-contain"
              />
              <span className="text-xl font-semibold text-white">{appName}</span>
            </LinkButton>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navPages.map((page) => {
              const isActive = isCurrentPage(page.path);
              return (
                <LinkButton
                  key={page.path}
                  to={page.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline ${isActive
                      ? 'text-white bg-gray-600/60'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-md'
                    }`}
                >
                  {page.label}
                </LinkButton>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

