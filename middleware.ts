import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Only protect /gallery/*
  if (req.nextUrl.pathname.startsWith('/gallery')) {
    const cookie = req.cookies.get('session');
    if (!cookie) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

// Apply only to /gallery routes
export const config = {
  matcher: ['/gallery/:path*'],
};