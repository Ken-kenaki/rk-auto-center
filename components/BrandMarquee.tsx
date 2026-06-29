"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const BRANDS = [
  { name: "Volkswagen", logo: "https://www.carlogos.org/car-logos/volkswagen-logo-2019.png" },
  { name: "Hyundai", logo: "https://www.carlogos.org/car-logos/hyundai-logo-2011.png" },
  { name: "Toyota", logo: "https://www.carlogos.org/car-logos/toyota-logo-2020.png" },
  { name: "Honda", logo: "https://www.carlogos.org/car-logos/honda-logo.png" },
  { name: "Nissan", logo: "https://www.carlogos.org/car-logos/nissan-logo-2020.png" },
  { name: "Kia", logo: "https://www.carlogos.org/car-logos/kia-logo-2021.png" },
  { name: "Suzuki", logo: "https://www.carlogos.org/car-logos/suzuki-logo.png" },
  { name: "Ford", logo: "https://www.carlogos.org/car-logos/ford-logo-2017.png" },
  { name: "Mercedes-Benz", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png" },
  { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo-2020.png" },
  { name: "Mitsubishi", logo: "https://www.carlogos.org/car-logos/mitsubishi-logo.png" },
  { name: "Mahindra", logo: "https://www.carlogos.org/car-logos/mahindra-logo.png" },
  { name: "Tata", logo: "https://www.carlogos.org/car-logos/tata-logo.png" },
  { name: "Škoda", logo: "https://www.carlogos.org/car-logos/skoda-logo-2022.png" },
  { name: "Mazda", logo: "https://www.carlogos.org/car-logos/mazda-logo-2018.png" },
  { name: "Land Rover", logo: "https://www.carlogos.org/car-logos/land-rover-logo.png" },
  { name: "Daihatsu", logo: "https://www.carlogos.org/car-logos/daihatsu-logo.png" },
  { name: "MG (Morris Garage)", logo: "https://www.carlogos.org/car-logos/mg-logo.png" },
  { name: "BYD", logo: "https://www.carlogos.org/car-logos/byd-logo.png" },
  { name: "Porsche", logo: "https://www.carlogos.org/car-logos/porsche-logo.png" },
];

export default function BrandMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let animId: number;
    const speed = 0.4; // px per frame

    const step = () => {
      offset -= speed;
      // Each brand item is ~140px wide, duplicated set = BRANDS.length * 140
      const singleSetWidth = BRANDS.length * 140;
      if (Math.abs(offset) >= singleSetWidth) {
        offset += singleSetWidth;
      }
      track.style.transform = `translateX(${offset}px)`;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate the list once for seamless loop
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="py-14 px-6 overflow-hidden" style={{ background: "var(--color-surface-container-lowest)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-primary)" }}>
            Shop by Brand
          </p>
          <h2
            className="text-2xl font-extrabold"
            style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
          >
            Browse Our Partners
          </h2>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--color-surface-container-lowest), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--color-surface-container-lowest), transparent)" }} />

        <div ref={trackRef} className="flex items-center will-change-transform" style={{ width: "max-content" }}>
          {doubled.map((brand, i) => (
            <Link
              key={`${brand.name}-${i}`}
              href={`/buy?make=${encodeURIComponent(brand.name)}`}
              className="flex-shrink-0 w-[140px] flex flex-col items-center gap-3 py-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2.5 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-200">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback: show brand initial
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".brand-fallback")) {
                      const span = document.createElement("span");
                      span.className = "brand-fallback text-xl font-extrabold text-gray-400";
                      span.textContent = brand.name.charAt(0);
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors truncate max-w-[120px] text-center">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
