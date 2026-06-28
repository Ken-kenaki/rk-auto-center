"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_CARS = [
  { id: "1", name: "2024 Porsche 911", make: "Porsche", price: 145000, status: "Active", featured: true, views: 344, mileage: "50 mi", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=100" },
  { id: "2", name: "2023 Range Rover", make: "Range Rover", price: 162500, status: "Active", featured: true, views: 198, mileage: "4,200 mi", image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=100" },
  { id: "3", name: "2022 Audi e-tron GT", make: "Audi", price: 105900, status: "Draft", featured: false, views: 72, mileage: "12,500 mi", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=100" },
  { id: "4", name: "2024 Mercedes-Benz G-Class", make: "Mercedes-Benz", price: 189500, status: "Active", featured: true, views: 421, mileage: "150 mi", image: "https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=100" },
  { id: "5", name: "2021 BMW M5", make: "BMW", price: 92000, status: "Active", featured: false, views: 156, mileage: "22,400 mi", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=100" },
];

export default function CarsPage() {
  const [cars, setCars] = useState(MOCK_CARS);
  const [search, setSearch] = useState("");

  const filtered = cars.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.make.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (id: string) => {
    setCars((prev) => prev.map((c) => c.id === id ? { ...c, featured: !c.featured } : c));
  };

  const toggleStatus = (id: string) => {
    setCars((prev) => prev.map((c) => c.id === id ? { ...c, status: c.status === "Active" ? "Draft" : "Active" } : c));
  };

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }}>
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or make…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none"
            style={{ borderColor: "var(--color-outline-variant)", background: "var(--color-surface-container-lowest)", color: "var(--color-on-surface)" }}
          />
        </div>
        <Link href="/dashboard/cars/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white btn-press flex-shrink-0"
          style={{ background: "var(--color-primary)" }}>
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Car
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr style={{ background: "var(--color-surface-container-low)", borderBottom: "1px solid var(--color-outline-variant)" }}>
                {["Vehicle", "Price", "Mileage", "Status", "Featured", "Views", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => (
                <tr key={car.id} className="border-b transition-colors hover:bg-[var(--color-surface-container-low)]"
                  style={{ borderColor: "var(--color-outline-variant)" }}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 flex-shrink-0">
                        {car.image ? (
                          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-[18px]" style={{ color: "var(--color-on-surface-variant)" }}>directions_car</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{car.name}</p>
                        <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{car.make}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>${car.price.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{car.mileage}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleStatus(car.id)}
                      className="px-3 py-1 rounded-full text-xs font-bold cursor-pointer btn-press"
                      style={car.status === "Active"
                        ? { background: "var(--color-tertiary-container)", color: "white" }
                        : { background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" }}>
                      {car.status}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleFeatured(car.id)}
                      className="flex items-center gap-1.5 text-xs font-bold btn-press"
                      style={{ color: car.featured ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}>
                      <span className={`material-symbols-outlined text-[16px] ${car.featured ? "fill" : ""}`}>star</span>
                      {car.featured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      {car.views}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/cars/${car.id}/edit`}
                        className="p-1.5 rounded-lg transition-colors hover:bg-[var(--color-surface-container)]"
                        style={{ color: "var(--color-on-surface-variant)" }}>
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <button
                        className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                        style={{ color: "var(--color-error)" }}
                        onClick={() => setCars((p) => p.filter((c) => c.id !== car.id))}>
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-[48px] opacity-20 block mb-3">search_off</span>
              <p style={{ color: "var(--color-on-surface-variant)" }}>No cars match your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
