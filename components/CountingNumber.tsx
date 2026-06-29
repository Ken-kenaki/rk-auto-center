"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CountingNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  once?: boolean;
  margin?: string;
}

export default function CountingNumber({
  value,
  suffix = "",
  duration = 1.2,
  once = true,
  margin = "-100px 0px",
}: CountingNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
