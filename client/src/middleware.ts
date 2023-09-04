export { default } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const isAuth = await getToken({ req });
  if (!isAuth && !req.nextUrl.pathname.startsWith(process.env.AUTH_URL!)) {
    return NextResponse.redirect(new URL(process.env.AUTH_URL!, req.url));
  }
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|register|login).*)',
  ], //    '/((?!register|login|$).*)'
};
