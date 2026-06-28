import type { Metadata } from "next";
import Link from "next/link";
import CarGallery from "@/components/CarGallery";

export const metadata: Metadata = {
  title: "Car Details | RK Auto Mobiles",
};

const MOCK_CARS: Record<string, {
  name: string; variant: string; price: number; mileage: string;
  transmission: string; fuel: string; engine: string; year: number;
  description: string; videoUrl: string | null;
  images: string[];
}> = {
  "2024-porsche-911": {
    name: "2024 Porsche 911", variant: "Carrera S Coupe", price: 145000,
    mileage: "50 mi", transmission: "Automatic", fuel: "Petrol",
    engine: "3.0L Twin-Turbo Flat-6", year: 2024,
    description: "The iconic 911 Carrera S delivers breathtaking performance with its 443-hp twin-turbo flat-six. This pristine example features Sport Chrono Package, PASM suspension, and carbon fiber sport seats.",
    videoUrl: null,
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611245801314-e0a5dbf97b31?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "2023-range-rover": {
    name: "2023 Range Rover", variant: "Autobiography LWB", price: 162500,
    mileage: "4,200 mi", transmission: "Automatic", fuel: "Hybrid",
    engine: "3.0L P400e PHEV Inline-6", year: 2023,
    description: "The pinnacle of luxury SUVs. This Autobiography LWB in Santorini Black features 23-inch wheels, Meridian Signature sound system, and massage seating for all four rear occupants.",
    videoUrl: "https://www.facebook.com/watch/?v=example123",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "2022-audi-etron-gt": {
    name: "2022 Audi e-tron GT", variant: "RS quattro", price: 105900,
    mileage: "12,500 mi", transmission: "Automatic", fuel: "Electric",
    engine: "Dual synchronous electric motors", year: 2022,
    description: "Experience electric performance at its finest. The RS e-tron GT produces up to 637 horsepower in boost mode, rocket starting you to 60 mph in 3.1 seconds. Full carbon roof and premium Audi virtual cockpit.",
    videoUrl: null,
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "2024-mercedes-g-class": {
    name: "2024 Mercedes-Benz G-Class", variant: "G 63 AMG", price: 189500,
    mileage: "150 mi", transmission: "Automatic", fuel: "Petrol",
    engine: "4.0L V8 Twin-Turbo AMG", year: 2024,
    description: "The G 63 is the legendary luxury off-roader. Equipped with a handcrafted AMG 4.0L V8 twin-turbo engine delivering 577 hp. Exquisite designo interior and active multi-contour seats.",
    videoUrl: null,
    images: [
      "https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "2021-bmw-m5": {
    name: "2021 BMW M5", variant: "Competition Sedan", price: 92000,
    mileage: "22,400 mi", transmission: "Automatic", fuel: "Petrol",
    engine: "4.4L Twin-Power Turbo V8", year: 2021,
    description: "A super sedan in every sense. The Competition Package boosts the twin-turbo V8 to 617 horsepower. Finished in Marina Bay Blue metallic with Silverstone full Merino leather interior.",
    videoUrl: null,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "2023-lexus-lc500": {
    name: "2023 Lexus LC 500", variant: "Base Coupe", price: 98500,
    mileage: "3,800 mi", transmission: "Automatic", fuel: "Petrol",
    engine: "5.0L Naturally Aspirated V8", year: 2023,
    description: "One of the most beautiful modern coupes. Powered by a high-revving, naturally aspirated 5.0L V8 with an unforgettable exhaust note. Handcrafted Alcantara door panels and Mark Levinson sound system.",
    videoUrl: null,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611245801314-e0a5dbf97b31?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600"
    ]
  }
};

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = MOCK_CARS[slug] || null;

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="material-symbols-outlined text-[80px] opacity-20 block mb-6">search_off</span>
        <h1 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "Hanken Grotesk" }}>Vehicle Not Found</h1>
        <p className="mb-8 text-gray-500">This listing may have been sold or removed.</p>
        <Link href="/buy" className="px-8 py-3 rounded-full font-bold text-white btn-press" style={{ background: "var(--color-primary)" }}>
          Browse All Vehicles
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "Year", value: car.year.toString(), icon: "calendar_today" },
    { label: "Mileage", value: car.mileage, icon: "speed" },
    { label: "Transmission", value: car.transmission, icon: "settings" },
    { label: "Fuel Type", value: car.fuel, icon: "local_gas_station" },
    { label: "Engine", value: car.engine, icon: "build" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-6 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
        <Link href="/buy" className="hover:text-red-600 transition-colors">Buy</Link>
        <span>/</span>
        <span className="text-gray-900">{car.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Gallery + Description */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery */}
          <CarGallery images={car.images} name={car.name} />

          {/* Description */}
          <div className="p-8 rounded-3xl bg-white shadow-md">
            <h2 className="font-extrabold text-xl mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
              About This Vehicle
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          {/* Video embed */}
          {car.videoUrl && (
            <div className="p-8 rounded-3xl bg-white shadow-md">
              <h2 className="font-extrabold text-xl mb-4 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                Vehicle Video
              </h2>
              <a
                href={car.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 shadow group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-white text-[24px]">play_circle</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Watch Vehicle Video</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">{car.videoUrl}</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
            </div>
          )}

          {/* Specs grid */}
          <div className="p-8 rounded-3xl bg-white shadow-md">
            <h2 className="font-extrabold text-xl mb-5 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
              Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.label} className="p-4 rounded-2xl bg-gray-50 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-1.5 text-gray-400">
                    <span className="material-symbols-outlined text-[16px] text-red-600">{s.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>
                      {s.label}
                    </span>
                  </div>
                  <p className="font-extrabold text-sm text-gray-800">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Price Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            {/* Price card */}
            <div className="p-6 rounded-3xl bg-white shadow-md">
              <div className="mb-1">
                <h1 className="font-extrabold text-2xl leading-tight text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                  {car.name}
                </h1>
                <p className="text-sm text-gray-500">{car.variant}</p>
              </div>
              <p className="text-4xl font-extrabold mt-4 mb-6 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                ${car.price.toLocaleString()}
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+1555000000"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white btn-press transition-all shadow-lg shadow-red-500/20"
                  style={{ background: "var(--color-primary)" }}
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  Call Dealer
                </a>
                <a
                  href={`https://wa.me/+1555000000?text=I%20am%20interested%20in%20the%20${encodeURIComponent(car.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold btn-press bg-gray-50 text-gray-800 transition-all hover:bg-gray-100/80 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  WhatsApp Inquiry
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                <span className="material-symbols-outlined text-[14px]">visibility</span>
                344 people viewed this today
              </div>
            </div>

            {/* Compare CTA */}
            <div className="p-6 rounded-3xl bg-gray-50 shadow-sm">
              <p className="font-extrabold text-sm mb-1 text-gray-900">Compare this vehicle</p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Add it to the comparison table to evaluate against other listings.
              </p>
              <Link
                href="/compare"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl font-bold text-sm bg-white text-blue-600 hover:text-blue-700 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
