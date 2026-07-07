import { NextRequest, NextResponse } from "next/server";
import { serverDatabases } from "@/lib/appwrite-server";

const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const CARS_ID = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";

const ALLOWED = [
  "name","slug","description","price","make","model","year","mileage",
  "engine","transmission","drivetrain","featured","video_url","variant",
  "fuel","type","badge","image_ids","condition",
];

function sanitize(data: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const k of ALLOWED) {
    if (data[k] !== undefined) out[k] = data[k];
  }
  return out;
}

/** PUT /api/cars/[id] — full update */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = sanitize(body);
    const doc = await serverDatabases.updateDocument(DB_ID, CARS_ID, id, data);
    return NextResponse.json({ success: true, doc });
  } catch (err: any) {
    console.error("Cars PUT error:", err);
    return NextResponse.json({ error: err.message || "Failed to update listing" }, { status: 500 });
  }
}

/** PATCH /api/cars/[id] — partial update (e.g. toggle featured) */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = sanitize(body);
    const doc = await serverDatabases.updateDocument(DB_ID, CARS_ID, id, data);
    return NextResponse.json({ success: true, doc });
  } catch (err: any) {
    console.error("Cars PATCH error:", err);
    return NextResponse.json({ error: err.message || "Failed to update listing" }, { status: 500 });
  }
}

/** DELETE /api/cars/[id] — remove listing */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await serverDatabases.deleteDocument(DB_ID, CARS_ID, id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Cars DELETE error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete listing" }, { status: 500 });
  }
}
