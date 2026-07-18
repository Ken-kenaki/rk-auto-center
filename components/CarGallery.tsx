"use client";

import { useState } from "react";

export default function CarGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <span className="material-symbols-outlined text-[80px] opacity-10 text-gray-500">
          directions_car
        </span>
      </div>
    );
  }

  const activeImg = images[activeIdx] || images[0];

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative aspect-video rounded-3xl overflow-hidden shadow-md bg-gray-50 cursor-zoom-in"
          onClick={() => setLightbox(true)}
          title="Click to enlarge"
        >
          <img
            src={activeImg}
            alt={`${name} - View ${activeIdx + 1}`}
            className="w-full h-full object-contain transition-all duration-500"
            data-compare-hero
          />
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/60 backdrop-blur-sm shadow flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[12px]">photo_library</span>
            {activeIdx + 1} / {images.length}
          </div>
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-sm shadow flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">zoom_in</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all shadow-sm ${
                activeIdx === i
                  ? "ring-2 ring-red-600 ring-offset-1 scale-[0.97]"
                  : "hover:ring-2 hover:ring-gray-300 hover:scale-[0.98]"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i => Math.max(0, i - 1)); }}
            aria-label="Previous"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <img
            src={activeImg}
            alt={`${name} - Full view ${activeIdx + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveIdx(i => Math.min(images.length - 1, i + 1)); }}
            aria-label="Next"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-sm">
            {activeIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
