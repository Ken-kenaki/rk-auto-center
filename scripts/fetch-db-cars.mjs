import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;
const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const CARS_COLLECTION_ID = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";

import { Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

async function run() {
  try {
    const res = await databases.listDocuments(DB_ID, CARS_COLLECTION_ID, [Query.limit(100)]);
    console.log("TOTAL CARS:", res.total);
    res.documents.forEach(d => {
      console.log(`- ID: ${d.$id}, Name: ${d.name}, Price: ${d.price}, ImageIds: ${JSON.stringify(d.image_ids)}`);
    });
  } catch (e) {
    console.error("Error listing documents:", e);
  }
}

run();
