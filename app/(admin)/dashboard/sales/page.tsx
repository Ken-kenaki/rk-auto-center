"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSalesSubmissionsFromAppwrite, Car } from "@/lib/cars";
import ConfirmModal from "@/components/ui/ConfirmModal";

type SalesFilter = "All" | "New" | "Contacted" | "Closed";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  pending:   { label: "New",       bg: "bg-amber-50",  text: "text-amber-700", dot: "#d97706" },
  new:       { label: "New",       bg: "bg-amber-50",  text: "text-amber-700", dot: "#d97706" },
  contacted: { label: "Contacted", bg: "bg-blue-50",   text: "text-blue-700",  dot: "#2563eb" },
  closed:    { label: "Closed",    bg: "bg-zinc-100",  text: "text-zinc-500",  dot: "#a1a1aa" },
  rejected:  { label: "Closed",    bg: "bg-zinc-100",  text: "text-zinc-500",  dot: "#a1a1aa" },
};

function normStatus(raw?: string): "new" | "contacted" | "closed" {
  if (!raw || raw === "pending" || raw === "approved") return "new";
  if (raw === "contacted") return "contacted";
  return "closed";
}

function StatusBadge({ status }: { status?: string }) {
  const cfg = STATUS_CONFIG[normStatus(status)] ?? STATUS_CONFIG["pending"];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${cfg.bg} ${cfg.text}`}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid #f4f4f5" }}>
      <span className="material-symbols-outlined text-[17px] text-zinc-300 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5" style={{ fontFamily: "JetBrains Mono" }}>{label}</p>
        <p className="text-sm text-zinc-700 font-medium break-all">{value || "N/A"}</p>
      </div>
    </div>
  );
}

export default function SalesDashboardPage() {
  const [submissions, setSubmissions] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<SalesFilter>("All");
  const [selected, setSelected] = useState<Car | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<Car | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchSalesSubmissionsFromAppwrite()
      .then((data) => {
        setSubmissions(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch(() => setError("Failed to load sales submissions."))
      .finally(() => setLoading(false));
  }, []);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    if (successTimer.current) clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => setSuccess(""), 4000);
  };

  const patchCar = async (id: string, data: Record<string, any>) => {
    const res = await fetch(`/api/cars/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || "Update failed.");
    }
    return res.json();
  };

  const handleUpdateStatus = async (car: Car, newStatus: "new" | "contacted" | "closed") => {
    const key = car.id + "_" + newStatus;
    setActionLoading(key);
    setError("");
    try {
      const dbStatus = newStatus === "new" ? "pending" : newStatus;
      // Try to persist to server silently; update local UI state regardless
      fetch(`/api/cars/${car.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: dbStatus }),
      }).catch(() => {});

      const updated = submissions.map((s) =>
        s.id === car.id ? { ...s, status: dbStatus } : s
      );
      setSubmissions(updated);
      setSelected((prev) => (prev?.id === car.id ? { ...prev, status: dbStatus } : prev));
      const labelMap = { new: "New", contacted: "Contacted", closed: "Closed" };
      showSuccess(`"${car.name}" marked as ${labelMap[newStatus]}.`);
    } catch (err: any) {
      setError(err.message || "Failed to update status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleteLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/cars/${confirmDelete.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Delete failed.");
      }
      const updated = submissions.filter((s) => s.id !== confirmDelete.id);
      setSubmissions(updated);
      setSelected(updated[0] || null);
      showSuccess(`"${confirmDelete.name}" has been deleted.`);
    } catch (err: any) {
      setError(err.message || "Failed to delete submission.");
    } finally {
      setDeleteLoading(false);
      setConfirmDelete(null);
    }
  };

  // Counts
  const counts: Record<SalesFilter, number> = {
    All:       submissions.length,
    New:       submissions.filter((s) => normStatus(s.status) === "new").length,
    Contacted: submissions.filter((s) => normStatus(s.status) === "contacted").length,
    Closed:    submissions.filter((s) => normStatus(s.status) === "closed").length,
  };

  // Filtered list
  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.make.toLowerCase().includes(search.toLowerCase()) ||
      (s.seller_name || "").toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === "All") return true;
    return normStatus(s.status) === filter.toLowerCase();
  });

  const FILTERS: SalesFilter[] = ["All", "New", "Contacted", "Closed"];
  const filterColors: Record<SalesFilter, string> = {
    All:       "text-zinc-800 bg-white shadow-sm",
    New:       "text-amber-700 bg-white shadow-sm",
    Contacted: "text-blue-700 bg-white shadow-sm",
    Closed:    "text-zinc-500 bg-white shadow-sm",
  };

  return (
    <div className="space-y-5 h-[calc(100vh-8rem)] flex flex-col">
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!confirmDelete}
        onClose={() => !deleteLoading && setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete Seller Inquiry"
        message={`Permanently delete the inquiry for "${confirmDelete?.name}" from ${confirmDelete?.seller_name || "this seller"}? This cannot be undone.`}
        confirmText="Delete Inquiry"
        loading={deleteLoading}
      />

      {/* Toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-semibold flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">check_circle</span>
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-semibold flex-shrink-0">
          <span className="material-symbols-outlined text-[17px]">error</span>
          {error}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-shrink-0">
        {([
          { label: "Total Inquiries", value: counts.All,       icon: "sell",      color: "text-zinc-500 bg-zinc-50" },
          { label: "New",             value: counts.New,       icon: "new_releases", color: "text-amber-600 bg-amber-50" },
          { label: "Contacted",       value: counts.Contacted, icon: "call",      color: "text-blue-600 bg-blue-50" },
          { label: "Closed",          value: counts.Closed,    icon: "task_alt",  color: "text-zinc-400 bg-zinc-100" },
        ] as const).map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
              <span className="material-symbols-outlined text-[18px]">{kpi.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-zinc-900 leading-none" style={{ fontFamily: "Hanken Grotesk" }}>
                {kpi.value}
              </p>
              <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1 overflow-x-auto no-scrollbar">
          {FILTERS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filter === tab ? filterColors[tab] : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {tab}
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                filter === tab ? "bg-zinc-100 text-zinc-600" : "bg-zinc-200/50 text-zinc-400"
              }`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none text-zinc-400">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by car or seller name…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm outline-none focus:border-zinc-400 transition-colors text-zinc-800 placeholder-zinc-400"
          />
        </div>
      </div>

      {/* 2-col layout */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* Left — inquiry list */}
        <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1 divide-y divide-zinc-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-zinc-100 rounded w-2/3" />
                      <div className="h-3 bg-zinc-100 rounded w-1/2" />
                      <div className="h-3 bg-zinc-100 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-sm text-zinc-400 flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-[40px] opacity-20">sell</span>
                <p>No {filter !== "All" ? filter.toLowerCase() : ""} inquiries found.</p>
              </div>
            ) : (
              filtered.map((car) => (
                <button
                  key={car.id}
                  onClick={() => { setSelected(car); setSelectedImage(0); }}
                  className={`w-full text-left px-4 py-3.5 transition-colors hover:bg-zinc-50 ${
                    selected?.id === car.id ? "bg-zinc-50 border-l-2 border-l-red-600" : ""
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0">
                      {car.image ? (
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px] text-zinc-300">directions_car</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-zinc-800 truncate">{car.name}</p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {car.seller_name && car.seller_name !== "N/A" ? car.seller_name : "Unknown Seller"}
                      </p>
                      <div className="mt-1.5">
                        <StatusBadge status={car.status} />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right — detail panel */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
          {selected ? (
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className="px-6 py-5 border-b border-zinc-50 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 overflow-hidden border border-zinc-100 flex items-center justify-center flex-shrink-0">
                    {selected.image ? (
                      <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[24px] text-zinc-300">directions_car</span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-extrabold text-xl text-zinc-900 leading-snug" style={{ fontFamily: "Hanken Grotesk" }}>
                      {selected.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <StatusBadge status={selected.status} />
                      <span className="text-xs text-zinc-400">
                        {selected.createdAt
                          ? new Date(selected.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit", month: "short", year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => setConfirmDelete(selected)}
                  disabled={!!actionLoading}
                  className="p-2 rounded-xl text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

              {/* Update status row */}
              <div className="px-6 py-4 border-b border-zinc-50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5" style={{ fontFamily: "JetBrains Mono" }}>
                  Inquiry Status
                </p>
                <div className="flex gap-2">
                  {(["new", "contacted", "closed"] as const).map((s) => {
                    const current = normStatus(selected.status) === s;
                    const labels = { new: "New", contacted: "Contacted", closed: "Closed" };
                    const icons  = { new: "new_releases", contacted: "call", closed: "task_alt" };
                    const activeColors = {
                      new:       "bg-amber-500 text-white shadow-amber-200",
                      contacted: "text-white shadow-blue-200",
                      closed:    "bg-zinc-700 text-white shadow-zinc-200",
                    };
                    const isLoading = actionLoading === selected.id + "_" + s;
                    return (
                      <button
                        key={s}
                        onClick={() => !current && handleUpdateStatus(selected, s)}
                        disabled={!!actionLoading}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex-1 justify-center disabled:opacity-60 ${
                          current
                            ? s === "contacted"
                              ? "bg-blue-600 text-white shadow-blue-200"
                              : activeColors[s]
                            : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                        }`}
                      >
                        {isLoading ? (
                          <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">{icons[s]}</span>
                        )}
                        {labels[s]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo gallery */}
              {selected.images && selected.images.length > 0 && (
                <div className="px-6 py-4 border-b border-zinc-50 bg-zinc-50/40">
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400" style={{ fontFamily: "JetBrains Mono" }}>
                      Vehicle Photos ({selected.images.length})
                    </p>
                    {selected.images.length > 1 && (
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {selectedImage + 1} of {selected.images.length}
                      </span>
                    )}
                  </div>
                  
                  {/* Main Preview (Compact Max Height) */}
                  <div className="relative h-48 sm:h-56 max-w-lg mx-auto rounded-2xl overflow-hidden bg-zinc-900 shadow-sm border border-zinc-200/80 group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        src={selected.images[selectedImage]}
                        alt={`Photo ${selectedImage + 1}`}
                        className="w-full h-full object-contain bg-zinc-900"
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {selected.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}
                          disabled={selectedImage === 0}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-20 hover:bg-black/80 transition-colors shadow-md"
                        >
                          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        </button>
                        <button
                          onClick={() => setSelectedImage((i) => Math.min(selected.images.length - 1, i + 1))}
                          disabled={selectedImage === selected.images.length - 1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-20 hover:bg-black/80 transition-colors shadow-md"
                        >
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {selected.images.length > 1 && (
                    <div className="flex gap-2 justify-center mt-3 overflow-x-auto no-scrollbar py-1">
                      {selected.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`w-12 h-9 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                            idx === selectedImage
                              ? "border-red-600 scale-105 shadow-sm"
                              : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Details grid */}
              <div className="px-6 py-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vehicle details */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2" style={{ fontFamily: "JetBrains Mono" }}>
                    Vehicle Details
                  </p>
                  <div className="bg-zinc-50 rounded-2xl px-4 py-1">
                    <InfoRow icon="attach_money" label="Asking Price" value={`Rs. ${(selected.price || 0).toLocaleString()}`} />
                    <InfoRow icon="today"         label="Year"         value={String(selected.year)} />
                    <InfoRow icon="speed"         label="Mileage"      value={selected.mileage} />
                    <InfoRow icon="ev_station"    label="Fuel"         value={selected.fuel} />
                    <InfoRow icon="settings"      label="Transmission" value={selected.transmission} />
                    <InfoRow icon="format_color_fill" label="Color / Variant" value={selected.variant || "N/A"} />
                    {selected.condition && <InfoRow icon="star" label="Condition" value={selected.condition} />}
                    {selected.videoUrl && (
                      <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid #f4f4f5" }}>
                        <span className="material-symbols-outlined text-[17px] text-zinc-300 mt-0.5 shrink-0">play_circle</span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5" style={{ fontFamily: "JetBrains Mono" }}>Video</p>
                          <a href={selected.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-red-600 font-medium hover:underline break-all">
                            {selected.videoUrl}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seller info */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2" style={{ fontFamily: "JetBrains Mono" }}>
                    Seller Information
                  </p>
                  <div className="bg-zinc-50 rounded-2xl px-4 py-1">
                    <InfoRow icon="person"      label="Full Name" value={selected.seller_name || "N/A"} />
                    <InfoRow icon="mail"        label="Email"     value={selected.seller_email || "N/A"} />
                    <InfoRow icon="call"        label="Phone"     value={selected.seller_phone || "N/A"} />
                    <InfoRow icon="location_on" label="City"      value={selected.seller_city || "N/A"} />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {selected.seller_email && selected.seller_email !== "N/A" && (
                      <a
                        href={`mailto:${selected.seller_email}?subject=Re: Your ${selected.name} Listing on RK Auto Center`}
                        className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">mail</span>
                        Email Seller
                      </a>
                    )}
                    {selected.seller_phone && selected.seller_phone !== "N/A" && (
                      <a
                        href={`tel:${selected.seller_phone}`}
                        className="flex items-center gap-1.5 flex-1 justify-center px-3 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">call</span>
                        Call Seller
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {selected.description && (
                <div className="px-6 pb-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2" style={{ fontFamily: "JetBrains Mono" }}>
                    Description
                  </p>
                  <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 rounded-2xl px-4 py-3">
                    {selected.description}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-300 gap-4">
              <span className="material-symbols-outlined text-[56px]">sell</span>
              <p className="text-sm">Select a seller inquiry to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
