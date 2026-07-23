export interface Car {
  id: string;
  slug: string;
  name: string;
  variant: string;
  price: number;
  mileage: string;
  mileageVal: number;
  transmission: string;
  fuel: string;
  make: string;
  model: string;
  year: number;
  type: string;
  badge?: string | null;
  condition?: string | null;
  featured?: boolean;
  image: string;
  images: string[];
  description: string;
  engine: string;
  videoUrl?: string | null;
  status?: string;
  is_published?: boolean;
  is_sale_submission?: boolean;
  seller_name?: string;
  seller_email?: string;
  seller_phone?: string;
  seller_city?: string;
  createdAt?: string;
}

export const MOCK_CARS: Car[] = [
  {
    id: "rk-creta-sx-real",
    slug: "hyundai-creta-sx-white",
    name: "Hyundai Creta SX",
    variant: "SX 1.6 Petrol MT",
    price: 3300000,
    mileage: "38,000 km",
    mileageVal: 38000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Creta",
    year: 2016,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "/Car-1/732018601_1468031992032074_7688535599390273029_n.jpg",
    images: [
      "/Car-1/732018601_1468031992032074_7688535599390273029_n.jpg",
      "/Car-1/732179062_1468031868698753_1758612669228635993_n.jpg",
      "/Car-1/734685109_1468031942032079_178337502128978600_n.jpg",
      "/Car-1/734685267_1468031952032078_1005234941820478278_n.jpg",
      "/Car-1/735577570_1468031892032084_6195903220576319017_n.jpg",
      "/Car-1/736054193_1468031885365418_5346863268004991929_n.jpg",
      "/Car-1/736574720_1468031862032087_8784055223523196171_n.jpg"
    ],
    description: "2016 model Hyundai Creta SX 1.6 well maintained, not any defect and maintenance cost in reasonable price is for sale/exchange. Features include push button start, projected headlight, airbag, ABS braking, auto AC, alloy wheels, steering mounted controls, fog lights, touchscreen, rear view camera, and back sensor.",
    engine: "1.6L Petrol",
    videoUrl: "https://www.facebook.com/share/r/1FofMckNaT/"
  },
  {
    id: "rk-i20-grey-real",
    slug: "hyundai-i20-grey",
    name: "Hyundai i20",
    variant: "Magna Petrol MT",
    price: 1200000,
    mileage: "72,000 km",
    mileageVal: 72000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "i20",
    year: 2010,
    type: "Hatchback",
    badge: null,
    image: "/Car-2/731787293_1466507515517855_4138498442264167890_n.jpg",
    images: [
      "/Car-2/731787293_1466507515517855_4138498442264167890_n.jpg",
      "/Car-2/731787298_1466507598851180_8648630081151183434_n.jpg",
      "/Car-2/731843469_1466507638851176_1922731772481424130_n.jpg",
      "/Car-2/731843471_1466507542184519_2239212290321430044_n.jpg",
      "/Car-2/731916805_1466507498851190_8035926731259177215_n.jpg",
      "/Car-2/734685153_1466507492184524_2289914062379041402_n.jpg",
      "/Car-2/734747367_1466507578851182_2208614945813390205_n.jpg"
    ],
    description: "2010 model i20 Magna is for sale/exchange, well maintained with no defects and maintenance cost in reasonable price. Features include power windows, power steering, AC, central lock, fog lights, music system, touchscreen, and back camera.",
    engine: "1.2L Kappa Petrol",
    videoUrl: null
  },
  {
    id: "rk-sonet-real",
    slug: "kia-sonet-mt",
    name: "Kia Sonet",
    variant: "Petrol MT",
    price: 3075000,
    mileage: "28,000 km",
    mileageVal: 28000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Kia",
    model: "Sonet",
    year: 2021,
    type: "SUV (5 Seater)",
    badge: "New",
    image: "/car-3/730223081_1463889442446329_3020546882032525045_n.jpg",
    images: [
      "/car-3/730223081_1463889442446329_3020546882032525045_n.jpg",
      "/car-3/731323102_1463889435779663_3914665466126757941_n.jpg",
      "/car-3/731357009_1463889562446317_8094176896024092519_n.jpg",
      "/car-3/731357282_1463889489112991_4641342253893420871_n.jpg",
      "/car-3/731397840_1463889475779659_4493867549668194367_n.jpg",
      "/car-3/731479225_1463889585779648_8701783088817533461_n.jpg"
    ],
    description: "2021 model Kia Sonet is for sale & exchange, well maintained with no defects and accidental records in reasonable price. Features include alloy wheels, power windows, power steering, airbag, AC, touchscreen, back camera, music system, central lock, and tubeless tyres.",
    engine: "1.2L 1197cc Petrol",
    videoUrl: "https://www.facebook.com/share/r/1D2Ldd8Xm1/"
  },
  {
    id: "rk-dzire-vxi-real",
    slug: "suzuki-swift-dzire-vxi-white",
    name: "Maruti Suzuki Swift Dzire",
    variant: "VXI Petrol MT",
    price: 1175000,
    mileage: "54,000 km",
    mileageVal: 54000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Suzuki",
    model: "Swift Dzire",
    year: 2009,
    type: "Sedan",
    badge: null,
    image: "/Car-4/727276655_1462201555948451_6614710949757889571_n.jpg",
    images: [
      "/Car-4/727276655_1462201555948451_6614710949757889571_n.jpg",
      "/Car-4/729747111_1462201062615167_935702276624109530_n.jpg",
      "/Car-4/729828968_1462201522615121_3862144601766699847_n.jpg",
      "/Car-4/730244968_1462201695948437_8372005664985460689_n.jpg",
      "/Car-4/730259058_1462201042615169_7695668459140517486_n.jpg"
    ],
    description: "2009 model Swift Dzire VXI is for sale & exchange, well maintained with no defects and accidental records in reasonable price. Features include power windows, power steering, AC, music system, central lock, tubeless tyres, fog lights, touchscreen, and back camera.",
    engine: "1.3L 1298cc Petrol",
    videoUrl: "https://www.facebook.com/share/r/1JajGcoDJX/"
  },
  {
    id: "rk-aveo-red-real",
    slug: "chevrolet-aveo-red",
    name: "Chevrolet Aveo",
    variant: "1.4 Petrol MT",
    price: 800000,
    mileage: "64,000 km",
    mileageVal: 64000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Chevrolet",
    model: "Aveo",
    year: 2009,
    type: "Sedan",
    badge: null,
    image: "/car-5/722181994_1455988606569746_1313033400422645974_n.jpg",
    images: [
      "/car-5/722181994_1455988606569746_1313033400422645974_n.jpg",
      "/car-5/722994725_1455988599903080_2796563389459687366_n.jpg",
      "/car-5/724526824_1455988629903077_3388813322108024880_n.jpg",
      "/car-5/725025342_1455988509903089_1294948972158063211_n.jpg",
      "/car-5/725213806_1455988549903085_4281347019059520144_n.jpg",
      "/car-5/725599125_1455988566569750_3007128623800821355_n.jpg",
      "/car-5/725611423_1455988503236423_7125910718787657222_n.jpg"
    ],
    description: "2009 model Chevrolet Aveo 1.4 is for sale/exchange, well maintained with no defects and maintenance cost in reasonable price. Running 64,000 km. Features include alloy wheels, power windows, power steering, AC, central lock, touchscreen, and back camera.",
    engine: "1.4L 1400cc Petrol",
    videoUrl: "https://www.facebook.com/share/r/1C5Z28wthk/"
  },
  {
    id: "rk-creta-2023-real",
    slug: "hyundai-creta-2023-interior",
    name: "Hyundai Creta 2023",
    variant: "SX Petrol MT",
    price: 5175000,
    mileage: "35,000 km",
    mileageVal: 35000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Creta",
    year: 2021,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "/car-6/721516921_1455241893311084_1453235107490393245_n.jpg",
    images: [
      "/car-6/721516921_1455241893311084_1453235107490393245_n.jpg",
      "/car-6/721575522_1455241846644422_4369481958912154451_n.jpg",
      "/car-6/724504648_1455241763311097_168414109588232099_n.jpg",
      "/car-6/724660297_1455241756644431_3863600280576494836_n.jpg",
      "/car-6/724937308_1455241796644427_4322401193772174562_n.jpg",
      "/car-6/725033677_1455241883311085_7193378403800727239_n.jpg",
      "/car-6/725198314_1455241833311090_8565315765081785547_n.jpg",
      "/car-6/725584488_1455241779977762_3997950810387578011_n.jpg"
    ],
    description: "2021 model Hyundai Creta SX well maintained with no defects and maintenance cost in reasonable price is for sale/exchange. Running 35,000 km. Features include panoramic sunroof, push button start, projected headlights, airbag, ABS braking, auto AC, alloy wheels, steering mounted controls, fog lights, touchscreen, rear view camera, and back sensor.",
    engine: "1.5L 1497cc Petrol",
    videoUrl: "https://www.facebook.com/share/r/18m16rT5bR/"
  }
];

import { databases } from "./appwrite";
import { DB_ID, CARS_COLLECTION_ID } from "./constants";
import { Query } from "appwrite";
import { getFilePreviewUrl } from "./utils";

export async function fetchCarsFromAppwrite(): Promise<Car[]> {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      CARS_COLLECTION_ID,
      [Query.limit(100)]
    );
    const mapped = response.documents.map((doc: any) => {
      const mappedImages = (doc.image_ids || []).map((imgId: string) => 
        imgId.startsWith("http") ? imgId : getFilePreviewUrl(imgId)
      );
      return {
        id: doc.$id,
        slug: doc.slug || "",
        name: doc.name,
        variant: doc.variant || "",
        price: doc.price,
        mileageVal: doc.mileage,
        mileage: `${(doc.mileage || 0).toLocaleString()} km`,
        transmission: doc.transmission || "Automatic",
        fuel: doc.fuel || "Petrol",
        make: doc.make,
        model: doc.model,
        year: doc.year,
        type: doc.type || "SUV (5 Seater)",
        badge: doc.badge || null,
        condition: doc.condition || null,
        featured: doc.featured || false,
        image: mappedImages[0] || "",
        images: mappedImages,
        description: doc.description,
        engine: doc.engine || "",
        videoUrl: doc.video_url || null,
        status: doc.status || "approved",
        is_published: doc.is_published !== undefined ? doc.is_published : true,
        is_sale_submission: (doc.slug || "").startsWith("sell-"),
        seller_name: doc.seller_name || "",
        seller_email: doc.seller_email || "",
        seller_phone: doc.seller_phone || "",
        seller_city: doc.seller_city || "",
        createdAt: doc.$createdAt || "",
      };
    });
    // Slug prefix "sell-" = sell-form submission → never show in car listings
    return mapped.filter((c: Car) => !c.slug.startsWith("sell-"));
  } catch (error) {
    console.error("Failed to fetch cars from Appwrite:", error);
    return MOCK_CARS;
  }
}

export async function fetchSalesSubmissionsFromAppwrite(): Promise<Car[]> {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      CARS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    const mapped = response.documents.map((doc: any) => {
      const mappedImages = (doc.image_ids || []).map((imgId: string) => 
        imgId.startsWith("http") ? imgId : getFilePreviewUrl(imgId)
      );
      
      // Parse seller info from description if present
      const descStr = doc.description || "";
      const sellerMatch = descStr.match(/--- SELLER CONTACT INFO ---\s*\nName:\s*([^\n]*)\s*\nEmail:\s*([^\n]*)\s*\nPhone:\s*([^\n]*)\s*\nCity:\s*([^\n]*)/);
      const cleanDesc = descStr.split("--- SELLER CONTACT INFO ---")[0].trim();

      return {
        id: doc.$id,
        slug: doc.slug || "",
        name: doc.name,
        variant: doc.variant || "",
        price: doc.price,
        mileageVal: doc.mileage,
        mileage: `${(doc.mileage || 0).toLocaleString()} km`,
        transmission: doc.transmission || "Automatic",
        fuel: doc.fuel || "Petrol",
        make: doc.make,
        model: doc.model,
        year: doc.year,
        type: doc.type || "SUV (5 Seater)",
        badge: doc.badge || null,
        condition: doc.condition || null,
        featured: doc.featured || false,
        image: mappedImages[0] || "",
        images: mappedImages,
        description: cleanDesc || descStr,
        engine: doc.engine || "",
        videoUrl: doc.video_url || null,
        status: doc.status || "pending",
        is_published: doc.is_published || false,
        is_sale_submission: (doc.slug || "").startsWith("sell-"),
        seller_name: sellerMatch ? sellerMatch[1] : (doc.seller_name || "N/A"),
        seller_email: sellerMatch ? sellerMatch[2] : (doc.seller_email || "N/A"),
        seller_phone: sellerMatch ? sellerMatch[3] : (doc.seller_phone || "N/A"),
        seller_city: sellerMatch ? sellerMatch[4] : (doc.seller_city || "N/A"),
        createdAt: doc.$createdAt || "",
      };
    });
    // Only return sell-form submissions (identified by slug prefix "sell-")
    return mapped.filter((c: Car) => c.slug.startsWith("sell-"));
  } catch (error) {
    console.error("Failed to fetch sales submissions from Appwrite:", error);
    return [];
  }
}

export async function fetchCarBySlugFromAppwrite(slug: string): Promise<Car | null> {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      CARS_COLLECTION_ID,
      [Query.equal("slug", slug), Query.limit(1)]
    );
    if (response.documents.length === 0) return null;
    const doc = response.documents[0];
    const mappedImages = (doc.image_ids || []).map((imgId: string) => 
      imgId.startsWith("http") ? imgId : getFilePreviewUrl(imgId)
    );
    return {
      id: doc.$id,
      slug: doc.slug,
      name: doc.name,
      variant: doc.variant || "",
      price: doc.price,
      mileageVal: doc.mileage,
      mileage: `${(doc.mileage || 0).toLocaleString()} km`,
      transmission: doc.transmission || "Automatic",
      fuel: doc.fuel || "Petrol",
      make: doc.make,
      model: doc.model,
      year: doc.year,
      type: doc.type || "SUV (5 Seater)",
      badge: doc.badge || null,
      condition: doc.condition || null,
      featured: doc.featured || false,
      image: mappedImages[0] || "",
      images: mappedImages,
      description: doc.description,
      engine: doc.engine || "",
      videoUrl: doc.video_url || null,
      status: doc.status || "approved",
      is_published: doc.is_published !== undefined ? doc.is_published : true,
      is_sale_submission: doc.is_sale_submission || false,
      seller_name: doc.seller_name || "",
      seller_email: doc.seller_email || "",
      seller_phone: doc.seller_phone || "",
      seller_city: doc.seller_city || "",
      createdAt: doc.$createdAt || "",
    };
  } catch (error) {
    console.error(`Failed to fetch car by slug ${slug} from Appwrite:`, error);
    return MOCK_CARS.find((c) => c.slug === slug) || null;
  }
}
