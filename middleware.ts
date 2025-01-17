import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Adjust based on how you store the authentication token
  const userType = req.cookies.get('user_type')?.value;

  if (!token && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/admin') && userType !== 'admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/user') && userType !== 'user') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Specify the paths to protect, excluding the login page
export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|login).*)'],
};