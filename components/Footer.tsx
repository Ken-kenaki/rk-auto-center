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
              <Image
                src="/logo.png"
                alt="RK Auto Mobiles Logo"
                width={44}
                height={44}
                className="rounded-xl"
              />
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
                href="https://www.facebook.com/rkautocenter1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://wa.me/9779847699255"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.903-6.99C16.564 1.87 14.098.835 11.465.835c-5.437 0-9.86 4.423-9.865 9.865-.001 1.743.486 3.447 1.411 4.951L1.936 21.68l6.102-1.602c1.479.807 3.122 1.233 4.792 1.234h.001zM17.51 14.88c-.3-.15-1.775-.875-2.05-1.001-.275-.125-.475-.188-.675.112-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.002-.894-1.74-2.004-1.938-2.34-.198-.337-.021-.52.128-.688.135-.15.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.525.714.31 1.27.495 1.702.633.717.227 1.37.195 1.887.118.577-.087 1.774-.725 2.025-1.425.25-.7.25-1.3 1.75-1.425-.075-.125-.275-.225-.575-.375z" />
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
                  <a href="tel:+9779847699255" className="hover:text-white transition-colors font-semibold">
                    +977 9847699255
                  </a>
                  <a href="tel:+9779802008796" className="hover:text-white transition-colors font-semibold">
                    +977 9802008796
                  </a>
                  <a href="tel:+9779802008797" className="hover:text-white transition-colors font-semibold">
                    +977 9802008797
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
