"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED = [
  {
    name: "2024 Porsche 911",
    variant: "Carrera S Coupe",
    price: 14500000,
    mileage: "50 km",
    transmission: "Automatic",
    fuel: "Petrol",
    badge: "New",
    slug: "2024-porsche-911",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "2023 Range Rover",
    variant: "Autobiography LWB",
    price: 16250000,
    mileage: "4,200 km",
    transmission: "Automatic",
    fuel: "Hybrid",
    badge: "Featured",
    slug: "2023-range-rover",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "2022 Audi e-tron GT",
    variant: "RS quattro",
    price: 10590000,
    mileage: "12,500 km",
    transmission: "Automatic",
    fuel: "Electric",
    badge: null,
    slug: "2022-audi-etron-gt",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

const fuelIcon: Record<string, string> = {
  Petrol: "local_gas_station",
  Diesel: "oil_barrel",
  Electric: "electric_car",
  Hybrid: "bolt",
};

function FeaturedCard({ car, index }: { car: (typeof FEATURED)[0]; index: number }) {
  const [imgIdx, setImgIdx] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i === 0 ? car.images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((i) => (i === car.images.length - 1 ? 0 : i + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image carousel area */}
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        {car.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${car.name} view ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              i === imgIdx ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}

        {/* Gradient overlay at bottom for text contrast */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Prev/Next arrows — visible on hover */}
        {car.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 shadow-lg cursor-pointer z-10"
            >
              <span className="material-symbols-outlined text-[18px] text-gray-800">
                chevron_left
              </span>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 shadow-lg cursor-pointer z-10"
            >
              <span className="material-symbols-outlined text-[18px] text-gray-800">
                chevron_right
              </span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {car.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImgIdx(i);
                }}
                className={`rounded-full transition-all duration-200 cursor-pointer ${
                  i === imgIdx
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Badge */}
        {car.badge && (
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md z-10 ${
              car.badge === "New"
                ? "bg-red-600"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
          >
            {car.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title row */}
        <div className="mb-3">
          <h3
            className="font-extrabold text-base leading-tight text-gray-900 truncate"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            {car.name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">{car.variant}</p>
        </div>

        {/* Specs pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            { icon: "speed", label: car.mileage },
            { icon: "settings", label: car.transmission },
            { icon: fuelIcon[car.fuel] || "local_gas_station", label: car.fuel },
          ].map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1 bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold"
            >
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ color: "var(--color-primary)" }}
              >
                {item.icon}
              </span>
              {item.label}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span
            className="font-extrabold text-lg text-gray-900"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            Rs. {car.price.toLocaleString()}
          </span>
          <Link
            href={`/buy/${car.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors group/link"
          >
            View
            <span className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedVehicles() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Handpicked Selection
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold"
              style={{
                fontFamily: "Hanken Grotesk",
                color: "var(--color-on-background)",
              }}
            >
              Featured Vehicles
            </h2>
          </div>
          <Link
            href="/buy"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-md"
            style={{
              background: "var(--color-surface-container)",
              color: "var(--color-on-surface)",
            }}
          >
            View all
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((car, i) => (
            <FeaturedCard key={car.name} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
