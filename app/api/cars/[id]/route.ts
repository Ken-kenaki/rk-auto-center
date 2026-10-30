import { NextRequest, NextResponse } from "next/server";
import { d1 } from "@/lib/cloudflare/d1";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const doc = await d1.first("SELECT * FROM cars WHERE id = ? OR slug = ?", [id, id]);
    if (!doc) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    let imageIds = [];
    try {
      imageIds = doc.image_ids ? (typeof doc.image_ids === "string" ? JSON.parse(doc.image_ids) : doc.image_ids) : [];
    } catch {
      imageIds = doc.image_ids ? [doc.image_ids] : [];
    }

    const mappedImages = imageIds.map((id: string) =>
      id.startsWith("http") ? id : `/api/storage/preview?fileId=${encodeURIComponent(id)}`
    );

    return NextResponse.json({
      $id: doc.id,
      id: doc.id,
      ...doc,
      featured: Boolean(doc.featured),
      image_ids: imageIds,
      image: mappedImages[0] || "",
      images: mappedImages,
      $createdAt: doc.created_at,
      $updatedAt: doc.updated_at,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch car" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const existing = await d1.first("SELECT * FROM cars WHERE id = ?", [id]);
    if (!existing) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    const imageIds = body.image_ids !== undefined
      ? (Array.isArray(body.image_ids) ? JSON.stringify(body.image_ids) : String(body.image_ids))
      : existing.image_ids;

    await d1.execute(
      `UPDATE cars SET
        name = ?, slug = ?, description = ?, price = ?, make = ?, model = ?,
        year = ?, mileage = ?, engine = ?, transmission = ?, drivetrain = ?,
        featured = ?, image_ids = ?, video_url = ?, variant = ?, fuel = ?,
        type = ?, badge = ?, condition = ?, updated_at = datetime('now')
      WHERE id = ?`,
      [
        body.name ?? existing.name,
        body.slug ?? existing.slug,
        body.description ?? existing.description,
        body.price ?? existing.price,
        body.make ?? existing.make,
        body.model ?? existing.model,
        body.year ?? existing.year,
        body.mileage ?? existing.mileage,
        body.engine ?? existing.engine,
        body.transmission ?? existing.transmission,
        body.drivetrain ?? existing.drivetrain,
        body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured,
        imageIds,
        body.video_url ?? existing.video_url,
        body.variant ?? existing.variant,
        body.fuel ?? existing.fuel,
        body.type ?? existing.type,
        body.badge ?? existing.badge,
        body.condition ?? existing.condition,
        id,
      ]
    );

    const doc = await d1.first("SELECT * FROM cars WHERE id = ?", [id]);
    return NextResponse.json({ success: true, doc: { $id: id, id, ...doc } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update listing" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (body.status !== undefined) {
      body.badge = body.status === "sold" ? "Sold" : null;
      delete body.status;
    }

    const updates: string[] = [];
    const paramsList: any[] = [];

    const allowed = [
      "name","slug","description","price","make","model","year","mileage",
      "engine","transmission","drivetrain","featured","video_url","variant",
      "fuel","type","badge","image_ids","condition"
    ];

    for (const key of allowed) {
      if (body[key] !== undefined) {
        updates.push(`${key} = ?`);
        if (key === "featured") {
          paramsList.push(body[key] ? 1 : 0);
        } else if (key === "image_ids" && Array.isArray(body[key])) {
          paramsList.push(JSON.stringify(body[key]));
        } else {
          paramsList.push(body[key]);
        }
      }
    }

    if (updates.length > 0) {
      updates.push("updated_at = datetime('now')");
      paramsList.push(id);
      await d1.execute(`UPDATE cars SET ${updates.join(", ")} WHERE id = ?`, paramsList);
    }

    const doc = await d1.first("SELECT * FROM cars WHERE id = ?", [id]);
    return NextResponse.json({ success: true, doc: { $id: id, id, ...doc } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to patch listing" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await d1.execute("DELETE FROM cars WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete listing" }, { status: 500 });
  }
}
