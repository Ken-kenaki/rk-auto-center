import { readdirSync } from "fs";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const REAL_CARS = [
  {
    id:           "rk-creta-sx-real",
    slug:         "hyundai-creta-sx-white",
    name:         "Hyundai Creta SX",
    variant:      "SX Petrol MT",
    price:        3800000,
    mileageVal:   38000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Hyundai",
    model:        "Creta",
    year:         2019,
    type:         "SUV (5 Seater)",
    badge:        "Featured",
    description:  "Spotless white Creta SX in excellent condition. Registered in Bagmati (B AD 4683). Full service history, single-owner, no accidents. Comes with sunroof, rear parking sensors, and factory-fitted alloys.",
    engine:       "1.4L Kappa Petrol",
    videoUrl:     null,
    folder:       "Car-1",
  },
  {
    id:           "rk-i20-grey-real",
    slug:         "hyundai-i20-grey",
    name:         "Hyundai i20",
    variant:      "Magna Petrol MT",
    price:        1950000,
    mileageVal:   72000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Hyundai",
    model:        "i20",
    year:         2015,
    type:         "Hatchback",
    badge:        null,
    description:  "Solid grey i20 in clean and well-maintained condition. Great daily city commuter with excellent fuel economy. Smooth power delivery and comfortable interior.",
    engine:       "1.2L Kappa VTVT Petrol",
    videoUrl:     null,
    folder:       "Car-2",
  },
  {
    id:           "rk-sonet-real",
    slug:         "kia-sonet-mt",
    name:         "Kia Sonet",
    variant:      "HTX Petrol MT",
    price:        3500000,
    mileageVal:   28000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Kia",
    model:        "Sonet",
    year:         2022,
    type:         "SUV (5 Seater)",
    badge:        "New",
    description:  "Feature-packed Kia Sonet with a large 10.25-inch touchscreen, leather seats, electric sunroof, and crisp Kia build quality. Low mileage, like-new condition.",
    engine:       "1.2L Kappa Petrol",
    videoUrl:     null,
    folder:       "car-3",
  },
  {
    id:           "rk-dzire-vxi-real",
    slug:         "suzuki-swift-dzire-vxi-white",
    name:         "Maruti Suzuki Swift Dzire",
    variant:      "VXI Petrol MT",
    price:        2200000,
    mileageVal:   54000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Suzuki",
    model:        "Swift Dzire",
    year:         2018,
    type:         "Sedan",
    badge:        null,
    description:  "Pristine white Dzire VXI registered B AE 5448. This is one of the cleanest Dzires in stock — well-serviced, great highway cruiser, and exceptional fuel economy with the K-Series engine.",
    engine:       "1.2L K-Series Petrol",
    videoUrl:     null,
    folder:       "Car-4",
  },
  {
    id:           "rk-aveo-red-real",
    slug:         "chevrolet-aveo-red",
    name:         "Chevrolet Aveo",
    variant:      "LT Petrol MT",
    price:        1450000,
    mileageVal:   95000,
    transmission: "Manual",
    fuel:         "Petrol",
    make:         "Chevrolet",
    model:        "Aveo",
    year:         2012,
    type:         "Sedan",
    badge:        null,
    description:  "Eye-catching red Aveo with sporty black alloys, registered B AA 3585. Solid daily drive with a spacious boot. Well-maintained with all-season tyres recently replaced.",
    engine:       "1.5L Ecotec SOHC Petrol",
    videoUrl:     null,
    folder:       "car-5",
  },
  {
    id:           "rk-creta-2023-real",
    slug:         "hyundai-creta-2023-interior",
    name:         "Hyundai Creta 2023",
    variant:      "SX Executive Petrol AT",
    price:        5200000,
    mileageVal:   12000,
    transmission: "Automatic",
    fuel:         "Petrol",
    make:         "Hyundai",
    model:        "Creta",
    year:         2023,
    type:         "SUV (5 Seater)",
    badge:        "Featured",
    description:  "Top-spec 2023 Creta with panoramic sunroof, 8-inch touchscreen, ventilated seats, and 6 airbags. Immaculate showroom-condition interior with only 12,000 km on the clock.",
    engine:       "1.5L MPi Petrol",
    videoUrl:     null,
    folder:       "car-6",
  },
];

function getImagesInFolder(folderName) {
  const dir = join(publicDir, folderName);
  try {
    return readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
      // deduplicate files with " (1)" copies
      .filter((f, _, arr) => {
        const noSuffix = f.replace(/ \(\d+\)/, "");
        return f === noSuffix || !arr.includes(noSuffix);
      })
      .sort()
      .map(f => `/${folderName}/${f}`);
  } catch (e) {
    return [];
  }
}

const mockCarsArray = REAL_CARS.map(car => {
  const imgs = getImagesInFolder(car.folder);
  return {
    id: car.id,
    slug: car.slug,
    name: car.name,
    variant: car.variant,
    price: car.price,
    mileage: `${car.mileageVal.toLocaleString()} km`,
    mileageVal: car.mileageVal,
    transmission: car.transmission,
    fuel: car.fuel,
    make: car.make,
    model: car.model,
    year: car.year,
    type: car.type,
    badge: car.badge,
    image: imgs[0] || "",
    images: imgs,
    description: car.description,
    engine: car.engine,
    videoUrl: car.videoUrl
  };
});

console.log(JSON.stringify(mockCarsArray, null, 2));
