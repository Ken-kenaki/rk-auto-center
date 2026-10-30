import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID
} from "@/lib/constants";

/**
 * Public Login API for RK Auto Mobiles
 * Uses the Appwrite client-side logic mapped to secure httpOnly cookies.
 */
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const host = request.headers.get("host") || "localhost:3000";
        const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
        const origin = `${protocol}://${host}`;

        const apiKey = process.env.APPWRITE_API_KEY || "standard_d97e5f80121b839467b4533bf1463db822ae1096bd749f20152279d3654aa548810ef15f85f17647b9550c53301adaa215d69edfcef387cc887d7fffbc22d80677c441b7906fd2bf044a29e0b0e54e36d31b472a3eaabf18d90549bfdd656bfd66477d222f3c82fb20c3cad0c69aa166c0772e8bc1cd0a67a144cd7291358789";

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "X-Appwrite-Project": APPWRITE_PROJECT_ID,
        };
        if (apiKey) {
            headers["X-Appwrite-Key"] = apiKey;
        } else {
            headers["Origin"] = origin;
        }

        // Perform standard email session creation against Appwrite HTTP endpoint
        const response = await fetch(`${APPWRITE_ENDPOINT}/account/sessions/email`, {
            method: "POST",
            headers,
            body: JSON.stringify({ email, password }),
        });

        const session = await response.json();

        if (!response.ok) {
            throw new Error(session.message || "Authentication failed");
        }

        let secret = session.secret;
        if (!secret) {
            const setCookie = response.headers.get("set-cookie");
            if (setCookie) {
                const match = setCookie.match(new RegExp(`a_session_${APPWRITE_PROJECT_ID}=([^;]+)`));
                if (match) {
                    secret = match[1];
                }
            }
        }

        if (!secret) {
            console.error("Login Error: Session secret missing in Appwrite Response:", session);
            return NextResponse.json({
                error: "Failed to establish secure session",
                details: "Session secret not found in response. Please ensure local domain is registered in Appwrite platforms.",
            }, { status: 500 });
        }

        const cookieStore = await cookies();
        const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");

        cookieStore.set(`a_session_${APPWRITE_PROJECT_ID}`, secret, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" && !isLocalhost,
            expires: new Date(session.expire),
        });

        return NextResponse.json({
            success: true,
            userId: session.userId,
            sessionId: session.$id,
            expire: session.expire
        });
    } catch (error: any) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            { error: error.message || "Authentication failed" },
            { status: 401 }
        );
    }
}
