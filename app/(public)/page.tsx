import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import CountingNumber from "@/components/CountingNumber";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import BrandMarquee from "@/components/BrandMarquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import HomeCTA from "@/components/HomeCTA";
import { fetchCarsFromAppwrite } from "@/lib/cars";

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

export default async function HomePage() {
  const allCars = await fetchCarsFromAppwrite();
  
  // Get all cars that are explicitly marked as featured
  const featured = allCars.filter(car => car.featured === true || car.badge === "Featured");
  // Get other cars
  const nonFeatured = allCars.filter(car => !(car.featured === true || car.badge === "Featured"));
  // Combine prioritizing featured, up to 4 cars
  const featuredCars = [...featured, ...nonFeatured].slice(0, 4);

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
      <FeaturedVehicles cars={featuredCars} />

      {/* ── BRAND MARQUEE ─────────────────────────────────────────── */}
      <BrandMarquee />

      {/* ── WHY CHOOSE US (Parallax) ─────────────────────────────── */}
      <WhyChooseUs />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <HomeCTA />
    </>
  );
}
