import type { Metadata } from "next";
import Link from "next/link";
import CarGallery from "@/components/CarGallery";
import CompareButton from "@/components/CompareButton";

import { fetchCarBySlugFromAppwrite } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Car Details | RK Auto Mobiles",
};

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await fetchCarBySlugFromAppwrite(slug);

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
          <div>
            <CarGallery images={car.images} name={car.name} />
          </div>

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
                Rs. {car.price.toLocaleString()}
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


            </div>

            {/* Compare CTA */}
            <div className="p-6 rounded-3xl bg-gray-50 shadow-sm">
              <p className="font-extrabold text-sm mb-1 text-gray-900">Compare this vehicle</p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Add it to the comparison table to evaluate against other listings.
              </p>
              <CompareButton carId={car.id} carName={car.name} heroImage={car.images[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
