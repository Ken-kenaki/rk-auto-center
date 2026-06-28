"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MOCK_CARS = [
  { id: "1", slug: "2024-porsche-911", name: "2024 Porsche 911", variant: "Carrera S Coupe", price: 145000, mileage: "50 mi", transmission: "Automatic", fuel: "Petrol", make: "Porsche", badge: "New", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600" },
  { id: "2", slug: "2023-range-rover", name: "2023 Range Rover", variant: "Autobiography LWB", price: 162500, mileage: "4,200 mi", transmission: "Automatic", fuel: "Hybrid", make: "Range Rover", badge: "Featured", image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600" },
  { id: "3", slug: "2022-audi-etron-gt", name: "2022 Audi e-tron GT", variant: "RS quattro", price: 105900, mileage: "12,500 mi", transmission: "Automatic", fuel: "Electric", make: "Audi", badge: null, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600" },
  { id: "4", slug: "2024-mercedes-g-class", name: "2024 Mercedes-Benz G-Class", variant: "G 63 AMG", price: 189500, mileage: "150 mi", transmission: "Automatic", fuel: "Petrol", make: "Mercedes-Benz", badge: "New", image: "https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=600" },
  { id: "5", slug: "2021-bmw-m5", name: "2021 BMW M5", variant: "Competition Sedan", price: 92000, mileage: "22,400 mi", transmission: "Automatic", fuel: "Petrol", make: "BMW", badge: null, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600" },
  { id: "6", slug: "2023-lexus-lc500", name: "2023 Lexus LC 500", variant: "Base Coupe", price: 98500, mileage: "3,800 mi", transmission: "Automatic", fuel: "Petrol", make: "Lexus", badge: null, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600" },
];

const SORTS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
];

const FUEL_FILTERS = ["All", "Petrol", "Diesel", "Electric", "Hybrid"];
const MAKES = ["All", "Porsche", "BMW", "Mercedes-Benz", "Audi", "Range Rover", "Lexus"];

const fuelIcon: Record<string, string> = {
  Petrol: "local_gas_station", Diesel: "oil_barrel", Electric: "electric_car", Hybrid: "bolt",
};

export default function BuyPage() {
  const [sort, setSort] = useState("recommended");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [makeFilter, setMakeFilter] = useState("All");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  let cars = MOCK_CARS.filter((c) => {
    if (fuelFilter !== "All" && c.fuel !== fuelFilter) return false;
    if (makeFilter !== "All" && c.make !== makeFilter) return false;
    return true;
  });
  if (sort === "price_asc") cars = [...cars].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") cars = [...cars].sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}>
            Our Collection
          </h1>
          <p className="mt-2 text-base text-gray-500">
            <span className="font-bold text-red-600">{cars.length}</span> premium vehicles available
          </p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer outline-none border-none shadow-sm focus:shadow-md"
          style={{ color: "var(--color-on-surface)", background: "var(--color-surface-container-lowest)" }}
        >
          {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Fuel filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar py-1">
        {FUEL_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFuelFilter(f)}
            className="flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all btn-press shadow-sm hover:shadow"
            style={fuelFilter === f ? { background: "var(--color-primary)", color: "white" } : { background: "white", color: "var(--color-on-surface-variant)" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Make filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar py-1">
        {MAKES.map((m) => (
          <button
            key={m}
            onClick={() => setMakeFilter(m)}
            className="flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all btn-press shadow-sm hover:shadow"
            style={makeFilter === m ? { background: "var(--color-secondary)", color: "white" } : { background: "white", color: "var(--color-on-surface-variant)" }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid with stagger animation */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cars.map((car, index) => (
          <motion.div
            layout
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
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
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                  style={{ background: car.badge === "New" ? "var(--color-primary)" : "var(--color-tertiary-container)" }}
                >
                  {car.badge}
                </div>
              )}
              <button
                onClick={() => toggleWishlist(car.id)}
                className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md btn-press transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.95)", color: wishlist.has(car.id) ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}
              >
                <span className={`material-symbols-outlined text-[18px] ${wishlist.has(car.id) ? "fill" : ""}`}>
                  favorite
                </span>
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-extrabold text-lg mb-0.5" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}>
                {car.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{car.variant}</p>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: "speed", label: car.mileage },
                  { icon: "settings", label: car.transmission },
                  { icon: fuelIcon[car.fuel] || "local_gas_station", label: car.fuel },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-lg justify-center">
                    <span className="material-symbols-outlined text-[15px]" style={{ color: "var(--color-primary)" }}>
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--color-surface-container-low)" }}>
                <span className="font-extrabold text-xl" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}>
                  ${car.price.toLocaleString()}
                </span>
                <Link
                  href={`/buy/${car.slug}`}
                  className="flex items-center gap-1 text-sm font-bold btn-press text-red-600 hover:text-red-700 transition-colors"
                >
                  View Details
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {cars.length === 0 && (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-[64px] opacity-20 block mb-4">search_off</span>
          <p className="font-bold text-lg" style={{ color: "var(--color-on-surface-variant)" }}>No vehicles match your filters</p>
          <button
            onClick={() => { setFuelFilter("All"); setMakeFilter("All"); }}
            className="mt-4 px-6 py-2.5 rounded-full text-sm font-bold text-white btn-press shadow-md"
            style={{ background: "var(--color-primary)" }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
