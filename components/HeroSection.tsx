"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_CARS } from "@/lib/cars";
import CountingNumber from "@/components/CountingNumber";

/* ─── Filter Data (mirrors buy/page.tsx) ─── */
const BRAND_MODELS_DATA: Record<string, string[]> = {
  "Volkswagen": ["Polo", "Tiguan", "Passat", "Golf", "Touareg"],
  "Hyundai": ["Santro", "i10", "i20", "Tucson", "Creta", "Venue", "Ioniq 5"],
  "Toyota": ["Corolla", "Land Cruiser Prado", "RAV4", "Hilux", "Fortuner", "Rush"],
  "Honda": ["City", "Jazz", "Civic", "CR-V"],
  "Nissan": ["Navara", "X-Trail", "Patrol", "Kicks"],
  "Kia": ["Picanto", "Sportage", "Seltos", "Sonet"],
  "Chevrolet": ["Spark", "Beat", "Captiva"],
  "Suzuki": ["Alto", "Swift", "Ertiga", "Baleno", "Vitara Brezza"],
  "Mercedes-Benz": ["E 200", "C-Class", "GLB", "GLE"],
  "BMW": ["M3", "M5", "X5", "i7", "iX3"],
  "Porsche": ["911 Carrera", "Cayenne", "Taycan", "Panamera"],
  "Ford": ["Figo", "Ranger", "Everest", "Ecosport"],
  "Mitsubishi": ["Pajero", "Pajero Sport", "ASX", "Outlander"],
  "Mazda": ["Mazda 6", "Mazda 3", "Mazda 2"],
  "Land Rover": ["Freelander 2", "Defender"],
  "Tata": ["Safari", "Tiago", "Nexon"],
  "Mahindra": ["Scorpio", "Bolero", "Thar"],
  "Škoda": ["Fabia", "Rapid", "Octavia", "Superb"],
  "MG (Morris Garage)": ["GS", "ZS EV"],
  "BYD": ["Dolphin"],
};

const VEHICLE_TYPES = ["Sedan", "SUV (7 Seater)", "SUV (5 Seater)", "Hatchback", "Pik Up Truck", "Van"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const YEARS = Array.from({ length: 17 }, (_, i) => 2008 + i);
const BUDGET_OPTIONS = [
  { label: "Any Budget", value: "" },
  { label: "Up to Rs. 5L", value: "5000000" },
  { label: "Up to Rs. 10L", value: "10000000" },
  { label: "Up to Rs. 15L", value: "15000000" },
  { label: "Up to Rs. 20L", value: "20000000" },
];
const KM_OPTIONS = [
  { label: "Any Mileage", value: "" },
  { label: "Under 10,000 km", value: "10000" },
  { label: "Under 50,000 km", value: "50000" },
  { label: "Under 100,000 km", value: "100000" },
  { label: "Under 200,000 km", value: "200000" },
];

/* ─── Custom Select ─── */
function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-3 hover:bg-gray-100/50 transition-colors">
      <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent border-none p-0 pr-6 text-sm font-semibold outline-none cursor-pointer focus:ring-0"
          style={{ color: "var(--color-on-surface)" }}
        >
          {children}
        </select>
        <span
          className="material-symbols-outlined pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[18px] text-gray-400"
        >
          expand_more
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [tab, setTab] = useState<"shop" | "sell">("shop");

  /* — Search state (like Navbar) — */
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof MOCK_CARS>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  /* — Filter state (mirrors buy page) — */
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [maxKm, setMaxKm] = useState("");

  /* — Live search — */
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.trim()) {
      const filtered = MOCK_CARS.filter(
        (car) =>
          car.name.toLowerCase().includes(q.toLowerCase()) ||
          car.variant.toLowerCase().includes(q.toLowerCase()) ||
          car.make.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  /* — Close results on outside click — */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* — Reset model when brand changes — */
  const handleBrandChange = (v: string) => {
    setBrand(v);
    setModel("");
  };

  /* — Build query params and navigate — */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "sell") { router.push("/sell"); return; }

    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    if (brand) params.set("make", brand);
    if (model) params.set("model", model);
    if (vehicleType) params.set("type", vehicleType);
    if (fuelType) params.set("fuel", fuelType);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);
    if (maxBudget) params.set("maxPrice", maxBudget);
    if (maxKm) params.set("maxKm", maxKm);

    router.push(`/buy?${params.toString()}`);
  };

  const selectResult = (slug: string) => {
    setSearchFocused(false);
    setQuery("");
    router.push(`/buy/${slug}`);
  };

  return (
    <section className="relative min-h-[640px] md:min-h-[750px] flex flex-col justify-between overflow-hidden bg-black -mt-20 pt-28 pb-12 px-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Card */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl text-left my-8"
        >
          <form onSubmit={handleSearch} className="p-7">
            <h2
              className="text-2xl font-black tracking-tight mb-5"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              Imagine the possibilities
            </h2>

            {/* Tabs */}
            <div className="flex mb-5 bg-gray-100/80 p-1 rounded-full relative">
              {(["shop", "sell"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="flex-1 py-2 text-xs font-bold rounded-full transition-all relative z-10 cursor-pointer"
                  style={{ color: tab === t ? "white" : "var(--color-on-surface-variant)" }}
                >
                  {tab === t && (
                    <motion.div
                      layoutId="activeHeroTab"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "var(--color-primary)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t === "shop" ? "Shop cars for sale" : "Sell your car"}
                </button>
              ))}
            </div>

            <div className="min-h-[380px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {tab === "shop" ? (
                  <motion.div
                    key="shop-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* ── Live Search ── */}
                    <div ref={searchRef} className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={query}
                          onChange={handleQueryChange}
                          onFocus={() => setSearchFocused(true)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && query.trim()) {
                              e.preventDefault();
                              router.push(`/buy?search=${encodeURIComponent(query.trim())}`);
                              setSearchFocused(false);
                            }
                          }}
                          placeholder="Search any make, model..."
                          className="w-full bg-gray-50/80 rounded-2xl py-3 pl-5 pr-12 text-sm outline-none transition-all focus:bg-white focus:shadow-md border-none"
                          style={{ color: "var(--color-on-surface)" }}
                        />
                        <span
                          className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[20px]"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          search
                        </span>
                      </div>

                      {/* Dropdown suggestions */}
                      <AnimatePresence>
                        {searchFocused && searchResults.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden max-h-52 overflow-y-auto"
                          >
                            {searchResults.slice(0, 6).map((car) => (
                              <button
                                key={car.id}
                                type="button"
                                onClick={() => selectResult(car.slug)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                              >
                                <div className="w-10 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  {car.image ? (
                                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-[16px] text-gray-400">
                                      directions_car
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-gray-900 truncate">{car.name}</p>
                                  <p className="text-[10px] text-gray-400 truncate">{car.variant}</p>
                                </div>
                                <p className="text-xs font-extrabold text-red-600 flex-shrink-0">
                                  Rs. {car.price.toLocaleString()}
                                </p>
                              </button>
                            ))}
                            {searchResults.length > 6 && (
                              <button
                                type="button"
                                onClick={() => {
                                  router.push(`/buy?search=${encodeURIComponent(query.trim())}`);
                                  setSearchFocused(false);
                                }}
                                className="w-full py-2.5 text-center text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                              >
                                View all {searchResults.length} results →
                              </button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">
                      — or filter by —
                    </div>

                    {/* ── Filter dropdowns ── */}
                    <div className="rounded-2xl overflow-hidden divide-y divide-gray-100 bg-gray-50/80">

                      {/* Brand */}
                      <FilterSelect label="Brand / Make" value={brand} onChange={handleBrandChange}>
                        <option value="">Any Brand</option>
                        {Object.keys(BRAND_MODELS_DATA).map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </FilterSelect>

                      {/* Model — only when brand selected */}
                      <FilterSelect label="Model" value={model} onChange={setModel}>
                        <option value="">Any Model</option>
                        {(BRAND_MODELS_DATA[brand] || []).map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </FilterSelect>

                      {/* Vehicle Type & Fuel Type side by side */}
                      <div className="flex divide-x divide-gray-100">
                        <div className="w-1/2">
                          <FilterSelect label="Vehicle Type" value={vehicleType} onChange={setVehicleType}>
                            <option value="">Any Type</option>
                            {VEHICLE_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </FilterSelect>
                        </div>
                        <div className="w-1/2">
                          <FilterSelect label="Fuel Type" value={fuelType} onChange={setFuelType}>
                            <option value="">Any Fuel</option>
                            {FUEL_TYPES.map((f) => (
                              <option key={f} value={f}>{f}</option>
                            ))}
                          </FilterSelect>
                        </div>
                      </div>

                      {/* Year From/To side by side */}
                      <div className="flex divide-x divide-gray-100">
                        <div className="w-1/2">
                          <FilterSelect label="Year From" value={yearFrom} onChange={setYearFrom}>
                            <option value="">Any</option>
                            {YEARS.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </FilterSelect>
                        </div>
                        <div className="w-1/2">
                          <FilterSelect label="Year To" value={yearTo} onChange={setYearTo}>
                            <option value="">Any</option>
                            {YEARS.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </FilterSelect>
                        </div>
                      </div>

                      {/* Budget & Max KM side by side */}
                      <div className="flex divide-x divide-gray-100">
                        <div className="w-1/2">
                          <FilterSelect label="Max Budget (NPR)" value={maxBudget} onChange={setMaxBudget}>
                            {BUDGET_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </FilterSelect>
                        </div>
                        <div className="w-1/2">
                          <FilterSelect label="Max Mileage" value={maxKm} onChange={setMaxKm}>
                            {KM_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </FilterSelect>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sell-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto text-red-600">
                      <span className="material-symbols-outlined text-[32px]">sell</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                      Ready to list your vehicle?
                    </h3>
                    <p className="text-sm text-gray-500 px-4 leading-relaxed">
                      List your car on our premium marketplace and reach thousands of verified buyers.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-center text-white font-extrabold text-base transition-all mt-4 rounded-2xl hover:opacity-90 btn-press shadow-lg shadow-blue-500/20"
              style={{ background: "var(--color-secondary)" }}
            >
              {tab === "shop" ? "Show Matches" : "Go to Seller Portal"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom accents */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 pl-3 pr-5 rounded-full shadow-lg">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-black/40 bg-gray-600 flex items-center justify-center text-white text-[10px] font-bold">U1</div>
            <div className="w-8 h-8 rounded-full border-2 border-black/40 bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">U2</div>
          </div>
          <div className="text-white text-xs">
            <span className="block font-bold">Already helped</span>
            <span className="opacity-70">over <CountingNumber value={10} suffix="K+" /> clients</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {["Efficiency", "Sustainability", "Growth"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full text-white text-sm shadow-md"
            >
              <span className="material-symbols-outlined text-[16px] fill" style={{ color: "var(--color-primary)" }}>
                check_circle
              </span>
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
