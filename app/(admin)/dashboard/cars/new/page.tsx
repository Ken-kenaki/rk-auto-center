"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/dashboard/ImageUploader";
import {
  CAR_MAKES,
  BRAND_MODELS_DATA,
  YEAR_OPTIONS,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  DRIVETRAIN_TYPES,
} from "@/lib/constants";

const BODY_TYPES = ["SUV (5 Seater)", "SUV (7 Seater)", "Hatchback", "Sedan", "Coupe", "Convertible"];
const BADGES = ["", "Featured", "New", "Hot Deal", "Popular", "Sold"];
const CONDITIONS = ["New", "Used", "Reconditioned"];

// Move Field outside the component to prevent component remounting and losing input focus on every keystroke
const Field = ({ label, children, span2 = false }: { label: string; children: React.ReactNode; span2?: boolean }) => (
  <div className={span2 ? "md:col-span-2" : ""}>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2" style={{ fontFamily: "JetBrains Mono" }}>
      {label}
    </label>
    {children}
  </div>
);

const inp = "w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors placeholder-zinc-300";
const sel = `${inp} cursor-pointer`;

export default function NewCarPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [isCustomModel, setIsCustomModel] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", make: "", model: "",
    year: "", mileage: "", engine: "", transmission: "Automatic", drivetrain: "AWD",
    featured: false, video_url: "", variant: "", fuel: "Petrol", type: "SUV (5 Seater)", badge: "", condition: "Used",
  });

  const set = (k: string, v: string | boolean) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "name") next.slug = (v as string).toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"");
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const price = parseFloat(form.price);
      const year = parseInt(form.year, 10);
      const mileage = parseInt(form.mileage, 10);
      if (isNaN(price) || isNaN(year) || isNaN(mileage)) throw new Error("Price, Year, and Mileage must be valid numbers.");
      if (!form.make) throw new Error("Please select a make.");
      if (!form.model) throw new Error("Please select or enter a model.");

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, slug: form.slug, description: form.description,
          price, make: form.make, model: form.model, year, mileage,
          engine: form.engine || null, transmission: form.transmission,
          drivetrain: form.drivetrain, featured: form.featured,
          video_url: form.video_url || null, variant: form.variant || null,
          fuel: form.fuel, type: form.type, badge: form.badge || null,
          condition: form.condition || "Used",
          image_ids: imageIds,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create listing.");
      router.push("/dashboard/cars");
    } catch (err: any) {
      setError(err.message || "Failed to create listing.");
    } finally {
      setSaving(false);
    }
  };

  const availableModels = form.make && BRAND_MODELS_DATA[form.make] ? BRAND_MODELS_DATA[form.make] : [];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 bg-red-50 text-red-600">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}

      {/* Photos */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <h2 className="font-bold text-zinc-800 mb-1" style={{ fontFamily: "Hanken Grotesk" }}>
          Photos
        </h2>
        <p className="text-xs text-zinc-400 mb-4">Upload vehicle photos — the first image becomes the cover.</p>
        <ImageUploader uploadedIds={imageIds} onChange={setImageIds} />
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <h2 className="font-bold text-zinc-800 mb-5" style={{ fontFamily: "Hanken Grotesk" }}>
          Vehicle Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Listing Title" span2>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              placeholder="e.g. 2024 Hyundai Creta SX"
              className={inp}
            />
          </Field>

          <Field label="URL Slug">
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              required
              className={`${inp} font-mono text-xs`}
            />
          </Field>

          <Field label="Make">
            <select
              value={form.make}
              onChange={(e) => {
                const newMake = e.target.value;
                setForm((f) => ({ ...f, make: newMake, model: "" }));
                setIsCustomModel(false);
              }}
              required
              className={sel}
            >
              <option value="">Select Make</option>
              {CAR_MAKES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Model">
            {isCustomModel ? (
              <div className="flex gap-2">
                <input
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                  required
                  placeholder="Enter custom model"
                  className={inp}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsCustomModel(false)}
                  className="px-3 py-2 text-xs font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-xl whitespace-nowrap"
                >
                  Select list
                </button>
              </div>
            ) : (
              <select
                value={form.model}
                onChange={(e) => {
                  if (e.target.value === "__CUSTOM__") {
                    set("model", "");
                    setIsCustomModel(true);
                  } else {
                    set("model", e.target.value);
                  }
                }}
                required
                className={sel}
              >
                <option value="">Select Model</option>
                {availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
                {form.model && !availableModels.includes(form.model) && (
                  <option value={form.model}>{form.model}</option>
                )}
                <option value="__CUSTOM__">+ Enter custom model...</option>
              </select>
            )}
          </Field>

          <Field label="Year">
            <select
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
              required
              className={sel}
            >
              <option value="">Select Year</option>
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Price (NPR)">
            <input
              type="number"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              required
              placeholder="e.g. 4500000"
              className={inp}
            />
          </Field>

          <Field label="Mileage (km)">
            <input
              type="number"
              value={form.mileage}
              onChange={(e) => set("mileage", e.target.value)}
              required
              placeholder="e.g. 15000"
              className={inp}
            />
          </Field>

          <Field label="Engine">
            <input
              value={form.engine}
              onChange={(e) => set("engine", e.target.value)}
              placeholder="e.g. 1.5L Petrol"
              className={inp}
            />
          </Field>

          <Field label="Transmission">
            <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)} className={sel}>
              {TRANSMISSION_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Drivetrain">
            <select value={form.drivetrain} onChange={(e) => set("drivetrain", e.target.value)} className={sel}>
              {DRIVETRAIN_TYPES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="Fuel Type">
            <select value={form.fuel} onChange={(e) => set("fuel", e.target.value)} className={sel}>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>

          <Field label="Body Type">
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={sel}>
              {BODY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Variant Spec">
            <input value={form.variant} onChange={(e) => set("variant", e.target.value)} placeholder="e.g. SX 1.6 Petrol MT" className={inp} />
          </Field>

          <Field label="Badge">
            <select value={form.badge} onChange={(e) => set("badge", e.target.value)} className={sel}>
              {BADGES.map((b) => (
                <option key={b} value={b}>{b === "" ? "No Badge" : b}</option>
              ))}
            </select>
          </Field>

          <Field label="Condition">
            <select value={form.condition} onChange={(e) => set("condition", e.target.value)} className={sel}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Description" span2>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} required placeholder="Describe condition, history, features…" className={`${inp} resize-none`} />
          </Field>
        </div>
      </div>

      {/* Video + Options */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-zinc-800" style={{ fontFamily: "Hanken Grotesk" }}>Video &amp; Options</h2>
        <Field label="Video URL (YouTube or Facebook)">
          <div className="relative">
            <span className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none text-zinc-400">
              <span className="material-symbols-outlined text-[17px]">play_circle</span>
            </span>
            <input value={form.video_url} onChange={(e) => set("video_url", e.target.value)} placeholder="https://youtube.com/… or facebook.com/…" className={`${inp} pl-10`} />
          </div>
        </Field>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => set("featured", !form.featured)}
            className="relative w-10 h-5.5 rounded-full transition-colors shrink-0"
            style={{ background: form.featured ? "#dc2626" : "#e4e4e7", width: "42px", height: "22px" }}
          >
            <div
              className="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-all"
              style={{ left: form.featured ? "22px" : "2px" }}
            />
          </div>
          <div>
            <p className="font-semibold text-sm text-zinc-800">Mark as Featured</p>
            <p className="text-xs text-zinc-400">Appears prominently on the homepage.</p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pb-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-zinc-200 font-semibold text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}
        >
          {saving ? "Creating…" : "Create Listing"}
          {!saving && <span className="material-symbols-outlined text-[17px]">check</span>}
        </button>
      </div>
    </form>
  );
}
