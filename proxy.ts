import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APPWRITE_PROJECT_ID =
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68d35b4100297c609e51";

const SESSION_COOKIE = `a_session_${APPWRITE_PROJECT_ID}`;
const LOGIN_URL = "/login";

/**
 * Auth Proxy — Next.js 16 (proxy.ts)
 *
 * Protects all /dashboard routes by checking for an active Appwrite
 * session cookie. If the cookie is absent the user is redirected to
 * /login with a `callbackUrl` so they land back on the page they wanted.
 *
 * NOTE: Cookie presence is a lightweight first-level check. Actual
 * session validity is verified server-side inside each dashboard page /
 * Server Action via the Appwrite SDK. This is the recommended pattern
 * per Next.js docs — never rely on proxy alone for authorisation.
 */
export function proxy(request: NextRequest) {
    const { pathname, origin, search } = request.nextUrl;

    // ── Only guard /dashboard and all sub-paths ──────────────────────
    if (!pathname.startsWith("/dashboard")) {
        return NextResponse.next();
    }

    // ── Check for Appwrite session cookie ────────────────────────────
    const sessionCookie = request.cookies.get(SESSION_COOKIE);

    if (!sessionCookie?.value) {
        // Build the redirect URL preserving where the user wanted to go
        const loginUrl = new URL(LOGIN_URL, origin);
        loginUrl.searchParams.set(
            "callbackUrl",
            `${pathname}${search}`
        );
        return NextResponse.redirect(loginUrl);
    }

    // ── Authenticated — pass through ─────────────────────────────────
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match /dashboard and all sub-paths.
         * Excludes _next/static, _next/image, and public assets so the
         * login page itself and static files are never accidentally blocked.
         */
        "/dashboard/:path*",
    ],
};
