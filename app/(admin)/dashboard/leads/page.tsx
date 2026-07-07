"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { DB_ID, LEADS_COLLECTION_ID } from "@/lib/constants";
import { Query } from "appwrite";

interface Lead {
  id: string; name: string; email: string; phone: string;
  car: string; message: string; status: string; date: string;
}

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string }> = {
  New:       { label: "New",       dot: "#dc2626", badge: "bg-red-50 text-red-600" },
  pending:   { label: "New",       dot: "#dc2626", badge: "bg-red-50 text-red-600" },
  Contacted: { label: "Contacted", dot: "#2563eb", badge: "bg-blue-50 text-blue-600" },
  Closed:    { label: "Closed",    dot: "#a1a1aa", badge: "bg-zinc-100 text-zinc-500" },
};

function statusCfg(s: string) {
  return STATUS_CONFIG[s] || STATUS_CONFIG["New"];
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    databases.listDocuments(DB_ID, LEADS_COLLECTION_ID, [Query.orderDesc("$createdAt"), Query.limit(100)])
      .then((res) => {
        const mapped = res.documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          email: doc.email,
          phone: doc.phone || "—",
          car: doc.car_id || doc.subject || "General Inquiry",
          message: doc.message,
          status: doc.status || "New",
          date: new Date(doc.$createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        }));
        setLeads(mapped);
        if (mapped.length > 0) setSelected(mapped[0].id);
      })
      .catch(() => setError("Failed to load leads from the database."))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    await databases.updateDocument(DB_ID, LEADS_COLLECTION_ID, id, {
      status: newStatus === "New" ? "pending" : newStatus,
    }).catch(() => {});
  };

  const counts = { All: leads.length, New: 0, Contacted: 0, Closed: 0 };
  leads.forEach((l) => {
    const s = l.status === "pending" ? "New" : l.status;
    if (s in counts) counts[s as keyof typeof counts]++;
  });

  const display = leads.filter((l) => {
    if (filter === "All") return true;
    const s = l.status === "pending" ? "New" : l.status;
    return s === filter;
  });

  const selectedLead = leads.find((l) => l.id === selected);

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 bg-amber-50 text-amber-700 flex-shrink-0">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1 w-fit flex-shrink-0">
        {(["All", "New", "Contacted", "Closed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === tab ? "bg-white shadow-sm text-zinc-800" : "text-zinc-500 hover:text-zinc-700"}`}
          >
            {tab}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filter === tab ? "bg-zinc-100 text-zinc-600" : "bg-zinc-200/50 text-zinc-400"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1 divide-y divide-zinc-50">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-5 animate-pulse">
                  <div className="flex gap-3 items-center">
                    <div className="w-9 h-9 rounded-full bg-zinc-100 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-zinc-100 rounded w-1/3" />
                      <div className="h-3 bg-zinc-100 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : display.length === 0 ? (
              <div className="py-16 text-center text-sm text-zinc-400">
                <span className="material-symbols-outlined text-[40px] block mb-2 opacity-20">forum</span>
                No {filter !== "All" ? filter.toLowerCase() : ""} leads.
              </div>
            ) : (
              display.map((lead) => {
                const cfg = statusCfg(lead.status);
                return (
                  <button
                    key={lead.id}
                    onClick={() => setSelected(lead.id)}
                    className={`w-full text-left px-5 py-4 transition-colors hover:bg-zinc-50 ${selected === lead.id ? "bg-zinc-50" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: "#18181b" }}>
                        {lead.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-zinc-800 truncate">{lead.name}</p>
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${cfg.badge}`}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate">{lead.car}</p>
                        <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">{lead.message}</p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
          {selectedLead ? (
            <>
              {/* Header */}
              <div className="px-5 py-5 border-b border-zinc-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0" style={{ background: "#18181b" }}>
                    {selectedLead.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-800" style={{ fontFamily: "Hanken Grotesk" }}>{selectedLead.name}</p>
                    <p className="text-xs text-zinc-400">{selectedLead.date}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: "mail", val: selectedLead.email },
                    { icon: "call", val: selectedLead.phone },
                    { icon: "directions_car", val: selectedLead.car },
                  ].map((item) => (
                    <div key={item.icon} className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="material-symbols-outlined text-[14px] text-zinc-300">{item.icon}</span>
                      <span className="truncate">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="px-5 py-4 flex-1 overflow-y-auto">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2" style={{ fontFamily: "JetBrains Mono" }}>Message</p>
                <p className="text-sm leading-relaxed text-zinc-600">{selectedLead.message}</p>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 border-t border-zinc-50 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2" style={{ fontFamily: "JetBrains Mono" }}>Update Status</p>
                <div className="flex gap-2">
                  {["New", "Contacted", "Closed"].map((s) => {
                    const isActive = (selectedLead.status === "pending" ? "New" : selectedLead.status) === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? "text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}
                        style={isActive ? { background: "linear-gradient(135deg,#dc2626,#b91c1c)" } : {}}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                <a
                  href={`mailto:${selectedLead.email}?subject=Re: ${encodeURIComponent(selectedLead.car)}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  Reply via Email
                </a>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-300">
              <span className="material-symbols-outlined text-[48px] mb-3">forum</span>
              <p className="text-sm">Select a lead</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
