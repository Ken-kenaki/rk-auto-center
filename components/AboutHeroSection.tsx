"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SideImage {
  src: string;
  alt: string;
  position: string;
  span: number;
}

interface HeroSectionProps {
  word?: string;
  mainImageSrc?: string;
  sideImages?: SideImage[];
  tagline?: React.ReactNode;
}

const defaultSideImages: SideImage[] = [
  {
    src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000",
    alt: "Luxury sports car interior",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000",
    alt: "Classic sports car side view",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000",
    alt: "Sleek red modern supercar tail light",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000",
    alt: "High-performance sports car detail",
    position: "right",
    span: 1,
  },
];

export function AboutHeroSection({
  word = "LEGACY",
  mainImageSrc = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000",
  sideImages = defaultSideImages,
  tagline = (
    <>
      A legacy of performance,
      <br />
      curated for the true connoisseur.
    </>
  ),
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);

  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // ── EXACT ORIGINAL DESKTOP VALUES ──────────────────────────────────
  // On mobile the side columns need to be a bit wider (28% instead of 22%)
  // so they're actually visible on a narrow screen — center shrinks accordingly.
  const sideMaxWidth = isMobile ? 28 : 22;

  const centerWidth  = isMobile
    ? 100 - imageProgress * 64          // 100% → 36% on mobile (leaves 28% each side)
    : 100 - imageProgress * 58;         // 100% → 42% on desktop (ORIGINAL)

  const centerHeight = 100 - imageProgress * 30; // 100% → 70% — same on both (ORIGINAL)
  const sideWidth    = imageProgress * sideMaxWidth;
  const sideOpacity  = imageProgress;
  const sideTranslateLeft  = -100 + imageProgress * 100; // -100% → 0% (ORIGINAL)
  const sideTranslateRight =  100 - imageProgress * 100; // 100% → 0%  (ORIGINAL)
  const borderRadius = imageProgress * 24;               // 0px → 24px  (ORIGINAL)
  const gap          = imageProgress * (isMobile ? 8 : 16); // slightly tighter on mobile
  const sideTranslateY = -(imageProgress * 15);           // (ORIGINAL)

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * (isMobile ? 8 : 16)}px`,
              paddingBottom: `${60 + imageProgress * 40}px`,
            }}
          >
            {/* Left Column */}
            <div
              className="flex flex-col will-change-transform animate-fade-in"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden will-change-transform"
                  style={{ flex: img.span, borderRadius: `${borderRadius}px` }}
                >
                  <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Main Hero Image — Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image src={mainImageSrc} alt="Main hero display" fill className="object-cover" priority />

              {/* Overlay text — fades out on scroll */}
              <div
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[16vw] font-black leading-[0.8] tracking-tighter text-white uppercase text-center md:text-left md:pl-8 pb-12">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: "all 1.5s",
                        transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div
              className="flex flex-col will-change-transform animate-fade-in"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden will-change-transform"
                  style={{ flex: img.span, borderRadius: `${borderRadius}px` }}
                >
                  <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p
          className="mx-auto max-w-2xl text-center text-2xl leading-relaxed md:text-3xl lg:text-[2.5rem] lg:leading-snug"
          style={{ color: "var(--color-on-background)" }}
        >
          {tagline}
        </p>
      </div>
    </section>
  );
}
