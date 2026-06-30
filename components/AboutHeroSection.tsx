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
    src: "/about-hero-1.jpg",
    alt: "Happy client with their new car",
    position: "left",
    span: 1,
  },
  {
    src: "/about-hero-2.jpg",
    alt: "Client receiving car keys",
    position: "left",
    span: 1,
  },
  {
    src: "/about-hero-3.jpg",
    alt: "Client posing with their vehicle",
    position: "right",
    span: 1,
  },
  {
    src: "/about-hero-4.jpg",
    alt: "Satisfied customer at RK Auto Center",
    position: "right",
    span: 1,
  },
];

export function AboutHeroSection({
  word = "RK AUTO CENTER",
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

  // side columns need to be slightly wider on mobile (28% vs 22%)
  // On mobile, they grow to cover the whole page (50% each side)
  const sideMaxWidth = isMobile ? 50 : 22;

  const centerWidth = isMobile
    ? 100 - imageProgress * 100          // 100% → 0% on mobile
    : 100 - imageProgress * 58;         // 100% → 42% on desktop

  const centerHeight = isMobile
    ? 100 - imageProgress * 40          // 100% → 60% on mobile
    : 100 - imageProgress * 30;         // 100% → 70% on desktop

  const centerOpacity = isMobile
    ? Math.max(0, 1 - imageProgress * 1.3) // Fades out completely on mobile
    : 1;

  const sideWidth = imageProgress * sideMaxWidth;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const borderRadius = imageProgress * 24;
  const gap = isMobile 
    ? 8 - imageProgress * 4            // gap shrinks from 8px to 4px on mobile
    : imageProgress * 16;
  const sideTranslateY = isMobile ? 0 : -(imageProgress * 15);

  return (
    <>
      <section ref={sectionRef} className="relative bg-background">
        {/* Animated Hero Section (Unified layout for all viewports) */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full w-full items-center justify-center">
            {/* Bento Grid Container */}
            <div
              className="relative flex h-full w-full items-stretch justify-center"
              style={{
                gap: `${gap}px`,
                padding: isMobile ? "0px" : `${imageProgress * 16}px`,
                paddingTop: isMobile ? "96px" : `${imageProgress * 16}px`,
                paddingBottom: isMobile ? "96px" : `${60 + imageProgress * 40}px`,
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
                    <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 22vw" className="object-cover" />
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
                  opacity: centerOpacity,
                  display: isMobile && imageProgress >= 0.98 ? "none" : "block",
                }}
              >
                <Image src={mainImageSrc} alt="Main hero display" fill sizes="100vw" className="object-cover" priority />

                {/* Overlay text — fades out on scroll */}
                <div
                  className="absolute inset-0 flex items-end overflow-hidden"
                  style={{ opacity: textOpacity }}
                >
                  <h1 className="w-full text-[9vw] sm:text-[8vw] font-black leading-[0.85] tracking-tighter text-white uppercase text-center md:text-left md:pl-8 pb-12 whitespace-nowrap">
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
                    <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 22vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll space to enable animation */}
        <div className="h-[200vh]" />
      </section>

      {/* Tagline Section */}
      <div className="relative z-10 px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44 bg-background">
        <p
          className="mx-auto max-w-2xl text-center text-xl sm:text-2xl leading-relaxed md:text-3xl lg:text-[2.5rem] lg:leading-snug font-medium"
          style={{ color: "var(--color-on-background)" }}
        >
          {tagline}
        </p>
      </div>
    </>
  );
}
