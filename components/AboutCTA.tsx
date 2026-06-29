"use client";

import Link from "next/link";
import React from "react";
import { useContact } from "@/context/ContactContext";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";

import { motion } from "framer-motion";

export default function AboutCTA() {
  const { openContactModal } = useContact();

  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto">
      <ScrollRevealSection direction="up">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}>
          Find Your Dream Drive
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-10 max-w-2xl mx-auto">
          Whether you are looking to acquire a rare supercar, sell your current vehicle, or need bespoke sourcing, our specialists are ready to guide you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/buy" 
              className="px-10 py-4 text-white rounded-full font-bold text-base hover:opacity-90 transition-all inline-block shadow-lg"
              style={{ background: "var(--color-primary)" }}
            >
              Browse Inventory
            </Link>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openContactModal}
            className="px-10 py-4 text-white rounded-full font-bold text-base hover:opacity-90 transition-all inline-block shadow-lg cursor-pointer bg-slate-900 hover:bg-slate-800"
          >
            Contact Us
          </motion.button>
        </div>
      </ScrollRevealSection>
    </section>
  );
}
