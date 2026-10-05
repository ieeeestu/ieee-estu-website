const TRAILING_SLASH_REGEX = /\/+$/;
const LOCALE_SUFFIX_REGEX = /\/(tr|en)$/;

export const ENGLISH_ROUTES = {
  home: '/home',
  about: '/about',
  team: '/team',
  committees: '/committees',
  subteams: '/subteams',
  sponsors: '/sponsors',
  contact: '/contact',
  events: '/events',
  blog: '/blog',
  xtreme: '/xtreme',
  privacy: '/privacy',
  terms: '/terms',
  membership: '/membership',
  eventsApply: '/events/apply',
} as const;

export const ENGLISH_TO_INTERNAL: Record<string, string> = {
  '/home': '/',
  '/about': '/hakkimizda',
  '/team': '/ekibimiz',
  '/committees': '/komiteler',
  '/subteams': '/takimlar',
  '/sponsors': '/sponsorlar',
  '/contact': '/iletisim',
  '/events': '/events',
  '/blog': '/blog',
  '/xtreme': '/xtreme',
  '/privacy': '/privacy',
  '/terms': '/terms',
  '/membership': '/membership',
  '/events/apply': '/events/apply',
};

// Eski sitenin adresleri -> yeni sayfalar. Sertifika sitesinin menüsü ve
// Google'daki eski bağlantılar hâlâ bu adresleri kullanıyor.
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/ana-sayfa': '/home',
  '/hakkında': '/about',
  '/etkinlikler': '/events',
  '/sponsorluklar-ve-isbirlikleri': '/sponsors',
  '/iletişim': '/contact',
};

export const INTERNAL_TO_ENGLISH: Record<string, string> = Object.fromEntries(
  Object.entries(ENGLISH_TO_INTERNAL).map(([english, internal]) => [
    internal,
    english,
  ])
);

const mapPathByPrefix = (
  path: string,
  mapping: Record<string, string>
) => {
  const normalized = normalizePath(path);
  const entries = Object.keys(mapping).sort((a, b) => b.length - a.length);
  for (const key of entries) {
    if (normalized === key) {
      return mapping[key];
    }
    if (normalized.startsWith(`${key}/`)) {
      return `${mapping[key]}${normalized.slice(key.length)}`;
    }
  }
  return normalized;
};

const normalizePath = (path: string) => {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  if (withSlash === '/') {
    return '/';
  }
  return withSlash.replace(TRAILING_SLASH_REGEX, '');
};

export const stripLocaleSuffix = (path: string) => {
  const normalized = normalizePath(path);
  const match = normalized.match(LOCALE_SUFFIX_REGEX);
  if (!match) {
    return normalized;
  }
  const base = normalized.slice(0, match.index) || '/';
  return normalizePath(base);
};

export const extractLocaleSuffix = (path: string) => {
  const normalized = normalizePath(path);
  const match = normalized.match(LOCALE_SUFFIX_REGEX);
  return match ? match[1] : null;
};

export const buildLocalizedPath = (path: string, locale: string) => {
  const normalized = stripLocaleSuffix(path);
  const basePath = normalized === '/' ? ENGLISH_ROUTES.home : normalized;
  return `${basePath}/${locale}`;
};

export const toInternalPath = (path: string, locale: string) => {
  const normalized = stripLocaleSuffix(path);
  const basePath = normalized === '/' ? ENGLISH_ROUTES.home : normalized;
  const internal = mapPathByPrefix(basePath, ENGLISH_TO_INTERNAL);
  if (internal === '/') {
    return `/${locale}`;
  }
  return `/${locale}${internal}`;
};

export const toEnglishPath = (internalPath: string) => {
  return mapPathByPrefix(internalPath, INTERNAL_TO_ENGLISH);
};
