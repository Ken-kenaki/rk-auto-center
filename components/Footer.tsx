import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--color-inverse-surface)", color: "var(--color-inverse-on-surface)" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-primary)] text-white">
                <span className="material-symbols-outlined text-[18px]">directions_car</span>
              </div>
              <span
                className="font-bold text-lg tracking-tight text-white"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                RK Auto Mobiles
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              Premium automotive marketplace for high-quality vehicles and certified history reports.
            </p>
            <div className="flex gap-3 mt-5">
              {["facebook", "instagram", "youtube"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  aria-label={icon}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {icon === "facebook" ? "thumb_up" : icon === "instagram" ? "camera_alt" : "play_circle"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Platform</p>
            <ul className="space-y-3">
              {["Buy a Car", "Sell Your Car", "Compare Vehicles", "Login"].map((label) => {
                const paths: Record<string, string> = {
                  "Buy a Car": "/buy",
                  "Sell Your Car": "/sell",
                  "Compare Vehicles": "/compare",
                  Login: "/login",
                };
                return (
                  <li key={label}>
                    <Link
                      href={paths[label]}
                      className="text-sm opacity-70 hover:opacity-100 hover:text-[var(--color-tertiary-fixed)] transition-all"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Support</p>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Dealer Portal", "Contact Support"].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-sm opacity-70 hover:opacity-100 hover:text-[var(--color-tertiary-fixed)] transition-all"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-40"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>© {year} RK Auto Mobiles. Precision Engineering. High-Performance Service.</p>
          <p style={{ fontFamily: "JetBrains Mono" }}>Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
