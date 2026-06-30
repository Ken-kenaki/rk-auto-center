"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { getFilePreviewUrl } from "@/lib/utils";
import { TESTIMONIALS_BUCKET_ID } from "@/lib/constants";

// File IDs from Appwrite client_testimonials bucket
const GALLERY_FILE_IDS = [
  "file-t-anish-shrestha",     // 1.jpeg
  "file-t-sujata-karki",       // 585947713...
  "file-t-dr--sandeep-pathak", // 597283581...
  "file-t-prabesh-adhikari",   // 656124359...
  "file-t-melina-shakya",      // 656693513...
  "file-t-roshan-gurung",      // 656709262...
  "file-t-binita-bhandari",    // 656737826...
  "file-t-kiran-rijal",        // 660028988...
  "file-t-aarati-devkota",     // 660075594...
  "file-t-subash-tamang",      // 662418294...
  "file-t-sanjana-shrestha",   // 670405817...
  "file-t-raju-lama",          // 671655102...
  "file-t-nisha-basnet",       // 677931449...
  "file-t-bijay-sen",          // 682585604...
  "file-t-kabita-pandey",      // 687907072...
  "file-t-deepak-khadka",      // 687912960...
  "file-t-prativa-dahal",      // 693153321...
  "file-t-manish-shrestha",    // 696001903...
  "file-t-saroj-bhattarai",    // 707210601...
  "file-t-elina-maharjan",     // 714561492...
  "file-t-yubaraj-magar",      // 722224095...
];

const GALLERY_IMAGES = GALLERY_FILE_IDS.map((id, i) => ({
  src: getFilePreviewUrl(id, TESTIMONIALS_BUCKET_ID, 800),
  alt: `Client Moment ${i + 1}`,
}));


// Split images across two rows
const ROW_1 = GALLERY_IMAGES.filter((_, i) => i % 2 === 0);
const ROW_2 = GALLERY_IMAGES.filter((_, i) => i % 2 === 1);

export function ClientGallerySection() {
  const parentRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [rowWidths, setRowWidths] = useState({ row1Max: 2000, row2Max: 2000 });
  const rafRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    if (!parentRef.current) return;
    const rect = parentRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const pinDuration = rect.height - windowH;
    if (pinDuration <= 0) return;

    const traveled = -rect.top;
    const p = Math.max(0, Math.min(1, traveled / pinDuration));
    setProgress(p);

    if (row1Ref.current && row2Ref.current) {
      setRowWidths({
        row1Max: Math.max(0, row1Ref.current.scrollWidth - window.innerWidth + 48),
        row2Max: Math.max(0, row2Ref.current.scrollWidth - window.innerWidth + 48),
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const row1Translate = progress * -rowWidths.row1Max;
  const row2Translate = -rowWidths.row2Max + (progress * rowWidths.row2Max);

  return (
    <section
      ref={parentRef}
      className="relative h-[250vh]"
      id="client-gallery"
    >
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden"
        style={{ background: "var(--color-surface-container-lowest, #fafafa)" }}
      >
        {/* Header */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 mb-8 md:mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            Our Happy Patrons
          </p>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
          >
            Moments with Our Clients
          </h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="mb-4 md:mb-6 overflow-hidden px-6 md:px-12">
          <div
            ref={row1Ref}
            className="flex gap-4 md:gap-6"
            style={{
              transform: `translate3d(${row1Translate}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {ROW_1.map((image, index) => (
              <div
                key={index}
                className="relative h-[320px] md:h-[440px] w-[440px] md:w-[620px] flex-shrink-0 overflow-hidden rounded-2xl group cursor-pointer"
                style={{ transform: "translateZ(0)" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 440px, 620px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden px-6 md:px-12">
          <div
            ref={row2Ref}
            className="flex gap-4 md:gap-6"
            style={{
              transform: `translate3d(${row2Translate}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {ROW_2.map((image, index) => (
              <div
                key={index}
                className="relative h-[320px] md:h-[440px] w-[440px] md:w-[620px] flex-shrink-0 overflow-hidden rounded-2xl group cursor-pointer"
                style={{ transform: "translateZ(0)" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 440px, 620px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
