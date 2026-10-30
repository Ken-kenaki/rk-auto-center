import { NextRequest, NextResponse } from "next/server";
import { r2 } from "@/lib/cloudflare/r2";
import { serverStorage } from "@/lib/appwrite-server";
import { CAR_IMAGES_BUCKET_ID } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("fileId") || searchParams.get("key") || "";

    if (!fileId) {
      return new NextResponse("Missing file identifier", { status: 400 });
    }

    const cleanId = fileId.trim();
    const hasExt = /\.[a-zA-Z0-9]+$/.test(cleanId);
    const prefixes = ["", "cars/", "testimonials/", "settings/", "pages/"];
    const extensions = hasExt ? [""] : ["", ".jpg", ".png", ".webp", ".jpeg", ".svg"];

    const candidates: string[] = [];
    for (const prefix of prefixes) {
      for (const ext of extensions) {
        const candidate = `${prefix}${cleanId}${ext}`;
        if (!candidates.includes(candidate)) {
          candidates.push(candidate);
        }
      }
    }

    // 1. Check Cloudflare R2
    for (const key of candidates) {
      const r2Obj = await r2.download(key);
      if (r2Obj && r2Obj.data.byteLength > 0) {
        let contentType = r2Obj.contentType || "image/jpeg";
        if (key.endsWith(".png")) contentType = "image/png";
        else if (key.endsWith(".webp")) contentType = "image/webp";
        else if (key.endsWith(".svg")) contentType = "image/svg+xml";

        return new NextResponse(Buffer.from(r2Obj.data), {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Served-By": "Cloudflare-R2",
          },
        });
      }
    }

    // 2. Fallback to Appwrite
    try {
      const buffer = await serverStorage.getFileDownload(CAR_IMAGES_BUCKET_ID, cleanId);
      if (buffer && buffer.byteLength > 0) {
        r2.upload(cleanId, buffer).catch(() => {});

        return new NextResponse(Buffer.from(buffer), {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Served-By": "Appwrite-Fallback",
          },
        });
      }
    } catch {}

    return new NextResponse("Image not found", { status: 404 });
  } catch (error) {
    console.error("Storage preview error:", error);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}

