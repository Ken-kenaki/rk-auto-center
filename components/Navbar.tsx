"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"buy" | "sell" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (menu: "buy" | "sell") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  return (
    <>
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl"
        onMouseLeave={handleMouseLeave}
      >
        {/* Navbar Pill */}
        <nav
          className={`flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-xl"
              : "bg-white/75 backdrop-blur-md shadow-lg"
          }`}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8.5 h-8.5 rounded-xl flex items-center justify-center text-white shadow-md shadow-red-500/20"
              style={{ background: "var(--color-primary)" }}
            >
              <span className="material-symbols-outlined text-[20px]">directions_car</span>
            </div>
            <span
              className="font-extrabold text-[19px] leading-none tracking-tight"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              RK Auto
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Buy Tab Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("buy")}
            >
              <button
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  pathname.startsWith("/buy")
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
                }`}
                style={pathname.startsWith("/buy") ? { background: "var(--color-primary)" } : {}}
              >
                Buy
                <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${activeMenu === "buy" ? "rotate-180" : ""}`}>
                  keyboard_arrow_down
                </span>
              </button>
            </div>

            {/* Sell Tab Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("sell")}
            >
              <button
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  pathname.startsWith("/sell")
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
                }`}
                style={pathname.startsWith("/sell") ? { background: "var(--color-primary)" } : {}}
              >
                Sell
                <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${activeMenu === "sell" ? "rotate-180" : ""}`}>
                  keyboard_arrow_down
                </span>
              </button>
            </div>

            {/* Compare */}
            <Link
              href="/compare"
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                pathname === "/compare"
                  ? "text-white"
                  : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
              }`}
              style={pathname === "/compare" ? { background: "var(--color-primary)" } : {}}
            >
              Compare
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/buy"
              className="p-2 rounded-full transition-colors hover:bg-[var(--color-surface-container)] text-[var(--color-on-surface)]"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </Link>
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-sm text-white btn-press transition-all shadow-md shadow-red-500/10 hover:shadow-lg"
              style={{ background: "var(--color-primary)" }}
            >
              <span className="material-symbols-outlined text-[18px]">account_circle</span>
              Login
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-[var(--color-surface-container)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeMenu === "buy" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => handleMouseEnter("buy")}
              className="absolute left-0 top-[110%] w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Column 1: Cars for Sale */}
              <div className="md:col-span-4 flex flex-col gap-4 text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">Cars for Sale</h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Shop All", href: "/buy" },
                    { label: "New Cars", href: "/buy?condition=New" },
                    { label: "Used Cars", href: "/buy?condition=Used" },
                    { label: "Certified Pre-Owned Cars", href: "/buy?condition=Certified" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-base font-bold text-gray-800 hover:text-red-600 transition-colors flex items-center justify-between group"
                    >
                      {item.label}
                      <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-red-600">
                        arrow_forward
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Popular Categories */}
              <div className="md:col-span-4 flex flex-col gap-4 text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">Popular Categories</h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: "Trucks", href: "/buy?bodyType=Truck" },
                    { label: "SUVs", href: "/buy?bodyType=SUV" },
                    { label: "Electric Cars", href: "/buy?fuel=Electric" },
                    { label: "Hybrid Cars", href: "/buy?fuel=Hybrid" },
                    { label: "Cheap Cars", href: "/buy?sort=price-asc" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-base font-bold text-gray-800 hover:text-red-600 transition-colors flex items-center justify-between group"
                    >
                      {item.label}
                      <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-red-600">
                        arrow_forward
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Blog/Featured on the right */}
              <div className="md:col-span-4 bg-gray-50 rounded-2xl p-4 flex flex-col justify-between hover:bg-gray-100/80 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=400"
                      alt="Featured Buying Guide"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 font-mono">Featured Guide</span>
                  <h5 className="font-extrabold text-base text-gray-900 leading-snug">
                    How to Inspect a Used Car Before Buying
                  </h5>
                  <p className="text-xs text-gray-600">
                    A comprehensive checklist to avoid costly surprises before signing the title.
                  </p>
                </div>
                <Link
                  href="/buy"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:gap-2.5 transition-all"
                >
                  Explore Inventory
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          )}

          {activeMenu === "sell" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => handleMouseEnter("sell")}
              className="absolute left-0 top-[110%] w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Column 1: Selling Resources */}
              <div className="md:col-span-8 flex flex-col gap-4 text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">Selling Resources</h4>
                <div className="flex flex-col gap-3 max-w-md">
                  {[
                    { label: "Sell Your Car", desc: "Create a listings card and list your vehicle on our marketplace.", href: "/sell" },
                    { label: "Track Your Car's Value", desc: "Understand real-time valuation for high-performance cars.", href: "/sell" },
                    { label: "How to Sell Your Car", desc: "A guide detailing transfer documents and transaction support.", href: "/sell" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex flex-col gap-0.5 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors flex items-center gap-1.5">
                        {item.label}
                        <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-red-600">
                          arrow_forward
                        </span>
                      </span>
                      <span className="text-xs text-gray-600">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Featured Guide */}
              <div className="md:col-span-4 bg-gray-50 rounded-2xl p-4 flex flex-col justify-between hover:bg-gray-100/80 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400"
                      alt="Featured Selling Guide"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 font-mono">Featured Guide</span>
                  <h5 className="font-extrabold text-base text-gray-900 leading-snug">
                    How to Sell Your Used Car
                  </h5>
                  <p className="text-xs text-gray-600">
                    Get the maximum value for your vehicle with our step-by-step listing checklist.
                  </p>
                </div>
                <Link
                  href="/sell"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:gap-2.5 transition-all"
                >
                  Create Listing
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="md:hidden mt-2 rounded-2xl overflow-hidden shadow-xl"
            style={{
              background: "var(--color-surface-container-lowest)",
            }}
          >
            {[
              { label: "Buy Cars", href: "/buy" },
              { label: "Sell Your Car", href: "/sell" },
              { label: "Compare Cars", href: "/compare" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-6 py-4 text-sm font-semibold border-b transition-colors hover:bg-[var(--color-surface-container-low)]"
                style={{
                  color: pathname === link.href ? "var(--color-primary)" : "var(--color-on-surface)",
                  borderColor: "var(--color-outline-variant)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-white"
              style={{ background: "var(--color-primary)" }}
            >
              <span className="material-symbols-outlined text-[18px]">account_circle</span>
              Login / Sign up
            </Link>
          </div>
        )}
      </header>

      {/* Spacer so content isn't hidden behind fixed navbar */}
      <div className="h-20" />
    </>
  );
}
