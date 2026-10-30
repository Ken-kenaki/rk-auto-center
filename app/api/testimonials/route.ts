import { NextRequest, NextResponse } from "next/server";
import { d1 } from "@/lib/cloudflare/d1";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    let sql = "SELECT * FROM testimonials";
    let params: any[] = [];

    if (featured === "true") {
      sql += " WHERE featured = 1";
    }
    sql += " ORDER BY created_at DESC";

    const rows = await d1.query<any>(sql, params);
    const documents = rows.map((r) => ({
      $id: r.id,
      id: r.id,
      ...r,
      featured: Boolean(r.featured),
      $createdAt: r.created_at,
      $updatedAt: r.updated_at,
    }));

    return NextResponse.json({ total: documents.length, documents });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = `testimonial-${Date.now()}`;

    await d1.execute(
      `INSERT INTO testimonials (id, name, role, quote, avatar_id, rating, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.role || "",
        body.quote || "",
        body.avatar_id || "",
        body.rating || 5,
        body.featured ? 1 : 0,
      ]
    );

    const doc = await d1.first("SELECT * FROM testimonials WHERE id = ?", [id]);
    return NextResponse.json({ success: true, doc: { $id: id, id, ...doc } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create testimonial" }, { status: 500 });
  }
}
