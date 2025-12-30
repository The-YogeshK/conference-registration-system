import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const type = process.env.NEXT_PUBLIC_SITE_TYPE;
  const path = req.nextUrl.pathname;

  // Public deployment: block access to admin panel
  if (type === 'public' && path.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Admin deployment: force redirect to dashboard
  if (type === 'admin' && path === '/') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Standard Next.js matcher to exclude statics/API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};