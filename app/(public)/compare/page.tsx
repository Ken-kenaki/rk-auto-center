"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const VEHICLES = [
  {
    id: "1", slug: "2022-porsche-911-gt3", name: "Porsche 911 GT3",
    year: 2022, mileage: "4,200 mi", price: 235000, depreciation: "8.5%",
    depDir: "down", engine: "4.0L Naturally Aspirated Flat-6",
    hp: "502 hp @ 8,400 rpm", zeroSixty: "2.7 sec", topSpeed: "197 mph",
    weight: "3,164 lbs", drivetrain: "RWD / 7-Speed PDK",
  },
  {
    id: "2", slug: "2021-ferrari-f8", name: "Ferrari F8 Tributo",
    year: 2021, mileage: "7,150 mi", price: 345900, depreciation: "12.2%",
    depDir: "up", engine: "3.9L Twin-Turbo V8",
    hp: "710 hp @ 8,000 rpm", zeroSixty: "2.9 sec", topSpeed: "211 mph",
    weight: "3,164 lbs", drivetrain: "RWD / 7-Speed Dual-Clutch",
    popular: true,
  },
];

const ROWS = [
  { category: "Market Value", icon: "payments", color: "text-blue-600 bg-blue-50", rows: [
    { key: "price", label: "Current Asking Price", fmt: (v: number) => `$${v.toLocaleString()}` },
    { key: "depreciation", label: "Estimated Depreciation (3yr)", fmt: (v: string) => v },
  ]},
  { category: "Performance", icon: "speed", color: "text-red-600 bg-red-50", rows: [
    { key: "engine", label: "Engine", fmt: (v: string) => v },
    { key: "hp", label: "Horsepower", fmt: (v: string) => v },
    { key: "zeroSixty", label: "0–60 mph", fmt: (v: string) => v },
    { key: "topSpeed", label: "Top Speed", fmt: (v: string) => v },
  ]},
  { category: "Chassis & Dimensions", icon: "straighten", color: "text-emerald-600 bg-emerald-50", rows: [
    { key: "weight", label: "Curb Weight", fmt: (v: string) => v },
    { key: "drivetrain", label: "Drivetrain", fmt: (v: string) => v },
  ]},
];

export default function ComparePage() {
  const [vehicles, setVehicles] = useState(VEHICLES);

  const removeVehicle = (id: string) => {
    setVehicles((v) => v.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          style={{ color: "var(--color-secondary)", background: "var(--color-surface-container-low)" }}
        >
          <span className="material-symbols-outlined text-[14px]">compare_arrows</span>
          Comparison Engine
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
          Performance Head-to-Head
        </h1>
        <p className="text-base text-gray-500">
          Analyze technical specifications, pricing trends, and performance metrics side-by-side.
        </p>
      </div>

      {/* Compare grid - Borderless structure */}
      <div className="overflow-x-auto no-scrollbar pb-8">
        <div className="min-w-[800px]" style={{ display: "grid", gridTemplateColumns: `220px repeat(${vehicles.length + 1}, 1fr)`, gap: "1.5rem" }}>

          {/* Row headers column */}
          <div className="flex flex-col" style={{ paddingTop: `${vehicles.length > 0 ? 356 + 24 : 0}px` }}>
            {ROWS.map((section) => (
              <div key={section.category} className="mb-4">
                <div className="flex items-center gap-2 py-4 border-b border-gray-100">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${section.color}`}>
                    <span className="material-symbols-outlined text-[14px]">{section.icon}</span>
                  </div>
                  <span className="font-extrabold text-sm text-gray-900">{section.category}</span>
                </div>
                {section.rows.map((row) => (
                  <div key={row.key} className="py-3.5 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider h-[53px] flex items-center">
                    {row.label}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Vehicle columns */}
          <AnimatePresence mode="popLayout">
            {vehicles.map((car, idx) => (
              <motion.div
                layout
                key={car.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col relative group"
              >
                {/* Card header */}
                <div
                  className={`p-5 rounded-3xl mb-6 h-[356px] flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative ${
                    car.popular ? "shadow-xl ring-2 ring-blue-600" : "shadow-md bg-white"
                  }`}
                >
                  {car.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase text-white z-10 shadow-md"
                      style={{ background: "var(--color-secondary)" }}
                    >
                      Popular Choice
                    </div>
                  )}
                  <button
                    onClick={() => removeVehicle(car.id)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-105 transition-all z-10 bg-gray-50 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>

                  {/* Image placeholder */}
                  <div className="h-40 rounded-2xl mb-4 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[48px] opacity-10 group-hover:scale-105 transition-transform duration-500 text-gray-900">
                      directions_car
                    </span>
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg text-[9px] font-bold text-white uppercase tracking-wider bg-black/50 backdrop-blur-sm">
                      Used
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 mb-1" style={{ fontFamily: "JetBrains Mono" }}>
                        {car.year} • {car.mileage}
                      </p>
                      <h3 className="font-extrabold text-lg leading-tight text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                        {car.name}
                      </h3>
                    </div>
                    <Link
                      href={`/buy/${car.slug}`}
                      className="w-full py-3 text-center rounded-2xl text-xs font-bold transition-all btn-press shadow-sm"
                      style={
                        car.popular
                          ? { background: "var(--color-secondary)", color: "white" }
                          : { background: "var(--color-surface-container-high)", color: "var(--color-on-surface)" }
                      }
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Data rows */}
                {ROWS.map((section) => (
                  <div key={section.category} className="mb-4">
                    <div className="h-[60px]" /> {/* spacer for category header */}
                    {section.rows.map((row) => (
                      <div key={row.key} className="py-3.5 border-b border-gray-100 text-sm font-bold text-gray-800 h-[53px] flex items-center">
                        {/* @ts-ignore */}
                        {row.fmt(car[row.key])}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            ))}

            {/* Add vehicle slot */}
            {vehicles.length < 3 && (
              <motion.div layout className="flex flex-col">
                <Link
                  href="/buy"
                  className="h-[356px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group mb-6 hover:bg-white hover:shadow-xl hover:border-solid hover:-translate-y-1"
                  style={{ borderColor: "var(--color-outline-variant)" }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors bg-gray-50 group-hover:bg-red-50 text-gray-400 group-hover:text-red-600">
                    <span className="material-symbols-outlined text-[28px]">add</span>
                  </div>
                  <p className="font-extrabold text-base text-gray-900">Add Vehicle</p>
                  <p className="text-xs text-gray-400 text-center mt-1 max-w-[160px] leading-relaxed">
                    Select from our catalog to compare spec details
                  </p>
                </Link>
                {/* Empty data placeholders */}
                <div className="opacity-20 pointer-events-none">
                  {ROWS.map((section) => (
                    <div key={section.category} className="mb-4">
                      <div className="h-[60px]" />
                      {section.rows.map((row) => (
                        <div key={row.key} className="py-3.5 border-b border-gray-100 h-[53px] flex items-center">
                          <div className="h-4 rounded w-24 bg-gray-200" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Insight box - Borderless design */}
      <div className="mt-12 p-8 rounded-3xl bg-white shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 shadow-sm">
          <span className="material-symbols-outlined text-[24px]">insights</span>
        </div>
        <div className="flex-1">
          <h4 className="font-extrabold text-lg mb-1 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
            RK Engineering Insight
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            While the Ferrari F8 Tributo offers superior straight-line speed (710 hp vs 502 hp), the Porsche 911 GT3 remains the purist's choice for track-focused dynamics and naturally aspirated engine character. The GT3 also demonstrates stronger value retention over a 3-year period.
          </p>
        </div>
      </div>
    </div>
  );
}
