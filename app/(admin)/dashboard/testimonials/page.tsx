"use client";

import { useEffect, useState, useRef } from "react";
import { storage } from "@/lib/appwrite";
import { TESTIMONIALS_BUCKET_ID } from "@/lib/constants";
import { ID } from "appwrite";
import { getFilePreviewUrl } from "@/lib/utils";

interface Testimonial {
  $id: string;
  name: string;
  role: string;
  quote: string;
  avatar_id?: string;
  rating: number;
  featured: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (res.ok) {
        // Filter those with avatar_id
        const list = (data.documents || []).filter((t: any) => !!t.avatar_id);
        setTestimonials(list);
      } else {
        setError(data.error || "Failed to load client images.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load client images.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Photo Upload and Testimonial Creation
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // 1. Upload file directly to Appwrite storage
      const uploadedFile = await storage.createFile(
        TESTIMONIALS_BUCKET_ID,
        ID.unique(),
        file
      );

      // 2. Create the database record with default placeholder texts
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Client Photo",
          role: "Client",
          quote: "RK Auto Center Client Moment",
          rating: 5,
          featured: true,
          avatar_id: uploadedFile.$id,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save client image record.");

      // 3. Update local state
      setTestimonials((prev) => [json.doc, ...prev]);
      setSuccess("Client image uploaded and added to the gallery successfully!");

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(`Failed to upload image: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Delete Testimonial & File
  const handleDelete = async (t: Testimonial) => {
    if (!confirm("Are you sure you want to delete this client image?")) return;

    setError("");
    setSuccess("");

    try {
      // Delete document record
      const res = await fetch(`/api/testimonials/${t.$id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to delete record.");
      }

      // Try to delete file from storage if avatar_id exists
      if (t.avatar_id) {
        try {
          await storage.deleteFile(TESTIMONIALS_BUCKET_ID, t.avatar_id);
        } catch (storageErr) {
          console.warn("Could not delete associated file from storage:", storageErr);
        }
      }

      // Update state
      setTestimonials((prev) => prev.filter((item) => item.$id !== t.$id));
      setSuccess("Client image deleted successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to delete client image.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header card with Upload area */}
      <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-800" style={{ fontFamily: "Hanken Grotesk" }}>
            Client Moments Gallery
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-lg">
            Manage the scrolling client gallery photos displayed on the About Us page. Drag &amp; drop or click to upload a new client moment.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="gallery-photo-upload"
            disabled={saving}
          />
          <label
            htmlFor="gallery-photo-upload"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl cursor-pointer transition-colors disabled:opacity-50 select-none"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading Image...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                Upload Client Photo
              </>
            )}
          </label>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 rounded-xl text-sm font-semibold flex items-center gap-2 bg-red-50 text-red-600 border border-red-100">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-xl text-sm font-semibold flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {success}
        </div>
      )}

      {/* Grid of gallery images */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-[4/3] bg-zinc-100 border border-zinc-200/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
          <span className="material-symbols-outlined text-[48px] text-zinc-300 mb-2">photo_library</span>
          <p className="text-zinc-500 font-semibold text-sm">No client gallery photos found</p>
          <p className="text-xs text-zinc-400 mt-1">Click the button above to upload client photos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {testimonials.map((t) => {
            const avatarUrl = getFilePreviewUrl(t.avatar_id!, TESTIMONIALS_BUCKET_ID, 400, 300);

            return (
              <div
                key={t.$id}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200/50 group bg-zinc-50 shadow-sm"
              >
                <img
                  src={avatarUrl}
                  alt="Client Moment"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay with Delete button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(t)}
                    title="Delete image"
                    className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
