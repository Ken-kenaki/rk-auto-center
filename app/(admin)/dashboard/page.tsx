import Link from "next/link";

const STATS = [
  { label: "Total Listings", value: "24", icon: "directions_car", color: "var(--color-primary)", bg: "var(--color-primary-fixed)" },
  { label: "Active Leads", value: "8", icon: "forum", color: "var(--color-secondary)", bg: "var(--color-secondary-fixed)" },
  { label: "Featured Cars", value: "6", icon: "star", color: "var(--color-tertiary)", bg: "var(--color-tertiary-fixed)" },
  { label: "Total Views", value: "1,284", icon: "visibility", color: "var(--color-on-surface)", bg: "var(--color-surface-container)" },
];

const RECENT_CARS = [
  { name: "2024 Porsche 911", make: "Porsche", price: 145000, status: "Active", views: 344 },
  { name: "2023 Range Rover", make: "Range Rover", price: 162500, status: "Active", views: 198 },
  { name: "2022 Audi e-tron GT", make: "Audi", price: 105900, status: "Draft", views: 72 },
];

const RECENT_LEADS = [
  { name: "John Smith", email: "john@example.com", car: "2024 Porsche 911", status: "New" },
  { name: "Emily Johnson", email: "emily@example.com", car: "2023 Range Rover", status: "Contacted" },
  { name: "Michael Chang", email: "mchang@example.com", car: "2022 Audi e-tron GT", status: "New" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="p-5 rounded-3xl bg-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent listings */}
        <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h2 className="font-extrabold text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>Recent Listings</h2>
            <Link href="/dashboard/cars" className="text-xs font-bold text-red-600 hover:text-red-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_CARS.map((car) => (
              <div key={car.name} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">directions_car</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{car.name}</p>
                    <p className="text-xs text-gray-500">${car.price.toLocaleString()} · {car.views} views</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${car.status === "Active" ? "text-emerald-700 bg-emerald-50" : "text-gray-600 bg-gray-50"}`}>
                  {car.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h2 className="font-extrabold text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>Recent Leads</h2>
            <Link href="/dashboard/leads" className="text-xs font-bold text-red-600 hover:text-red-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_LEADS.map((lead) => (
              <div key={lead.email} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ background: "var(--color-secondary)" }}>
                    {lead.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.car}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${lead.status === "New" ? "text-red-600 bg-red-50" : "text-gray-500 bg-gray-50"}`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/dashboard/cars/new", icon: "add_circle", label: "Add New Car", color: "bg-red-600 text-white" },
          { href: "/dashboard/leads", icon: "forum", label: "Review Leads", color: "bg-blue-600 text-white" },
          { href: "/dashboard/settings", icon: "settings", label: "Site Settings", color: "bg-emerald-600 text-white" },
        ].map((action) => (
          <Link key={action.href} href={action.href} className="flex items-center gap-3 p-5 rounded-3xl bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
              <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
            </div>
            <span className="font-extrabold text-sm text-gray-800">{action.label}</span>
            <span className="ml-auto material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
