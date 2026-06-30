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

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const db = new Databases(client);

const UPDATES = [
  {
    docId: "rk-creta-sx-real",
    data: {
      name: "Hyundai Creta SX",
      variant: "SX 1.6 Petrol MT",
      price: 3300000,
      year: 2016,
      engine: "1.6L Petrol",
      description: "2016 model Hyundai Creta SX 1.6 well maintained, not any defect and maintenance cost in reasonable price is for sale/exchange. Features include push button start, projected headlight, airbag, ABS braking, auto AC, alloy wheels, steering mounted controls, fog lights, touchscreen, rear view camera, and back sensor.",
      video_url: "https://www.facebook.com/share/r/1FofMckNaT/",
    }
  },
  {
    docId: "rk-i20-grey-real",
    data: {
      name: "Hyundai i20",
      variant: "Magna Petrol MT",
      price: 1200000,
      year: 2010,
      engine: "1.2L Kappa Petrol",
      description: "2010 model i20 Magna is for sale/exchange, well maintained with no defects and maintenance cost in reasonable price. Features include power windows, power steering, AC, central lock, fog lights, music system, touchscreen, and back camera.",
      video_url: "",
    }
  },
  {
    docId: "rk-sonet-real",
    data: {
      name: "Kia Sonet",
      variant: "Petrol MT",
      price: 3075000,
      year: 2021,
      engine: "1.2L 1197cc Petrol",
      description: "2021 model Kia Sonet is for sale & exchange, well maintained with no defects and accidental records in reasonable price. Features include alloy wheels, power windows, power steering, airbag, AC, touchscreen, back camera, music system, central lock, and tubeless tyres.",
      video_url: "https://www.facebook.com/share/r/1D2Ldd8Xm1/",
    }
  },
  {
    docId: "rk-dzire-vxi-real",
    data: {
      name: "Maruti Suzuki Swift Dzire",
      variant: "VXI Petrol MT",
      price: 1175000,
      year: 2009,
      engine: "1.3L 1298cc Petrol",
      description: "2009 model Swift Dzire VXI is for sale & exchange, well maintained with no defects and accidental records in reasonable price. Features include power windows, power steering, AC, music system, central lock, tubeless tyres, fog lights, touchscreen, and back camera.",
      video_url: "https://www.facebook.com/share/r/1JajGcoDJX/",
    }
  },
  {
    docId: "rk-aveo-red-real",
    data: {
      name: "Chevrolet Aveo",
      variant: "1.4 Petrol MT",
      price: 800000,
      year: 2009,
      mileage: 64000,
      engine: "1.4L 1400cc Petrol",
      description: "2009 model Chevrolet Aveo 1.4 is for sale/exchange, well maintained with no defects and maintenance cost in reasonable price. Running 64,000 km. Features include alloy wheels, power windows, power steering, AC, central lock, touchscreen, and back camera.",
      video_url: "https://www.facebook.com/share/r/1C5Z28wthk/",
    }
  },
  {
    docId: "rk-creta-2023-real",
    data: {
      name: "Hyundai Creta 2023",
      variant: "SX Petrol MT",
      price: 5175000,
      year: 2021,
      mileage: 35000,
      transmission: "Manual",
      engine: "1.5L 1497cc Petrol",
      description: "2021 model Hyundai Creta SX well maintained with no defects and maintenance cost in reasonable price is for sale/exchange. Running 35,000 km. Features include panoramic sunroof, push button start, projected headlights, airbag, ABS braking, auto AC, alloy wheels, steering mounted controls, fog lights, touchscreen, rear view camera, and back sensor.",
      video_url: "https://www.facebook.com/share/r/18m16rT5bR/",
    }
  }
];

async function main() {
  console.log("📝 Updating car records in Appwrite...\n");

  for (const update of UPDATES) {
    try {
      await db.updateDocument(DB_ID, CARS_COL, update.docId, update.data);
      console.log(`✅ Updated: ${update.data.name} (${update.docId})`);
    } catch (err) {
      console.error(`❌ Failed to update ${update.docId}:`, err.message);
    }
  }

  console.log("\n✨ All car records updated!");
}

main().catch(console.error);
