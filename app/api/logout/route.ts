import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { APPWRITE_PROJECT_ID } from "@/lib/constants";

/**
 * Public Logout API
 * Clears the Appwrite session cookie.
 */
export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(`a_session_${APPWRITE_PROJECT_ID}`);
        
        return NextResponse.json({ success: true, message: "Session cleared" });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
    }
}
