"use client";

import Link from "next/link";
import React from "react";
import { useContact } from "@/context/ContactContext";

import { motion } from "framer-motion";

export default function HomeCTA() {
  const { openContactModal } = useContact();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, var(--color-inverse-surface) 0%, #1a1a2e 100%)" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 70% 50%, var(--color-primary) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
              style={{ fontFamily: "Hanken Grotesk" }}
            >
              Ready to Sell Your Car?
            </h2>
            <p className="text-base opacity-70 mb-8 max-w-md mx-auto text-white">
              List your vehicle in minutes and reach thousands of verified buyers, or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all"
                  style={{
                    background: "var(--color-primary)",
                    boxShadow: "0 8px 32px rgba(186,0,19,0.4)",
                  }}
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  List Your Vehicle
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openContactModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-gray-800 bg-white transition-all cursor-pointer shadow-lg hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">contact_support</span>
                Contact Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
