"use client";

import { useState, useRef, useEffect } from "react";
import { CAR_IMAGES_BUCKET_ID } from "@/lib/constants";
import { getFilePreviewUrl } from "@/lib/utils";

interface ImageItem {
  id: string;
  url: string;
  isExisting?: boolean; // true = already in Appwrite, false = just uploaded
}

interface Props {
  uploadedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ImageUploader({ uploadedIds, onChange }: Props) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const initialised = useRef(false);

  // On first render (or when edit page loads its existing ids), populate items from uploadedIds
  useEffect(() => {
    if (!initialised.current && uploadedIds.length > 0) {
      initialised.current = true;
      setItems(
        uploadedIds.map((id) => ({
          id,
          url: getFilePreviewUrl(id, CAR_IMAGES_BUCKET_ID, 400, 300),
          isExisting: true,
        }))
      );
    }
  }, [uploadedIds]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");
    initialised.current = true; // prevent re-init override

    const newItems: ImageItem[] = [];
    const newIds: string[] = [];

    for (const file of Array.from(files)) {
      // Optimistic local preview
      const localUrl = URL.createObjectURL(file);
      const tempId = `__temp_${Date.now()}_${Math.random()}`;
      setItems((prev) => [...prev, { id: tempId, url: localUrl, isExisting: false }]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucketId", CAR_IMAGES_BUCKET_ID);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");

        const uploadedId = data.id;
        const previewUrl = getFilePreviewUrl(uploadedId, CAR_IMAGES_BUCKET_ID, 400, 300);
        newItems.push({ id: uploadedId, url: previewUrl, isExisting: false });
        newIds.push(uploadedId);
        // Replace temp entry
        setItems((prev) =>
          prev.map((x) => (x.id === tempId ? { id: uploadedId, url: previewUrl } : x))
        );
        URL.revokeObjectURL(localUrl);
      } catch (err: any) {
        setUploadError(`Upload failed: ${err.message}`);
        setItems((prev) => prev.filter((x) => x.id !== tempId));
        URL.revokeObjectURL(localUrl);
      }
    }

    if (newIds.length > 0) {
      onChange([...uploadedIds, ...newIds]);
    }
    setUploading(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    onChange(uploadedIds.filter((x) => x !== id));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-zinc-400 hover:bg-zinc-50/80 group"
        style={{ borderColor: "#d4d4d8" }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2 pointer-events-none">
          {uploading ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-1 animate-pulse">
                <span className="material-symbols-outlined text-[24px] text-zinc-400">cloud_upload</span>
              </div>
              <p className="text-sm font-semibold text-zinc-500">Uploading to Appwrite…</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 group-hover:bg-zinc-200 transition-colors flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[24px] text-zinc-400">add_photo_alternate</span>
              </div>
              <p className="font-semibold text-sm text-zinc-700">
                {items.length > 0 ? "Add more photos" : "Drop photos here or click to browse"}
              </p>
              <p className="text-xs text-zinc-400">JPEG, PNG, WebP · Multiple files supported</p>
            </>
          )}
        </div>
      </div>

      {uploadError && (
        <p className="text-xs font-medium text-amber-600 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px]">warning</span>
          {uploadError}
        </p>
      )}

      {/* Photo grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="relative group rounded-xl overflow-hidden aspect-square bg-zinc-100 shadow-sm"
            >
              <img
                src={item.url}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-all hover:bg-white shadow"
                >
                  <span className="material-symbols-outlined text-[16px] text-zinc-700">close</span>
                </button>
              </div>
              {/* Badges */}
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-zinc-900/70 rounded-md text-[9px] font-bold text-white tracking-wide">
                  COVER
                </span>
              )}
              {item.isExisting && (
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-emerald-600/80 rounded-md text-[9px] font-bold text-white">
                  SAVED
                </span>
              )}
            </div>
          ))}

          {/* Add more tile */}
          <div
            onClick={() => inputRef.current?.click()}
            className="rounded-xl border-2 border-dashed border-zinc-200 aspect-square flex items-center justify-center cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all"
          >
            <span className="material-symbols-outlined text-[28px] text-zinc-300">add</span>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <p className="text-xs text-zinc-400">
          {items.length} photo{items.length !== 1 ? "s" : ""} · Drag to reorder coming soon
        </p>
      )}
    </div>
  );
}
