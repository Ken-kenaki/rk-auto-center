"use client";

import { useState } from "react";

export default function CarGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIdx, setActiveIdx] = useState(0);

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
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md bg-gray-100">
        <img
          src={activeImg}
          alt={`${name} - View ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
          data-compare-hero
        />
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/60 backdrop-blur-sm shadow">
          {activeIdx + 1} / {images.length} Photos
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all shadow-sm ${
              activeIdx === i ? "ring-2 ring-red-600 scale-[0.98]" : "hover:ring-2 hover:ring-gray-200"
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
  );
}
