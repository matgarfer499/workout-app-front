import { NextRequest, NextResponse } from 'next/server'

let locales = ['en', 'es']

function getLocale(request: NextRequest) {
  const acceptLanguageHeader = request.headers.get('accept-language')

  if (acceptLanguageHeader) {
    const preferredLanguage = acceptLanguageHeader.split(',')[0].trim().toLowerCase()
    if (preferredLanguage.startsWith('en')) {
      return 'en'
    } else if (preferredLanguage.startsWith('es')) {
      return 'es'
    }
  }
  return 'en'
}

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url, "http://localhost:3000");
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return null;

  const locale = getLocale(request);
  const redirectedUrl = new URL(`/${locale}${pathname}`, "http://localhost:3000").href;
  return NextResponse.redirect(redirectedUrl);
}



export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
  api: {
    bodyParser: false,
  },
}
