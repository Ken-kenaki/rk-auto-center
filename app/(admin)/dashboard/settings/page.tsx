"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [docId, setDocId] = useState<string | null>(null);
  const [form, setForm] = useState({
    phone: "",
    whatsapp_number: "",
    email: "",
    address: "",
    instagram_url: "",
    facebook_url: "",
    navbar_color: "#1a1a1a",
    navbar_text_color: "#ffffff",
    footer_color: "#111111",
    footer_text_color: "#ffffff",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/settings");
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Failed to load settings");

        const doc = json.doc;
        setDocId(doc.$id);
        setForm({
          phone: doc.phone || "",
          whatsapp_number: doc.whatsapp_number || "",
          email: doc.email || "",
          address: doc.address || "",
          instagram_url: doc.instagram_url || "",
          facebook_url: doc.facebook_url || "",
          navbar_color: doc.navbar_color || "#1a1a1a",
          navbar_text_color: doc.navbar_text_color || "#ffffff",
          footer_color: doc.footer_color || "#111111",
          footer_text_color: doc.footer_text_color || "#ffffff",
        });
      } catch (err: any) {
        console.error("Failed to load settings:", err);
        setError(err.message || "Could not load settings.");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId, data: form }),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Failed to save settings");

      // Update docId in case it was just created
      setDocId(json.doc.$id);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error("Failed to save settings:", err);
      setError(err.message || "Failed to save settings changes.");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    borderColor: "#e4e4e7",
    background: "#fafafa",
    color: "#18181b",
  };

  const Section = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: string;
    children: React.ReactNode;
  }) => (
    <div
      className="p-6 rounded-2xl border border-zinc-100 space-y-5 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="material-symbols-outlined text-[20px]"
          style={{ color: "#dc2626" }}
        >
          {icon}
        </span>
        <h2
          className="font-bold text-base"
          style={{ fontFamily: "Hanken Grotesk" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-48 bg-white border border-gray-100 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 bg-red-50 text-red-700 border border-red-200">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      <Section title="Contact Information" icon="contact_phone">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Phone Number", key: "phone", icon: "call" },
            { label: "WhatsApp Number", key: "whatsapp_number", icon: "chat" },
            { label: "Email Address", key: "email", icon: "mail" },
          ].map((f) => (
            <div key={f.key} className={f.key === "email" ? "md:col-span-2" : ""}>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{
                  color: "var(--color-on-surface-variant)",
                  fontFamily: "JetBrains Mono",
                }}
              >
                {f.label}
              </label>
              <div className="relative">
                <span
                  className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {f.icon}
                  </span>
                </span>
                <input
                  value={(form as any)[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none"
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
          <div className="md:col-span-2">
            <label
              className="block text-xs font-bold uppercase tracking-wider mb-2"
              style={{
                color: "var(--color-on-surface-variant)",
                fontFamily: "JetBrains Mono",
              }}
            >
              Business Address
            </label>
            <textarea
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              rows={2}
              className="w-full p-3.5 rounded-xl border text-sm outline-none resize-none"
              style={inputStyle}
            />
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
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{
                  color: "var(--color-on-surface-variant)",
                  fontFamily: "JetBrains Mono",
                }}
              >
                {f.label}
              </label>
              <div className="relative">
                <span
                  className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {f.icon}
                  </span>
                </span>
                <input
                  value={(form as any)[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none"
                  style={inputStyle}
                />
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
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{
                  color: "var(--color-on-surface-variant)",
                  fontFamily: "JetBrains Mono",
                }}
              >
                {f.label}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={(form as any)[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="w-10 h-10 rounded-lg border cursor-pointer"
                  style={{ borderColor: "var(--color-outline-variant)" }}
                />
                <input
                  value={(form as any)[f.key]}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="flex-1 p-3 rounded-xl border text-sm outline-none"
                  style={{ ...inputStyle, fontFamily: "JetBrains Mono" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white btn-press disabled:opacity-60"
          style={{
            background: "#dc2626",
            boxShadow: "0 8px 20px rgba(186,0,19,0.25)",
          }}
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              Saving…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Settings
            </>
          )}
        </button>
        {saved && (
          <div
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: "#16a34a" }}
          >
            <span className="material-symbols-outlined text-[18px]">
              check_circle
            </span>
            Settings saved!
          </div>
        )}
      </div>
    </div>
  );
}
