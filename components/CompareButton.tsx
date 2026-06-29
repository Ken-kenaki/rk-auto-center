"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";

interface FlyingItem {
  id: string;
  imageUrl: string;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  endX: number;
  endY: number;
}

interface CompareButtonProps {
  carId: string;
  carName: string;
  /** URL of the hero / first image to fly to the Compare nav link */
  heroImage: string;
}

export default function CompareButton({ carId, carName, heroImage }: CompareButtonProps) {
  const { compareIds, addToCompare, removeFromCompare } = useCompare();
  const added = compareIds.includes(carId);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const triggerFly = () => {
    if (added) {
      removeFromCompare(carId);
      return;
    }

    // Detect which target to fly to: desktop Compare link vs mobile hamburger
    const desktopLink = document.getElementById("navbar-compare-link");
    const mobileBtn   = document.getElementById("mobile-menu-button");

    // getBoundingClientRect returns zeros for elements hidden via display:none ancestors
    const desktopRect = desktopLink?.getBoundingClientRect();
    const isDesktopVisible = desktopRect && desktopRect.width > 0 && desktopRect.height > 0;

    const target: HTMLElement | null = isDesktopVisible ? desktopLink : mobileBtn;

    if (!target || !buttonRef.current) {
      addToCompare(carId);
      return;
    }

    // Use the hero image element on the page as the source, fall back to button if not found
    const heroEl = document.querySelector<HTMLImageElement>("[data-compare-hero]");
    const sourceEl = heroEl ?? buttonRef.current;
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Center the flying thumbnail on the target's center point
    const THUMB_W = 36;
    const THUMB_H = 30;

    const newItem: FlyingItem = {
      id: Math.random().toString(36).substring(2, 9),
      imageUrl: heroImage,
      startX: sourceRect.left,
      startY: sourceRect.top,
      startWidth: sourceRect.width,
      startHeight: sourceRect.height,
      endX: targetRect.left + targetRect.width  / 2 - THUMB_W / 2,
      endY: targetRect.top  + targetRect.height / 2 - THUMB_H / 2,
    };

    setFlyingItems((prev) => [...prev, newItem]);
    addToCompare(carId);

    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== newItem.id));
    }, 850);
  };

  return (
    <>
      {/* Bezier flight overlay — covers the whole viewport */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        <AnimatePresence>
          {flyingItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                position: "fixed",
                left: item.startX,
                top: item.startY,
                width: item.startWidth,
                height: item.startHeight,
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
                borderRadius: "12px",
              }}
              animate={{
                left: item.endX,
                top: item.endY,
                width: 36,
                height: 30,
                opacity: [1, 0.9, 0.5, 0],
                scale: 0.08,
                rotate: -10,
                filter: "blur(3px)",
              }}
              exit={{ opacity: 0 }}
              transition={{
                left:    { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
                top:     { duration: 0.85, ease: [0.455, 0.03, 0.515, 0.955] },
                opacity: { duration: 0.85, ease: "easeIn" },
                scale:   { duration: 0.85, ease: "easeInOut" },
                rotate:  { duration: 0.85, ease: "easeOut" },
                filter:  { duration: 0.85, ease: "easeIn" },
              }}
              className="shadow-2xl overflow-hidden border border-white/20 bg-gray-100"
            >
              {item.imageUrl && (
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* The actual button */}
      <button
        ref={buttonRef}
        onClick={triggerFly}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-sm btn-press ${
          added
            ? "text-white shadow-md hover:bg-red-700"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        style={added ? { background: "var(--color-primary)" } : {}}
      >
        <span className="material-symbols-outlined text-[18px]">
          {added ? "check_circle" : "compare_arrows"}
        </span>
        {added ? "Added to Compare" : "Compare This Car"}
      </button>
    </>
  );
}
