#!/usr/bin/env node
import { Client, Databases } from "node-appwrite";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

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
const CARS_ID = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";

async function main() {
    console.log("Checking attributes for cars collection...");
    try {
        const attributes = await databases.listAttributes(DB_ID, CARS_ID);
        const hasCondition = attributes.attributes.some(attr => attr.key === "condition");

        if (hasCondition) {
            console.log("✅ 'condition' attribute already exists!");
        } else {
            console.log("🪄 Creating 'condition' attribute...");
            await databases.createStringAttribute(DB_ID, CARS_ID, "condition", 100, false);
            console.log("✅ 'condition' attribute created successfully!");
        }
    } catch (err) {
        console.error("❌ Failed to verify or create 'condition' attribute:", err.message);
    }
}

main();
