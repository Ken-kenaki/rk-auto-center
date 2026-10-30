import { NextRequest, NextResponse } from "next/server";
import { d1 } from "@/lib/cloudflare/d1";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const make = searchParams.get("make");
    const condition = searchParams.get("condition");

    let whereClauses: string[] = [];
    let params: any[] = [];

    if (slug) {
      whereClauses.push("slug = ?");
      params.push(slug);
    }

    if (featured === "true") {
      whereClauses.push("featured = 1");
    }
    if (make) {
      whereClauses.push("make = ?");
      params.push(make);
    }
    if (condition) {
      whereClauses.push("condition = ?");
      params.push(condition);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
    const countRow = await d1.first<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM cars ${whereSql}`, params);

    const rows = await d1.query<any>(
      `SELECT * FROM cars ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const documents = rows.map((r) => {
      let imageIds = [];
      try {
        imageIds = r.image_ids ? (typeof r.image_ids === "string" ? JSON.parse(r.image_ids) : r.image_ids) : [];
      } catch {
        imageIds = r.image_ids ? [r.image_ids] : [];
      }
      const mappedImages = imageIds.map((id: string) =>
        id.startsWith("http") ? id : `/api/storage/preview?fileId=${encodeURIComponent(id)}`
      );
      return {
        $id: r.id,
        id: r.id,
        ...r,
        featured: Boolean(r.featured),
        image_ids: imageIds,
        image: mappedImages[0] || "",
        images: mappedImages,
        $createdAt: r.created_at,
        $updatedAt: r.updated_at,
      };
    });

    return NextResponse.json({
      total: countRow?.cnt ?? documents.length,
      documents,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = `car-${Date.now()}`;
    const imageIds = Array.isArray(body.image_ids) ? JSON.stringify(body.image_ids) : (body.image_ids || "[]");

    await d1.execute(
      `INSERT INTO cars (id, name, slug, description, price, make, model, year, mileage, engine, transmission, drivetrain, featured, image_ids, video_url, variant, fuel, type, badge, condition)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.slug || `car-${Date.now()}`,
        body.description || "",
        body.price || null,
        body.make || "",
        body.model || "",
        body.year || null,
        body.mileage || null,
        body.engine || "",
        body.transmission || "",
        body.drivetrain || "",
        body.featured ? 1 : 0,
        imageIds,
        body.video_url || "",
        body.variant || "",
        body.fuel || "",
        body.type || "",
        body.badge || "",
        body.condition || "",
      ]
    );

    const doc = await d1.first("SELECT * FROM cars WHERE id = ?", [id]);
    return NextResponse.json({ success: true, doc: { $id: id, id, ...doc } });
  } catch (err: any) {
    console.error("Cars POST error:", err);
    return NextResponse.json({ error: err.message || "Failed to create listing" }, { status: 500 });
  }
}
