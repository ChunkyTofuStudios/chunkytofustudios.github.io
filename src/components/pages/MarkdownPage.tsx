import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../Footer';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-700 hover:bg-gray-100/80"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
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
                <button
                  key={page}
                  onClick={() => navigate(`/${app}/${page}`)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isCurrentPage(page)
                      ? `${colors.active} shadow-md`
                      : `text-gray-600 ${colors.hover} hover:bg-white/80`
                  }`}
                >
                  {pageTitles[page]}
                </button>
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
              <article className="prose prose-lg prose-gray max-w-none
                prose-headings:font-semibold prose-headings:text-gray-900
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-0
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:my-2 prose-li:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:font-medium prose-a:underline hover:prose-a:text-blue-700
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                [&>*:first-child]:mt-0
              ">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
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
              <Button
                key={page}
                variant="outline"
                onClick={() => navigate(`/${app}/${page}`)}
                className="text-gray-700 hover:bg-gray-100"
              >
                {pageTitles[page]}
              </Button>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer onAppClick={onAppClick} />
    </div>
  );
}

