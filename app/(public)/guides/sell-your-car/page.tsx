import type { Metadata } from "next";
import Link from "next/link";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";

export const metadata: Metadata = {
  title: "How to Sell Your Used Car — RK Auto Center",
  description:
    "Expert tips on how to sell your used car fast and at the best price. Preparation, pricing, documentation, and listing advice from RK Auto Center.",
};

const stages = [
  {
    number: "01",
    icon: "build_circle",
    title: "Prepare Your Car",
    color: "#ba0013",
    tips: [
      {
        heading: "Deep Clean Inside & Out",
        detail:
          "A clean car photographs better and signals to buyers that it has been well-maintained. Invest in a professional valet — it often returns 3–5× its cost in sale price.",
      },
      {
        heading: "Fix Minor Defects",
        detail:
          "Small dents, scratched alloys, and cracked trim are cheap to fix but dramatically lower perceived value. Address them before listing.",
      },
      {
        heading: "Service It",
        detail:
          "A fresh oil change, new filters, and topped-up fluids reassure buyers. A recent service stamp in the book adds tangible value.",
      },
      {
        heading: "Gather All Paperwork",
        detail:
          "Compile the Bluebook, full service history, insurance documents, and any warranty certificates. Missing paperwork slows or kills sales.",
      },
    ],
  },
  {
    number: "02",
    icon: "price_check",
    title: "Set the Right Price",
    color: "#5353b4",
    tips: [
      {
        heading: "Research the Market",
        detail:
          "Check listing prices for the same make, model, year, and mileage on local platforms. Your price should be competitive but leave room to negotiate.",
      },
      {
        heading: "Factor in Condition",
        detail:
          "Honestly assess your car's condition against comparable listings. A car with full service history commands a 5–10% premium.",
      },
      {
        heading: "Avoid Overpricing",
        detail:
          "An overpriced listing gets ignored. It's better to price at market and receive multiple offers than to sit unsold for months.",
      },
      {
        heading: "Know Your Walk-Away Number",
        detail:
          "Decide the minimum you will accept before any negotiation begins so you don't make emotional decisions under pressure.",
      },
    ],
  },
  {
    number: "03",
    icon: "photo_camera",
    title: "Create a Great Listing",
    color: "#006847",
    tips: [
      {
        heading: "Take Quality Photos",
        detail:
          "Shoot in good natural light on a clean background. Cover all angles — front, rear, both sides, interior, dashboard, boot, engine bay, and any defects.",
      },
      {
        heading: "Write an Honest Description",
        detail:
          "List all features, service history highlights, reasons for selling, and any known faults. Transparency builds trust and prevents time-wasters.",
      },
      {
        heading: "Include All Key Details",
        detail:
          "Year, make, model, variant, fuel type, mileage, colour, transmission, and asking price. Incomplete listings are filtered out by serious buyers.",
      },
      {
        heading: "Choose the Right Platforms",
        detail:
          "List on multiple platforms simultaneously. For Nepal, include local classified sites, Facebook Marketplace, and dealer networks like RK Auto Center.",
      },
    ],
  },
  {
    number: "04",
    icon: "groups",
    title: "Handle Enquiries",
    color: "#ba0013",
    tips: [
      {
        heading: "Respond Quickly",
        detail:
          "Serious buyers move on fast. Aim to respond to every enquiry within a few hours. Delayed responses lose sales.",
      },
      {
        heading: "Pre-qualify Buyers",
        detail:
          "Before scheduling a viewing, confirm the buyer is genuinely interested and has the funds. Ask if they are ready to buy soon.",
      },
      {
        heading: "Meet Safely",
        detail:
          "Meet buyers in public, well-lit locations. Bring a friend if possible. Never hand over the keys without ID verification.",
      },
      {
        heading: "Allow a Test Drive — Carefully",
        detail:
          "Accompany the buyer on the test drive. Ensure they are licensed and insured. Keep the route short and local.",
      },
    ],
  },
  {
    number: "05",
    icon: "task_alt",
    title: "Close the Sale",
    color: "#5353b4",
    tips: [
      {
        heading: "Negotiate Confidently",
        detail:
          "Expect offers below asking price. Counter with a small reduction rather than jumping to your minimum. Be polite but firm.",
      },
      {
        heading: "Accept Safe Payment Only",
        detail:
          "Prefer bank transfer or certified cheque. Never release the vehicle until funds are fully cleared. Avoid cash for large amounts.",
      },
      {
        heading: "Complete the Transfer Paperwork",
        detail:
          "Both parties must sign the Bluebook ownership transfer form. Complete this at the transport office to make the transfer official.",
      },
      {
        heading: "Cancel Your Insurance",
        detail:
          "Notify your insurer the same day you transfer ownership. You may be entitled to a partial refund for unused coverage.",
      },
    ],
  },
];

const sellBenefits = [
  { icon: "storefront", title: "List With RK Auto Center", desc: "Reach thousands of verified buyers actively looking for quality vehicles in Nepal." },
  { icon: "support_agent", title: "Free Valuation", desc: "Our experts provide an honest, no-obligation market valuation for your vehicle." },
  { icon: "security", title: "Secure Transactions", desc: "We facilitate safe payment and paperwork so you never handle it alone." },
  { icon: "speed", title: "Sell Faster", desc: "Our buyer network means your car is seen by serious buyers — not time-wasters." },
];

export default function SellYourCarPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-background)" }}>

      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6" style={{ background: "var(--color-inverse-surface)" }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g2" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g2)" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
                style={{ background: "rgba(186,0,19,0.15)", color: "var(--color-primary)" }}>
                <span className="material-symbols-outlined text-[14px]">sell</span>
                Seller&apos;s Guide
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "Hanken Grotesk" }}>
                How to Sell Your<br />
                <span style={{ color: "var(--color-primary)" }}>Used Car</span> the Right Way
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                Get the best price, avoid the pitfalls, and close quickly. This guide covers
                everything from preparation to handing over the keys.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">schedule</span>12 min read</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">checklist</span>5 proven stages</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">verified</span>Expert-reviewed</span>
              </div>
            </div>
            <div className="md:col-span-5 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="/about-hero-2.jpg"
                alt="Selling Your Car"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">payments</span>
                  Maximize Resale Value
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELL WITH US STRIP */}
      <section className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-black uppercase tracking-widest mb-6" style={{ color: "var(--color-primary)" }}>Why Sell With RK Auto Center</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellBenefits.map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl" style={{ background: "var(--color-surface-container-low)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "var(--color-primary)" }}>
                  <span className="material-symbols-outlined text-white text-[22px]">{b.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: "Hanken Grotesk" }}>{b.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-20">
        {stages.map((stage, si) => (
          <ScrollRevealSection key={si} direction="up" delay={si * 50}>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: stage.color }}>
                  <span className="material-symbols-outlined text-white text-[26px]">{stage.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: stage.color }}>Stage {stage.number}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight" style={{ fontFamily: "Hanken Grotesk" }}>{stage.title}</h2>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {stage.tips.map((tip, ti) => (
                  <div key={ti} className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-white">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: stage.color }}>
                        <span className="material-symbols-outlined text-white text-[12px]">check</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{tip.heading}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed pl-8">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollRevealSection>
        ))}
      </div>

      {/* CTA */}
      <ScrollRevealSection direction="up">
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: "var(--color-inverse-surface)" }}>
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] mb-4 block" style={{ color: "var(--color-primary)" }}>sell</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "Hanken Grotesk" }}>Ready to Sell Your Car?</h2>
              <p className="text-white/60 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Submit your vehicle details and our team will contact you with a free valuation within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/sell" className="px-8 py-4 rounded-2xl font-bold text-white text-sm btn-press shadow-lg shadow-red-500/20"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-surface-tint))" }}>
                  List My Car Now
                </Link>
                <Link href="/visit" className="px-8 py-4 rounded-2xl font-bold text-sm btn-press"
                  style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                  Visit Our Showroom
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollRevealSection>

      {/* RELATED */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: "var(--color-primary)" }}>Related Guide</p>
          <Link href="/guides/inspect-used-car"
            className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            <div>
              <p className="text-xs text-gray-400 mb-1">Also Read</p>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors" style={{ fontFamily: "Hanken Grotesk" }}>
                How to Inspect a Used Car Before Buying
              </h3>
              <p className="text-sm text-gray-500 mt-1">Know what to look for so you never get a bad deal.</p>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200">arrow_forward</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
