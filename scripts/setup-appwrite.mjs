#!/usr/bin/env node
/**
 * Appwrite Setup Script for RK Auto Mobiles
 * Creates: database, collections (cars, pages_content, settings, leads), and storage bucket
 * Run: node scripts/setup-appwrite.mjs
 */

import { Client, Databases, Storage, Permission, Role, DatabasesIndexType } from "node-appwrite";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const IndexType = DatabasesIndexType;
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
const storage = new Storage(client);

const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const CARS_ID = process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";
const PAGES_ID = process.env.NEXT_PUBLIC_PAGES_COLLECTION_ID || "pages_content";
const SETTINGS_ID = process.env.NEXT_PUBLIC_SETTINGS_COLLECTION_ID || "settings";
const LEADS_ID = process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID || "leads";
const BUCKET_ID = process.env.NEXT_PUBLIC_CAR_IMAGES_BUCKET_ID || "car_images";

async function safeCreate(label, fn) {
    try {
        const result = await fn();
        console.log(`  ✅ ${label}`);
        return result;
    } catch (err) {
        if (err.code === 409) {
            console.log(`  ⚠️  ${label} — already exists, skipping`);
        } else {
            console.error(`  ❌ ${label} — ${err.message}`);
            throw err;
        }
    }
}

async function main() {
    console.log("\n🚀 Setting up Appwrite for RK Auto Mobiles...\n");

    // ─── DATABASE ───────────────────────────────────────────────────────────────
    console.log("📦 Creating database...");
    await safeCreate(`Database: ${DB_ID}`, () =>
        databases.create(DB_ID, "RK Auto DB")
    );

    // ─── CARS COLLECTION ─────────────────────────────────────────────────────
    console.log(`\n🪄 Creating collection: ${CARS_ID}...`);
    await safeCreate(`Collection: ${CARS_ID}`, () =>
        databases.createCollection(DB_ID, CARARS_COLLECTION_SETUP(), "Cars", [
            Permission.read(Role.any()),
            Permission.create(Role.any()), // Allow anyone to submit a car to sell
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ])
    );

    function CARARS_COLLECTION_SETUP() {
        return CARS_ID;
    }

    const carAttrs = [
        () => databases.createStringAttribute(DB_ID, CARS_ID, "name", 255, true),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "slug", 255, true),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "description", 5000, true),
        () => databases.createFloatAttribute(DB_ID, CARS_ID, "price", true),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "make", 100, true),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "model", 100, true),
        () => databases.createIntegerAttribute(DB_ID, CARS_ID, "year", true),
        () => databases.createIntegerAttribute(DB_ID, CARS_ID, "mileage", true),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "engine", 100, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "transmission", 100, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "drivetrain", 100, false),
        () => databases.createBooleanAttribute(DB_ID, CARS_ID, "featured", false, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "image_ids", 255, false, null, true),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "video_url", 1000, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "variant", 255, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "fuel", 100, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "type", 100, false),
        () => databases.createStringAttribute(DB_ID, CARS_ID, "badge", 100, false),
    ];

    for (const attr of carAttrs) {
        try { await attr(); console.log("  ✅ Car attribute created"); }
        catch (e) { if (e.code !== 409) throw e; console.log("  ⚠️  Car attribute exists, skipping"); }
    }

    // Wait for attributes to be ready before creating index
    await new Promise(r => setTimeout(r, 3000));

    await safeCreate("Index: slug (unique)", () =>
        databases.createIndex(DB_ID, CARS_ID, "slug_unique", IndexType.Unique, ["slug"])
    );
    await safeCreate("Index: make", () =>
        databases.createIndex(DB_ID, CARS_ID, "make_idx", IndexType.Key, ["make"])
    );
    await safeCreate("Index: featured", () =>
        databases.createIndex(DB_ID, CARS_ID, "featured_idx", IndexType.Key, ["featured"])
    );

    // ─── PAGES_CONTENT COLLECTION ───────────────────────────────────────────────
    console.log(`\n📄 Creating collection: ${PAGES_ID}...`);
    await safeCreate(`Collection: ${PAGES_ID}`, () =>
        databases.createCollection(DB_ID, PAGES_ID, "Pages Content", [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ])
    );

    const pageAttrs = [
        () => databases.createStringAttribute(DB_ID, PAGES_ID, "page_name", 100, true),
        () => databases.createStringAttribute(DB_ID, PAGES_ID, "title", 500, false),
        () => databases.createStringAttribute(DB_ID, PAGES_ID, "content", 50000, false),
        () => databases.createStringAttribute(DB_ID, PAGES_ID, "hero_image_id", 255, false),
        () => databases.createStringAttribute(DB_ID, PAGES_ID, "image_2_id", 255, false),
        () => databases.createStringAttribute(DB_ID, PAGES_ID, "sections", 50000, false),
    ];

    for (const attr of pageAttrs) {
        try { await attr(); console.log("  ✅ Page attribute created"); }
        catch (e) { if (e.code !== 409) throw e; console.log("  ⚠️  Page attribute exists, skipping"); }
    }

    await new Promise(r => setTimeout(r, 2000));
    await safeCreate("Index: page_name (unique)", () =>
        databases.createIndex(DB_ID, PAGES_ID, "page_name_unique", IndexType.Unique, ["page_name"])
    );

    // ─── SETTINGS COLLECTION ────────────────────────────────────────────────────
    console.log(`\n⚙️  Creating collection: ${SETTINGS_ID}...`);
    await safeCreate(`Collection: ${SETTINGS_ID}`, () =>
        databases.createCollection(DB_ID, SETTINGS_ID, "Settings", [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ])
    );

    const settingAttrs = [
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "navbar_color", 50, false, "#1a1a1a"),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "navbar_text_color", 50, false, "#ffffff"),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "footer_color", 50, false, "#111111"),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "footer_text_color", 50, false, "#ffffff"),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "logo_id", 255, false),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "phone", 50, false),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "whatsapp_number", 50, false),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "email", 255, false),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "address", 500, false),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "instagram_url", 500, false),
        () => databases.createStringAttribute(DB_ID, SETTINGS_ID, "facebook_url", 500, false),
    ];

    for (const attr of settingAttrs) {
        try { await attr(); console.log("  ✅ Setting attribute created"); }
        catch (e) { if (e.code !== 409) throw e; console.log("  ⚠️  Setting attribute exists, skipping"); }
    }

    // ─── LEADS COLLECTION ───────────────────────────────────────────────────────
    console.log(`\n📨 Creating collection: ${LEADS_ID}...`);
    await safeCreate(`Collection: ${LEADS_ID}`, () =>
        databases.createCollection(DB_ID, LEADS_ID, "Leads", [
            Permission.read(Role.any()),
            Permission.create(Role.any()), // Allow anyone to submit a lead
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ])
    );

    const leadAttrs = [
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "name", 255, true),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "email", 255, true),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "phone", 50, false),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "whatsapp", 50, false),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "subject", 255, true),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "message", 5000, true),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "status", 100, false, "pending"),
        () => databases.createStringAttribute(DB_ID, LEADS_ID, "car_id", 255, false),
    ];

    for (const attr of leadAttrs) {
        try { await attr(); console.log("  ✅ Lead attribute created"); }
        catch (e) { if (e.code !== 409) throw e; console.log("  ⚠️  Lead attribute exists, skipping"); }
    }

    // ─── STORAGE BUCKET ─────────────────────────────────────────────────────────
    console.log(`\n🪣  Creating storage bucket: ${BUCKET_ID}...`);
    await safeCreate(`Bucket: ${BUCKET_ID}`, () =>
        storage.createBucket(BUCKET_ID, "Car Images", [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ], false, undefined, undefined, [
            "image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/ogg"
        ])
    );

    console.log("\n✨ RK Auto Mobiles Appwrite setup complete!\n");
}

main().catch(console.error);
