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
  image: string;
  images: string[];
  description: string;
  engine: string;
  videoUrl?: string | null;
}

export const MOCK_CARS: Car[] = [
  // Volkswagen (2) - Tiguan (2)
  {
    id: "vw-tiguan-1",
    slug: "2018-volkswagen-tiguan",
    name: "2018 Volkswagen Tiguan",
    variant: "Highline 2.0 TDI",
    price: 8500000,
    mileage: "45,000 km",
    mileageVal: 45000,
    transmission: "Automatic",
    fuel: "Diesel",
    make: "Volkswagen",
    model: "Tiguan",
    year: 2018,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Premium German engineering with the high-torque 2.0 TDI engine. This Tiguan Highline comes with keyless entry, panoramic sunroof, and full leather interior.",
    engine: "2.0L TDI Turbo Diesel",
    videoUrl: null
  },
  {
    id: "vw-tiguan-2",
    slug: "2020-volkswagen-tiguan",
    name: "2020 Volkswagen Tiguan",
    variant: "Comfortline TSI",
    price: 9200000,
    mileage: "22,000 km",
    mileageVal: 22000,
    transmission: "Automatic",
    fuel: "Petrol",
    make: "Volkswagen",
    model: "Tiguan",
    year: 2020,
    type: "SUV (5 Seater)",
    badge: "New",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600"
    ],
    description: "A refined drive powered by the responsive TSI turbo petrol engine. Features App-Connect, active cruise control, and modern 3-zone climate control.",
    engine: "1.4L TSI Turbo Petrol",
    videoUrl: null
  },

  // Hyundai (9) - Santro (1), Tucson (1), Grand i10 (2), Creta (4), i20 Active (1)
  {
    id: "hyundai-santro",
    slug: "2019-hyundai-santro",
    name: "2019 Hyundai Santro",
    variant: "Magna Petrol",
    price: 1850000,
    mileage: "55,000 km",
    mileageVal: 55000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Santro",
    year: 2019,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The classic family hatchback, easy to drive and maintain. Offers excellent fuel economy and a compact footprint perfect for city traffic.",
    engine: "1.1L Epsilon Multi-Point Petrol",
    videoUrl: null
  },
  {
    id: "hyundai-tucson",
    slug: "2021-hyundai-tucson",
    name: "2021 Hyundai Tucson",
    variant: "GLS AWD Diesel",
    price: 7800000,
    mileage: "35,000 km",
    mileageVal: 35000,
    transmission: "Automatic",
    fuel: "Diesel",
    make: "Hyundai",
    model: "Tucson",
    year: 2021,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Dynamic styling meets high-end comfort. Equipped with HTRAC All-Wheel Drive, smart power tailgate, and an advanced 8-inch infotainment display.",
    engine: "2.0L CRDi Turbo Diesel",
    videoUrl: "https://www.facebook.com/watch/?v=example_tucson"
  },
  {
    id: "hyundai-grandi10-1",
    slug: "2017-hyundai-grand-i10-asta",
    name: "2017 Hyundai Grand i10",
    variant: "Asta Premium",
    price: 2300000,
    mileage: "62,000 km",
    mileageVal: 62000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Grand i10",
    year: 2017,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Top-end Asta trim featuring keyless start/stop, rear parking camera, diamond cut alloy wheels, and a spacious cabin with rear AC vents.",
    engine: "1.2L Kappa VTVT Petrol",
    videoUrl: null
  },
  {
    id: "hyundai-grandi10-2",
    slug: "2016-hyundai-grand-i10-sportz",
    name: "2016 Hyundai Grand i10",
    variant: "Sportz Edition",
    price: 2100000,
    mileage: "80,000 km",
    mileageVal: 80000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Grand i10",
    year: 2016,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Practical and reliable city hatchback with dual tone interior, steering-mounted controls, and electrically adjustable side mirrors.",
    engine: "1.2L Kappa Petrol",
    videoUrl: null
  },
  {
    id: "hyundai-creta-1",
    slug: "2020-hyundai-creta-sx",
    name: "2020 Hyundai Creta",
    variant: "SX Executive",
    price: 4200000,
    mileage: "48,000 km",
    mileageVal: 48000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Creta",
    year: 2020,
    type: "SUV (5 Seater)",
    badge: "New",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The segment leader with a striking bold design. The SX trim comes with a massive panoramic sunroof, wireless charger, and LED headlights.",
    engine: "1.5L MPi Petrol",
    videoUrl: null
  },
  {
    id: "hyundai-creta-2",
    slug: "2021-hyundai-creta-sxo",
    name: "2021 Hyundai Creta",
    variant: "SX(O) DSL Automatic",
    price: 4800000,
    mileage: "28,000 km",
    mileageVal: 28000,
    transmission: "Automatic",
    fuel: "Diesel",
    make: "Hyundai",
    model: "Creta",
    year: 2021,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Top-of-the-line luxury diesel automatic with ventilated front seats, Bose premium speaker system, and 6 airbags for complete safety.",
    engine: "1.5L CRDi Turbo Diesel",
    videoUrl: null
  },
  {
    id: "hyundai-creta-3",
    slug: "2018-hyundai-creta-s",
    name: "2018 Hyundai Creta",
    variant: "S Edition",
    price: 3500000,
    mileage: "72,000 km",
    mileageVal: 72000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "Creta",
    year: 2018,
    type: "SUV (5 Seater)",
    badge: null,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Extremely popular first-gen facelift model. Offers smooth power delivery, robust build quality, and great highway stability.",
    engine: "1.6L VTVT Petrol",
    videoUrl: null
  },
  {
    id: "hyundai-creta-4",
    slug: "2017-hyundai-creta-e",
    name: "2017 Hyundai Creta",
    variant: "E Diesel MT",
    price: 3100000,
    mileage: "95,000 km",
    mileageVal: 95000,
    transmission: "Manual",
    fuel: "Diesel",
    make: "Hyundai",
    model: "Creta",
    year: 2017,
    type: "SUV (5 Seater)",
    badge: null,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Highly efficient diesel engine, spacious interior, and reliable mechanical setup. Excellent choice for daily long commutes.",
    engine: "1.4L CRDi Diesel",
    videoUrl: null
  },
  {
    id: "hyundai-i20-active",
    slug: "2016-hyundai-i20-active",
    name: "2016 Hyundai i20 Active",
    variant: "SX Dual Tone",
    price: 2600000,
    mileage: "67,000 km",
    mileageVal: 67000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Hyundai",
    model: "i20 Active",
    year: 2016,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Cross-hatch with rugged body cladding, higher ground clearance, project headlamps, and sporty aluminum pedals.",
    engine: "1.2L Kappa Dual VTVT",
    videoUrl: null
  },

  // Toyota (5) - Rav4 (1), Hilux (1), Prado (1), Etios Cross (1), Etios Liva (1)
  {
    id: "toyota-rav4",
    slug: "2022-toyota-rav4",
    name: "2022 Toyota Rav4",
    variant: "Hybrid AWD Limited",
    price: 13500000,
    mileage: "18,000 km",
    mileageVal: 18000,
    transmission: "Automatic",
    fuel: "Hybrid",
    make: "Toyota",
    model: "Rav4",
    year: 2022,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Highly efficient hybrid luxury SUV. Packed with Toyota Safety Sense, premium soft-touch materials, and an electric on-demand AWD system.",
    engine: "2.5L 4-Cylinder Hybrid",
    videoUrl: null
  },
  {
    id: "toyota-hilux",
    slug: "2019-toyota-hilux",
    name: "2019 Toyota Hilux",
    variant: "D-Cab 4x4 MT",
    price: 9500000,
    mileage: "52,000 km",
    mileageVal: 52000,
    transmission: "Manual",
    fuel: "Diesel",
    make: "Toyota",
    model: "Hilux",
    year: 2019,
    type: "Pik Up Truck",
    badge: null,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The indestructible pick-up truck. Ready for the toughest terrains with manual 4x4 transfer case, diff lock, and robust suspension.",
    engine: "2.4L 2GD-FTV Turbo Diesel",
    videoUrl: null
  },
  {
    id: "toyota-prado",
    slug: "2014-toyota-prado",
    name: "2014 Toyota Prado",
    variant: "TX-L Diesel",
    price: 14500000,
    mileage: "110,000 km",
    mileageVal: 110000,
    transmission: "Automatic",
    fuel: "Diesel",
    make: "Toyota",
    model: "Prado",
    year: 2014,
    type: "SUV (7 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Luxurious 7-seater cruiser with legendary off-road reliability. Features dual-zone climate control, cool box, and air suspension adjustment.",
    engine: "3.0L D-4D Turbo Diesel",
    videoUrl: null
  },
  {
    id: "toyota-etios-cross",
    slug: "2015-toyota-etios-cross",
    name: "2015 Toyota Etios Cross",
    variant: "1.2V Luxury",
    price: 2150000,
    mileage: "78,000 km",
    mileageVal: 78000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Toyota",
    model: "Etios Cross",
    year: 2015,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Sporty cross-hatchback styling with Toyota's ultra-reliable engine. Offers low cost of maintenance and great ground clearance.",
    engine: "1.2L DOHC Petrol",
    videoUrl: null
  },
  {
    id: "toyota-etios-liva",
    slug: "2014-toyota-etios-liva",
    name: "2014 Toyota Etios Liva",
    variant: "GD Diesel MT",
    price: 1950000,
    mileage: "89,000 km",
    mileageVal: 89000,
    transmission: "Manual",
    fuel: "Diesel",
    make: "Toyota",
    model: "Etios Liva",
    year: 2014,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Highly practical hatchback, known for excellent cabin space, rear comfort, and highly fuel-efficient diesel engine.",
    engine: "1.4L D-4D Diesel",
    videoUrl: null
  },

  // Honda (1) - City (1)
  {
    id: "honda-city",
    slug: "2018-honda-city",
    name: "2018 Honda City",
    variant: "SV MT Petrol",
    price: 3400000,
    mileage: "46,000 km",
    mileageVal: 46000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Honda",
    model: "City",
    year: 2018,
    type: "Sedan",
    badge: null,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Sophisticated styling with Honda's legendary i-VTEC engine. Delivers exceptional highway comfort and a premium cabin.",
    engine: "1.5L i-VTEC Petrol",
    videoUrl: null
  },

  // Daihatsu (1) - Terios (1)
  {
    id: "daihatsu-terios",
    slug: "2012-daihatsu-terios",
    name: "2012 Daihatsu Terios",
    variant: "TX 7-Seater 4x4",
    price: 3850000,
    mileage: "95,000 km",
    mileageVal: 95000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Daihatsu",
    model: "Terios",
    year: 2012,
    type: "SUV (7 Seater)",
    badge: null,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Compact 7-seater SUV with true 4WD capabilities. Extremely practical for rough Nepalese highway terrain.",
    engine: "1.5L 4-Cylinder Petrol",
    videoUrl: null
  },

  // Skoda (1) - Rapid (1)
  {
    id: "skoda-rapid",
    slug: "2017-skoda-rapid",
    name: "2017 Škoda Rapid",
    variant: "Style 1.6 MPI",
    price: 2950000,
    mileage: "64,000 km",
    mileageVal: 64000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Škoda",
    model: "Rapid",
    year: 2017,
    type: "Sedan",
    badge: null,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Solid build quality, sharp European styling, and precise handling. Excellent highway cruiser with large boot space.",
    engine: "1.6L MPI Petrol",
    videoUrl: null
  },

  // Mahindra (1) - Scorpio (1)
  {
    id: "mahindra-scorpio",
    slug: "2019-mahindra-scorpio",
    name: "2019 Mahindra Scorpio",
    variant: "S11 4WD Luxury",
    price: 5400000,
    mileage: "58,000 km",
    mileageVal: 58000,
    transmission: "Manual",
    fuel: "Diesel",
    make: "Mahindra",
    model: "Scorpio",
    year: 2019,
    type: "SUV (7 Seater)",
    badge: "New",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The king of off-road family cruisers in Nepal. S11 top variant equipped with a powerful mHawk diesel engine and 4WD selector.",
    engine: "2.2L mHawk Turbo Diesel",
    videoUrl: null
  },

  // Kia (3) - Picanto (1), Sportage (1), Sonet (1)
  {
    id: "kia-picanto",
    slug: "2018-kia-picanto",
    name: "2018 Kia Picanto",
    variant: "EX Manual",
    price: 2450000,
    mileage: "38,000 km",
    mileageVal: 38000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Kia",
    model: "Picanto",
    year: 2018,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Sporty, premium European-designed hatchback. Highly agile and fuel-efficient, ideal for daily city navigation.",
    engine: "1.2L Kappa Petrol",
    videoUrl: null
  },
  {
    id: "kia-sportage",
    slug: "2020-kia-sportage",
    name: "2020 Kia Sportage",
    variant: "EX AWD Premium",
    price: 8200000,
    mileage: "42,000 km",
    mileageVal: 42000,
    transmission: "Automatic",
    fuel: "Petrol",
    make: "Kia",
    model: "Sportage",
    year: 2020,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Striking crossover with leather upholstery, panoramic dual sunroof, premium infotainment system, and All-Wheel Drive safety.",
    engine: "2.0L Nu MPI Petrol",
    videoUrl: null
  },
  {
    id: "kia-sonet",
    slug: "2021-kia-sonet",
    name: "2021 Kia Sonet",
    variant: "HTX DCT Turbo",
    price: 3950000,
    mileage: "24,000 km",
    mileageVal: 24000,
    transmission: "Automatic",
    fuel: "Petrol",
    make: "Kia",
    model: "Sonet",
    year: 2021,
    type: "SUV (5 Seater)",
    badge: "New",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Compact SUV packed with premium tech. Features electric sunroof, ventilated seats, and lightning-fast 7-speed dual clutch transmission.",
    engine: "1.0L Turbo GDI Petrol",
    videoUrl: null
  },

  // Ford (2) - Ecosport (2)
  {
    id: "ford-ecosport-1",
    slug: "2018-ford-ecosport-titanium",
    name: "2018 Ford Ecosport",
    variant: "Titanium+ EcoBoost",
    price: 3450000,
    mileage: "56,000 km",
    mileageVal: 56000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Ford",
    model: "Ecosport",
    year: 2018,
    type: "SUV (5 Seater)",
    badge: null,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Award-winning 1.0L EcoBoost engine with legendary driving dynamics. Rigid body structure and excellent safety scores.",
    engine: "1.0L EcoBoost Turbo Petrol",
    videoUrl: null
  },
  {
    id: "ford-ecosport-2",
    slug: "2016-ford-ecosport-trend",
    name: "2016 Ford Ecosport",
    variant: "Trend Diesel MT",
    price: 2950000,
    mileage: "78,000 km",
    mileageVal: 78000,
    transmission: "Manual",
    fuel: "Diesel",
    make: "Ford",
    model: "Ecosport",
    year: 2016,
    type: "SUV (5 Seater)",
    badge: null,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Torque-rich TDCi diesel engine offering superior fuel economy and solid build quality for family road trips.",
    engine: "1.5L TDCi Diesel",
    videoUrl: null
  },

  // Mitsubishi (1) - Pajero (1)
  {
    id: "mitsubishi-pajero",
    slug: "2013-mitsubishi-pajero",
    name: "2013 Mitsubishi Pajero",
    variant: "GLS 3.2 DI-D Automatic",
    price: 14500000,
    mileage: "115,000 km",
    mileageVal: 115000,
    transmission: "Automatic",
    fuel: "Diesel",
    make: "Mitsubishi",
    model: "Pajero",
    year: 2013,
    type: "SUV (7 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600"
    ],
    description: "The legend of Dakar Rally. Ultimate heavy-duty SUV with Super Select 4WD-II system, rock solid build, and full leather luxury cabin.",
    engine: "3.2L DI-D Common Rail Diesel",
    videoUrl: null
  },

  // Suzuki (4) - Swift Dzire (1), Ignis (1), Celerio (2)
  {
    id: "suzuki-swift-dzire",
    slug: "2018-suzuki-swift-dzire",
    name: "2018 Suzuki Swift Dzire",
    variant: "VXI Petrol MT",
    price: 2550000,
    mileage: "48,000 km",
    mileageVal: 48000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Suzuki",
    model: "Swift Dzire",
    year: 2018,
    type: "Sedan",
    badge: null,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Highly comfortable compact family sedan. Extremely practical with huge fuel mileage and great resale value.",
    engine: "1.2L K-Series Petrol",
    videoUrl: null
  },
  {
    id: "suzuki-ignis",
    slug: "2019-suzuki-ignis",
    name: "2019 Suzuki Ignis",
    variant: "Delta MT Petrol",
    price: 2150000,
    mileage: "32,000 km",
    mileageVal: 32000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Suzuki",
    model: "Ignis",
    year: 2019,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Tough design language for a hatchback. Offers high seating position, great visibility, and smart city footprint.",
    engine: "1.2L VVT Petrol",
    videoUrl: null
  },
  {
    id: "suzuki-celerio-1",
    slug: "2017-suzuki-celerio-zxi",
    name: "2017 Suzuki Celerio",
    variant: "ZXI Top Model",
    price: 1850000,
    mileage: "54,000 km",
    mileageVal: 54000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Suzuki",
    model: "Celerio",
    year: 2017,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Spacious compact hatchback with Suzuki's EZ-drive setup. Offers best-in-class mileage and steering controls.",
    engine: "1.0L K10B Petrol",
    videoUrl: null
  },
  {
    id: "suzuki-celerio-2",
    slug: "2015-suzuki-celerio-lxi",
    name: "2015 Suzuki Celerio",
    variant: "LXI Base Model",
    price: 1650000,
    mileage: "85,000 km",
    mileageVal: 85000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Suzuki",
    model: "Celerio",
    year: 2015,
    type: "Hatchback",
    badge: null,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ],
    description: "Highly budget-friendly entry hatchback. Superb city drive with minimal fuel consumption and easy parking.",
    engine: "1.0L K-Series Petrol",
    videoUrl: null
  },

  // Tata (1) - Nexon (1)
  {
    id: "tata-nexon",
    slug: "2019-tata-nexon",
    name: "2019 Tata Nexon",
    variant: "XM MT Petrol",
    price: 3250000,
    mileage: "39,000 km",
    mileageVal: 39000,
    transmission: "Manual",
    fuel: "Petrol",
    make: "Tata",
    model: "Nexon",
    year: 2019,
    type: "SUV (5 Seater)",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600"
    ],
    description: "5-star Global NCAP safety rated crossover. Features high-ground clearance, multi-drive modes (Eco, City, Sport), and muscular design.",
    engine: "1.2L Revotron Turbo Petrol",
    videoUrl: null
  }
];

import { databases } from "./appwrite";
import { DB_ID, CARS_COLLECTION_ID } from "./constants";
import { Query } from "appwrite";

export async function fetchCarsFromAppwrite(): Promise<Car[]> {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      CARS_COLLECTION_ID,
      [Query.limit(100)]
    );
    return response.documents.map((doc: any) => ({
      id: doc.$id,
      slug: doc.slug,
      name: doc.name,
      variant: doc.variant || "",
      price: doc.price,
      mileageVal: doc.mileage,
      mileage: `${doc.mileage.toLocaleString()} km`,
      transmission: doc.transmission || "Automatic",
      fuel: doc.fuel || "Petrol",
      make: doc.make,
      model: doc.model,
      year: doc.year,
      type: doc.type || "SUV (5 Seater)",
      badge: doc.badge || null,
      image: doc.image_ids?.[0] || "",
      images: doc.image_ids || [],
      description: doc.description,
      engine: doc.engine || "",
      videoUrl: doc.video_url || null,
    }));
  } catch (error) {
    console.error("Failed to fetch cars from Appwrite:", error);
    return MOCK_CARS;
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
    return {
      id: doc.$id,
      slug: doc.slug,
      name: doc.name,
      variant: doc.variant || "",
      price: doc.price,
      mileageVal: doc.mileage,
      mileage: `${doc.mileage.toLocaleString()} km`,
      transmission: doc.transmission || "Automatic",
      fuel: doc.fuel || "Petrol",
      make: doc.make,
      model: doc.model,
      year: doc.year,
      type: doc.type || "SUV (5 Seater)",
      badge: doc.badge || null,
      image: doc.image_ids?.[0] || "",
      images: doc.image_ids || [],
      description: doc.description,
      engine: doc.engine || "",
      videoUrl: doc.video_url || null,
    };
  } catch (error) {
    console.error(`Failed to fetch car by slug ${slug} from Appwrite:`, error);
    return MOCK_CARS.find((c) => c.slug === slug) || null;
  }
}
