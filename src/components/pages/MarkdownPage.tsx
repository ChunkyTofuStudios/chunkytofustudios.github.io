import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../Footer';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { LinkButton } from '../ui/link-button';

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';
type PageType = 'terms-and-conditions' | 'privacy-policy' | 'data-safety';

interface MarkdownPageProps {
  app: AppPage;
  pageType: PageType;
  appLogo: string;
  appName: string;
  themeColor: 'blue' | 'purple' | 'yellow';
  onBack?: () => void;
  onAppClick?: (app: AppPage) => void;
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-50 via-white to-purple-50',
    border: 'border-blue-200/50',
    hover: 'hover:text-blue-600',
    active: 'bg-blue-600 text-white',
  },
  purple: {
    gradient: 'from-purple-50 via-white to-indigo-50',
    border: 'border-purple-200/50',
    hover: 'hover:text-purple-600',
    active: 'bg-purple-600 text-white',
  },
  yellow: {
    gradient: 'from-yellow-50 via-white to-orange-50',
    border: 'border-orange-200/50',
    hover: 'hover:text-orange-600',
    active: 'bg-orange-600 text-white',
  },
};

const pageTitles: Record<PageType, string> = {
  'terms-and-conditions': 'Terms & Conditions',
  'privacy-policy': 'Privacy Policy',
  'data-safety': 'Data Safety',
};

export function MarkdownPage({
  app,
  pageType,
  appLogo,
  appName,
  themeColor,
  onBack,
  onAppClick,
}: MarkdownPageProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const colors = colorClasses[themeColor];

  const allPages: PageType[] = ['data-safety', 'privacy-policy', 'terms-and-conditions'];

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Import markdown files dynamically
        let content = '';
        
        if (app === 'pixel-buddy') {
          if (pageType === 'terms-and-conditions') {
            content = (await import('../../content/pixel-buddy/terms-and-conditions.md?raw')).default;
          } else if (pageType === 'privacy-policy') {
            content = (await import('../../content/pixel-buddy/privacy-policy.md?raw')).default;
          } else if (pageType === 'data-safety') {
            content = (await import('../../content/pixel-buddy/data-safety.md?raw')).default;
          }
        } else if (app === 'dozy') {
          if (pageType === 'terms-and-conditions') {
            content = (await import('../../content/dozy/terms-and-conditions.md?raw')).default;
          } else if (pageType === 'privacy-policy') {
            content = (await import('../../content/dozy/privacy-policy.md?raw')).default;
          } else if (pageType === 'data-safety') {
            content = (await import('../../content/dozy/data-safety.md?raw')).default;
          }
        } else if (app === 'beehive') {
          if (pageType === 'terms-and-conditions') {
            content = (await import('../../content/beehive/terms-and-conditions.md?raw')).default;
          } else if (pageType === 'privacy-policy') {
            content = (await import('../../content/beehive/privacy-policy.md?raw')).default;
          } else if (pageType === 'data-safety') {
            content = (await import('../../content/beehive/data-safety.md?raw')).default;
          }
        }
        
        setContent(content);
      } catch (error) {
        console.error('Error loading markdown content:', error);
        setContent('# Error\n\nFailed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [app, pageType]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(`/${app}`);
    }
  };

  const isCurrentPage = (page: PageType) => {
    return location.pathname === `/${app}/${page}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient}`}>
      {/* Header */}
      <header className={`glass border-b ${colors.border} backdrop-blur-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <LinkButton
                to={`/${app}`}
                onNavigate={handleBack}
                className="no-underline"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100/80"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </LinkButton>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={appLogo}
                  alt={`${appName} Logo`}
                  className="w-10 h-10 rounded-xl shadow-lg object-contain"
                />
                <span className="text-xl font-semibold text-gray-900">{appName}</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-2">
              {allPages.map((page) => (
                <LinkButton
                  key={page}
                  to={`/${app}/${page}`}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 no-underline ${
                    isCurrentPage(page)
                      ? `text-gray-900 font-bold bg-white shadow-md`
                      : `text-gray-600 font-medium ${colors.hover} hover:bg-white/80`
                  }`}
                >
                  {pageTitles[page]}
                </LinkButton>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <article className="max-w-none text-gray-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Headings
                    h1: ({ node, ...props }) => (
                      <h1 className="text-4xl font-semibold text-gray-900 mb-4 mt-0" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
                    ),
                    
                    // Paragraphs
                    p: ({ node, ...props }) => (
                      <p className="text-gray-700 leading-relaxed mb-4" {...props} />
                    ),
                    
                    // Links
                    a: ({ node, ...props }) => (
                      <a 
                        className="text-blue-600 font-medium underline hover:text-blue-700 transition-colors" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        {...props} 
                      />
                    ),
                    
                    // Lists
                    ul: ({ node, ...props }) => (
                      <ul className="mt-4 mb-6 list-disc pl-0 ml-6 space-y-2 [&_p]:inline [&_p]:m-0" style={{ listStyleType: 'disc', listStylePosition: 'inside' }} {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="mt-4 mb-6 list-decimal pl-0 ml-6 space-y-2 [&_p]:inline [&_p]:m-0" style={{ listStyleType: 'decimal', listStylePosition: 'inside' }} {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-gray-700 leading-relaxed [&>p]:inline [&>p]:m-0" style={{ display: 'list-item' }} {...props} />
                    ),
                    
                    // Strong text
                    strong: ({ node, ...props }) => (
                      <strong className="text-gray-900 font-semibold inline" {...props} />
                    ),
                    
                    // Code
                    code: ({ node, className, children, ...props }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="text-gray-800 bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className={`block bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto ${className || ''}`} {...props}>
                          {children}
                        </code>
                      );
                    },
                    
                    // Pre blocks
                    pre: ({ node, ...props }) => (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            )}
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {allPages.filter(p => p !== pageType).map((page) => (
              <LinkButton
                key={page}
                to={`/${app}/${page}`}
                className="no-underline"
              >
                <Button
                  variant="outline"
                  className="text-gray-700 hover:bg-gray-100"
                >
                  {pageTitles[page]}
                </Button>
              </LinkButton>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer onAppClick={onAppClick} />
    </div>
  );
}

