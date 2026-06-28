export const APPWRITE_ENDPOINT =
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID =
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "68d35b4100297c609e51";

export const DB_ID = process.env.NEXT_PUBLIC_DB_ID || "rk_auto_db";
export const CARS_COLLECTION_ID =
    process.env.NEXT_PUBLIC_CARS_COLLECTION_ID || "cars";
export const PAGES_COLLECTION_ID =
    process.env.NEXT_PUBLIC_PAGES_COLLECTION_ID || "pages_content";
export const SETTINGS_COLLECTION_ID =
    process.env.NEXT_PUBLIC_SETTINGS_COLLECTION_ID || "settings";
export const LEADS_COLLECTION_ID =
    process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID || "leads";
export const CAR_IMAGES_BUCKET_ID =
    process.env.NEXT_PUBLIC_CAR_IMAGES_BUCKET_ID || "car_images";

export const CAR_MAKES = [
    "Porsche",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Range Rover",
    "Lexus",
    "Ferrari",
    "Aston Martin",
    "Lamborghini",
    "Bentley",
    "Maserati",
    "MINI",
];

export const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const TRANSMISSION_TYPES = ["Automatic", "Manual"];
export const DRIVETRAIN_TYPES = ["AWD", "RWD", "FWD", "4WD"];

export const PAGE_NAMES = {
    HOME: "home",
    BUY: "buy",
    SELL: "sell",
    COMPARE: "compare",
    ABOUT: "about",
    PRIVACY_POLICY: "privacy-policy",
    TERMS_OF_SERVICE: "terms-of-service",
};
