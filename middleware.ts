import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr', 'es', 'it', 'de', 'hy', 'ru', 'ar', 'pt'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip if the path already has a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // 1. Get Country Code from Vercel Header (or default to US)
    const country = req.headers.get('x-vercel-ip-country') || 'US';

    // 2. Map Country to Language
    const countryMap: Record<string, string> = {
      AM: 'hy', // Armenia
      RU: 'ru', // Russia
      FR: 'fr', // France
      IT: 'it', // Italy
      DE: 'de', // Germany
      ES: 'es', // Spain
      SA: 'ar', // Saudi Arabia
      EG: 'ar', // Egypt
    };

    const locale = countryMap[country] || 'en';

    // 3. Redirect
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, req.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static, etc.)
    // Skip all files with extensions (svg, png, json, etc.)
    // 👇 ADDED: Skip the .well-known directory
    '/((?!api|_next/static|_next/image|favicon.ico|logo.gif|.well-known|.*\\..*).*)',
  ],
};