"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MAKES = ["", "BMW", "Mercedes-Benz", "Audi", "Porsche", "Range Rover", "Lexus", "Ferrari", "MINI", "Toyota", "Honda"];

export default function NewCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", make: "", model: "",
    year: "", mileage: "", engine: "", transmission: "Automatic",
    drivetrain: "AWD", featured: false, video_url: "",
  });

  const set = (k: string, v: string | boolean) => {
    setForm((f) => {
      const updated = { ...f, [k]: v };
      // Auto-generate slug from name
      if (k === "name") {
        updated.slug = (v as string).toLowerCase().trim()
          .replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST to /api/cars with form data
    await new Promise((r) => setTimeout(r, 1000)); // Simulate save
    setLoading(false);
    router.push("/dashboard/cars");
  };

  const inputStyle = {
    borderColor: "var(--color-outline-variant)",
    background: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {/* Basic Info */}
      <div className="p-6 rounded-2xl border space-y-5"
        style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
        <h2 className="font-bold text-lg" style={{ fontFamily: "Hanken Grotesk" }}>Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Listing Title</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} required
              placeholder="e.g. 2024 Porsche 911 Carrera S"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Slug (URL)</label>
            <input value={form.slug} onChange={(e) => set("slug", e.target.value)} required
              placeholder="auto-generated"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={{ ...inputStyle, fontFamily: "JetBrains Mono" }} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Make</label>
            <select value={form.make} onChange={(e) => set("make", e.target.value)} required
              className="w-full p-3.5 rounded-xl border text-sm outline-none cursor-pointer" style={inputStyle}>
              {MAKES.map((m) => <option key={m} value={m}>{m || "Select Make"}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Model</label>
            <input value={form.model} onChange={(e) => set("model", e.target.value)} required
              placeholder="e.g. 911 Carrera S"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Year</label>
            <input value={form.year} onChange={(e) => set("year", e.target.value)} required type="number" placeholder="2024"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Price (USD)</label>
            <input value={form.price} onChange={(e) => set("price", e.target.value)} required type="number" placeholder="145000"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Mileage</label>
            <input value={form.mileage} onChange={(e) => set("mileage", e.target.value)} required type="number" placeholder="5000"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Engine</label>
            <input value={form.engine} onChange={(e) => set("engine", e.target.value)}
              placeholder="e.g. 3.0L Twin-Turbo Flat-6"
              className="w-full p-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Transmission</label>
            <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)}
              className="w-full p-3.5 rounded-xl border text-sm outline-none cursor-pointer" style={inputStyle}>
              <option>Automatic</option><option>Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Drivetrain</label>
            <select value={form.drivetrain} onChange={(e) => set("drivetrain", e.target.value)}
              className="w-full p-3.5 rounded-xl border text-sm outline-none cursor-pointer" style={inputStyle}>
              <option>AWD</option><option>RWD</option><option>FWD</option><option>4WD</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4}
              placeholder="Describe the vehicle's condition, history, and notable features…"
              className="w-full p-3.5 rounded-xl border text-sm outline-none resize-none" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="p-6 rounded-2xl border space-y-5"
        style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
        <h2 className="font-bold text-lg" style={{ fontFamily: "Hanken Grotesk" }}>Photos &amp; Video</h2>
        <div className="border-2 border-dashed rounded-xl p-10 text-center transition-colors hover:border-[var(--color-primary)] group cursor-pointer"
          style={{ borderColor: "var(--color-outline-variant)", background: "var(--color-surface-container-low)" }}>
          <span className="material-symbols-outlined text-[40px] mb-2 block group-hover:text-[var(--color-primary)] transition-colors" style={{ color: "var(--color-on-surface-variant)" }}>cloud_upload</span>
          <p className="font-bold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>Drag &amp; Drop Photos Here</p>
          <p className="text-xs mb-4" style={{ color: "var(--color-on-surface-variant)" }}>JPG, PNG, or WebP — up to 15 images</p>
          <button type="button" className="px-6 py-2 rounded-lg text-sm font-bold text-white btn-press" style={{ background: "var(--color-secondary)" }}>Browse Files</button>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-on-surface-variant)", fontFamily: "JetBrains Mono" }}>
            External Video URL
          </label>
          <div className="relative">
            <span className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }}>
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
            </span>
            <input value={form.video_url} onChange={(e) => set("video_url", e.target.value)}
              placeholder="https://www.facebook.com/watch/?v=... or YouTube URL"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm outline-none" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="p-6 rounded-2xl border"
        style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}>
        <h2 className="font-bold text-lg mb-5" style={{ fontFamily: "Hanken Grotesk" }}>Listing Options</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => set("featured", !form.featured)}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${form.featured ? "" : ""}`}
            style={{ background: form.featured ? "var(--color-primary)" : "var(--color-surface-container-highest)" }}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.featured ? "left-5" : "left-0.5"}`} />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>Mark as Featured</p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>Featured cars appear prominently on the home page.</p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border font-bold text-sm btn-press transition-all"
          style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}>
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white btn-press disabled:opacity-60"
          style={{ background: "var(--color-primary)", boxShadow: "0 8px 20px rgba(186,0,19,0.25)" }}>
          {loading ? "Saving…" : "Save Listing"}
          <span className="material-symbols-outlined text-[18px]">check</span>
        </button>
      </div>
    </form>
  );
}
