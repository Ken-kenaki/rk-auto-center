"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    phone: "+1 (555) 000-0000",
    whatsapp: "+15550000000",
    email: "info@rkauto.com",
    address: "123 Auto Drive, Kathmandu, Nepal",
    instagram_url: "https://instagram.com/rkauto",
    facebook_url: "https://facebook.com/rkauto",
    navbar_color: "#1a1a1a",
    navbar_text_color: "#ffffff",
    footer_color: "#111111",
    footer_text_color: "#ffffff",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    // TODO: PATCH /api/settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = {
    borderColor: "var(--color-outline-variant)",
    background: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
  };

  const Section = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
    <div className="p-6 rounded-2xl border space-y-5"
      style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-[20px]" style={{ color: "var(--color-primary)" }}>{icon}</span>
        <h2 className="font-bold text-base" style={{ fontFamily: "Hanken Grotesk" }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Contact Information" icon="contact_phone">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Phone Number", key: "phone", icon: "call" },
            { label: "WhatsApp Number", key: "whatsapp", icon: "chat" },
            { label: "Email Address", key: "email", icon: "mail" },
          ].map((f) => (
            <div key={f.key} className={f.key === "email" ? "md:col-span-2" : ""}>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>{f.label}</label>
              <div className="relative">
                <span className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }}>
                  <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
                </span>
                <input value={(form as any)[f.key]} onChange={(e) => set(f.key, e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              </div>
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Business Address</label>
            <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2}
              className="w-full p-3.5 rounded-xl border text-sm outline-none resize-none" style={inputStyle} />
          </div>
        </div>
      </Section>

      <Section title="Social Media" icon="share">
        <div className="space-y-4">
          {[
            { label: "Instagram URL", key: "instagram_url", icon: "camera_alt" },
            { label: "Facebook URL", key: "facebook_url", icon: "thumb_up" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>{f.label}</label>
              <div className="relative">
                <span className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }}>
                  <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
                </span>
                <input value={(form as any)[f.key]} onChange={(e) => set(f.key, e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Brand Colors" icon="palette">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Navbar Background", key: "navbar_color" },
            { label: "Navbar Text", key: "navbar_text_color" },
            { label: "Footer Background", key: "footer_color" },
            { label: "Footer Text", key: "footer_text_color" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>{f.label}</label>
              <div className="flex items-center gap-3">
                <input type="color" value={(form as any)[f.key]} onChange={(e) => set(f.key, e.target.value)}
                  className="w-10 h-10 rounded-lg border cursor-pointer" style={{ borderColor: "var(--color-outline-variant)" }} />
                <input value={(form as any)[f.key]} onChange={(e) => set(f.key, e.target.value)}
                  className="flex-1 p-3 rounded-xl border text-sm outline-none" style={{ ...inputStyle, fontFamily: "JetBrains Mono" }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white btn-press"
          style={{ background: "var(--color-primary)", boxShadow: "0 8px 20px rgba(186,0,19,0.25)" }}>
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Settings
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--color-tertiary)" }}>
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Settings saved!
          </div>
        )}
      </div>
    </div>
  );
}
