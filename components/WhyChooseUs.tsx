"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: "verified",
    title: "Genuine, Verified Vehicles",
    description:
      "Every car in our lot is physically inspected, RC-verified, and carries a transparent service history — no hidden surprises, ever.",
    color: "from-red-600 to-red-500",
    glassColor: "text-red-500",
  },
  {
    icon: "price_check",
    title: "Fair & Honest Pricing",
    description:
      "We price every vehicle based on actual market rates in Nepal. No inflated tags, no back-and-forth — what you see is what you pay.",
    color: "from-amber-500 to-yellow-500",
    glassColor: "text-amber-500",
  },
  {
    icon: "compare_arrows",
    title: "Smart Side-by-Side Compare",
    description:
      "Can't decide between two models? Line them up side-by-side with full specs so you can make a confident, informed decision.",
    color: "from-emerald-500 to-green-500",
    glassColor: "text-emerald-500",
  },
  {
    icon: "handshake",
    title: "After-Sale Support",
    description:
      "Our relationship doesn't end at the sale. We're here for documentation, registration guidance, and any concerns that come up after you drive off.",
    color: "from-blue-600 to-indigo-500",
    glassColor: "text-blue-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-black/80" />

      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest text-white border border-white/20 shadow-sm mb-5"
          >
            <span className="material-symbols-outlined text-[16px] text-amber-400 fill">
              auto_awesome
            </span>
            <span>Why Choose Us</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            Why Buyers Trust RK Auto Center
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto"
          >
            From Kathmandu to your driveway — we make buying a used car simple,
            transparent, and stress-free.
          </motion.p>
        </div>

        {/* Glassmorphism Cards — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 hover:bg-white/[0.18] hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <span
                  className={`material-symbols-outlined text-[28px] ${f.glassColor}`}
                >
                  {f.icon}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-white leading-snug mb-2.5">
                {f.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/buy"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white shadow-xl hover:shadow-2xl font-bold rounded-xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: "var(--color-primary)" }}
          >
            <span>Browse All Vehicles</span>
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
