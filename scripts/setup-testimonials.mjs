#!/usr/bin/env node
import { Client, Databases, Storage, Permission, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

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
const TESTIMONIALS_COLLECTION_ID = process.env.NEXT_PUBLIC_TESTIMONIALS_COLLECTION_ID || "testimonials";
const TESTIMONIALS_BUCKET_ID = process.env.NEXT_PUBLIC_TESTIMONIALS_BUCKET_ID || "client_testimonials";

const testimonialData = [
  {
    name: "Anish Shrestha",
    role: "Business Consultant",
    quote: "Purchased a Hyundai Creta from RK Auto Center. The car was in absolute mint condition, and the overall transaction was seamless. They took care of everything!",
    rating: 5,
    featured: true
  },
  {
    name: "Sujata Karki",
    role: "Senior UX Designer",
    quote: "I sold my i20 Magna within 3 days. Their valuation was fair, and I didn't have to deal with multiple low-ball offers. The team was extremely polite and professional.",
    rating: 5,
    featured: true
  },
  {
    name: "Dr. Sandeep Pathak",
    role: "Orthopedic Surgeon",
    quote: "The 150-point inspection checklist they provide is detailed and accurate. Bought a Honda City and couldn't be happier with the transparency of the deal.",
    rating: 5,
    featured: true
  },
  {
    name: "Prabesh Adhikari",
    role: "Hotelier",
    quote: "Exceptional service from start to finish. Sourced a Kia Sonet in white color just as I wanted. Their collection and customer hospitality are unmatched in town.",
    rating: 5,
    featured: true
  },
  {
    name: "Melina Shakya",
    role: "Freelance Photographer",
    quote: "Being a woman buying her first car, I was skeptical. But the advisors at RK Auto made me feel completely comfortable and answered all my technical queries patiently.",
    rating: 5,
    featured: true
  },
  {
    name: "Roshan Gurung",
    role: "Ex-British Army",
    quote: "Bespoke acquisition at its best. Sourced a rugged Scorpio with clean records. Reliable service, transparent pricing, and very friendly team.",
    rating: 5,
    featured: true
  },
  {
    name: "Binita Bhandari",
    role: "Corporate Executive",
    quote: "Very impressed by the hassle-free documentation. They transferred the ownership in record time. Will definitely recommend them to friends and family.",
    rating: 5,
    featured: true
  },
  {
    name: "Kiran Rijal",
    role: "Software Engineer",
    quote: "Compared multiple cars using their website and bought a Swift Dzire. The car performs perfectly, and the maintenance cost has been exactly as they estimated.",
    rating: 5,
    featured: true
  },
  {
    name: "Aarati Devkota",
    role: "College Lecturer",
    quote: "Excellent pricing and honest communication. They clearly pointed out a minor scratch on the door and had it polished before delivery. Highly trustworthy.",
    rating: 5,
    featured: true
  },
  {
    name: "Subash Tamang",
    role: "Travel Agency Owner",
    quote: "Bought a Hilux for my tour business. The vehicle history was clear and they provided complete service records. The best auto dealership in Kathmandu.",
    rating: 5,
    featured: true
  },
  {
    name: "Sanjana Shrestha",
    role: "Fashion Designer",
    quote: "The visual presentation of cars on their website is what attracted me first, and their showroom experience was even better. Got my beautiful red Creta here.",
    rating: 5,
    featured: true
  },
  {
    name: "Raju Lama",
    role: "Restaurateur",
    quote: "Traded in my hatchback for a bigger SUV. They offered a very competitive trade-in value. Smooth paperwork and great customer care.",
    rating: 4,
    featured: false
  },
  {
    name: "Nisha Basnet",
    role: "HR Manager",
    quote: "Professional staff, clean cars, and realistic prices. They don't push you to buy. They let you take your time and inspect everything thoroughly.",
    rating: 5,
    featured: false
  },
  {
    name: "Bijay Sen",
    role: "Civil Engineer",
    quote: "Their cars are definitely of premium quality. Checked the engine bay, chassis, and tyres of my bought car. Everything was exactly as described on the site.",
    rating: 5,
    featured: false
  },
  {
    name: "Kabita Pandey",
    role: "Journalist",
    quote: "Fast service, straightforward negotiation, and clean cars. They didn't hide anything. Will buy from them again in the future.",
    rating: 5,
    featured: false
  },
  {
    name: "Deepak Khadka",
    role: "IT Manager",
    quote: "The website comparison tool is super helpful. I could compare Creta and Kia Sonet specs side-by-side. Helped me make an informed choice. Great job, RK Auto!",
    rating: 5,
    featured: false
  },
  {
    name: "Prativa Dahal",
    role: "Bank Manager",
    quote: "Highly recommended for secondhand cars. Their inspection report is very detailed. Bought a red Chevrolet Aveo, and it runs like a dream.",
    rating: 5,
    featured: false
  },
  {
    name: "Manish Shrestha",
    role: "Content Creator",
    quote: "Very cool showroom and polite staff. They helped me get a quick finance option for my vehicle. Highly professional service in Nepal.",
    rating: 5,
    featured: false
  },
  {
    name: "Saroj Bhattarai",
    role: "Automotive Enthusiast",
    quote: "They have a great collection of well-maintained premium cars. The mechanical inspection they perform is the most rigorous I've seen in Kathmandu.",
    rating: 4,
    featured: false
  },
  {
    name: "Elina Maharjan",
    role: "Graphic Designer",
    quote: "Bought a Kia Picanto. It was polished, serviced, and detailed before delivery. It felt like buying a brand new car from the showroom.",
    rating: 5,
    featured: false
  },
  {
    name: "Yubaraj Magar",
    role: "Tourism Consultant",
    quote: "Highly satisfied with my Prado purchase. They provided a full history and did a pre-delivery service. The post-purchase support has also been excellent.",
    rating: 5,
    featured: false
  }
];

async function main() {
  console.log("\n🚀 Re-setting up Appwrite Testimonials Bucket & Seeding...\n");

  // Try to delete the bucket first so we can recreate it with correct extensions
  try {
    console.log(`🗑️ Deleting old storage bucket: ${TESTIMONIALS_BUCKET_ID}...`);
    await storage.deleteBucket(TESTIMONIALS_BUCKET_ID);
    console.log("  ✅ Deleted successfully");
  } catch (err) {
    console.log(`  ⚠️ Bucket delete skipped: ${err.message}`);
  }

  // Create testimonials bucket with CORRECT file extensions
  console.log(`🪣 Creating storage bucket: ${TESTIMONIALS_BUCKET_ID}...`);
  await storage.createBucket(
    TESTIMONIALS_BUCKET_ID,
    "Client Testimonials",
    [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ],
    false,
    undefined,
    undefined,
    ["jpg", "jpeg", "png", "webp", "gif"] // Correct extensions!
  );
  console.log("  ✅ Bucket created with correct extensions.");

  // Check if collection exists, if not, create it
  try {
    await databases.getCollection(DB_ID, TESTIMONIALS_COLLECTION_ID);
    console.log(`⚠️ Collection ${TESTIMONIALS_COLLECTION_ID} already exists, skipping creation.`);
  } catch (err) {
    console.log(`🪄 Creating collection: ${TESTIMONIALS_COLLECTION_ID}...`);
    await databases.createCollection(
      DB_ID,
      TESTIMONIALS_COLLECTION_ID,
      "Testimonials",
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );

    // Create attributes
    const attrs = [
      () => databases.createStringAttribute(DB_ID, TESTIMONIALS_COLLECTION_ID, "name", 255, true),
      () => databases.createStringAttribute(DB_ID, TESTIMONIALS_COLLECTION_ID, "role", 255, true),
      () => databases.createStringAttribute(DB_ID, TESTIMONIALS_COLLECTION_ID, "quote", 5000, true),
      () => databases.createStringAttribute(DB_ID, TESTIMONIALS_COLLECTION_ID, "avatar_id", 255, false),
      () => databases.createIntegerAttribute(DB_ID, TESTIMONIALS_COLLECTION_ID, "rating", false),
      () => databases.createBooleanAttribute(DB_ID, TESTIMONIALS_COLLECTION_ID, "featured", false, false),
    ];

    for (const attr of attrs) {
      try {
        await attr();
        console.log("  ✅ Testimonial attribute created");
      } catch (e) {
        if (e.code !== 409) throw e;
      }
    }

    console.log("⏳ Waiting for database attributes to propagate...");
    await new Promise(r => setTimeout(r, 4000));
  }

  // 4. Upload images and populate documents
  console.log("📸 Scanning testimonials folder and seeding...");
  const testimonialsDir = resolve(__dirname, "../public/ClientTestimonial");
  if (!fs.existsSync(testimonialsDir)) {
    console.error(`❌ Dir not found: ${testimonialsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(testimonialsDir).filter(f => {
    const ext = f.split('.').pop()?.toLowerCase();
    return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp';
  });

  console.log(`Found ${files.length} images to upload.`);

  // Upload files and save document mapping
  for (let i = 0; i < testimonialData.length; i++) {
    const data = testimonialData[i];
    const fileIndex = i % files.length;
    const filename = files[fileIndex];
    const filePath = resolve(testimonialsDir, filename);

    // Let's create a unique document ID based on name slug
    const docId = `t-${data.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    try {
      // Check if document already exists
      try {
        await databases.getDocument(DB_ID, TESTIMONIALS_COLLECTION_ID, docId);
        console.log(`⏳ Testimonial document exists: ${data.name}, updating...`);
        // If it exists, let's keep the document but update metadata (we will skip file upload to be fast if it already has one, or we can just overwrite)
        continue;
      } catch (err) {
        // Document does not exist, proceed
      }

      console.log(`Uploading file ${filename} for ${data.name}...`);
      const fileBuffer = fs.readFileSync(filePath);
      const uploadedFile = await storage.createFile(
        TESTIMONIALS_BUCKET_ID,
        `file-${docId}`,
        InputFile.fromBuffer(fileBuffer, filename)
      );

      const dbData = {
        name: data.name,
        role: data.role,
        quote: data.quote,
        avatar_id: uploadedFile.$id,
        rating: data.rating,
        featured: data.featured,
      };

      console.log(`Creating document for ${data.name}...`);
      await databases.createDocument(DB_ID, TESTIMONIALS_COLLECTION_ID, docId, dbData);
      console.log(`✅ Success for ${data.name}`);
    } catch (e) {
      console.error(`❌ Failed for ${data.name}:`, e.message);
    }
  }

  console.log("\n✨ Testimonials setup complete!\n");
}

main().catch(console.error);
