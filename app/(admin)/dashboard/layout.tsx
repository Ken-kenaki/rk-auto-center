"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/dashboard/cars", label: "Cars", icon: "directions_car" },
  { href: "/dashboard/sales", label: "Sales", icon: "sell" },
  { href: "/dashboard/leads", label: "Leads", icon: "forum" },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: "rate_review" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  const activeItem = NAV.find(
    (n) => n.href === pathname || (n.href !== "/dashboard" && pathname.startsWith(n.href))
  );

  const Sidebar = () => (
    <nav className="flex flex-col h-full" style={{ background: "#111111" }}>
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Image
          src="/logo.png"
          alt="RK Auto Center Logo"
          width={36}
          height={36}
          priority
          className="w-9 h-9 object-contain flex-shrink-0"
        />
        <div>
          <p className="font-extrabold text-sm leading-none text-white" style={{ fontFamily: "Hanken Grotesk" }}>
            RK Auto
          </p>
          <p className="text-[10px] mt-0.5 font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                active
                  ? { background: "rgba(255,255,255,0.1)", color: "#ffffff" }
                  : { color: "rgba(255,255,255,0.45)" }
              }
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
              {active && (
                <span
                  className="ml-auto w-1 h-4 rounded-full"
                  style={{ background: "#dc2626" }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
        >
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#fca5a5";
            (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0 h-full">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-56 flex-shrink-0 flex flex-col">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-zinc-100 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <div>
              <p className="font-bold text-sm text-zinc-800" style={{ fontFamily: "Hanken Grotesk" }}>
                {activeItem?.label ?? "Dashboard"}
              </p>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                RK Auto Center · Admin Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pathname !== "/dashboard/cars" && (
              <Link
                href="/dashboard/cars/new"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "#dc2626" }}
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                New Listing
              </Link>
            )}
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "#18181b" }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
