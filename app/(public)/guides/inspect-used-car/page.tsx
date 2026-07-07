import type { Metadata } from "next";
import Link from "next/link";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";

export const metadata: Metadata = {
  title: "How to Inspect a Used Car Before Buying — RK Auto Center",
  description:
    "A step-by-step guide to inspecting a used car before buying. Exterior, engine, interior, test drive, and paperwork tips from RK Auto Center experts.",
};

const steps = [
  {
    number: "01",
    icon: "directions_car",
    title: "Exterior Inspection",
    color: "#ba0013",
    checks: [
      {
        heading: "Body Panels & Paint",
        detail:
          "Stand at each corner and look down the length of each panel. Uneven panel gaps, ripples, or colour mismatches indicate past accidents or poor repairs.",
      },
      {
        heading: "Rust & Corrosion",
        detail:
          "Check wheel arches, sills, door bottoms, and the undercarriage for surface rust. Bubbling paint is always a red flag.",
      },
      {
        heading: "Glass & Lights",
        detail:
          "Examine all glass for chips or cracks. Test every light — headlights, indicators, brake, and reverse.",
      },
      {
        heading: "Tyres",
        detail:
          "Check tread depth across all four tyres. Uneven wear suggests alignment or suspension problems. Check the spare too.",
      },
    ],
  },
  {
    number: "02",
    icon: "settings",
    title: "Under the Bonnet",
    color: "#5353b4",
    checks: [
      {
        heading: "Engine Oil",
        detail:
          "Pull the dipstick — oil should be amber/brown. Milky oil can signal a blown head gasket, which is very expensive.",
      },
      {
        heading: "Coolant Level",
        detail:
          "Check the coolant reservoir. Brown or rusty coolant indicates the system hasn't been serviced regularly.",
      },
      {
        heading: "Battery",
        detail:
          "Look for corrosion on the terminals and check the age sticker. Batteries typically last 3–5 years.",
      },
      {
        heading: "Belts, Hoses & Leaks",
        detail:
          "Inspect rubber belts for cracks. Park over clean ground and check for oil, coolant, or brake fluid spots after a few minutes.",
      },
    ],
  },
  {
    number: "03",
    icon: "airline_seat_recline_extra",
    title: "Interior Condition",
    color: "#006847",
    checks: [
      {
        heading: "Seats & Upholstery",
        detail:
          "Check for tears, stains, and sagging. Heavy wear on the driver's seat bolster signals high mileage regardless of the odometer.",
      },
      {
        heading: "Warning Lights",
        detail:
          "Turn ignition to 'on' without starting. All warning lights should illuminate then go out once the engine runs. Any persistent light needs investigation.",
      },
      {
        heading: "Electronics & HVAC",
        detail:
          "Test every button: windows, mirrors, AC, heater, infotainment, reversing camera, and all USB ports.",
      },
      {
        heading: "Odometer vs. Service Records",
        detail:
          "Cross-reference the mileage with service stamps. Average usage is roughly 15,000–20,000 km per year.",
      },
    ],
  },
  {
    number: "04",
    icon: "speed",
    title: "Test Drive",
    color: "#ba0013",
    checks: [
      {
        heading: "Cold Start",
        detail:
          "Start the engine cold. Listen for knocking or rattling. Blue smoke means burning oil; white smoke may mean coolant issues.",
      },
      {
        heading: "Acceleration & Gears",
        detail:
          "Test full acceleration in each gear. Hesitation, slipping, or rough changes in automatics are costly repairs.",
      },
      {
        heading: "Braking",
        detail:
          "Find a clear road and brake firmly. The car should stop straight without pulling. Any grinding or vibration needs attention.",
      },
      {
        heading: "Steering & Suspension",
        detail:
          "Steering wheel should be centred. Drive over bumps and listen for clunking. On a highway, release briefly — the car should track straight.",
      },
    ],
  },
  {
    number: "05",
    icon: "description",
    title: "Paperwork & History",
    color: "#5353b4",
    checks: [
      {
        heading: "Bluebook & Registration",
        detail:
          "Verify Bluebook details match the car's VIN/chassis and engine numbers exactly. Any mismatch is a serious legal issue.",
      },
      {
        heading: "Ownership History",
        detail:
          "Request the full ownership history. Frequent ownership changes can indicate hidden problems.",
      },
      {
        heading: "Service History",
        detail:
          "A full dealer-stamped service history adds value. Look for regular oil changes and scheduled maintenance.",
      },
      {
        heading: "Insurance Status",
        detail:
          "Confirm the current insurance coverage and check for any pending claims or disputes.",
      },
    ],
  },
];

const quickTips = [
  { icon: "wb_sunny", tip: "Inspect in daylight — artificial light hides paint defects." },
  { icon: "water_drop", tip: "Visit after dry weather — rain hides rust and body damage." },
  { icon: "build", tip: "Take it to a trusted mechanic for a pre-purchase inspection." },
  { icon: "person", tip: "Bring someone knowledgeable — two sets of eyes catch more." },
  { icon: "payments", tip: "Never pay a deposit before the full inspection is complete." },
  { icon: "local_police", tip: "Verify the car is not stolen through official channels." },
];

export default function InspectUsedCarPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-background)" }}>

      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6" style={{ background: "var(--color-inverse-surface)" }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g1" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
                style={{ background: "rgba(186,0,19,0.15)", color: "var(--color-primary)" }}>
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                Buyer&apos;s Guide
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "Hanken Grotesk" }}>
                How to Inspect a<br />
                <span style={{ color: "var(--color-primary)" }}>Used Car</span> Before Buying
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                A thorough inspection can save you from costly surprises. Follow this expert
                checklist from RK Auto Center before you sign anything.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">schedule</span>15 min read</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">checklist</span>5 inspection stages</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">verified</span>Expert-reviewed</span>
              </div>
            </div>
            <div className="md:col-span-5 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="/about-hero-3.jpg"
                alt="Car Inspection Details"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">build</span>
                  Verify Mechanical Integrity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK TIPS BANNER */}
      <section className="bg-white border-b border-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex gap-6 flex-wrap justify-center">
          {quickTips.map((t, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-surface-container-low)" }}>
                <span className="material-symbols-outlined text-[18px]" style={{ color: "var(--color-primary)" }}>{t.icon}</span>
              </div>
              <span className="max-w-[200px] leading-tight">{t.tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-20">
        {steps.map((step, si) => (
          <ScrollRevealSection key={si} direction="up" delay={si * 50}>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: step.color }}>
                  <span className="material-symbols-outlined text-white text-[26px]">{step.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: step.color }}>Step {step.number}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight" style={{ fontFamily: "Hanken Grotesk" }}>{step.title}</h2>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {step.checks.map((check, ci) => (
                  <div key={ci} className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-white">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: step.color }}>
                        <span className="material-symbols-outlined text-white text-[12px]">check</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{check.heading}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed pl-8">{check.detail}</p>
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
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] mb-4 block" style={{ color: "var(--color-primary)" }}>handshake</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "Hanken Grotesk" }}>Let Our Experts Inspect For You</h2>
              <p className="text-white/60 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Every vehicle in the RK Auto Center inventory is pre-inspected by our certified technicians so you can buy with complete confidence.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/buy" className="px-8 py-4 rounded-2xl font-bold text-white text-sm btn-press shadow-lg shadow-red-500/20"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-surface-tint))" }}>
                  Browse Verified Cars
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
          <Link href="/guides/sell-your-car"
            className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            <div>
              <p className="text-xs text-gray-400 mb-1">Next Read</p>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors" style={{ fontFamily: "Hanken Grotesk" }}>
                How to Sell Your Used Car
              </h3>
              <p className="text-sm text-gray-500 mt-1">Get the best price for your vehicle with our expert tips.</p>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200">arrow_forward</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
