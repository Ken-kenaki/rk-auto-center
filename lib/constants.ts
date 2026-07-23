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
export const TESTIMONIALS_COLLECTION_ID =
    process.env.NEXT_PUBLIC_TESTIMONIALS_COLLECTION_ID || "testimonials";
export const TESTIMONIALS_BUCKET_ID =
    process.env.NEXT_PUBLIC_TESTIMONIALS_BUCKET_ID || "client_testimonials";

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
    "Volkswagen",
    "Hyundai",
    "Toyota",
    "Honda",
    "Nissan",
    "Škoda",
    "Mahindra",
    "Kia",
    "Chevrolet",
    "Mazda",
    "Ford",
    "Land Rover",
    "Mitsubishi",
    "Suzuki",
    "Tata",
    "Peugeot",
    "Renault",
    "Jeep",
    "MG (Morris Garage)",
    "BYD",
];

export const BRAND_MODELS_DATA: Record<string, string[]> = {
    "Volkswagen": ["Polo", "Tiguan", "Passat", "Golf", "Vento", "Touareg", "Taigun", "Virtus"],
    "Hyundai": ["Creta", "i20", "Venue", "i10", "Grand i10", "Verna", "Tucson", "Santro", "Eon", "Santa Fe", "Kona", "Ioniq 5", "Aura", "Alcazar"],
    "Toyota": ["Fortuner", "Hilux", "Corolla", "RAV4", "Land Cruiser", "Prado", "Yaris", "Etios Liva", "Avanza", "Rush", "Camry", "Hyryder"],
    "Honda": ["City", "Civic", "CR-V", "Jazz", "Brio", "WR-V", "Elevate", "Amaze"],
    "Nissan": ["Kicks", "Magnite", "X-Trail", "Navara", "Sunny", "Terrano", "Patrol"],
    "Škoda": ["Kushaq", "Slavia", "Octavia", "Superb", "Kodiaq", "Rapid", "Fabia", "Yeti"],
    "Mahindra": ["Scorpio", "Scorpio-N", "Thar", "XUV700", "XUV300", "Bolero", "XUV500"],
    "Kia": ["Seltos", "Sonet", "Carens", "Sportage", "Picanto", "Rio", "EV6"],
    "Chevrolet": ["Beat", "Spark", "Cruze", "Captiva", "Sail"],
    "Mazda": ["Mazda 2", "Mazda 3", "Mazda 6", "CX-5", "CX-30"],
    "Ford": ["EcoSport", "Endeavour", "Ranger", "Figo", "Mustang", "Everest"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "G-Class"],
    "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Evoque", "Defender", "Discovery"],
    "Mitsubishi": ["Pajero", "Pajero Sport", "ASX", "Outlander", "Lancer"],
    "Suzuki": ["Swift", "Baleno", "Brezza", "Alto", "Wagon R", "Ertiga", "Dzire", "Jimny", "Grand Vitara", "Ignis", "Celerio", "S-Presso"],
    "Tata": ["Nexon", "Harrier", "Safari", "Punch", "Tiago", "Tigor", "Hexa"],
    "Peugeot": ["208", "2008", "3008", "5008"],
    "Renault": ["Kwid", "Triber", "Kiger", "Duster"],
    "Jeep": ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
    "MG (Morris Garage)": ["ZS EV", "Hector", "Astor", "Gloster", "Comet"],
    "BYD": ["Atto 3", "Dolphin", "Seal", "e6"],
    "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "iX3", "i4", "M4"],
    "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
    "Audi": ["A4", "A6", "Q3", "Q5", "Q7", "Q8", "e-tron"],
    "Lexus": ["RX", "NX", "LX", "ES"],
    "Ferrari": ["Roma", "296 GTB", "SF90", "F8 Tributo"],
    "MINI": ["Cooper", "Countryman"],
};

export const YEAR_OPTIONS = Array.from({ length: 37 }, (_, i) => String(2026 - i));

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
