import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
console.log('middleware running.......');
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') && (
      pathname.endsWith('.js') ||
      pathname.endsWith('.css') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.jpeg') ||
      pathname.endsWith('.gif') ||
      pathname.endsWith('.svg') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.webp') ||
      pathname.endsWith('.woff') ||
      pathname.endsWith('.woff2') ||
      pathname.endsWith('.ttf')
    )
  ) {
    return NextResponse.next();
  }

  console.log(' MIDDLEWARE RUNNING for:', pathname);
  
  const token = request.cookies.get('accessToken');

  console.log(' Token found:', !!token);
  console.log(' Current path:', pathname);

  // Routes that GUEST users (no token) can access
  const guestAllowedRoutes = ['/', '/login', '/register'];
  
  // Check if current path is allowed for guests
  const isGuestAllowedRoute = guestAllowedRoutes.includes(pathname);

  // If user has NO token (guest user)
  if (!token || !token.value) {
    console.log('User is NOT logged in (guest)');
    
    // If guest tries to access protected routes
    if (!isGuestAllowedRoute) {
      console.log(' Redirecting guest to login from:', pathname);
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Allow access to guest routes
    console.log('Allowing guest access to:', pathname);
    return NextResponse.next();
  }

  // If user HAS token (authenticated user)
  console.log('User is logged in (authenticated)');
  
  // If authenticated user tries to access auth pages, redirect to dashboard
  if (pathname === '/login' || pathname === '/register') {
    console.log(' Redirecting authenticated user away from auth pages');
    return NextResponse.redirect(new URL('/jobprovider', request.url));
  }
  
  // Allow authenticated users to access all other routes
  console.log(' Allowing authenticated access to:', pathname);
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files
  matcher: [
    '/((?!_next|favicon.ico).*)',
  ],
};