import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { MOCK_CARS } from "../lib/cars.js"; // will resolve to typescript when run with tsx

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error("❌ Missing environment variables. Check .env.local");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const CARS_COLLECTION_ID = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";

async function seed() {
  console.log(`\n🚗 Seeding ${MOCK_CARS.length} vehicles into Appwrite collection "${CARS_COLLECTION_ID}"...\n`);

  for (const car of MOCK_CARS) {
    const data = {
      name: car.name,
      slug: car.slug,
      description: car.description,
      price: car.price,
      make: car.make,
      model: car.model,
      year: car.year,
      mileage: car.mileageVal,
      engine: car.engine,
      transmission: car.transmission,
      drivetrain: "FWD", // default drivetrain since not specified in mock data
      featured: car.badge === "Featured",
      image_ids: car.images,
      video_url: car.videoUrl || "",
      variant: car.variant,
      fuel: car.fuel,
      type: car.type,
      badge: car.badge || "",
    };

    try {
      // Check if document exists
      await databases.getDocument(DB_ID, CARS_COLLECTION_ID, car.id);
      console.log(`⏳ Document exists: ${car.name} (${car.id}), updating...`);
      await databases.updateDocument(DB_ID, CARS_COLLECTION_ID, car.id, data);
      console.log(`✅ Updated: ${car.name}`);
    } catch (err: any) {
      if (err.code === 404) {
        console.log(`➕ Document missing: ${car.name} (${car.id}), creating...`);
        await databases.createDocument(DB_ID, CARS_COLLECTION_ID, car.id, data);
        console.log(`✅ Created: ${car.name}`);
      } else {
        console.error(`❌ Error processing ${car.name}:`, err.message);
      }
    }
  }

  console.log("\n✨ Seeding process completed successfully!\n");
}

seed().catch(console.error);
