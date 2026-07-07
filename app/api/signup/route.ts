import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    APPWRITE_ENDPOINT,
    APPWRITE_PROJECT_ID,
} from "@/lib/constants";

/**
 * Public Signup API for RK Auto Mobiles
 * 1. Creates a new Appwrite account (POST /account)
 * 2. Opens an email session for the new account (POST /account/sessions/email)
 * 3. Persists the session secret as a secure httpOnly cookie
 */
export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        const host = request.headers.get("host") || "localhost:3000";
        const protocol =
            host.includes("localhost") || host.includes("127.0.0.1")
                ? "http"
                : "https";
        const origin = `${protocol}://${host}`;

        const sharedHeaders = {
            "Content-Type": "application/json",
            "X-Appwrite-Project": APPWRITE_PROJECT_ID,
            Origin: origin,
        };

        // ── Step 1: Create the Appwrite account ──────────────────────────────
        const createRes = await fetch(`${APPWRITE_ENDPOINT}/account`, {
            method: "POST",
            headers: sharedHeaders,
            body: JSON.stringify({
                userId: "unique()",
                email,
                password,
                name,
            }),
        });

        const createData = await createRes.json();

        if (!createRes.ok) {
            throw new Error(createData.message || "Account creation failed");
        }

        // ── Step 2: Open a session for the newly created account ─────────────
        const sessionRes = await fetch(
            `${APPWRITE_ENDPOINT}/account/sessions/email`,
            {
                method: "POST",
                headers: sharedHeaders,
                body: JSON.stringify({ email, password }),
            }
        );

        const session = await sessionRes.json();

        if (!sessionRes.ok) {
            // Account was created but session failed — still a partial success
            throw new Error(session.message || "Auto-login after signup failed");
        }

        // ── Step 3: Extract session secret ───────────────────────────────────
        let secret = session.secret;
        if (!secret) {
            const setCookie = sessionRes.headers.get("set-cookie");
            if (setCookie) {
                const match = setCookie.match(
                    new RegExp(`a_session_${APPWRITE_PROJECT_ID}=([^;]+)`)
                );
                if (match) secret = match[1];
            }
        }

        if (!secret) {
            console.error("Signup Error: Session secret missing:", session);
            return NextResponse.json(
                {
                    error: "Account created but session could not be established",
                    details:
                        "Ensure the local domain is registered in Appwrite platform settings.",
                },
                { status: 500 }
            );
        }

        // ── Step 4: Set httpOnly session cookie ──────────────────────────────
        const cookieStore = await cookies();
        const isLocalhost =
            host.includes("localhost") || host.includes("127.0.0.1");

        cookieStore.set(`a_session_${APPWRITE_PROJECT_ID}`, secret, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production" && !isLocalhost,
            expires: new Date(session.expire),
        });

        return NextResponse.json({
            success: true,
            userId: createData.$id,
            sessionId: session.$id,
            expire: session.expire,
        });
    } catch (error: any) {
        console.error("Signup API Error:", error);
        return NextResponse.json(
            { error: error.message || "Registration failed" },
            { status: 400 }
        );
    }
}
