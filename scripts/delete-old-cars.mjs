import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const ENDPOINT   = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY    = process.env.APPWRITE_API_KEY;
const DB_ID      = process.env.NEXT_PUBLIC_DB_ID      || "rk_auto_db";
const CARS_COL   = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error("❌ Missing env vars");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const db = new Databases(client);

const KEEP_IDS = [
  "rk-creta-sx-real",
  "rk-i20-grey-real",
  "rk-sonet-real",
  "rk-dzire-vxi-real",
  "rk-aveo-red-real",
  "rk-creta-2023-real"
];

async function main() {
  console.log("🧹 Fetching all cars to delete non-matching ones...");
  let response = await db.listDocuments(DB_ID, CARS_COL);
  console.log(`Found ${response.documents.length} total cars in collection.`);
  
  for (const doc of response.documents) {
    if (!KEEP_IDS.includes(doc.$id)) {
      console.log(`Deleting old car: ${doc.name} (ID: ${doc.$id})`);
      await db.deleteDocument(DB_ID, CARS_COL, doc.$id);
    } else {
      console.log(`Keeping real car: ${doc.name} (ID: ${doc.$id})`);
    }
  }
  console.log("🧹 Cleanup complete!");
}

main().catch(console.error);
