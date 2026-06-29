"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { MOCK_CARS, Car, fetchCarsFromAppwrite } from "@/lib/cars";

const ROWS = [
  { category: "Market Value", icon: "payments", color: "text-blue-600 bg-blue-50", rows: [
    { key: "price", label: "Current Asking Price", fmt: (v: number) => `Rs. ${v.toLocaleString()}` },
    { key: "year", label: "Model Year", fmt: (v: number) => v.toString() },
  ]},
  { category: "Specifications", icon: "build", color: "text-red-600 bg-red-50", rows: [
    { key: "engine", label: "Engine Spec", fmt: (v: string) => v },
    { key: "transmission", label: "Transmission", fmt: (v: string) => v },
    { key: "fuel", label: "Fuel Type", fmt: (v: string) => v },
  ]},
  { category: "Overview", icon: "info", color: "text-emerald-600 bg-emerald-50", rows: [
    { key: "mileage", label: "Kilometres Driven", fmt: (v: string) => v },
    { key: "type", label: "Body Type", fmt: (v: string) => v },
  ]},
];

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const [carsList, setCarsList] = useState<Car[]>(MOCK_CARS);

  useEffect(() => {
    fetchCarsFromAppwrite().then((res) => {
      setCarsList(res);
    });
  }, []);

  const vehicles = carsList.filter((c) => compareIds.includes(c.id));

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
          Vehicle Head-to-Head
        </h1>
        <p className="text-base text-gray-500">
          Analyze technical specifications, fuel types, and pricing details side-by-side.
        </p>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <span className="material-symbols-outlined text-[64px] opacity-25 block mb-4" style={{ color: "var(--color-primary)" }}>
            compare_arrows
          </span>
          <h2 className="font-extrabold text-xl mb-2 text-gray-800" style={{ fontFamily: "Hanken Grotesk" }}>
            No Vehicles Selected
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            Select up to 4 vehicles from our collection to compare specs and pricing side-by-side.
          </p>
          <Link
            href="/buy"
            className="px-6 py-3 rounded-full font-bold text-white btn-press shadow-md"
            style={{ background: "var(--color-primary)" }}
          >
            Browse Inventory
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={clearCompare}
              className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors btn-press"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              Clear Comparison List
            </button>
          </div>

          {/* Compare grid - Row-based table */}
          <div className="overflow-x-auto no-scrollbar pb-8">
            <div className="min-w-[720px]">

              {/* Cards Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr) ${vehicles.length < 4 ? "1fr" : ""}`,
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                {/* Empty label cell */}
                <div />

                {/* Vehicle Card Headers */}
                <AnimatePresence mode="popLayout">
                  {vehicles.map((car) => (
                    <motion.div
                      layout
                      key={car.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.25 }}
                      className="group relative"
                    >
                      <div className="p-4 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-md bg-white relative">
                        <button
                          onClick={() => removeFromCompare(car.id)}
                          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-105 transition-all z-10 bg-gray-50 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>

                        {/* Image */}
                        <div className="w-full aspect-[16/9] rounded-2xl mb-3 overflow-hidden relative bg-gray-100">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {car.badge && (
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold text-white uppercase tracking-wider bg-red-600">
                              {car.badge}
                            </div>
                          )}
                        </div>

                        <p className="text-[10px] font-bold text-gray-400 mb-0.5" style={{ fontFamily: "JetBrains Mono" }}>
                          {car.year} • {car.fuel}
                        </p>
                        <h3 className="font-extrabold text-sm leading-tight text-gray-900 truncate mb-0.5" style={{ fontFamily: "Hanken Grotesk" }}>
                          {car.name}
                        </h3>
                        <p className="text-[11px] text-gray-500 truncate mb-3">{car.variant}</p>

                        <Link
                          href={`/buy/${car.slug}`}
                          className="w-full py-2 text-center rounded-xl text-xs font-bold transition-all btn-press block shadow-sm"
                          style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface)" }}
                        >
                          View Details
                        </Link>
                      </div>
                    </motion.div>
                  ))}

                  {/* Add vehicle slot */}
                  {vehicles.length < 4 && (
                    <motion.div layout>
                      <Link
                        href="/buy"
                        className="w-full aspect-[4/5] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group hover:bg-white hover:shadow-xl hover:border-solid hover:-translate-y-1 block"
                        style={{ borderColor: "var(--color-outline-variant)" }}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors bg-gray-50 group-hover:bg-red-50 text-gray-400 group-hover:text-red-600">
                          <span className="material-symbols-outlined text-[24px]">add</span>
                        </div>
                        <p className="font-extrabold text-sm text-gray-900">Add Vehicle</p>
                        <p className="text-xs text-gray-400 text-center mt-1 max-w-[140px] leading-relaxed">
                          Select another vehicle from our catalog
                        </p>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Spec Rows */}
              {ROWS.map((section) => (
                <div key={section.category} className="mb-6">
                  {/* Section header row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr) ${vehicles.length < 4 ? "1fr" : ""}`,
                      gap: "1.5rem",
                    }}
                    className="mb-1"
                  >
                    <div className="flex items-center gap-2 py-3 border-b border-gray-100 col-span-full">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${section.color}`}>
                        <span className="material-symbols-outlined text-[14px]">{section.icon}</span>
                      </div>
                      <span className="font-extrabold text-sm text-gray-900">{section.category}</span>
                    </div>
                  </div>

                  {/* Data rows */}
                  {section.rows.map((row) => (
                    <div
                      key={row.key}
                      style={{
                        display: "grid",
                        gridTemplateColumns: `200px repeat(${vehicles.length}, 1fr) ${vehicles.length < 4 ? "1fr" : ""}`,
                        gap: "1.5rem",
                      }}
                    >
                      {/* Label */}
                      <div className="py-3.5 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                        {row.label}
                      </div>

                      {/* Values */}
                      {vehicles.map((car) => (
                        <div key={car.id} className="py-3.5 border-b border-gray-100 text-sm font-bold text-gray-800 flex items-center">
                          {/* @ts-ignore */}
                          {row.fmt(car[row.key])}
                        </div>
                      ))}

                      {/* Empty slot(s) */}
                      {vehicles.length < 4 && <div className="py-3.5 border-b border-gray-100" />}
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>

          {/* Insight box - Borderless design */}
          <div className="mt-12 p-8 rounded-3xl bg-white shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">insights</span>
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-lg mb-1 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                Comparison Insight
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use this head-to-head comparison to balance your budget with key features like fuel type, make year, and engine specification. All pricing is shown in Nepalese Rupees (NPR).
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
