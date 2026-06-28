"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/dashboard/cars", label: "Cars", icon: "directions_car" },
  { href: "/dashboard/leads", label: "Leads", icon: "forum" },
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

  const Sidebar = () => (
    <nav className="flex flex-col h-full" style={{ background: "var(--color-inverse-surface)" }}>
      {/* Brand */}
      <div className="px-6 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-primary)" }}>
          <span className="material-symbols-outlined text-[20px] text-white">directions_car</span>
        </div>
        <div>
          <p className="font-extrabold text-sm leading-none text-white" style={{ fontFamily: "Hanken Grotesk" }}>RK Auto</p>
          <p className="text-[10px] mt-0.5 font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Admin Panel</p>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              style={active ? { background: "var(--color-primary)" } : {}}>
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all mb-1">
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          View Website
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign Out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--color-surface-container-low)" }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 flex-shrink-0 h-full">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-60 flex-shrink-0 flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b" style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-container)] transition-colors" onClick={() => setSidebarOpen(true)}>
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <h1 className="font-bold text-base" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}>
              {NAV.find((n) => n.href === pathname || (n.href !== "/dashboard" && pathname.startsWith(n.href)))?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "var(--color-primary)" }}>
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
