import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/AboutHeroSection";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";
import { FadeImage } from "@/components/fade-image";
import AboutCTA from "@/components/AboutCTA";

export const metadata: Metadata = {
  title: "About Us — RK Auto Center",
  description: "Learn more about the legacy, philosophy, and client stories of RK Auto Center.",
};

const aboutSideImages = [
  {
    src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000",
    alt: "Luxury Porsche interior details",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000",
    alt: "Classic sports car beauty shot",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000",
    alt: "Red Ferrari tail design",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000",
    alt: "Sleek automotive design engineering",
    position: "right",
    span: 1,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-16">
      <AboutHeroSection
        word="LEGACY"
        mainImageSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000"
        sideImages={aboutSideImages}
        tagline={
          <>
            Redefining the luxury automotive marketplace.
            <br />
            Curating state-of-the-art drives since 2016.
          </>
        }
      />

      {/* ── COMPANY PROFILE ─────────────────────────────────────────── */}
      <section id="company-profile" className="py-16 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollRevealSection direction="left">
            <p className="text-xs font-bold uppercase tracking-widest mb-3 md:mb-4" style={{ color: "var(--color-primary)" }}>
              Company Profile
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 md:mb-8 leading-tight"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              The Pinnacle of Automotive Integrity
            </h2>
            <ScrollRevealText
              text="Founded on the principles of absolute transparency and visual majesty, RK Auto has been the premier destination for serious automotive enthusiasts. We specialize in curating, verifying, and matching world-class supercars and luxury daily drivers with those who appreciate excellence."
            />
          </ScrollRevealSection>

          <ScrollRevealSection direction="right" delay={200}>
            <div className="relative h-64 sm:h-80 md:h-[480px] w-full rounded-3xl overflow-hidden group shadow-xl">
              <FadeImage
                src="https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1000"
                alt="Range Rover Luxury Display"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────────── */}
      <section id="why-us" className="py-16 md:py-24 bg-white px-6 md:px-12 lg:px-20 overflow-hidden border-y border-gray-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <ScrollRevealSection direction="up" className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3 md:mb-4" style={{ color: "var(--color-primary)" }}>
              Why Choose Us
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 md:mb-6"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              The RK Auto Experience
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              We combine elite concierge services with data-driven evaluation tools to deliver a seamless,
              high-end experience for both buyers and sellers of premium automobiles.
            </p>
          </ScrollRevealSection>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-12 mb-14 md:mb-20">
            <ScrollRevealSection direction="left">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group mb-4 md:mb-6 shadow-md">
                <FadeImage
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000"
                  alt="Elite Interiors"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
              <h4
                className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}
              >
                Meticulous Inspection
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Every vehicle on our platform undergoes a rigorous 150-point diagnostic check by certified
                mechanics, verifying everything from telemetry logs to paint depth.
              </p>
            </ScrollRevealSection>

            <ScrollRevealSection direction="right" delay={150}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group mb-4 md:mb-6 shadow-md">
                <FadeImage
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000"
                  alt="Bespoke Concierge"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
              <h4
                className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}
              >
                Bespoke Acquisition
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                If the specific build you want is not in our inventory, our sourcing division connects with
                private collectors worldwide to secure and ship it directly to you.
              </p>
            </ScrollRevealSection>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-10 md:pt-12 border-t border-gray-100">
            {[
              { value: "10+",  label: "Years Experience" },
              { value: "500+", label: "Premium Cars Sold" },
              { value: "98%",  label: "Customer Satisfaction" },
              { value: "100%", label: "Inspected Inventory" },
            ].map((stat, idx) => (
              <ScrollRevealSection
                key={idx}
                direction="up"
                delay={idx * 100}
                className="text-center p-4 md:p-6 bg-gray-50/50 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="text-3xl md:text-4xl font-black mb-1.5 md:mb-2 tracking-tight"
                  style={{ fontFamily: "Hanken Grotesk", color: "var(--color-primary)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section id="testimonials" className="py-16 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
        <ScrollRevealSection direction="up" className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 md:mb-4" style={{ color: "var(--color-primary)" }}>
            Client Testimonials
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-3 md:mb-4"
            style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
          >
            Trusted by the Discerning
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Read what elite car collectors, everyday luxury drivers, and performance enthusiasts say about
            their RK Auto transactions.
          </p>
        </ScrollRevealSection>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {[
            {
              quote:
                "The acquisition of my 911 Carrera S was completely transparent. The 150-point inspection gave me total peace of mind, and the car arrived in showroom condition.",
              author: "Marcus Vance",
              role: "Private Collector",
              avatar: "MV",
            },
            {
              quote:
                "I sold my Range Rover in less than a week using RK Auto's seller platform. They handled the paperwork, logistics, and verification seamlessly. Stellar service.",
              author: "Elena Rostova",
              role: "Tech Entrepreneur",
              avatar: "ER",
            },
            {
              quote:
                "Their side-by-side comparison engine helped me weigh the telemetry specs between the e-tron GT and Taycan. Outstanding UI and unparalleled staff support.",
              author: "Dr. Aris Thorne",
              role: "Performance Enthusiast",
              avatar: "AT",
            },
          ].map((item, idx) => (
            <ScrollRevealSection
              key={idx}
              direction="up"
              delay={idx * 150}
              className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-[40px] md:text-[48px] text-red-100 block mb-4 md:mb-6">
                  format_quote
                </span>
                <p className="text-gray-700 italic leading-relaxed text-sm mb-6 md:mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-4 pt-5 md:pt-6 border-t border-gray-50">
                <div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0"
                  style={{ background: "var(--color-secondary)" }}
                >
                  {item.avatar}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900 leading-tight">{item.author}</h5>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </ScrollRevealSection>
          ))}
        </div>
      </section>

      {/* ── LUXURY CTA ────────────────────────────────────────────── */}
      <AboutCTA />
    </main>
  );
}
