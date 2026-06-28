"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";

import CountingNumber from "@/components/CountingNumber";

const MAKES = ["Porsche", "Ferrari", "BMW", "Mercedes-Benz", "Audi", "Range Rover", "Lexus", "Toyota", "Honda"];
const MODELS: Record<string, string[]> = {
  Porsche: ["911 Carrera", "911 GT3", "Cayenne", "Taycan", "Panamera"],
  Ferrari: ["F8 Tributo", "SF90 Stradale", "812 Superfast", "Roma"],
  BMW: ["M3", "M5", "X5", "i7", "Series 8"],
  "Mercedes-Benz": ["G-Class", "S-Class", "AMG GT", "EQS"],
  Audi: ["e-tron GT", "R8", "RS6", "Q8"],
  "Range Rover": ["Sport", "Autobiography", "Vogue", "Velar"],
  Lexus: ["LC 500", "RX", "LS", "LX"],
  Toyota: ["Supra", "Land Cruiser", "Tundra"],
  Honda: ["NSX", "Civic Type R", "Accord"],
};

export default function HeroSection() {
  const router = useRouter();
  const [tab, setTab] = useState<"shop" | "sell">("shop");
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("Used");
  const [make, setMake] = useState("Porsche");
  const [model, setModel] = useState("911 GT3");
  const [distance, setDistance] = useState("50 miles");
  const [zip, setZip] = useState("44600");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "sell") {
      router.push("/sell");
    } else {
      const params = new URLSearchParams();
      if (query) params.set("search", query);
      if (make) params.set("make", make);
      if (condition) params.set("condition", condition);
      router.push(`/buy?${params.toString()}`);
    }
  };

  return (
    <section className="relative min-h-[640px] md:min-h-[750px] flex flex-col justify-between overflow-hidden bg-black -mt-20 pt-28 pb-12 px-6">
      {/* Background Cover */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Main card - Left Aligned with animation */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl text-left my-8"
        >
          <form onSubmit={handleSearch} className="p-7">
            <h2 className="text-2xl font-black tracking-tight mb-5" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}>
              Imagine the possibilities
            </h2>

            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100/80 p-1 rounded-full relative">
              <button
                type="button"
                onClick={() => setTab("shop")}
                className="flex-1 py-2 text-xs font-bold rounded-full transition-all relative z-10 cursor-pointer"
                style={{ color: tab === "shop" ? "white" : "var(--color-on-surface-variant)" }}
              >
                {tab === "shop" && (
                  <motion.div
                    layoutId="activeHeroTab"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "var(--color-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Shop cars for sale
              </button>
              <button
                type="button"
                onClick={() => setTab("sell")}
                className="flex-1 py-2 text-xs font-bold rounded-full transition-all relative z-10 cursor-pointer"
                style={{ color: tab === "sell" ? "white" : "var(--color-on-surface-variant)" }}
              >
                {tab === "sell" && (
                  <motion.div
                    layoutId="activeHeroTab"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "var(--color-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Sell your car
              </button>
            </div>

            <div className="min-h-[360px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {tab === "shop" ? (
                  <motion.div
                    key="shop-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Search query input */}
                    <div className="relative">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Try Porsche 911 GT3 or Ferrari..."
                        className="w-full bg-gray-50/80 rounded-2xl py-3.5 pl-6 pr-12 text-sm outline-none transition-all focus:bg-white focus:shadow-md border-none"
                        style={{ color: "var(--color-on-surface)" }}
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[20px]" style={{ color: "var(--color-on-surface-variant)" }}>
                        search
                      </span>
                    </div>

                    <div className="text-center text-[10px] font-bold uppercase tracking-widest my-3 text-gray-400 font-mono">
                      — Or search by —
                    </div>

                    {/* Filter Fields Box - Borderless design */}
                    <div className="rounded-2xl overflow-hidden divide-y divide-gray-100 bg-gray-50/80">
                      {/* New/Used dropdown */}
                      <div className="relative p-3 hover:bg-gray-100/50 transition-colors flex justify-between items-center">
                        <div className="flex-1">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">New/Used</label>
                          <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm font-semibold outline-none cursor-pointer focus:ring-0"
                            style={{ color: "var(--color-on-surface)" }}
                          >
                            <option>New</option>
                            <option>Used</option>
                            <option>Certified Pre-Owned</option>
                          </select>
                        </div>
                        <span className="material-symbols-outlined pointer-events-none text-gray-400">expand_more</span>
                      </div>

                      {/* Make dropdown */}
                      <div className="relative p-3 hover:bg-gray-100/50 transition-colors flex justify-between items-center">
                        <div className="flex-1">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">Make</label>
                          <select
                            value={make}
                            onChange={(e) => {
                              setMake(e.target.value);
                              setModel(MODELS[e.target.value]?.[0] || "");
                            }}
                            className="w-full bg-transparent border-none p-0 text-sm font-semibold outline-none cursor-pointer focus:ring-0"
                            style={{ color: "var(--color-on-surface)" }}
                          >
                            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <span className="material-symbols-outlined pointer-events-none text-gray-400">expand_more</span>
                      </div>

                      {/* Model dropdown */}
                      <div className="relative p-3 hover:bg-gray-100/50 transition-colors flex justify-between items-center">
                        <div className="flex-1">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">Model</label>
                          <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-sm font-semibold outline-none cursor-pointer focus:ring-0"
                            style={{ color: "var(--color-on-surface)" }}
                          >
                            {(MODELS[make] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <span className="material-symbols-outlined pointer-events-none text-gray-400">expand_more</span>
                      </div>

                      {/* Distance & ZIP */}
                      <div className="flex divide-x divide-gray-100">
                        <div className="w-2/3 p-3 hover:bg-gray-100/50 transition-colors flex justify-between items-center">
                          <div className="flex-1">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">Distance</label>
                            <select
                              value={distance}
                              onChange={(e) => setDistance(e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-sm font-semibold outline-none cursor-pointer focus:ring-0"
                              style={{ color: "var(--color-on-surface)" }}
                            >
                              <option>10 miles</option>
                              <option>25 miles</option>
                              <option>50 miles</option>
                              <option>100 miles</option>
                              <option>Nationwide</option>
                            </select>
                          </div>
                          <span className="material-symbols-outlined pointer-events-none text-gray-400">expand_more</span>
                        </div>

                        <div className="w-1/3 p-3 hover:bg-gray-100/50 transition-colors">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400">ZIP</label>
                          <input
                            type="text"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="ZIP"
                            className="w-full bg-transparent border-none p-0 text-sm font-semibold outline-none focus:ring-0"
                            style={{ color: "var(--color-on-surface)" }}
                          />
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
                    <h3 className="font-extrabold text-lg text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>Ready to list your vehicle?</h3>
                    <p className="text-sm text-gray-500 px-4 leading-relaxed">
                      List your car on our premium marketplace and reach thousands of verified high-end buyers.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-center text-white font-extrabold text-base transition-all mt-6 rounded-2xl hover:opacity-90 btn-press shadow-lg shadow-blue-500/20"
              style={{ background: "var(--color-secondary)" }}
            >
              {tab === "shop" ? "Show Matches" : "Go to Seller Portal"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom Accents Bar - Borderless feel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
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
