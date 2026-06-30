#!/usr/bin/env node
/**
 * Fix car_images bucket allowed types, then re-upload all real car images.
 * Run: node scripts/fix-bucket-and-upload.mjs
 */

import { Client, Databases, Storage, Permission, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";
import { readdirSync, readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const ENDPOINT   = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY    = process.env.APPWRITE_API_KEY;
const DB_ID      = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const CARS_COL   = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";
const BUCKET_ID  = process.env.NEXT_PUBLIC_CAR_IMAGES_BUCKET_ID || "car_images";

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
const db      = new Databases(client);
const storage = new Storage(client);

// ── Fix bucket allowed extensions ───────────────────────────────────────────
async function fixBucket() {
  console.log(`\n🪣  Updating bucket "${BUCKET_ID}" to allow jpg/png/webp...`);
  try {
    await storage.updateBucket(
      BUCKET_ID,
      "Car Images",
      [Permission.read(Role.any()), Permission.create(Role.users()), Permission.update(Role.users()), Permission.delete(Role.users())],
      false,       // fileSecurity
      undefined,   // enabled
      50000000,    // maximumFileSize (50 MB)
      ["jpg", "jpeg", "png", "webp"], // allowedFileExtensions
    );
    console.log("  ✅ Bucket updated");
  } catch (err) {
    console.error("  ❌ Bucket update failed:", err.message);
    throw err;
  }
}

// ── Real car definitions ─────────────────────────────────────────────────────
const REAL_CARS = [
  { id: "rk-creta-sx-real",   folder: "Car-1" },
  { id: "rk-i20-grey-real",   folder: "Car-2" },
  { id: "rk-sonet-real",      folder: "car-3" },
  { id: "rk-dzire-vxi-real",  folder: "Car-4" },
  { id: "rk-aveo-red-real",   folder: "car-5" },
  { id: "rk-creta-2023-real", folder: "car-6" },
];

const publicDir = resolve(__dirname, "../public");

function getImages(folderName) {
  const dir = join(publicDir, folderName);
  const files = readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  // Remove " (1)" duplicates
  const unique = files.filter((f) => {
    const noSuffix = f.replace(/ \(\d+\)/, "");
    return f === noSuffix || !files.includes(noSuffix);
  });
  return unique.sort();
}

async function uploadFile(filePath, fileId) {
  try {
    try { await storage.deleteFile(BUCKET_ID, fileId); } catch (_) {}
    const data = readFileSync(filePath);
    const ext  = filePath.split(".").pop().toLowerCase();
    const mime = (ext === "jpg" || ext === "jpeg") ? "image/jpeg"
               : ext === "png"                      ? "image/png"
               :                                      "image/webp";
    const file = InputFile.fromBuffer(data, `${fileId}.${ext}`, mime);
    await storage.createFile(BUCKET_ID, fileId, file, [Permission.read(Role.any())]);
    console.log(`    ✅ ${fileId}`);
    return fileId;
  } catch (err) {
    console.error(`    ❌ ${fileId}: ${err.message}`);
    return null;
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  await fixBucket();
  console.log("\n📸 Uploading car images...\n");

  for (const car of REAL_CARS) {
    const images = getImages(car.folder);
    console.log(`\n  ${car.folder} — ${images.length} images`);
    const uploadedIds = [];

    for (let i = 0; i < images.length; i++) {
      const fp  = join(publicDir, car.folder, images[i]);
      const fid = `${car.id}-img-${i + 1}`;
      const id  = await uploadFile(fp, fid);
      if (id) uploadedIds.push(id);
      await new Promise(r => setTimeout(r, 400));
    }

    if (uploadedIds.length > 0) {
      try {
        await db.updateDocument(DB_ID, CARS_COL, car.id, { image_ids: uploadedIds });
        console.log(`  ✅ DB image_ids updated for ${car.id} (${uploadedIds.length} images)`);
      } catch (err) {
        console.error(`  ❌ DB update failed for ${car.id}: ${err.message}`);
      }
    }
  }

  console.log("\n✨ Done!\n");
}

main().catch(console.error);
