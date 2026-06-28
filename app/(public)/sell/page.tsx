"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: 1, label: "Basic Info", icon: "info" },
  { id: 2, label: "Details", icon: "tune" },
  { id: 3, label: "Photos & Video", icon: "photo_camera" },
  { id: 4, label: "Contact", icon: "person" },
];

const MAKES = ["Select Make", "BMW", "Mercedes-Benz", "Audi", "Porsche", "Range Rover", "Lexus", "Ferrari", "MINI", "Toyota", "Honda"];

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    make: "", model: "", year: "", vin: "",
    mileage: "", color: "", description: "", transmission: "Automatic", fuel: "Petrol", condition: "Excellent",
    videoUrl: "", images: [] as File[],
    name: "", email: "", phone: "", city: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const nextStep = () => {
    if (step < STEPS.length) setStep(step + 1);
    else setSubmitted(true);
  };
  const prevStep = () => step > 1 && setStep(step - 1);

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
        <h2 className="text-3xl font-extrabold mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>Advert Submitted!</h2>
        <p className="text-base text-gray-500 mb-8 leading-relaxed">
          Our team will review your listing within 24 hours. We'll contact you at <strong className="text-gray-900">{form.email}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(1); }}
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
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-3 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
          Sell Your Vehicle
        </h1>
        <p className="text-gray-500 text-base">List your car in minutes. Reach thousands of verified buyers.</p>
      </div>

      {/* Progress bar without borders */}
      <div className="relative mb-12 px-2">
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full" />
        <motion.div
          className="absolute top-5 left-0 h-1 bg-red-600 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-10 flex justify-between">
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => s.id < step && setStep(s.id)}>
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

      {/* Form card - Borderless with elevation */}
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
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Vehicle Make
                  </label>
                  <select
                    value={form.make}
                    onChange={(e) => set("make", e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {MAKES.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Model
                  </label>
                  <input
                    value={form.model}
                    onChange={(e) => set("model", e.target.value)}
                    placeholder="e.g. 911 Carrera"
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    Year
                  </label>
                  <input
                    value={form.year}
                    onChange={(e) => set("year", e.target.value)}
                    type="number"
                    placeholder="2024"
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    VIN Number
                  </label>
                  <input
                    value={form.vin}
                    onChange={(e) => set("vin", e.target.value)}
                    placeholder="17-character VIN"
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  />
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
                      placeholder="0"
                      className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                      Exterior Color
                    </label>
                    <input
                      value={form.color}
                      onChange={(e) => set("color", e.target.value)}
                      placeholder="e.g. Obsidian Black"
                      className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
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
                    placeholder="Describe the condition, service history, and any upgrades..."
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none resize-none transition-all focus:bg-white focus:shadow-md"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Transmission", key: "transmission", opts: ["Automatic", "Manual"] },
                    { label: "Fuel", key: "fuel", opts: ["Petrol", "Diesel", "Electric", "Hybrid"] },
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
                        {f.opts.map((o) => <option key={o}>{o}</option>)}
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
                    High-resolution photos increase conversions by 40%. Up to 15 images.
                  </p>
                  <button className="px-6 py-2.5 rounded-full font-bold text-white btn-press bg-blue-600 hover:bg-blue-700 transition-colors text-xs" type="button">
                    Browse Files
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                    External Video URL (Facebook, YouTube, etc.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    </span>
                    <input
                      value={form.videoUrl}
                      onChange={(e) => set("videoUrl", e.target.value)}
                      placeholder="https://www.facebook.com/watch/?v=... or YouTube URL"
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
                    { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "john@example.com" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+1 (555) 000-0000" },
                    { label: "Location (City)", key: "city", type: "text", placeholder: "Kathmandu, Nepal" },
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
                        className="w-full p-4 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 text-blue-900 shadow-sm">
                  <span className="material-symbols-outlined text-[22px] mt-0.5 text-blue-600">verified_user</span>
                  <div>
                    <p className="font-extrabold text-sm">Data Privacy Assurance</p>
                    <p className="text-xs mt-0.5 text-blue-800 leading-relaxed">
                      Your contact details are encrypted and only shared with verified buyers.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation - borderless line layout */}
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
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white btn-press transition-all shadow-lg"
            style={{
              background: step === STEPS.length ? "var(--color-tertiary-container)" : "var(--color-primary)",
              boxShadow: step === STEPS.length ? "0 8px 24px rgba(0, 104, 71, 0.2)" : "0 8px 24px rgba(186, 0, 19, 0.2)",
            }}
          >
            {step === STEPS.length ? "Publish Advert" : "Next Step"}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Help cards - Borderless rounded layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "help", color: "text-blue-600 bg-blue-50", title: "Need Help?", desc: "Our dealer support team is available 24/7 to help you list your vehicle." },
          { icon: "trending_up", color: "text-emerald-600 bg-emerald-50", title: "Pricing Insights", desc: "We provide live market data to ensure your vehicle is priced competitively." },
          { icon: "shield", color: "text-red-600 bg-red-50", title: "Trust Verified", desc: "Every advert undergoes a 20-point quality check before going live." },
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
