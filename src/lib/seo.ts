/**
 * SEO metadata — per-route titles, descriptions, canonical URLs, and OG images.
 *
 * Consumed by the SPA at runtime (DocumentMeta in AppRouter) and mirrored
 * statically in the entry HTML files so crawlers see correct tags on first byte.
 */

export const SITE = {
  name: 'Chunky Tofu Studios',
  url: 'https://chunkytofustudios.com',
  tagline: 'Building apps with texture.',
  description:
    'Chunky Tofu Studios is an indie app studio of developers across San Francisco, Princeton, Dublin, Istanbul, Mexico City, and Milan — crafting mobile experiences people love.',
  defaultOgImage: '/og-image.webp',
  twitterHandle: '@Chunky_Tofu',
};

export interface RouteMeta {
  title: string;
  description: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

const APP_META: Record<string, RouteMeta> = {
  beehive: {
    title: 'Beehive — Word Puzzle Game | Chunky Tofu Studios',
    description:
      'Beehive is a daily word puzzle game. Find words, build your hive, and compete on global leaderboards. Free on iOS and Android.',
    ogImage: '/og-beehive.png',
  },
  'pixel-buddy': {
    title: 'Pixel Buddy — Pixel Art Coloring Book | Chunky Tofu Studios',
    description:
      'Pixel Buddy is a relaxing pixel art coloring book with hundreds of beautiful designs. Free on iOS and Android.',
    ogImage: '/og-pixel-buddy.png',
  },
  dozy: {
    title: 'Dozy — Trip Planner | Chunky Tofu Studios',
    description:
      'Dozy helps you plan trips and keep your travel memories in one place. Free on iOS and Android.',
    ogImage: '/og-dozy.png',
  },
};

const POLICY_LABEL: Record<string, string> = {
  'terms-and-conditions': 'Terms & Conditions',
  'privacy-policy': 'Privacy Policy',
  'data-safety': 'Data Safety',
};

export function metaForPath(pathname: string): RouteMeta {
  const segments = pathname.split('/').filter(Boolean);
  const [first, second] = segments;

  if (!first) {
    return {
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      ogImage: SITE.defaultOgImage,
    };
  }

  if (first === 'contact') {
    return {
      title: `Contact Us — ${SITE.name}`,
      description: `Get in touch with ${SITE.name} for support, press, publishing, or careers.`,
      ogImage: SITE.defaultOgImage,
    };
  }

  const app = APP_META[first];
  if (app) {
    if (second && POLICY_LABEL[second]) {
      return {
        title: `${POLICY_LABEL[second]} — ${app.title.split(' — ')[0]} | ${SITE.name}`,
        description: `${POLICY_LABEL[second]} for ${app.title.split(' — ')[0]} by ${SITE.name}.`,
        ogImage: app.ogImage,
        type: 'article',
      };
    }
    return app;
  }

  return {
    title: `Page Not Found — ${SITE.name}`,
    description: SITE.description,
    ogImage: SITE.defaultOgImage,
  };
}

export function canonicalFor(pathname: string): string {
  const trimmed = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return `${SITE.url}${trimmed}`;
}
