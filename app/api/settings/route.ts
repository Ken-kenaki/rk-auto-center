import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { serverDatabases } from "@/lib/appwrite-server";

const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const SETTINGS_ID = process.env.NEXT_PUBLIC_SETTINGS_COLLECTION_ID || "settings";

const DEFAULT_SETTINGS = {
  phone: "9847699255",
  whatsapp_number: "9779847699255",
  email: "info@rkauto.com",
  address: "Kalimati, Kathmandu, Nepal",
  instagram_url: "https://instagram.com/rkauto",
  facebook_url: "https://facebook.com/rkautocenter1/",
  navbar_color: "#1a1a1a",
  navbar_text_color: "#ffffff",
  footer_color: "#111111",
  footer_text_color: "#ffffff",
};

/**
 * GET /api/settings
 * Returns the settings document. Auto-seeds defaults if none exists.
 */
export async function GET() {
  try {
    const response = await serverDatabases.listDocuments(DB_ID, SETTINGS_ID);

    if (response.documents.length > 0) {
      const doc = response.documents[0];
      return NextResponse.json({ success: true, doc });
    }

    // No settings document — seed defaults using server API key
    const newDoc = await serverDatabases.createDocument(
      DB_ID,
      SETTINGS_ID,
      ID.unique(),
      DEFAULT_SETTINGS
    );
    return NextResponse.json({ success: true, doc: newDoc });
  } catch (err: any) {
    console.error("Settings GET error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to load settings" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/settings
 * Body: { docId: string, data: object }
 * Updates an existing document or creates a new one.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { docId, data } = body;

    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid data payload" }, { status: 400 });
    }

    // Strip any keys not in the schema
    const allowed = [
      "phone", "whatsapp_number", "email", "address",
      "instagram_url", "facebook_url",
      "navbar_color", "navbar_text_color",
      "footer_color", "footer_text_color",
    ];
    const sanitized: Record<string, string> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) sanitized[key] = data[key];
    }

    let savedDoc;
    if (docId) {
      savedDoc = await serverDatabases.updateDocument(DB_ID, SETTINGS_ID, docId, sanitized);
    } else {
      savedDoc = await serverDatabases.createDocument(DB_ID, SETTINGS_ID, ID.unique(), sanitized);
    }

    return NextResponse.json({ success: true, doc: savedDoc });
  } catch (err: any) {
    console.error("Settings POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to save settings" },
      { status: 500 }
    );
  }
}
