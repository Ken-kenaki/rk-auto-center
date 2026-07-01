#!/usr/bin/env node
import { Client, Databases, Permission, Role } from "node-appwrite";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env.local") });

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68d35b4100297c609e51";
const API_KEY = process.env.APPWRITE_API_KEY;

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error("❌ Missing environment variables APPWRITE_API_KEY, NEXT_PUBLIC_APPWRITE_ENDPOINT, or NEXT_PUBLIC_APPWRITE_PROJECT_ID. Check .env.local");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
const PAGES_COLLECTION_ID = process.env.NEXT_PUBLIC_PAGES_COLLECTION_ID || "pages_content";

const aboutData = {
  page_name: "about",
  title: "About Us — RK Auto Center",
  content: "Learn more about the legacy, philosophy, and client stories of RK Auto Center.",
  sections: JSON.stringify({
    heroWord: "LEGACY",
    heroTagline: "Redefining the luxury automotive marketplace.<br />Curating state-of-the-art drives since 2016.",
    heroMainImage: "/about-1.jpg",
    heroSideImages: [
      {
        src: "/about-hero-1.jpg",
        alt: "Happy client with their new car",
        position: "left",
        span: 1,
      },
      {
        src: "/about-hero-2.jpg",
        alt: "Client receiving car keys",
        position: "left",
        span: 1,
      },
      {
        src: "/about-hero-3.jpg",
        alt: "Client posing with their vehicle",
        position: "right",
        span: 1,
      },
      {
        src: "/about-hero-4.jpg",
        alt: "Satisfied customer at RK Auto Center",
        position: "right",
        span: 1,
      },
    ],
    profile: {
      tag: "Company Profile",
      title: "The Pinnacle of Automotive Integrity",
      text: "Founded on the principles of absolute transparency and visual majesty, RK Auto has been the premier destination for serious automotive enthusiasts. We specialize in curating, verifying, and matching world-class supercars and luxury daily drivers with those who appreciate excellence.",
      image: "/rk-des.jpg",
    },
    whyUs: {
      tag: "Why Choose Us",
      title: "The RK Auto Experience",
      text: "We combine elite concierge services with data-driven evaluation tools to deliver a seamless, high-end experience for both buyers and sellers of premium automobiles.",
      cards: [
        {
          title: "Meticulous Inspection",
          text: "Every vehicle on our platform undergoes a rigorous 150-point diagnostic check by certified mechanics, verifying everything from telemetry logs to paint depth.",
          image: "/rk-des.jpg",
        },
        {
          title: "Bespoke Acquisition",
          text: "If the specific build you want is not in our inventory, our sourcing division connects with private collectors worldwide to secure and ship it directly to you.",
          image: "/about-1.jpg",
        },
      ],
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "500+", label: "Premium Cars Sold" },
        { value: "98%", label: "Customer Satisfaction" },
        { value: "100%", label: "Inspected Inventory" },
      ],
    },
    testimonials: {
      tag: "Client Testimonials",
      title: "Trusted by the Discerning",
      text: "Read what elite car collectors, everyday luxury drivers, and performance enthusiasts say about their RK Auto transactions.",
    },
  }),
};

async function main() {
  console.log("\n🌱 Seeding About Page Content to Appwrite...\n");

  // Create database/collection check
  try {
    const response = await databases.listDocuments(DB_ID, PAGES_COLLECTION_ID);
    console.log("✅ Pages Content collection found.");
  } catch (err) {
    console.error("❌ Pages Content collection not ready. Please run node scripts/setup-appwrite.mjs first.");
    process.exit(1);
  }

  const docId = "about-page";

  try {
    // Check if document exists
    try {
      await databases.getDocument(DB_ID, PAGES_COLLECTION_ID, docId);
      console.log("⏳ About page document already exists. Updating content...");
      await databases.updateDocument(DB_ID, PAGES_COLLECTION_ID, docId, {
        title: aboutData.title,
        content: aboutData.content,
        sections: aboutData.sections,
      });
      console.log("✅ About page document updated successfully!");
    } catch (e) {
      if (e.code === 404) {
        console.log("➕ Creating new About page document...");
        await databases.createDocument(DB_ID, PAGES_COLLECTION_ID, docId, aboutData);
        console.log("✅ About page document created successfully!");
      } else {
        throw e;
      }
    }
  } catch (err) {
    console.error("❌ Failed to seed about page document:", err.message);
  }
}

main().catch(console.error);
