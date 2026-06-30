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

          {/* Video / Facebook / YouTube Walkthrough */}
          {car.videoUrl && (() => {
            const isFacebook = car.videoUrl.includes("facebook.com") || car.videoUrl.includes("fb.watch");
            const isYouTube = car.videoUrl.includes("youtube.com") || car.videoUrl.includes("youtu.be");
            const isReel = isFacebook && (car.videoUrl.includes("/share/r/") || car.videoUrl.includes("/reel/") || car.videoUrl.includes("/reels/"));
            
            let embedUrl = null;
            if (isYouTube) {
              let videoId = "";
              if (car.videoUrl.includes("youtu.be/")) {
                videoId = car.videoUrl.split("youtu.be/")[1]?.split("?")[0] || "";
              } else if (car.videoUrl.includes("v=")) {
                videoId = car.videoUrl.split("v=")[1]?.split("&")[0] || "";
              } else if (car.videoUrl.includes("embed/")) {
                videoId = car.videoUrl.split("embed/")[1]?.split("?")[0] || "";
              }
              if (videoId) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
              }
            } else if (isFacebook && !isReel) {
              embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(car.videoUrl)}&show_text=false&width=560&appId`;
            }

            return (
              <div className="rounded-3xl bg-white shadow-md overflow-hidden">
                <div className="px-8 pt-8 pb-4">
                  <h2 className="font-extrabold text-xl text-gray-900 flex items-center gap-2" style={{ fontFamily: "Hanken Grotesk" }}>
                    <span className="material-symbols-outlined text-[22px] text-red-600">videocam</span>
                    Vehicle Walkthrough
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">See this vehicle in action before you visit.</p>
                </div>

                {embedUrl ? (
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={embedUrl}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: "none", overflow: "hidden" }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title={`${car.name} walkthrough video`}
                    />
                  </div>
                ) : (
                  <div className="px-8 pb-8">
                    <a
                      href={car.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/60 transition-all group border border-gray-100"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 shadow group-hover:scale-105 transition-transform flex-shrink-0">
                        <span className="material-symbols-outlined text-white text-[24px]">play_circle</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-sm text-gray-900">
                          {isReel ? "Watch Walkaround Reel on Facebook" : "Watch Walkaround Video"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{car.videoUrl}</p>
                      </div>
                      <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0">open_in_new</span>
                    </a>
                    {isReel && (
                      <p className="text-[10px] text-gray-400 mt-2 text-center">
                        Note: Facebook Reels are secure public media and must be viewed directly on Facebook.
                      </p>
                    )}
                  </div>
                )}

                {isFacebook && !isReel && (
                  <div className="px-8 pb-6 text-right">
                    <a
                      href={car.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      Open on Facebook
                    </a>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Description */}
          <div className="p-8 rounded-3xl bg-white shadow-md">
            <h2 className="font-extrabold text-xl mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
              About This Vehicle
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{car.description}</p>
          </div>

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
