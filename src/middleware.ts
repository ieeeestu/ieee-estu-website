import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '../i18n.config';
import {
  buildLocalizedPath,
  extractLocaleSuffix,
  toEnglishPath,
  toInternalPath,
  stripLocaleSuffix,
  LEGACY_REDIRECTS,
} from './i18n/paths';
import { MEMBERSHIP_FORM_URL } from './config/links';
import { FEATURES } from './config/features';

const localeSet = new Set(locales);
const isLocale = (value: string) =>
  localeSet.has(value as (typeof locales)[number]);

export default function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname } = url;
  const isAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.');

  if (isAsset) {
    return NextResponse.next();
  }

  // Eski site adresleri (sertifika sitesinin menüsü, eski Google bağlantıları)
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    // Bozuk kodlanmış adres: olduğu gibi devam et
  }
  const legacyBase = stripLocaleSuffix(decodedPath);
  const legacyLocale = extractLocaleSuffix(decodedPath) ?? defaultLocale;
  if (legacyBase === '/join') {
    // Geçici (307): form linki değişirse tarayıcılar eskisini hatırlamasın
    return NextResponse.redirect(MEMBERSHIP_FORM_URL);
  }
  if (!FEATURES.blog && (legacyBase === '/blog' || legacyBase.startsWith('/blog/'))) {
    // Blog kapalı: eski blog linkleri (ör. sertifika sitesinin menüsü) ana sayfaya gitsin.
    // Geçici (307): blog tekrar açılırsa tarayıcılar bu yönlendirmeyi hatırlamasın.
    return NextResponse.redirect(new URL(buildLocalizedPath('/home', legacyLocale), url));
  }
  const legacyTarget = LEGACY_REDIRECTS[legacyBase];
  if (legacyTarget) {
    return NextResponse.redirect(
      new URL(buildLocalizedPath(legacyTarget, legacyLocale), url),
      308
    );
  }

  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(
      new URL(buildLocalizedPath('/home', defaultLocale), url)
    );
  }

  if (pathname === '/tr' || pathname === '/en') {
    const locale = pathname.slice(1);
    return NextResponse.redirect(
      new URL(buildLocalizedPath('/home', locale), url)
    );
  }

  const suffixLocale = extractLocaleSuffix(pathname);

  if (suffixLocale && isLocale(suffixLocale)) {
    const basePath = stripLocaleSuffix(pathname);
    const englishPath = toEnglishPath(basePath);
    if (englishPath !== basePath) {
      return NextResponse.redirect(
        new URL(buildLocalizedPath(englishPath, suffixLocale), url)
      );
    }
    const internalPath = toInternalPath(pathname, suffixLocale);
    const headers = new Headers(request.headers);
    headers.set('x-next-intl-locale', suffixLocale);
    const rewriteUrl = new URL(request.url);
    rewriteUrl.pathname = internalPath;
    return NextResponse.rewrite(rewriteUrl, { request: { headers } });
  }

  const prefixMatch = pathname.match(/^\/(tr|en)(\/|$)/);
  if (prefixMatch) {
    const locale = prefixMatch[1];
    const rest = pathname.replace(/^\/(tr|en)/, '') || '/';
    const englishPath = toEnglishPath(rest);
    return NextResponse.redirect(
      new URL(buildLocalizedPath(englishPath, locale), url)
    );
  }

  const basePath = stripLocaleSuffix(pathname);
  if (basePath !== '/') {
    const englishPath = toEnglishPath(basePath);
    return NextResponse.redirect(
      new URL(buildLocalizedPath(englishPath, defaultLocale), url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
