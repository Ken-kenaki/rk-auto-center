#!/usr/bin/env node
/**
 * Seed Real Car Listings — RK Auto Center
 * ─────────────────────────────────────────
 * Uploads all photos from public/Car-1 … public/car-6 to the
 * `car_images` Appwrite bucket, then upserts the car documents.
 *
 * Run: node scripts/seed-real-cars.mjs
 */

import { Client, Databases, Storage, Permission, Role, ID } from "node-appwrite";
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
const DB_ID      = process.env.NEXT_PUBLIC_DB_ID      || "rk_auto_db";
const CARS_COL   = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";
const BUCKET_ID  = process.env.NEXT_PUBLIC_CAR_IMAGES_BUCKET_ID || "car_images";

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error("❌ Missing env vars — check .env.local");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const db      = new Databases(client);
const storage = new Storage(client);

// ── Car definitions ─────────────────────────────────────────────────────────
// Edit price / mileage / year / variant etc. here as needed.
const REAL_CARS = [
  {
    id:           "rk-creta-sx-real",
    slug:         "hyundai-creta-sx-white",
    name:         "Hyundai Creta SX",
    variant:      "SX Petrol MT",
    price:        3800000,
    mileageVal:   38000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Hyundai",
    model:        "Creta",
    year:         2019,
    type:         "SUV (5 Seater)",
    badge:        "Featured",
    description:  "Spotless white Creta SX in excellent condition. Registered in Bagmati (B AD 4683). Full service history, single-owner, no accidents. Comes with sunroof, rear parking sensors, and factory-fitted alloys.",
    engine:       "1.4L Kappa Petrol",
    videoUrl:     null,
    folder:       "Car-1",
  },
  {
    id:           "rk-i20-grey-real",
    slug:         "hyundai-i20-grey",
    name:         "Hyundai i20",
    variant:      "Magna Petrol MT",
    price:        1950000,
    mileageVal:   72000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Hyundai",
    model:        "i20",
    year:         2015,
    type:         "Hatchback",
    badge:        null,
    description:  "Solid grey i20 in clean and well-maintained condition. Great daily city commuter with excellent fuel economy. Smooth power delivery and comfortable interior.",
    engine:       "1.2L Kappa VTVT Petrol",
    videoUrl:     null,
    folder:       "Car-2",
  },
  {
    id:           "rk-sonet-real",
    slug:         "kia-sonet-mt",
    name:         "Kia Sonet",
    variant:      "HTX Petrol MT",
    price:        3500000,
    mileageVal:   28000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Kia",
    model:        "Sonet",
    year:         2022,
    type:         "SUV (5 Seater)",
    badge:        "New",
    description:  "Feature-packed Kia Sonet with a large 10.25-inch touchscreen, leather seats, electric sunroof, and crisp Kia build quality. Low mileage, like-new condition.",
    engine:       "1.2L Kappa Petrol",
    videoUrl:     null,
    folder:       "car-3",
  },
  {
    id:           "rk-dzire-vxi-real",
    slug:         "suzuki-swift-dzire-vxi-white",
    name:         "Maruti Suzuki Swift Dzire",
    variant:      "VXI Petrol MT",
    price:        2200000,
    mileageVal:   54000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Suzuki",
    model:        "Swift Dzire",
    year:         2018,
    type:         "Sedan",
    badge:        null,
    description:  "Pristine white Dzire VXI registered B AE 5448. This is one of the cleanest Dzires in stock — well-serviced, great highway cruiser, and exceptional fuel economy with the K-Series engine.",
    engine:       "1.2L K-Series Petrol",
    videoUrl:     null,
    folder:       "Car-4",
  },
  {
    id:           "rk-aveo-red-real",
    slug:         "chevrolet-aveo-red",
    name:         "Chevrolet Aveo",
    variant:      "LT Petrol MT",
    price:        1450000,
    mileageVal:   95000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Chevrolet",
    model:        "Aveo",
    year:         2012,
    type:         "Sedan",
    badge:        null,
    description:  "Eye-catching red Aveo with sporty black alloys, registered B AA 3585. Solid daily drive with a spacious boot. Well-maintained with all-season tyres recently replaced.",
    engine:       "1.5L Ecotec SOHC Petrol",
    videoUrl:     null,
    folder:       "car-5",
  },
  {
    id:           "rk-creta-2023-real",
    slug:         "hyundai-creta-2023-interior",
    name:         "Hyundai Creta 2023",
    variant:      "SX Executive Petrol AT",
    price:        5200000,
    mileageVal:   12000,
    transmission: "Automatic",
    fuel:         "Petrol",
    make:         "Hyundai",
    model:        "Creta",
    year:         2023,
    type:         "SUV (5 Seater)",
    badge:        "Featured",
    description:  "Top-spec 2023 Creta with panoramic sunroof, 8-inch touchscreen, ventilated seats, and 6 airbags. Immaculate showroom-condition interior with only 12,000 km on the clock.",
    engine:       "1.5L MPi Petrol",
    videoUrl:     null,
    folder:       "car-6",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
const publicDir = resolve(__dirname, "../public");

function getImagesInFolder(folderName) {
  const dir = join(publicDir, folderName);
  return readdirSync(dir)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
    // deduplicate files with " (1)" copies
    .filter((f, _, arr) => {
      const noSuffix = f.replace(/ \(\d+\)/, "");
      return f === noSuffix || !arr.includes(noSuffix);
    })
    .sort();
}

async function uploadImage(filePath, fileId) {
  try {
    // Try to delete existing file so we can re-upload cleanly
    try { await storage.deleteFile(BUCKET_ID, fileId); } catch (_) {}
    const data = readFileSync(filePath);
    const ext  = filePath.split(".").pop().toLowerCase();
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg"
               : ext === "png"                   ? "image/png"
               :                                   "image/webp";
    const file = InputFile.fromBuffer(data, `${fileId}.${ext}`, mime);
    await storage.createFile(BUCKET_ID, fileId, file, [Permission.read(Role.any())]);
    console.log(`    ✅ Uploaded: ${fileId}`);
    return fileId;
  } catch (err) {
    console.error(`    ❌ Upload failed ${fileId}: ${err.message}`);
    return null;
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚗 Seeding real car listings into Appwrite...\n");

  for (const car of REAL_CARS) {
    console.log(`\n📸 Processing: ${car.name} (${car.folder})`);

    const images = getImagesInFolder(car.folder);
    console.log(`   Found ${images.length} image(s)`);

    const uploadedIds = [];
    for (let i = 0; i < images.length; i++) {
      const filePath = join(publicDir, car.folder, images[i]);
      const fileId   = `${car.id}-img-${i + 1}`;
      const id       = await uploadImage(filePath, fileId);
      if (id) uploadedIds.push(id);
      // Small delay to avoid rate-limiting
      await new Promise(r => setTimeout(r, 300));
    }

    const docData = {
      name:         car.name,
      slug:         car.slug,
      description:  car.description,
      price:        car.price,
      make:         car.make,
      model:        car.model,
      year:         car.year,
      mileage:      car.mileageVal,
      engine:       car.engine,
      transmission: car.transmission,
      drivetrain:   "FWD",
      featured:     car.badge === "Featured",
      image_ids:    uploadedIds,
      video_url:    car.videoUrl || "",
      variant:      car.variant,
      fuel:         car.fuel,
      type:         car.type,
      badge:        car.badge || "",
    };

    try {
      await db.getDocument(DB_ID, CARS_COL, car.id);
      await db.updateDocument(DB_ID, CARS_COL, car.id, docData);
      console.log(`   ✅ Updated DB record: ${car.name}`);
    } catch (err) {
      if (err.code === 404) {
        await db.createDocument(DB_ID, CARS_COL, car.id, docData);
        console.log(`   ✅ Created DB record: ${car.name}`);
      } else {
        console.error(`   ❌ DB error for ${car.name}: ${err.message}`);
      }
    }
  }

  console.log("\n✨ Real car seeding complete!\n");
}

main().catch(console.error);
