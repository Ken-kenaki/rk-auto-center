import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
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

/** POST /api/cars — create a new listing */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = sanitize(body);
    const doc = await serverDatabases.createDocument(DB_ID, CARS_ID, ID.unique(), data);
    return NextResponse.json({ success: true, doc });
  } catch (err: any) {
    console.error("Cars POST error:", err);
    return NextResponse.json({ error: err.message || "Failed to create listing" }, { status: 500 });
  }
}
