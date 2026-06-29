import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a2e] text-gray-300 pt-16 pb-8 relative overflow-hidden">

      {/* ── Decorative Background Layers ── */}

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Radial glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Road silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600/30 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* ─ Brand Info ─ */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-600 text-white shadow-lg shadow-red-600/20">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
              </div>
              <span
                className="font-bold text-lg tracking-tight text-white"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                RK Auto Mobiles
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mt-4">
              Premium automotive marketplace for high-quality vehicles.
              Your trusted partner for buying, selling, and comparing cars in Nepal.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ─ Quick Links ─ */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6 flex items-center">
              <span className="w-1.5 h-3 bg-red-600 rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { label: "Home", href: "/" },
                { label: "Buy a Car", href: "/buy" },
                { label: "Sell Your Car", href: "/sell" },
                { label: "Compare Vehicles", href: "/compare" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Popular Brands ─ */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6 flex items-center">
              <span className="w-1.5 h-3 bg-amber-500 rounded-full mr-2"></span>
              Popular Brands
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Toyota", "Hyundai", "Suzuki", "Kia", "Volkswagen", "Honda"].map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/buy?make=${encodeURIComponent(brand)}`}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Contact Info ─ */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6 flex items-center">
              <span className="w-1.5 h-3 bg-emerald-500 rounded-full mr-2"></span>
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5 flex-shrink-0">
                  location_on
                </span>
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5 flex-shrink-0">
                  phone
                </span>
                <div className="flex flex-col text-sm text-gray-300">
                  <a href="tel:+9779800000000" className="hover:text-white transition-colors font-semibold">
                    +977 9800000000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5 flex-shrink-0">
                  mail
                </span>
                <a
                  href="mailto:info@rkautomobiles.com"
                  className="hover:text-white transition-colors text-gray-300"
                >
                  info@rkautomobiles.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5 flex-shrink-0">
                  schedule
                </span>
                <div className="text-gray-300">
                  <div className="font-medium">Sun–Fri: 10AM – 6PM</div>
                  <div className="text-xs text-gray-500">Sat: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-gray-500">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {year} RK Auto Mobiles. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a
                href="https://aesthera.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-white font-bold transition-colors hover:underline"
              >
                Aesthera
              </a>
            </p>
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-white hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white hover:underline transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
