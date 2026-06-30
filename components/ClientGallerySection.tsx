"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const GALLERY_IMAGES = [
  { src: "/ClientTestimonial/1.jpeg", alt: "Client Moment 1" },
  { src: "/ClientTestimonial/585947713_1287505620084713_7891534786091999560_n.jpg", alt: "Client Moment 2" },
  { src: "/ClientTestimonial/597283581_1297279225774019_1791563342083959422_n.jpg", alt: "Client Moment 3" },
  { src: "/ClientTestimonial/656124359_1384015497100391_473484674625463381_n.jpg", alt: "Client Moment 4" },
  { src: "/ClientTestimonial/656693513_1385668960268378_8861279983282439325_n.jpg", alt: "Client Moment 5" },
  { src: "/ClientTestimonial/656709262_1384834963685111_6153659855049111611_n.jpg", alt: "Client Moment 6" },
  { src: "/ClientTestimonial/656737826_1388290896672851_4785576633786822235_n.jpg", alt: "Client Moment 7" },
  { src: "/ClientTestimonial/660028988_1391529073015700_4548945949001304903_n.jpg", alt: "Client Moment 8" },
  { src: "/ClientTestimonial/660075594_1390643366437604_8700896761221607253_n.jpg", alt: "Client Moment 9" },
  { src: "/ClientTestimonial/662418294_1395696402598967_6670456919527237848_n.jpg", alt: "Client Moment 10" },
  { src: "/ClientTestimonial/670405817_1400354065466534_3380043085647034054_n.jpg", alt: "Client Moment 11" },
  { src: "/ClientTestimonial/671655102_1402798335222107_8903987367285502327_n.jpg", alt: "Client Moment 12" },
  { src: "/ClientTestimonial/677931449_1407731314728809_2408491772477619349_n.jpg", alt: "Client Moment 13" },
  { src: "/ClientTestimonial/682585604_1412799720888635_4123402516812022596_n.jpg", alt: "Client Moment 14" },
  { src: "/ClientTestimonial/687907072_1416988130469794_7653205192578914728_n.jpg", alt: "Client Moment 15" },
  { src: "/ClientTestimonial/687912960_1420376123464328_7301395836584258043_n.jpg", alt: "Client Moment 16" },
  { src: "/ClientTestimonial/693153321_1421254530043154_3210300058120570034_n.jpg", alt: "Client Moment 17" },
  { src: "/ClientTestimonial/696001903_1422754696559804_8571913557881811214_n.jpg", alt: "Client Moment 18" },
  { src: "/ClientTestimonial/707210601_1436700405165233_3971142970341849236_n.jpg", alt: "Client Moment 19" },
  { src: "/ClientTestimonial/714561492_1444161037752503_7982298041648551444_n.jpg", alt: "Client Moment 20" },
  { src: "/ClientTestimonial/722224095_1531585465031896_3449060891575860594_n.jpeg", alt: "Client Moment 21" }
];

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
