import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Clear the authentication token or session
  const response = NextResponse.redirect(new URL('/login', req.url));
  response.cookies.set('token', '', { path: '/', expires: new Date(0) });
  response.cookies.set('user_type', '', { path: '/', expires: new Date(0) });
  return response;
}