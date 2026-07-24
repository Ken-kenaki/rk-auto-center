"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCarsFromAppwrite, Car } from "@/lib/cars";
import ConfirmModal from "@/components/ui/ConfirmModal";
// Mutations (update/delete) go through server API routes to bypass client-side permissions

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [soldLoading, setSoldLoading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchCarsFromAppwrite()
      .then(setCars)
      .catch(() => setError("Failed to load listings from database."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = cars.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.make.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = async (id: string, current: boolean) => {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, featured: !current } : c)));
    const res = await fetch(`/api/cars/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !current }),
    });
    if (!res.ok) {
      // revert on failure
      setCars((prev) => prev.map((c) => (c.id === id ? { ...c, featured: current } : c)));
    }
  };

  const toggleSold = async (id: string, isSold: boolean) => {
    const newStatus = isSold ? "approved" : "sold";
    setSoldLoading(id);
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, badge: isSold ? null : "Sold" } : c)));
    const res = await fetch(`/api/cars/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
      setCars((prev) => prev.map((c) => (c.id === id ? { ...c, badge: isSold ? "Sold" : null } : c)));
    }
    setSoldLoading(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    setCars((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    const res = await fetch(`/api/cars/${deleteTarget.id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await fetchCarsFromAppwrite();
      setCars(data);
    }
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => !deleteLoading && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Listing"
        loading={deleteLoading}
      />

      {error && (
        <div className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 bg-amber-50 text-amber-700">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          {error}
        </div>
      )}

      {/* Top toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none text-zinc-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or make…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm outline-none focus:border-zinc-400 transition-colors text-zinc-800 placeholder-zinc-400"
          />
        </div>
        <Link
          href="/dashboard/cars/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white flex-shrink-0 hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Listing
        </Link>
      </div>

      {/* Count */}
      <p className="text-xs text-zinc-400 font-medium">
        {loading ? "Loading…" : `${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/60">
                {["Vehicle", "Price", "Mileage", "Type", "Featured", "Badge", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-400"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-zinc-50">
                    <td className="px-5 py-4" colSpan={8}>
                      <div className="h-5 bg-zinc-100 rounded animate-pulse w-3/4" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-sm text-zinc-400">
                    <span className="material-symbols-outlined text-[40px] block mb-2 opacity-20">search_off</span>
                    No vehicles match your search
                  </td>
                </tr>
              ) : (
                filtered.map((car) => (
                  <tr key={car.id} className="border-b border-zinc-50 hover:bg-zinc-50/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {car.image ? (
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-[18px] text-zinc-400">directions_car</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-zinc-800">{car.name}</p>
                          <p className="text-xs text-zinc-400">{car.make} · {car.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-sm text-zinc-700 tabular-nums">
                      Rs {car.price.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-500">{car.mileage}</td>
                    <td className="px-5 py-4 text-sm text-zinc-500">{car.type}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleFeatured(car.id, car.featured || false)}
                        className="flex items-center gap-1 text-xs font-semibold transition-colors"
                        style={{ color: car.featured ? "#d97706" : "#a1a1aa" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {car.featured ? "star" : "star_outline"}
                        </span>
                        {car.featured ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      {car.badge ? (
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold">
                          {car.badge}
                        </span>
                      ) : (
                        <span className="text-zinc-300 text-xs">—</span>
                      )}
                    </td>
                    {/* Status Column */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          car.badge === "Sold"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: car.badge === "Sold" ? "#dc2626" : "#16a34a" }} />
                        {car.badge === "Sold" ? "Sold" : "Available"}
                      </span>
                    </td>
                    {/* Actions Column */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        {/* Quick Sold Toggle */}
                        <button
                          onClick={() => toggleSold(car.id, car.badge === "Sold")}
                          disabled={soldLoading === car.id}
                          title={car.badge === "Sold" ? "Mark as Available" : "Mark as Sold"}
                          className={`p-2 rounded-lg transition-colors text-xs font-bold flex items-center gap-1 ${
                            car.badge === "Sold"
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "hover:bg-orange-50 text-zinc-400 hover:text-orange-600"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {soldLoading === car.id ? (
                            <span className="material-symbols-outlined text-[17px] animate-spin">progress_activity</span>
                          ) : (
                            <span className="material-symbols-outlined text-[17px]">
                              {car.badge === "Sold" ? "undo" : "sell"}
                            </span>
                          )}
                        </button>
                        <Link
                          href={`/dashboard/cars/${car.id}/edit`}
                          className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[17px]">edit</span>
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(car)}
                          className="p-2 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[17px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
