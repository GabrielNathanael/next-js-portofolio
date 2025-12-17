import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  const env = process.env.NODE_ENV;

  // Hanya jalankan redirect di production
  // Dan jika hostname mengandung vercel.app (preview/production domain dari Vercel)
  if (env === "production" && hostname && hostname.includes("vercel.app")) {
    const newUrl = new URL(request.url);
    newUrl.hostname = "gabrielnathanael.site";
    newUrl.protocol = "https";

    // Gunakan 301 Permanent Redirect - Signal kuat ke Google
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - static files (_next/static, _next/image)
     * - common assets (favicon.ico, robots.txt, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
