"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { databases } from "@/lib/appwrite";
import { DB_ID, CARS_COLLECTION_ID, LEADS_COLLECTION_ID } from "@/lib/constants";
import { Query } from "appwrite";

interface CarDoc { $id: string; name: string; make: string; price: number; featured: boolean; }
interface LeadDoc { $id: string; name: string; status: string; $createdAt: string; }

/* ── tiny CSS bar chart ───────────────────────────────────── */
function BarChart({ data }: { data: { label: string; value: number; max: number }[] }) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-zinc-600">{item.label}</span>
            <span className="text-xs font-bold text-zinc-800 tabular-nums">{item.value}</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${item.max > 0 ? (item.value / item.max) * 100 : 0}%`,
                background: "linear-gradient(90deg, #dc2626, #f87171)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── donut chart (CSS only) ───────────────────────────────── */
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  if (total === 0) return <p className="text-xs text-zinc-400 text-center py-6">No data yet</p>;

  let cumulative = 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 100 100">
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dash = circumference * pct;
            const gap = circumference - dash;
            const offset = circumference * (1 - cumulative);
            cumulative += pct;
            return (
              <circle
                key={i}
                cx="50" cy="50" r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "all 0.6s ease" }}
              />
            );
          })}
          <text x="50" y="54" textAnchor="middle" fontSize="18" fontWeight="800" fill="#18181b">
            {total}
          </text>
        </svg>
      </div>
      <div className="w-full space-y-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: seg.color }} />
              <span className="text-xs text-zinc-500">{seg.label}</span>
            </div>
            <span className="text-xs font-bold text-zinc-700">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── stat card ────────────────────────────────────────────── */
function StatCard({ label, value, icon, delta }: { label: string; value: string | number; icon: string; delta?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px] text-zinc-600">{icon}</span>
        </div>
        {delta && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
            {delta}
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-zinc-900 tracking-tight" style={{ fontFamily: "Hanken Grotesk" }}>
        {value}
      </p>
      <p className="text-xs text-zinc-400 mt-1 font-medium">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalCars, setTotalCars] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [featured, setFeatured] = useState(0);
  const [recentCars, setRecentCars] = useState<CarDoc[]>([]);
  const [makeData, setMakeData] = useState<{ label: string; value: number; max: number }[]>([]);
  const [leadSegments, setLeadSegments] = useState<{ label: string; value: number; color: string }[]>([]);
  const [priceRanges, setPriceRanges] = useState<{ label: string; value: number; max: number }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [carsRes, leadsRes] = await Promise.all([
          databases.listDocuments(DB_ID, CARS_COLLECTION_ID, [Query.orderDesc("$createdAt"), Query.limit(100)]),
          databases.listDocuments(DB_ID, LEADS_COLLECTION_ID, [Query.orderDesc("$createdAt"), Query.limit(100)]),
        ]);

        const cars = carsRes.documents as unknown as (CarDoc & { price: number })[];
        const leads = leadsRes.documents as unknown as (LeadDoc & { status: string })[];

        setTotalCars(cars.length);
        setTotalLeads(leads.length);
        setFeatured(cars.filter((c) => c.featured).length);
        setRecentCars(cars.slice(0, 6));

        // ── Cars by make ──
        const makeCounts: Record<string, number> = {};
        cars.forEach((c) => { makeCounts[c.make] = (makeCounts[c.make] || 0) + 1; });
        const makeArr = Object.entries(makeCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([label, value]) => ({ label, value, max: 0 }));
        const makeMax = makeArr[0]?.value || 1;
        setMakeData(makeArr.map((x) => ({ ...x, max: makeMax })));

        // ── Lead status donut ──
        const statusMap: Record<string, number> = {};
        leads.forEach((l) => {
          const s = l.status === "pending" ? "New" : l.status || "New";
          statusMap[s] = (statusMap[s] || 0) + 1;
        });
        setLeadSegments([
          { label: "New", value: statusMap["New"] || 0, color: "#dc2626" },
          { label: "Contacted", value: statusMap["Contacted"] || 0, color: "#2563eb" },
          { label: "Closed", value: statusMap["Closed"] || 0, color: "#d1d5db" },
        ]);

        // ── Price range distribution ──
        const ranges = [
          { label: "< Rs 20L", min: 0, max: 2000000 },
          { label: "Rs 20–50L", min: 2000000, max: 5000000 },
          { label: "Rs 50–80L", min: 5000000, max: 8000000 },
          { label: "> Rs 80L", min: 8000000, max: Infinity },
        ];
        const priceCounts = ranges.map((r) => ({
          label: r.label,
          value: cars.filter((c) => c.price >= r.min && c.price < r.max).length,
          max: 0,
        }));
        const priceMax = Math.max(...priceCounts.map((r) => r.value), 1);
        setPriceRanges(priceCounts.map((r) => ({ ...r, max: priceMax })));
      } catch (err: any) {
        setError("Could not load dashboard data. Check your Appwrite connection.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-zinc-100" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-white rounded-2xl border border-zinc-100" />
          <div className="h-72 bg-white rounded-2xl border border-zinc-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 bg-amber-50 text-amber-700">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Listings" value={totalCars} icon="directions_car" delta="+Live" />
        <StatCard label="Total Leads" value={totalLeads} icon="forum" delta="+Live" />
        <StatCard label="Featured Cars" value={featured} icon="star" />
        <StatCard label="Conversion Rate" value={totalCars > 0 ? `${Math.round((totalLeads / totalCars) * 100)}%` : "0%"} icon="trending_up" />
      </div>

      {/* Recent listings + Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Recent cars */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50">
            <h2 className="font-bold text-sm text-zinc-800" style={{ fontFamily: "Hanken Grotesk" }}>
              Recent Listings
            </h2>
            <Link href="/dashboard/cars" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-zinc-50">
            {recentCars.length === 0 ? (
              <div className="py-12 text-center text-sm text-zinc-400">No listings yet.</div>
            ) : (
              recentCars.map((car) => (
                <div key={car.$id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-zinc-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-zinc-400">directions_car</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-800 truncate">{car.name}</p>
                    <p className="text-xs text-zinc-400">{car.make} · Rs {car.price.toLocaleString()}</p>
                  </div>
                  {car.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 flex-shrink-0">
                      ★ Featured
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="px-6 py-4 border-t border-zinc-50">
            <Link
              href="/dashboard/cars/new"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add New Listing
            </Link>
          </div>
        </div>

        {/* Analytics column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Lead status donut */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
            <h2 className="font-bold text-sm text-zinc-800 mb-4" style={{ fontFamily: "Hanken Grotesk" }}>
              Lead Status
            </h2>
            <DonutChart segments={leadSegments} />
          </div>

          {/* Price range */}
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
            <h2 className="font-bold text-sm text-zinc-800 mb-4" style={{ fontFamily: "Hanken Grotesk" }}>
              Inventory by Price
            </h2>
            <BarChart data={priceRanges} />
          </div>
        </div>
      </div>

      {/* Inventory by make */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <h2 className="font-bold text-sm text-zinc-800 mb-5" style={{ fontFamily: "Hanken Grotesk" }}>
          Inventory by Make
        </h2>
        {makeData.length === 0 ? (
          <p className="text-sm text-zinc-400">No listings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            {makeData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-zinc-600">{item.label}</span>
                  <span className="text-xs font-bold text-zinc-800 tabular-nums">{item.value}</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.max > 0 ? (item.value / item.max) * 100 : 0}%`,
                      background: "linear-gradient(90deg,#dc2626,#f87171)",
                      transition: "width 0.7s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/dashboard/cars/new", icon: "add_circle", label: "Add New Car", sub: "List a new vehicle" },
          { href: "/dashboard/leads", icon: "forum", label: "View Leads", sub: `${totalLeads} total inquiries` },
          { href: "/dashboard/settings", icon: "settings", label: "Settings", sub: "Configure your store" },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px] text-zinc-500">{a.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-zinc-800">{a.label}</p>
              <p className="text-xs text-zinc-400">{a.sub}</p>
            </div>
            <span className="ml-auto material-symbols-outlined text-[18px] text-zinc-300">chevron_right</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
