"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealSectionProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function ScrollRevealSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealSectionProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsIntersecting(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getDirectionClasses = () => {
    switch (direction) {
      case "left":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-16";
      case "right":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-16";
      case "up":
      default:
        return isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
