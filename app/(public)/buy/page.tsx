"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { MOCK_CARS, Car, fetchCarsFromAppwrite } from "@/lib/cars";

const SORTS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
];

const VEHICLE_TYPES = [
  "Sedan",
  "SUV (7 Seater)",
  "Pik Up Truck",
  "Van",
  "Hatchback",
  "SUV (5 Seater)",
];

const FUEL_TYPES = [
  "Diesel",
  "Petrol",
  "Electric",
  "Hybrid",
];

const BRAND_MODELS_DATA: Record<string, string[]> = {
  "Volkswagen": ["Polo", "Tourage", "Tiguan", "Passat", "Golf", "Vento", "Touareg"],
  "Hyundai": ["Santro", "Accent", "Atos Prime", "Getz", "Verna", "i10", "i20", "Eon", "Tucson", "Sonata", "Santa Fe", "Matrix", "Xcent", "Grand i10", "Creta", "i20 Active", "Venue", "Kona", "Ioniq 5"],
  "Toyota": ["Corolla", "Land cruiser Prado", "Rav4", "Yaris", "Avanza", "Hilux", "Fortuner", "Eco", "Prado", "Land Cruiser", "Etios Cross", "Rush", "Etios Liva"],
  "Honda": ["City", "Jazz", "Brio", "Civic", "CR-V", "Mobilio"],
  "Nissan": ["Navara", "X-Trail", "Sunny Super Saloon", "Sunny", "Tiida", "Terrano", "Patrol", "Kicks", "Micra/March"],
  "Daihatsu": ["Sirion", "Terios", "Cuore", "Charade"],
  "Škoda": ["Fabia", "Yeti", "Rapid", "Laura", "Octavia", "Superb", "Kushaq"],
  "Mahindra": ["Scorpio", "Bolero", "XUV 500", "Scorpio Pik Up", "E2O", "Thar"],
  "Kia": ["Picanto", "Rio", "Sportage", "Soul", "Seltos", "Sonet"],
  "Chevrolet": ["Spark", "Uva", "Beat", "Aveo", "Optra", "Tavera", "Captiva"],
  "Isuzu": ["Trooper", "V-Cross"],
  "Mazda": ["Mazda 6", "Mazda 3", "Mazda 2"],
  "Ford": ["Figo", "Ranger", "Everest", "Ecosport", "Fiesta Classic", "Aspire"],
  "Mercedes-Benz": ["E 200", "Tourist Hiace", "C-Class", "GLB", "GLE"],
  "Land Rover": ["Freelander 2", "Freelander", "Defender"],
  "Mitsubishi": ["Pajero", "Pajero Sport", "ASX", "Outlander", "Lancer", "Mirage"],
  "Suzuki": ["Alto 800", "Swift", "Omni Van", "Ertiga", "Eeco", "Swift Dzire", "Grand Vitara", "Wagon R", "Maruti 800", "Zen", "Ignis", "Omni Cargo Van", "Alto K10", "Ciaz", "Celerio", "Ritz", "Zen Estilo", "Baleno", "A-Star", "SX4", "Vitara Brezza", "Eeco Cargo Van"],
  "Fiat": ["Punto"],
  "Tata": ["Safari", "Storme", "Tiago", "Nexon"],
  "Peugeot": ["208 GT", "3008"],
  "Renault": ["Duster"],
  "Datsun": ["Go"],
  "Jeep": ["Compass"],
  "MG (Morris Garage)": ["GS", "ZS EV"],
  "Subaru": ["XV"],
  "BYD": ["Dolphin"],
  "BMW": ["iX3"],
};

const fuelIcon: Record<string, string> = {
  Petrol: "local_gas_station",
  Diesel: "oil_barrel",
  Electric: "electric_car",
  Hybrid: "bolt",
};

interface FlyingItem {
  id: string;
  imageUrl: string;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  endX: number;
  endY: number;
}

function BuyPageContent() {
  const { compareIds, addToCompare, removeFromCompare } = useCompare();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read all filter params from URL (set by hero "Show Matches")
  const initialSearch   = searchParams.get("search")   || "";
  const initialMake     = searchParams.get("make")     || null;
  const initialModel    = searchParams.get("model")    || null;
  const initialType     = searchParams.get("type")     || "";
  const initialFuel     = searchParams.get("fuel")     || "";
  const initialYearFrom = Number(searchParams.get("yearFrom") || 2009);
  const initialYearTo   = Number(searchParams.get("yearTo")   || 2024);
  const initialMaxPrice = Number(searchParams.get("maxPrice") || 14500000);
  const initialMaxKm    = Number(searchParams.get("maxKm")    || 120000);

  // Filters State — seeded from URL
  const [searchQuery, setSearchQuery]     = useState(initialSearch);
  const [minPrice, setMinPrice]           = useState<number>(0);
  const [maxPrice, setMaxPrice]           = useState<number>(initialMaxPrice);
  const [minKm, setMinKm]                 = useState<number>(0);
  const [maxKm, setMaxKm]                 = useState<number>(initialMaxKm);
  const [minYear, setMinYear]             = useState<number>(initialYearFrom);
  const [maxYear, setMaxYear]             = useState<number>(initialYearTo);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [selectedFuels, setSelectedFuels] = useState<string[]>(initialFuel ? [initialFuel] : []);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialMake);
  const [selectedModel, setSelectedModel] = useState<string | null>(initialModel);
  const [brandSearch, setBrandSearch]     = useState("");
  const [expandedBrands, setExpandedBrands] = useState<string[]>(
    initialMake ? [initialMake] : ["Volkswagen", "Hyundai", "Toyota"]
  );

  const [sort, setSort] = useState("recommended");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const [carsList, setCarsList] = useState<Car[]>(MOCK_CARS);

  // Sync all filters when URL params change (e.g. hero navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    const make = searchParams.get("make") || null;
    const model = searchParams.get("model") || null;
    const type  = searchParams.get("type")  || "";
    const fuel  = searchParams.get("fuel")  || "";
    setSelectedBrand(make);
    setSelectedModel(model);
    if (make) setExpandedBrands((prev) => prev.includes(make) ? prev : [...prev, make]);
    setSelectedTypes(type ? [type] : []);
    setSelectedFuels(fuel ? [fuel] : []);
    const yFrom = searchParams.get("yearFrom"); if (yFrom) setMinYear(Number(yFrom));
    const yTo   = searchParams.get("yearTo");   if (yTo)   setMaxYear(Number(yTo));
    const mp    = searchParams.get("maxPrice"); if (mp)    setMaxPrice(Number(mp));
    const mk    = searchParams.get("maxKm");    if (mk)    setMaxKm(Number(mk));
  }, [searchParams]);

  // Load cars from Appwrite on mount
  useEffect(() => {
    fetchCarsFromAppwrite().then((res) => {
      setCarsList(res);
    });
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const triggerFlyToCompare = (carId: string, imageUrl: string) => {
    const isAdded = compareIds.includes(carId);
    if (isAdded) {
      removeFromCompare(carId);
      return;
    }

    const sourceImg = imageRefs.current[carId];
    const target = document.getElementById("navbar-compare-link");
    if (!sourceImg || !target) {
      addToCompare(carId);
      return;
    }

    const sourceRect = sourceImg.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const newItem: FlyingItem = {
      id: Math.random().toString(36).substring(2, 9),
      imageUrl,
      startX: sourceRect.left,
      startY: sourceRect.top,
      startWidth: sourceRect.width,
      startHeight: sourceRect.height,
      endX: targetRect.left + targetRect.width / 2 - 16,
      endY: targetRect.top + targetRect.height / 2 - 20,
    };

    setFlyingItems((prev) => [...prev, newItem]);
    addToCompare(carId);

    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
    }, 850);
  };

  const resetAllFilters = () => {
    setMinPrice(0);
    setMaxPrice(20000000);
    setMinKm(0);
    setMaxKm(250000);
    setMinYear(2008);
    setMaxYear(2025);
    setSelectedTypes([]);
    setSelectedFuels([]);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSearchQuery("");
    setBrandSearch("");
    router.push("/buy");
  };

  // Toggle brand expansion
  const toggleBrandExpand = (brand: string) => {
    setExpandedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Filter Cars
  let cars = carsList.filter((c) => {
    // Search input query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.variant.toLowerCase().includes(q) ||
        c.make.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Brand and Model Selection
    if (selectedBrand && c.make !== selectedBrand) return false;
    if (selectedModel && c.model !== selectedModel) return false;

    // Price
    if (c.price < minPrice || c.price > maxPrice) return false;

    // Mileage / KM
    if (c.mileageVal < minKm || c.mileageVal > maxKm) return false;

    // Year
    if (c.year < minYear || c.year > maxYear) return false;

    // Vehicle Type Checkboxes
    if (selectedTypes.length > 0 && !selectedTypes.includes(c.type)) return false;

    // Fuel Type Checkboxes
    if (selectedFuels.length > 0 && !selectedFuels.includes(c.fuel)) return false;

    return true;
  });

  // Sort Cars
  if (sort === "price_asc") {
    cars = [...cars].sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    cars = [...cars].sort((a, b) => b.price - a.price);
  }

  // Pre-calculate count dictionary for all Brands & Models in the full database
  const getBrandCount = (brand: string) => {
    return carsList.filter((c) => c.make.toLowerCase() === brand.toLowerCase()).length;
  };
  const getModelCount = (brand: string, model: string) => {
    return carsList.filter(
      (c) =>
        c.make.toLowerCase() === brand.toLowerCase() &&
        c.model.toLowerCase() === model.toLowerCase()
    ).length;
  };

  // Filter brand list dynamically by search
  const filteredBrands = Object.keys(BRAND_MODELS_DATA).filter((brand) => {
    if (!brandSearch) return true;
    if (brand.toLowerCase().includes(brandSearch.toLowerCase())) return true;
    return BRAND_MODELS_DATA[brand].some((m) =>
      m.toLowerCase().includes(brandSearch.toLowerCase())
    );
  });

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFuelChange = (fuel: string) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };

  const renderFiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="font-extrabold text-lg text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
          Filters
        </h3>
        <button
          onClick={resetAllFilters}
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Brand & Model Selector */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
          Brand & Model
        </h4>
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search Brand / Model..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-gray-100 rounded-xl outline-none focus:border-red-500 transition-all bg-gray-50"
          />
        </div>

        {selectedBrand && (
          <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold w-fit mb-3">
            <span>
              {selectedBrand} {selectedModel ? `• ${selectedModel}` : ""}
            </span>
            <button
              onClick={() => {
                setSelectedBrand(null);
                setSelectedModel(null);
              }}
              className="material-symbols-outlined text-[14px] hover:scale-110 transition-transform"
            >
              close
            </button>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1 pr-1 border border-gray-50 rounded-2xl p-2 bg-gray-50/50">
          {filteredBrands.map((brand) => {
            const isExpanded = expandedBrands.includes(brand) || brandSearch.length > 0;
            const brandCount = getBrandCount(brand);
            const isSelected = selectedBrand === brand && !selectedModel;

            return (
              <div key={brand} className="space-y-0.5">
                <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/80 transition-colors group cursor-pointer">
                  <div
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel(null);
                    }}
                    className={`flex-1 text-xs font-bold truncate transition-colors ${
                      selectedBrand === brand && !selectedModel
                        ? "text-red-600"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {brand} <span className="text-[10px] text-gray-400 font-normal ml-0.5">({brandCount})</span>
                  </div>
                  {BRAND_MODELS_DATA[brand].length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBrandExpand(brand);
                      }}
                      className="w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                      <span
                        className="material-symbols-outlined text-[16px] transition-transform duration-200"
                        style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                      >
                        chevron_right
                      </span>
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="pl-4 border-l border-gray-100 ml-2 space-y-0.5">
                    {BRAND_MODELS_DATA[brand]
                      .filter((model) =>
                        brandSearch
                          ? model.toLowerCase().includes(brandSearch.toLowerCase()) ||
                            brand.toLowerCase().includes(brandSearch.toLowerCase())
                          : true
                      )
                      .map((model) => {
                        const modelCount = getModelCount(brand, model);
                        const isModelSelected = selectedBrand === brand && selectedModel === model;

                        return (
                          <div
                            key={model}
                            onClick={() => {
                              setSelectedBrand(brand);
                              setSelectedModel(model);
                            }}
                            className={`py-1 px-2 rounded-md text-[11px] font-bold cursor-pointer transition-colors flex justify-between items-center ${
                              isModelSelected
                                ? "bg-red-50 text-red-600"
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
                            }`}
                          >
                            <span>{model}</span>
                            <span className="text-[9px] text-gray-400 font-normal">({modelCount})</span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Selector */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
          Budget (NPR)
        </h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
              <span>Minimum Price</span>
              <span className="text-gray-800 font-extrabold">Rs. {minPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
              <span>Maximum Price</span>
              <span className="text-gray-800 font-extrabold">Rs. {maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20000000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(minPrice, Number(e.target.value)))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Kilometres Driven */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
          Kilometres Driven
        </h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
              <span>Min KM</span>
              <span className="text-gray-800 font-extrabold">{minKm.toLocaleString()} km</span>
            </div>
            <input
              type="range"
              min="0"
              max="250000"
              step="2000"
              value={minKm}
              onChange={(e) => setMinKm(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
              <span>Max KM</span>
              <span className="text-gray-800 font-extrabold">{maxKm.toLocaleString()} km</span>
            </div>
            <input
              type="range"
              min="0"
              max="250000"
              step="2000"
              value={maxKm}
              onChange={(e) => setMaxKm(Math.max(minKm, Number(e.target.value)))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Make Year */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
          Make Year
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-gray-500 block mb-1">From</label>
            <select
              value={minYear}
              onChange={(e) => setMinYear(Number(e.target.value))}
              className="w-full px-2 py-2 text-xs border border-gray-100 rounded-xl outline-none focus:border-red-500 bg-gray-50 font-bold"
            >
              {Array.from({ length: 17 }, (_, i) => 2008 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 block mb-1">To</label>
            <select
              value={maxYear}
              onChange={(e) => setMaxYear(Number(e.target.value))}
              className="w-full px-2 py-2 text-xs border border-gray-100 rounded-xl outline-none focus:border-red-500 bg-gray-50 font-bold"
            >
              {Array.from({ length: 17 }, (_, i) => 2009 + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Type */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
          Vehicle Type
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
          {VEHICLE_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
              />
              <span className="text-xs font-bold text-gray-600 group-hover:text-gray-800 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
          Fuel Type
        </h4>
        <div className="space-y-2">
          {FUEL_TYPES.map((fuel) => (
            <label key={fuel} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFuels.includes(fuel)}
                onChange={() => handleFuelChange(fuel)}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
              />
              <span className="text-xs font-bold text-gray-600 group-hover:text-gray-800 transition-colors">
                {fuel === "Hybrid" ? "Hybrid (Petrol + Electric)" : fuel}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Flying image overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        <AnimatePresence>
          {flyingItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                position: "fixed",
                left: item.startX,
                top: item.startY,
                width: item.startWidth,
                height: item.startHeight,
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
                borderRadius: "12px",
              }}
              animate={{
                left: item.endX,
                top: item.endY,
                width: 32,
                height: 28,
                opacity: [1, 0.9, 0.5, 0],
                scale: 0.1,
                rotate: -10,
                filter: "blur(2px)",
              }}
              exit={{ opacity: 0 }}
              transition={{
                left: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
                top: { duration: 0.85, ease: [0.455, 0.03, 0.515, 0.955] },
                opacity: { duration: 0.85, ease: "easeIn" },
                scale: { duration: 0.85, ease: "easeInOut" },
                rotate: { duration: 0.85, ease: "easeOut" },
                filter: { duration: 0.85, ease: "easeIn" },
              }}
              className="shadow-2xl overflow-hidden border border-white/20 bg-gray-100"
            >
              {item.imageUrl && (
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Title & Info */}
      <div className="mb-8">
        <h1 className="text-5xl font-black tracking-tight" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}>
          {searchQuery ? `Search Results for "${searchQuery}"` : "Our Collection"}
        </h1>
        <p className="mt-2 text-base text-gray-500">
          <span className="font-bold text-red-600">{cars.length}</span> premium vehicles available
        </p>
      </div>

      {/* Main layout: 12-columns grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sidebar Filters (Desktop only) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24 max-h-[85vh] overflow-y-auto no-scrollbar">
            {renderFiltersContent()}
          </div>
        </div>

        {/* Right Column: Cars list and Controls */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Sort, Search status, and Mobile Filter Toggle */}
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                Filters
              </button>
              {searchQuery && (
                <div className="flex items-center gap-2 bg-gray-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-600">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")} className="material-symbols-outlined text-[14px]">
                    close
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 hidden sm:inline">Sort By</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer outline-none border border-gray-100 shadow-sm focus:border-red-500 bg-white text-gray-800"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => {
              const isAddedToCompare = compareIds.includes(car.id);

              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-gray-100"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                    {car.image ? (
                      <img
                        ref={(el) => {
                          imageRefs.current[car.id] = el;
                        }}
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    ) : (
                      <span
                        className="material-symbols-outlined absolute inset-0 m-auto text-[64px] opacity-10 group-hover:scale-110 transition-transform duration-500"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        directions_car
                      </span>
                    )}

                    {car.badge && (
                      <div
                        className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                        style={{
                          background: car.badge === "New" ? "var(--color-primary)" : "var(--color-tertiary-container)",
                        }}
                      >
                        {car.badge}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(car.id)}
                      className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md btn-press transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        color: wishlist.has(car.id) ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                      }}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${wishlist.has(car.id) ? "fill" : ""}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="text-[10px] font-bold text-gray-400 mb-1" style={{ fontFamily: "JetBrains Mono" }}>
                      {car.year} • {car.type}
                    </div>
                    <h3 className="font-extrabold text-base mb-0.5 truncate" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}>
                      {car.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 truncate">{car.variant}</p>

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
                          <span className="text-[10px] font-bold text-gray-600 truncate" style={{ fontFamily: "JetBrains Mono" }}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--color-surface-container-low)" }}>
                      <span className="font-extrabold text-base text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
                        Rs. {car.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Compare Button */}
                        <button
                          onClick={() => triggerFlyToCompare(car.id, car.image)}
                          title={isAddedToCompare ? "Remove from compare" : "Compare this car"}
                          className={`w-8 h-8 rounded-full flex items-center justify-center btn-press transition-all hover:scale-105 shadow-sm ${
                            isAddedToCompare ? "text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                          style={isAddedToCompare ? { background: "var(--color-primary)", color: "white" } : {}}
                        >
                          <span className="material-symbols-outlined text-[17px]">
                            {isAddedToCompare ? "check" : "compare_arrows"}
                          </span>
                        </button>
                        <Link
                          href={`/buy/${car.slug}`}
                          className="flex items-center gap-1 text-xs font-bold btn-press text-red-600 hover:text-red-700 transition-colors"
                        >
                          Details
                          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {cars.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
              <span className="material-symbols-outlined text-[64px] opacity-20 block mb-4">search_off</span>
              <p className="font-bold text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                No vehicles match your search or filters
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-6 py-2.5 rounded-full text-sm font-bold text-white btn-press shadow-md"
                style={{ background: "var(--color-primary)" }}
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 p-6 overflow-y-auto no-scrollbar shadow-2xl lg:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-500 hover:text-gray-800"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                {renderFiltersContent()}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-2xl font-bold text-white text-sm text-center shadow-md bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Apply Filters ({cars.length} found)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-gray-500">Loading inventory...</div>}>
      <BuyPageContent />
    </Suspense>
  );
}
