import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Footer } from '../Footer';
import { AppHeader } from '../AppHeader';

type AppSlug = 'beehive' | 'pixel-buddy' | 'dozy';
type PageType = 'terms-and-conditions' | 'privacy-policy' | 'data-safety';

interface MarkdownPageProps {
  app: AppSlug;
  pageType: PageType;
  appLogo: string;
  appName: string;
  themeColor: 'blue' | 'purple' | 'yellow';
}

const gradients: Record<MarkdownPageProps['themeColor'], string> = {
  blue: 'from-blue-50 via-white to-purple-50',
  purple: 'from-purple-50 via-white to-indigo-50',
  yellow: 'from-yellow-50 via-white to-orange-50',
};

type Loader = () => Promise<{ default: string }>;

// Vite's `?raw` glob import keeps the mapping colocated with the content
// and avoids the nested if/else chain.
const contentLoaders: Record<AppSlug, Record<PageType, Loader>> = {
  'pixel-buddy': {
    'terms-and-conditions': () => import('../../content/pixel-buddy/terms-and-conditions.md?raw'),
    'privacy-policy': () => import('../../content/pixel-buddy/privacy-policy.md?raw'),
    'data-safety': () => import('../../content/pixel-buddy/data-safety.md?raw'),
  },
  dozy: {
    'terms-and-conditions': () => import('../../content/dozy/terms-and-conditions.md?raw'),
    'privacy-policy': () => import('../../content/dozy/privacy-policy.md?raw'),
    'data-safety': () => import('../../content/dozy/data-safety.md?raw'),
  },
  beehive: {
    'terms-and-conditions': () => import('../../content/beehive/terms-and-conditions.md?raw'),
    'privacy-policy': () => import('../../content/beehive/privacy-policy.md?raw'),
    'data-safety': () => import('../../content/beehive/data-safety.md?raw'),
  },
};

export function MarkdownPage({ app, pageType, appLogo, appName, themeColor }: MarkdownPageProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    contentLoaders[app][pageType]()
      .then((mod) => {
        if (!cancelled) setContent(mod.default);
      })
      .catch((error) => {
        console.error('Error loading markdown content:', error);
        if (!cancelled) setContent('# Error\n\nFailed to load content. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [app, pageType]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[themeColor]}`}>
      <AppHeader appSlug={app} appName={appName} appLogo={appLogo} />

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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
              </div>
            ) : (
              <article className="max-w-none text-gray-700">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: (props) => <h1 className="text-4xl font-semibold text-gray-900 mb-4 mt-0" {...props} />,
                    h2: (props) => <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4" {...props} />,
                    h3: (props) => <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />,
                    p: (props) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                    a: (props) => (
                      <a
                        className="text-blue-600 font-medium underline hover:text-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    ul: (props) => <ul className="list-disc pl-6 mt-4 mb-6 space-y-2 marker:text-gray-400" {...props} />,
                    ol: (props) => <ol className="list-decimal pl-6 mt-4 mb-6 space-y-2 marker:text-gray-500" {...props} />,
                    li: (props) => <li className="text-gray-700 leading-relaxed" {...props} />,
                    strong: (props) => <strong className="text-gray-900 font-semibold" {...props} />,
                    code: ({ className, children, ...props }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="text-gray-800 bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className={`block bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto ${className ?? ''}`} {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre: (props) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto" {...props} />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
