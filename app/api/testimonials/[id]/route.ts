import { NextRequest, NextResponse } from "next/server";
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

/** DELETE /api/testimonials/[id] — delete a testimonial */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await serverDatabases.deleteDocument(DB_ID, TESTIMONIALS_COLLECTION_ID, id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Testimonial DELETE error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

/** PATCH /api/testimonials/[id] — update toggle featured or change fields */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = sanitize(body);

    const doc = await serverDatabases.updateDocument(
      DB_ID,
      TESTIMONIALS_COLLECTION_ID,
      id,
      data
    );
    return NextResponse.json({ success: true, doc });
  } catch (err: any) {
    console.error("Testimonial PATCH error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}
