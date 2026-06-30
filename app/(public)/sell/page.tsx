"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import {
  DB_ID,
  CARS_COLLECTION_ID,
  CAR_IMAGES_BUCKET_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
} from "@/lib/constants";

const STEPS = [
  { id: 1, label: "Basic Info", icon: "info" },
  { id: 2, label: "Details", icon: "tune" },
  { id: 3, label: "Photos & Video", icon: "photo_camera" },
  { id: 4, label: "Contact", icon: "person" },
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

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    price: "",
    mileage: "",
    color: "",
    description: "",
    transmission: "Automatic",
    fuel: "Petrol",
    condition: "Excellent",
    videoUrl: "",
    images: [] as File[],
    name: "",
    email: "",
    phone: "",
    city: "Kathmandu, Nepal",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search/Dropdown overlay states
  const [makeSearch, setMakeSearch] = useState("");
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [modelSearch, setModelSearch] = useState("");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const makeRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (makeRef.current && !makeRef.current.contains(e.target as Node)) {
        setShowMakeDropdown(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  const [loading, setLoading] = useState(false);

  const nextStep = async () => {
    if (step < STEPS.length) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        // 1. Upload files to Appwrite Storage
        const uploadedImageIds: string[] = [];
        for (const file of form.images) {
          const response = await storage.createFile(
            CAR_IMAGES_BUCKET_ID,
            ID.unique(),
            file
          );
          const fileUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${CAR_IMAGES_BUCKET_ID}/files/${response.$id}/view?project=${APPWRITE_PROJECT_ID}`;
          uploadedImageIds.push(fileUrl);
        }

        // Fallback placeholder image if none uploaded
        if (uploadedImageIds.length === 0) {
          uploadedImageIds.push("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600");
        }

        // 2. Generate vehicle details
        const slug = `${form.year}-${form.make.toLowerCase().replace(/\s+/g, "-")}-${form.model.toLowerCase().replace(/\s+/g, "-")}-${Math.random().toString(36).substring(2, 7)}`;
        const priceNum = parseFloat(form.price.replace(/,/g, "")) || 0;
        const mileageNum = parseFloat(form.mileage.replace(/,/g, "")) || 0;

        const data = {
          name: `${form.year} ${form.make} ${form.model}`,
          slug: slug,
          description: form.description || "No description provided.",
          price: priceNum,
          make: form.make,
          model: form.model,
          year: parseInt(form.year) || new Date().getFullYear(),
          mileage: mileageNum,
          engine: "Standard Engine",
          transmission: form.transmission,
          drivetrain: "FWD",
          featured: false,
          image_ids: uploadedImageIds,
          video_url: form.videoUrl || "",
          variant: form.color || "Standard",
          fuel: form.fuel,
          type: "SUV (5 Seater)",
          badge: "New",
        };

        // 3. Save listing in Appwrite Database
        await databases.createDocument(
          DB_ID,
          CARS_COLLECTION_ID,
          ID.unique(),
          data
        );

        setSubmitted(true);
      } catch (err: any) {
        console.error("Appwrite submit error:", err);
        setError(err.message || "Submission failed. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  const prevStep = () => step > 1 && setStep(step - 1);

  // Filter makes matching makeSearch
  const makesList = Object.keys(BRAND_MODELS_DATA).filter((m) =>
    m.toLowerCase().includes(makeSearch.toLowerCase())
  );

  // Filter models of selected make matching modelSearch
  const modelsList = form.make
    ? BRAND_MODELS_DATA[form.make]?.filter((m) =>
        m.toLowerCase().includes(modelSearch.toLowerCase())
      ) || []
    : [];

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-emerald-50 text-emerald-600"
        >
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </motion.div>
        <h2 className="text-3xl font-extrabold mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
          Listing Submitted!
        </h2>
        <p className="text-base text-gray-500 mb-8 leading-relaxed">
          Our team will verify your listing within 24 hours. We will contact you at{" "}
          <strong className="text-gray-900">{form.email || form.phone}</strong>.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setForm({
              make: "",
              model: "",
              year: "",
              vin: "",
              price: "",
              mileage: "",
              color: "",
              description: "",
              transmission: "Automatic",
              fuel: "Petrol",
              condition: "Excellent",
              videoUrl: "",
              images: [],
              name: "",
              email: "",
              phone: "",
              city: "Kathmandu, Nepal",
            });
            setMakeSearch("");
            setModelSearch("");
          }}
          className="px-8 py-3.5 rounded-full font-bold text-white btn-press shadow-lg shadow-red-500/20"
          style={{ background: "var(--color-primary)" }}
        >
          Submit Another Listing
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* ── Inline Error Banner ────────────────────────────────────── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px] mt-0.5 shrink-0 text-red-500">error</span>
          <div className="flex-1">
            <p className="font-bold mb-0.5">Submission failed</p>
            <p className="text-red-600/80">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="ml-2 shrink-0 rounded-full p-1 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </motion.div>
      )}

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
          Sell Your Vehicle
        </h1>
        <p className="text-gray-500 text-base">List your car in minutes. Reach thousands of verified buyers in Nepal.</p>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-12 px-2">
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full" />
        <motion.div
          className="absolute top-5 left-0 h-1 bg-red-600 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-10 flex justify-between">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => s.id < step && setStep(s.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                  s.id <= step ? "text-white bg-red-600" : "text-gray-400 bg-white"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {s.id < step ? "check" : s.icon}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                  s.id <= step ? "text-red-600" : "text-gray-400"
                }`}
                style={{ fontFamily: "JetBrains Mono" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Searchable Brand Select */}
                <div className="relative" ref={makeRef}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Vehicle Make
                  </label>
                  <div
                    onClick={() => setShowMakeDropdown(true)}
                    className="flex justify-between items-center w-full p-4 rounded-2xl bg-gray-50 text-sm font-bold cursor-pointer"
                  >
                    <span className={form.make ? "text-gray-900" : "text-gray-400"}>
                      {form.make || "Search & Select Make"}
                    </span>
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">
                      expand_more
                    </span>
                  </div>
                  {showMakeDropdown && (
                    <div className="absolute left-0 right-0 mt-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 space-y-2">
                      <input
                        type="text"
                        placeholder="Type to search..."
                        value={makeSearch}
                        onChange={(e) => setMakeSearch(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-100 rounded-xl outline-none focus:border-red-500 bg-gray-50"
                        autoFocus
                      />
                      <div className="max-h-40 overflow-y-auto no-scrollbar space-y-1">
                        {makesList.map((m) => (
                          <div
                            key={m}
                            onClick={() => {
                              setForm((f) => ({ ...f, make: m, model: "" }));
                              setShowMakeDropdown(false);
                              setMakeSearch("");
                              setModelSearch("");
                            }}
                            className="px-3 py-2 text-xs font-bold rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-gray-900"
                          >
                            {m}
                          </div>
                        ))}
                        {makesList.length === 0 && (
                          <div className="px-3 py-2 text-xs text-gray-400 italic">No makes found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Searchable Model Select */}
                <div className="relative" ref={modelRef}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Model
                  </label>
                  <div
                    onClick={() => form.make && setShowModelDropdown(true)}
                    className={`flex justify-between items-center w-full p-4 rounded-2xl text-sm font-bold cursor-pointer ${
                      form.make ? "bg-gray-50 cursor-pointer" : "bg-gray-100/50 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span className={form.model ? "text-gray-900" : "text-gray-400"}>
                      {form.model || (form.make ? "Search & Select Model" : "Select make first")}
                    </span>
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">
                      expand_more
                    </span>
                  </div>
                  {showModelDropdown && form.make && (
                    <div className="absolute left-0 right-0 mt-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 space-y-2">
                      <input
                        type="text"
                        placeholder="Type to search..."
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-gray-100 rounded-xl outline-none focus:border-red-500 bg-gray-50"
                        autoFocus
                      />
                      <div className="max-h-40 overflow-y-auto no-scrollbar space-y-1">
                        {modelsList.map((m) => (
                          <div
                            key={m}
                            onClick={() => {
                              set("model", m);
                              setShowModelDropdown(false);
                              setModelSearch("");
                            }}
                            className="px-3 py-2 text-xs font-bold rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-gray-900"
                          >
                            {m}
                          </div>
                        ))}
                        {/* Custom model input option */}
                        <div
                          onClick={() => {
                            if (modelSearch.trim()) {
                              set("model", modelSearch.trim());
                              setShowModelDropdown(false);
                              setModelSearch("");
                            }
                          }}
                          className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-gray-50 cursor-pointer italic"
                        >
                          Use custom: "{modelSearch || 'Type here'}"
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Make Year Select */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Make Year
                  </label>
                  <select
                    value={form.year}
                    onChange={(e) => set("year", e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm font-bold outline-none transition-all focus:bg-white focus:shadow-md"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 20 }, (_, i) => 2025 - i).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* VIN Number */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    VIN Number
                  </label>
                  <input
                    value={form.vin}
                    onChange={(e) => set("vin", e.target.value)}
                    placeholder="17-character VIN (Optional)"
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md font-bold"
                  />
                </div>

                {/* Asking Price (NPR) */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Asking Price (NPR / Rs.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-500 font-extrabold text-sm">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => set("price", e.target.value)}
                      placeholder="e.g. 4,500,000"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md font-extrabold"
                    />
                  </div>
                  {form.price && (
                    <p className="text-right text-[10px] font-bold text-gray-400 mt-1">
                      NPR Rs. {Number(form.price).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                      Mileage (km)
                    </label>
                    <input
                      value={form.mileage}
                      onChange={(e) => set("mileage", e.target.value)}
                      type="number"
                      placeholder="e.g. 45000"
                      className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                      Exterior Color
                    </label>
                    <input
                      value={form.color}
                      onChange={(e) => set("color", e.target.value)}
                      placeholder="e.g. Candy White"
                      className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={5}
                    placeholder="Describe the condition, ownership, service history at authorized service centers in Nepal..."
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none resize-none transition-all focus:bg-white focus:shadow-md"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Transmission", key: "transmission", opts: ["Automatic", "Manual"] },
                    { label: "Fuel Type", key: "fuel", opts: ["Petrol", "Diesel", "Electric", "Hybrid"] },
                    { label: "Condition", key: "condition", opts: ["Mint", "Excellent", "Good", "Fair"] },
                  ].map((f) => (
                    <div key={f.key} className="p-4 rounded-2xl bg-gray-50 flex flex-col justify-center">
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                        {f.label}
                      </label>
                      <select
                        value={(form as any)[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-semibold outline-none cursor-pointer p-0"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {f.opts.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-2xl p-12 text-center transition-all cursor-pointer bg-gray-50 hover:bg-gray-100/50 group flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[28px] text-red-600">cloud_upload</span>
                  </div>
                  <h3 className="font-extrabold text-lg mb-1" style={{ fontFamily: "Hanken Grotesk" }}>
                    Drag &amp; Drop Vehicle Photos
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 max-w-sm">
                    High-resolution photos increase conversions. Add interior and exterior shots. Up to 15 images.
                  </p>
                  <button
                    className="px-6 py-2.5 rounded-full font-bold text-white btn-press bg-blue-600 hover:bg-blue-700 transition-colors text-xs"
                    type="button"
                  >
                    Browse Files
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    External Video URL (YouTube, Facebook, etc.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    </span>
                    <input
                      value={form.videoUrl}
                      onChange={(e) => set("videoUrl", e.target.value)}
                      placeholder="e.g. YouTube walkaround video link"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "e.g. Siddhartha Thapa" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "siddhartha@example.com" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "e.g. +977 9851000000" },
                    { label: "Location (City)", key: "city", type: "text", placeholder: "e.g. Kathmandu, Lalitpur, Pokhara" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        value={(form as any)[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md font-bold"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 text-blue-900 shadow-sm">
                  <span className="material-symbols-outlined text-[22px] mt-0.5 text-blue-600">verified_user</span>
                  <div>
                    <p className="font-extrabold text-sm">RK Security Verification</p>
                    <p className="text-xs mt-0.5 text-blue-800 leading-relaxed">
                      Your listing details will be verified by RK Auto Center representatives before public activation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 pt-6 flex justify-between items-center" style={{ borderTop: "1px solid var(--color-surface-container)" }}>
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-1.5 font-bold text-sm transition-colors btn-press text-gray-500 hover:text-gray-900 disabled:opacity-0"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={loading || (step === 1 && (!form.make || !form.model || !form.year || !form.price))}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white btn-press transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
            style={{
              background: step === STEPS.length ? "var(--color-tertiary-container)" : "var(--color-primary)",
              boxShadow: step === STEPS.length ? "0 8px 24px rgba(0, 104, 71, 0.2)" : "0 8px 24px rgba(186, 0, 19, 0.2)",
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Publishing...</span>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                {step === STEPS.length ? "Publish Advert" : "Next Step"}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "help", color: "text-blue-600 bg-blue-50", title: "Dealer Support", desc: "Our dealer support team in Kathmandu is available to help you list your vehicle." },
          { icon: "trending_up", color: "text-emerald-600 bg-emerald-50", title: "Local Market Data", desc: "We cross-reference pricing with live Nepalese auto market trends." },
          { icon: "shield", color: "text-red-600 bg-red-50", title: "Trust Verified", desc: "Every advert undergoes verified verification checks before listing." },
        ].map((card) => (
          <div key={card.title} className="p-6 rounded-3xl bg-white shadow-sm flex flex-col items-start hover:shadow-md transition-all duration-300">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${card.color}`}>
              <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
            </div>
            <h5 className="font-extrabold text-base mb-1 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>{card.title}</h5>
            <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
