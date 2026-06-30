"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MOCK_TESTIMONIALS, Testimonial } from "@/lib/testimonials";
import { getFilePreviewUrl } from "@/lib/utils";
import { TESTIMONIALS_BUCKET_ID } from "@/lib/constants";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials = MOCK_TESTIMONIALS }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Calculate section height based on content width
  const calculateHeight = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Height = viewport height + the extra scroll needed to reveal all content
    // We add a tiny buffer for a smooth start and end
    const totalHeight = viewportHeight + Math.max(0, containerWidth - viewportWidth);
    setSectionHeight(`${totalHeight}px`);
  }, [testimonials]);

  useEffect(() => {
    // Small delay to ensure container is fully rendered and image dimensions are set
    const timer = setTimeout(calculateHeight, 200);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, [calculateHeight]);

  const updateTransform = useCallback(() => {
    if (!sectionRef.current || !containerRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Total scroll distance needed to reveal all testimonials
    const totalScrollDistance = containerWidth - viewportWidth;
    if (totalScrollDistance <= 0) {
      setTranslateX(0);
      return;
    }
    
    // Current scroll position within this section
    const scrolled = Math.max(0, -rect.top);
    
    // Progress from 0 to 1
    const progress = Math.min(1, scrolled / totalScrollDistance);
    
    // Calculate new translateX
    const newTranslateX = progress * -totalScrollDistance;
    
    setTranslateX(newTranslateX);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  return (
    <section 
      id="client-testimonials"
      ref={sectionRef}
      className="relative w-full bg-neutral-950 text-white overflow-visible"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Horizontal scrolling container */}
        <div 
          ref={containerRef}
          className="flex gap-8 px-12 items-center"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: 1000,
            WebkitPerspective: 1000,
            touchAction: 'pan-y',
          }}
        >
          {/* Intro Card */}
          <div 
            className="w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 pr-8"
            style={{ transform: 'translateZ(0)' }}
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-3">
              Client Stories
            </p>
            <h2 
              className="text-4xl md:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "Hanken Grotesk" }}
            >
              Words from <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                Our Patrons
              </span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              At RK Auto Center, client satisfaction is our sole benchmark. Swipe or scroll down to see the real journeys of our luxury car buyers and sellers.
            </p>
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs">
              <span>Scroll down to slide</span>
              <span className="material-symbols-outlined animate-pulse text-[18px]">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Testimonial Cards */}
          {testimonials.map((t, idx) => {
            const avatarUrl = t.avatar_id 
              ? getFilePreviewUrl(t.avatar_id, TESTIMONIALS_BUCKET_ID, 120, 120, 80)
              : "";
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={t.id}
                className="relative h-[65vh] w-[85vw] sm:w-[65vw] md:w-[48vw] lg:w-[35vw] flex-shrink-0 overflow-hidden rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-neutral-800 shadow-2xl hover:border-red-500/30 transition-all duration-500 group"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-6 right-8 text-neutral-800/20 text-[10rem] font-serif font-black select-none pointer-events-none group-hover:text-red-500/5 transition-colors duration-500">
                  “
                </div>
                <div className="absolute -inset-px rounded-[2.5rem] bg-gradient-to-r from-red-500/0 to-amber-500/0 group-hover:from-red-500/10 group-hover:to-amber-500/10 transition-all duration-500 pointer-events-none" />

                {/* Rating stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`material-symbols-outlined text-[20px] ${
                        i < t.rating ? "text-amber-500 fill-amber-500" : "text-neutral-700"
                      }`}
                      style={{ fontVariationSettings: i < t.rating ? "'FILL' 1" : "" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-neutral-300 font-medium italic text-base md:text-lg leading-relaxed relative z-10 my-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Client info */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-900">
                  {avatarUrl ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-500/20 group-hover:border-red-500/50 transition-colors duration-500">
                      <Image
                        src={avatarUrl}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-black tracking-wider flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--color-primary, #dc2626), #991b1b)" }}
                    >
                      {initials}
                    </div>
                  )}

                  <div>
                    <h5 className="font-extrabold text-sm md:text-base text-white tracking-tight leading-tight group-hover:text-red-400 transition-colors duration-300">
                      {t.name}
                    </h5>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
