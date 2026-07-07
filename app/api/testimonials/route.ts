import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { serverDatabases } from "@/lib/appwrite-server";
import { DB_ID, TESTIMONIALS_COLLECTION_ID } from "@/lib/constants";

const ALLOWED = ["name", "role", "quote", "avatar_id", "rating", "featured"];

function sanitize(data: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const k of ALLOWED) {
    if (data[k] !== undefined) {
      if (k === "rating") {
        out[k] = parseInt(data[k], 10) || 5;
      } else if (k === "featured") {
        out[k] = Boolean(data[k]);
      } else {
        out[k] = data[k];
      }
    }
  }
  return out;
}

/** GET /api/testimonials — list all testimonials */
export async function GET() {
  try {
    const response = await serverDatabases.listDocuments(
      DB_ID,
      TESTIMONIALS_COLLECTION_ID
    );
    return NextResponse.json({ success: true, documents: response.documents });
  } catch (err: any) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

/** POST /api/testimonials — create a new testimonial */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = sanitize(body);

    if (!data.name || !data.role || !data.quote) {
      return NextResponse.json(
        { error: "Name, role, and quote are required." },
        { status: 400 }
      );
    }

    const docId = `t-${data.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString(36)}`;
    const doc = await serverDatabases.createDocument(
      DB_ID,
      TESTIMONIALS_COLLECTION_ID,
      docId,
      data
    );

    return NextResponse.json({ success: true, doc });
  } catch (err: any) {
    console.error("Testimonials POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
