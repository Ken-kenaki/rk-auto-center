"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── Static data ────────────────────────────────────────────────────────── */
const PHONE_NUMBERS = ["+977 9847699255", "+977 9802008796", "+977 9802008797"];
const EMAIL = "info@rkautomobiles.com";
const FACEBOOK = "https://www.facebook.com/rkautocenter1";
const WHATSAPP = "https://wa.me/9779847699255";

// Google Maps embed for RK Auto Center Kathmandu
// Search query: RK Auto Center, Kathmandu
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.7!2d85.3140!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUksgQXV0byBDZW50ZXI!5e0!3m2!1sen!2snp!4v1699999999999";

const hours = [
  { day: "Sunday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Monday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Tuesday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Wednesday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Thursday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Friday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Saturday", time: "Closed", open: false },
];

const faqs = [
  {
    q: "Do I need an appointment to visit?",
    a: "Walk-ins are always welcome during business hours. However, if you'd like dedicated one-on-one time with a sales advisor or a specific vehicle reserved for your arrival, we recommend calling ahead.",
  },
  {
    q: "Can I bring a mechanic for an independent inspection?",
    a: "Absolutely. We encourage buyers to bring a trusted mechanic. Our inventory is pre-inspected, and we have nothing to hide. This is part of our commitment to transparent transactions.",
  },
  {
    q: "Is there parking available at the showroom?",
    a: "Yes, we have dedicated customer parking directly in front of the showroom at no charge.",
  },
  {
    q: "Do you offer test drives?",
    a: "Yes. Test drives are available for all vehicles in our showroom. Please bring a valid driving licence. Our staff member will accompany you.",
  },
  {
    q: "Can I get a vehicle valuation in person?",
    a: "Yes. Bring your car in and one of our experienced advisors will provide a free, no-obligation market valuation on the spot.",
  },
];

function isOpenNow(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour * 60 + minute;
  const openTime = 10 * 60;
  const closeTime = 18 * 60;
  if (day === 6) return { open: false, label: "Closed today (Saturday)" };
  if (currentTime >= openTime && currentTime < closeTime)
    return { open: true, label: "Open now · Closes at 6:00 PM" };
  if (currentTime < openTime)
    return { open: false, label: `Opens at 10:00 AM` };
  return { open: false, label: "Closed · Opens tomorrow at 10:00 AM" };
}

export default function VisitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const status = isOpenNow();

  return (
    <main className="min-h-screen" style={{ background: "var(--color-background)" }}>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6" style={{ background: "var(--color-inverse-surface)" }}>
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('/rk-des.jpg')`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(186,0,19,0.15) 0%, rgba(15,15,15,0.9) 100%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(186,0,19,0.25)", color: "var(--color-primary)", border: "1px solid rgba(186,0,19,0.4)" }}>
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              Find Us
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "Hanken Grotesk" }}>
              Visit RK Auto Center
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-10">
              Come see our premium inventory in person, speak with our expert advisors,
              and experience Nepal&apos;s finest automotive showroom firsthand.
            </p>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
              style={{
                background: status.open ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                color: status.open ? "#22c55e" : "#ef4444",
                border: status.open ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
              }}>
              <span className={`w-2 h-2 rounded-full ${status.open ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
              {status.label}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT QUICK LINKS ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "phone", label: "Call Us", value: PHONE_NUMBERS[0], href: `tel:${PHONE_NUMBERS[0].replace(/\s/g, "")}`, color: "#ba0013" },
            { icon: "chat", label: "WhatsApp", value: "Message us now", href: WHATSAPP, color: "#25D366" },
            { icon: "mail", label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, color: "#5353b4" },
            { icon: "share", label: "Facebook", value: "rkautocenter1", href: FACEBOOK, color: "#1877F2" },
          ].map((c, i) => (
            <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: `${c.color}18` }}>
                <span className="material-symbols-outlined text-[20px]" style={{ color: c.color }}>{c.icon}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{c.label}</span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors truncate w-full text-center">{c.value}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── MAP + DETAILS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">

          {/* Map embed — 3/5 width */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{ height: "480px" }}>
              <iframe
                title="RK Auto Center location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56500.63!2d85.2910!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb978d67f55f59fe2!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1699999999999"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=RK+Auto+Center+Kathmandu"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm font-semibold transition-colors group"
              style={{ color: "var(--color-primary)" }}
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Open in Google Maps
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </motion.div>

          {/* Details panel — 2/5 width */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Showroom Image Card */}
            <div className="relative h-[200px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-zinc-100 group">
              <img
                src="/rk-des.jpg"
                alt="RK Auto Center Showroom Kathmandu"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
                  Kathmandu Showroom Storefront
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--color-primary)" }}>
                  <span className="material-symbols-outlined text-white text-[16px]">location_on</span>
                </div>
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider" style={{ fontFamily: "Hanken Grotesk" }}>Address</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                RK Auto Center<br />
                Kathmandu, Nepal<br />
                <span className="text-xs text-gray-400 mt-1 block">Near major landmarks in Kathmandu Valley</span>
              </p>
              <a
                href="https://maps.google.com/?q=RK+Auto+Center+Kathmandu"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all"
                style={{ background: "var(--color-surface-container-low)", color: "var(--color-primary)" }}
              >
                <span className="material-symbols-outlined text-[14px]">directions</span>
                Get Directions
              </a>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#5353b4" }}>
                  <span className="material-symbols-outlined text-white text-[16px]">schedule</span>
                </div>
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider" style={{ fontFamily: "Hanken Grotesk" }}>Business Hours</h2>
              </div>
              <div className="space-y-2">
                {hours.map((h) => {
                  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
                  const isToday = h.day === today;
                  return (
                    <div key={h.day}
                      className={`flex justify-between items-center text-sm py-1.5 px-2 rounded-lg ${isToday ? "font-bold" : ""}`}
                      style={isToday ? { background: "var(--color-surface-container-low)" } : {}}>
                      <span className={isToday ? "text-gray-900" : "text-gray-500"}>{h.day}</span>
                      <span className={h.open ? (isToday ? "text-green-600" : "text-gray-600") : "text-red-500"}>
                        {h.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phones */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#006847" }}>
                  <span className="material-symbols-outlined text-white text-[16px]">phone</span>
                </div>
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider" style={{ fontFamily: "Hanken Grotesk" }}>Call Us</h2>
              </div>
              <div className="space-y-2">
                {PHONE_NUMBERS.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors group">
                    <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-red-500">phone_in_talk</span>
                    {p}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#1877F2" }}>
                  <span className="material-symbols-outlined text-white text-[16px]">share</span>
                </div>
                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider" style={{ fontFamily: "Hanken Grotesk" }}>Follow Us</h2>
              </div>
              <div className="flex gap-3">
                <a href={FACEBOOK} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#1877F2" }}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                  Facebook
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "#25D366" }}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.903-6.99C16.564 1.87 14.098.835 11.465.835c-5.437 0-9.86 4.423-9.865 9.865-.001 1.743.486 3.447 1.411 4.951L1.936 21.68l6.102-1.602z" /></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>Before You Visit</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between p-5 gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm leading-snug">{faq.q}</span>
                  <span className="material-symbols-outlined text-gray-400 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: "var(--color-inverse-surface)" }}>
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="material-symbols-outlined text-[48px] mb-4 block" style={{ color: "var(--color-primary)" }}>storefront</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "Hanken Grotesk" }}>We&apos;re Ready to Welcome You</h2>
            <p className="text-white/60 text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Browse our full inventory online before you visit, or simply walk in and let our team guide you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/buy" className="px-8 py-4 rounded-2xl font-bold text-white text-sm btn-press shadow-lg shadow-red-500/20"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-surface-tint))" }}>
                Browse Inventory
              </Link>
              <a href={`tel:${PHONE_NUMBERS[0].replace(/\s/g, "")}`}
                className="px-8 py-4 rounded-2xl font-bold text-sm btn-press flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span className="material-symbols-outlined text-[18px]">phone</span>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
