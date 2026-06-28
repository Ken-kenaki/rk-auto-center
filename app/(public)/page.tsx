import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import CountingNumber from "@/components/CountingNumber";

export const metadata: Metadata = {
  title: "RK Auto Mobiles — Premium Automotive Marketplace",
  description:
    "Browse, buy, sell and compare premium vehicles at RK Auto Mobiles. Your trusted automotive partner.",
};

const stats = [
  { value: 500, suffix: "+", label: "Vehicles Listed" },
  { value: 98, suffix: "%", label: "Satisfied Customers" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const features = [
  {
    icon: "verified",
    title: "Certified Listings",
    description: "Every vehicle undergoes a thorough inspection before being listed on our platform.",
  },
  {
    icon: "price_check",
    title: "Best Market Price",
    description: "We use real-time data to ensure competitive and transparent pricing for all listings.",
  },
  {
    icon: "compare_arrows",
    title: "Smart Comparison",
    description: "Compare up to three vehicles side-by-side with detailed spec sheets and analytics.",
  },
  {
    icon: "support_agent",
    title: "Expert Support",
    description: "Our dedicated team is available around the clock to guide your purchase decision.",
  },
];

const featured = [
  {
    name: "2024 Porsche 911",
    variant: "Carrera S Coupe",
    price: 145000,
    mileage: "50 mi",
    transmission: "Automatic",
    fuel: "Petrol",
    badge: "New",
    badgeStyle: "primary",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "2023 Range Rover",
    variant: "Autobiography LWB",
    price: 162500,
    mileage: "4,200 mi",
    transmission: "Automatic",
    fuel: "Hybrid",
    badge: "Featured",
    badgeStyle: "tertiary",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "2022 Audi e-tron GT",
    variant: "RS quattro",
    price: 105900,
    mileage: "12,500 mi",
    transmission: "Automatic",
    fuel: "Electric",
    badge: null,
    badgeStyle: null,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600",
  },
];

function CarCard({ car }: { car: typeof featured[0] }) {
  const fuelIcon: Record<string, string> = {
    Petrol: "local_gas_station",
    Diesel: "oil_barrel",
    Electric: "electric_car",
    Hybrid: "bolt",
  };

  return (
    <div className="group bg-white rounded-2xl border overflow-hidden hover-lift transition-all" style={{ borderColor: "var(--color-outline-variant)" }}>
      {/* Image area */}
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        {car.image ? (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="material-symbols-outlined absolute inset-0 m-auto text-[64px] opacity-10 group-hover:scale-110 transition-transform duration-500" style={{ color: "var(--color-on-surface-variant)" }}>
            directions_car
          </span>
        )}
        {car.badge && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
            style={{
              background:
                car.badgeStyle === "primary"
                  ? "var(--color-primary)"
                  : "var(--color-tertiary-container)",
            }}
          >
            {car.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg leading-tight mb-0.5" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}>
          {car.name}
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
          {car.variant}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: "speed", label: car.mileage },
            { icon: "settings", label: car.transmission },
            { icon: fuelIcon[car.fuel] || "local_gas_station", label: car.fuel },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]" style={{ color: "var(--color-primary)" }}>
                {item.icon}
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
          <span className="font-bold text-xl" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}>
            ${car.price.toLocaleString()}
          </span>
          <Link
            href="/buy"
            className="flex items-center gap-1 text-sm font-bold transition-colors btn-press"
            style={{ color: "var(--color-primary)" }}
          >
            View Details
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-12 px-6" style={{ background: "var(--color-surface-container-lowest)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-4xl font-extrabold mb-1"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-primary)" }}
              >
                <CountingNumber value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED VEHICLES ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>
                Handpicked Selection
              </p>
              <h2
                className="text-4xl font-extrabold"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
              >
                Featured Vehicles
              </h2>
            </div>
            <Link
              href="/buy"
              className="flex items-center gap-1.5 font-bold text-sm btn-press"
              style={{ color: "var(--color-secondary)" }}
            >
              View all
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((car) => (
              <CarCard key={car.name} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface-container-low)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-secondary)" }}>
              Why Choose Us
            </p>
            <h2
              className="text-4xl font-extrabold mb-4"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              Your Automotive Partner
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              We combine technology, expertise, and transparency to deliver the best car-buying experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border bg-white hover-lift"
                style={{ borderColor: "var(--color-outline-variant)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--color-primary)", color: "white" }}
                >
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, var(--color-inverse-surface) 0%, #1a1a2e 100%)" }}
          >
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 70% 50%, var(--color-primary) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <h2
                className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                Ready to Sell Your Car?
              </h2>
              <p className="text-base opacity-70 mb-8 max-w-md mx-auto text-white">
                List your vehicle in minutes and reach thousands of verified buyers.
              </p>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white btn-press transition-all"
                style={{
                  background: "var(--color-primary)",
                  boxShadow: "0 8px 32px rgba(186,0,19,0.4)",
                }}
              >
                <span className="material-symbols-outlined">add_circle</span>
                List Your Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
