"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { useContact } from "@/context/ContactContext";

import { MOCK_CARS } from "@/lib/cars";

export default function Navbar() {
  const { isOpen, openContactModal } = useContact();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"buy" | "sell" | "about" | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof MOCK_CARS>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/buy?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  const toggleSearch = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setMobileOpen(false);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      if (searchQuery.trim()) {
        router.push(`/buy?search=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false);
        setSearchQuery("");
      } else {
        setIsSearchOpen(false);
      }
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (menu: "buy" | "sell" | "about") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const { compareCount } = useCompare();

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
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="RK Auto Center Logo"
              width={34}
              height={34}
              priority
              className="h-8.5 w-auto object-contain flex-shrink-0"
            />
            <AnimatePresence>
              {!isSearchOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-extrabold text-[19px] leading-none tracking-tight whitespace-nowrap overflow-hidden inline-block"
                  style={{ fontFamily: "Hanken Grotesk", color: "var(--color-primary)" }}
                >
                  RK Auto Center
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Buy Tab Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("buy")}
            >
              <Link
                href="/buy"
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  pathname.startsWith("/buy")
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
                }`}
                style={pathname.startsWith("/buy") ? { background: "var(--color-primary)" } : {}}
              >
                Buy
              </Link>
            </div>

            {/* Sell Tab Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("sell")}
            >
              <Link
                href="/sell"
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  pathname.startsWith("/sell")
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
                }`}
                style={pathname.startsWith("/sell") ? { background: "var(--color-primary)" } : {}}
              >
                Sell
              </Link>
            </div>

            {/* Compare */}
            <Link
              id="navbar-compare-link"
              href="/compare"
              className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                pathname === "/compare"
                  ? "text-white"
                  : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
              }`}
              style={pathname === "/compare" ? { background: "var(--color-primary)" } : {}}
            >
              Compare
              {/* Animated count badge */}
              <AnimatePresence>
                {compareCount > 0 && (
                  <motion.span
                    key={compareCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black shadow-sm"
                    style={
                      pathname === "/compare"
                        ? { background: "rgba(255,255,255,0.25)", color: "#fff", minWidth: "1.25rem" }
                        : { background: "var(--color-primary)", color: "#fff", minWidth: "1.25rem" }
                    }
                  >
                    {compareCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* About Us Tab Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
            >
              <Link
                href="/about"
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  pathname.startsWith("/about")
                    ? "text-white bg-[var(--color-primary)]"
                    : "text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
                }`}
                style={pathname.startsWith("/about") ? { background: "var(--color-primary)" } : {}}
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Expandable Search Input */}
            <div ref={searchContainerRef} className="relative flex items-center">
              <motion.div
                initial={false}
                animate={{ width: isSearchOpen ? (isMobile ? 180 : 240) : 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex items-center rounded-full bg-[var(--color-surface-container)] overflow-hidden h-10"
              >
                <button
                  onClick={toggleSearch}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] flex-shrink-0"
                  aria-label="Search"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search cars..."
                  className="w-full bg-transparent text-sm font-semibold outline-none border-none pr-4 text-[var(--color-on-surface)] placeholder-gray-400"
                  style={{ display: isSearchOpen ? "block" : "none" }}
                />
              </motion.div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[calc(100%+8px)] w-72 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60] p-2"
                  >
                    {searchResults.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {searchResults.slice(0, 4).map((car) => (
                          <Link
                            key={car.id}
                            href={`/buy/${car.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-12 h-8 rounded-lg object-cover bg-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-gray-800 truncate">{car.name}</h4>
                              <p className="text-[10px] text-gray-500 truncate">{car.variant}</p>
                            </div>
                            <span className="text-xs font-black text-red-600">
                              Rs. {car.price.toLocaleString()}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1 text-center">
                          <Link
                            href={`/buy?search=${encodeURIComponent(searchQuery)}`}
                            onClick={closeSearch}
                            className="text-[11px] font-bold text-red-600 hover:text-red-700 transition-colors block py-1"
                          >
                            View all results for "{searchQuery}"
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-400 text-xs">
                        <span className="material-symbols-outlined block text-lg mb-0.5">search_off</span>
                        No matching vehicles
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="hidden sm:inline-block relative">
              <AnimatePresence initial={false}>
                {!isOpen && (
                  <motion.div className="relative">
                    <motion.div
                      style={{ borderRadius: "9999px" }}
                      layout
                      layoutId="navbar-contact-card"
                      className="absolute inset-0 bg-[#ba0013] transform-gpu will-change-transform"
                    />
                    <motion.a
                      href="tel:+9779847699255"
                      layout={false}
                      className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-sm text-white hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      Call Now
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Mobile hamburger */}
            <button
              id="mobile-menu-button"
              className="md:hidden p-2 rounded-full hover:bg-[var(--color-surface-container)] relative"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileOpen ? "close" : "menu"}
              </span>
              <AnimatePresence>
                {compareCount > 0 && (
                  <motion.span
                    key={compareCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black text-white shadow-sm z-20"
                    style={{ background: "var(--color-primary)", minWidth: "1.25rem" }}
                  >
                    {compareCount}
                  </motion.span>
                )}
              </AnimatePresence>
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

          {activeMenu === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => handleMouseEnter("about")}
              className="absolute left-0 top-[110%] w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Column 1: Sections */}
              <div className="md:col-span-8 flex flex-col gap-4 text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">About Our Company</h4>
                <div className="flex flex-col gap-3 max-w-md">
                  {[
                    { label: "Company Profile", desc: "Discover our story, mission, and the legacy of RK Auto Center.", href: "/about#company-profile" },
                    { label: "Why Us", desc: "Understand our 150-point inspection and bespoke concierge services.", href: "/about#why-us" },
                    { label: "Clients Testimonials", desc: "Read honest feedback and reviews from our luxury car buyers.", href: "/about#testimonials" },
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

              {/* Column 2: Showroom image on the right */}
              <div className="md:col-span-4 bg-gray-50 rounded-2xl p-4 flex flex-col justify-between hover:bg-gray-100/80 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400"
                      alt="Featured Showroom"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 font-mono">Our Showroom</span>
                  <h5 className="font-extrabold text-base text-gray-900 leading-snug">
                    Visit RK Auto Center
                  </h5>
                  <p className="text-xs text-gray-600">
                    Experience our handpicked selection of supercars and luxury SUVs in person.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:gap-2.5 transition-all"
                >
                  Learn More About Us
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden mt-2 rounded-2xl overflow-hidden shadow-2xl border border-red-100 bg-white/95 backdrop-blur-md"
            >
              <div className="p-3.5 space-y-1">
                {[
                  { label: "Buy Cars", href: "/buy", icon: "directions_car" },
                  { label: "Sell Your Car", href: "/sell", icon: "sell" },
                  { label: "Compare Cars", href: "/compare", icon: "compare_arrows" },
                  { label: "About Us", href: "/about", icon: "info" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-red-50/50 hover:text-[#ba0013]"
                    style={{
                      color: pathname === link.href ? "var(--color-primary)" : "var(--color-on-surface)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] opacity-75">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    {link.href === "/compare" && compareCount > 0 && (
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black text-white shadow-sm"
                        style={{ background: "var(--color-primary)", minWidth: "1.25rem" }}
                      >
                        {compareCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              <div className="p-3.5 border-t border-red-50/50 bg-red-50/20">
                <a
                  href="tel:+9779847699255"
                  onClick={() => {
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-sm text-white w-full bg-[#ba0013] hover:bg-[#a0000f] active:scale-98 transition-all cursor-pointer shadow-md shadow-red-900/10 text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content isn't hidden behind fixed navbar */}
      <div className="h-20" />
    </>
  );
}
