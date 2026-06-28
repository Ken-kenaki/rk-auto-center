"use client";

import { useState } from "react";

const MOCK_LEADS = [
  { id: "1", name: "John Smith", email: "john@example.com", phone: "+1 555 0101", car: "2024 Porsche 911", message: "I'm interested in the Porsche. Can we schedule a test drive?", status: "New", date: "2024-01-15" },
  { id: "2", name: "Emily Johnson", email: "emily@example.com", phone: "+1 555 0202", car: "2023 Range Rover", message: "Is the Range Rover still available? What's the best price?", status: "Contacted", date: "2024-01-14" },
  { id: "3", name: "Michael Chang", email: "mchang@example.com", phone: "+1 555 0303", car: "2022 Audi e-tron GT", message: "Looking for electric vehicles. Is financing available?", status: "New", date: "2024-01-13" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com", phone: "+1 555 0404", car: "2024 Mercedes G-Class", message: "Need full spec sheet and service history.", status: "Closed", date: "2024-01-10" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New: { bg: "var(--color-primary-fixed)", color: "var(--color-primary)" },
  Contacted: { bg: "var(--color-secondary-fixed)", color: "var(--color-secondary)" },
  Closed: { bg: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [selected, setSelected] = useState<string | null>(null);

  const setStatus = (id: string, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const selectedLead = leads.find((l) => l.id === selected);

  return (
    <div className="flex gap-5 h-[calc(100vh-10rem)]">
      {/* List */}
      <div className="flex-1 min-w-0 rounded-2xl border overflow-hidden flex flex-col"
        style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--color-outline-variant)" }}>
          <h2 className="font-bold" style={{ fontFamily: "Hanken Grotesk" }}>All Leads</h2>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "var(--color-primary-fixed)", color: "var(--color-primary)" }}>
            {leads.filter((l) => l.status === "New").length} New
          </span>
        </div>
        <div className="overflow-y-auto divide-y flex-1" style={{ borderColor: "var(--color-outline-variant)" }}>
          {leads.map((lead) => (
            <button key={lead.id} onClick={() => setSelected(lead.id)}
              className="w-full text-left px-5 py-4 transition-colors hover:bg-[var(--color-surface-container-low)]"
              style={{ background: selected === lead.id ? "var(--color-surface-container-low)" : undefined }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{ background: "var(--color-secondary)" }}>
                    {lead.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--color-on-surface)" }}>{lead.name}</p>
                    <p className="text-xs truncate" style={{ color: "var(--color-on-surface-variant)" }}>{lead.car}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ background: STATUS_COLORS[lead.status]?.bg, color: STATUS_COLORS[lead.status]?.color }}>
                    {lead.status}
                  </span>
                  <p className="text-[10px]" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>{lead.date}</p>
                </div>
              </div>
              <p className="text-xs mt-2 line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>{lead.message}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-80 flex-shrink-0 rounded-2xl border overflow-hidden"
        style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
        {selectedLead ? (
          <div className="flex flex-col h-full">
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--color-outline-variant)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: "var(--color-secondary)" }}>
                  {selectedLead.name[0]}
                </div>
                <div>
                  <p className="font-bold" style={{ fontFamily: "Hanken Grotesk" }}>{selectedLead.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{selectedLead.date}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: "mail", val: selectedLead.email },
                  { icon: "call", val: selectedLead.phone },
                  { icon: "directions_car", val: selectedLead.car },
                ].map((item) => (
                  <div key={item.icon} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                    <span className="truncate">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 flex-1 overflow-y-auto">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Message</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>{selectedLead.message}</p>
            </div>
            <div className="px-5 py-4 border-t space-y-2" style={{ borderColor: "var(--color-outline-variant)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Update Status</p>
              <div className="flex gap-2">
                {["New", "Contacted", "Closed"].map((s) => (
                  <button key={s} onClick={() => setStatus(selectedLead.id, s)}
                    className="flex-1 py-2 rounded-lg text-xs font-bold btn-press transition-all"
                    style={selectedLead.status === s
                      ? { background: "var(--color-primary)", color: "white" }
                      : { background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
                    {s}
                  </button>
                ))}
              </div>
              <a href={`mailto:${selectedLead.email}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white btn-press mt-2"
                style={{ background: "var(--color-secondary)" }}>
                <span className="material-symbols-outlined text-[16px]">mail</span>
                Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <span className="material-symbols-outlined text-[48px] mb-3">forum</span>
            <p className="text-sm font-medium">Select a lead to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
