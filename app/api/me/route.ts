import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { 
    APPWRITE_ENDPOINT, 
    APPWRITE_PROJECT_ID 
} from "@/lib/constants";

/**
 * Public User API
 * Returns the current authenticated user details using the session cookie.
 */
export async function GET() {
    try {
        if (!APPWRITE_PROJECT_ID) {
            console.error("Me API Error: APPWRITE_PROJECT_ID is missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const cookieStore = await cookies();
        const session = cookieStore.get(`a_session_${APPWRITE_PROJECT_ID}`);

        if (!session || !session.value) {
            return NextResponse.json({ 
                error: "No active session",
                cookieName: `a_session_${APPWRITE_PROJECT_ID}`
            }, { status: 401 });
        }

        // Initialize client with the session token
        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)
            .setSession(session.value);

        const account = new Account(client);
        
        try {
            const user = await account.get();
            return NextResponse.json({
                success: true,
                $id: user.$id,
                email: user.email,
                name: user.name,
                registration: user.registration,
                status: user.status
            });
        } catch (appwriteError: any) {
            console.error("Appwrite Me Error:", appwriteError);
            return NextResponse.json(
                { error: appwriteError.message || "Invalid session" }, 
                { status: 401 }
            );
        }
    } catch (error: any) {
        console.error("Me API System Error:", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}
