import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/AboutHeroSection";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";
import { FadeImage } from "@/components/fade-image";
import AboutCTA from "@/components/AboutCTA";
import { ClientGallerySection } from "@/components/ClientGallerySection";
import { GoogleReviewsEmbed } from "@/components/GoogleReviewsEmbed";

export const metadata: Metadata = {
  title: "About Us — RK Auto Center",
  description: "Learn more about the legacy, philosophy, and client stories of RK Auto Center.",
};

const aboutSideImages = [
  {
    src: "/about-hero-1.jpg",
    alt: "Happy client with their new car",
    position: "left",
    span: 1,
  },
  {
    src: "/about-hero-2.jpg",
    alt: "Client receiving car keys",
    position: "left",
    span: 1,
  },
  {
    src: "/about-hero-3.jpg",
    alt: "Client posing with their vehicle",
    position: "right",
    span: 1,
  },
  {
    src: "/about-hero-4.jpg",
    alt: "Satisfied customer at RK Auto Center",
    position: "right",
    span: 1,
  },
];

export default async function AboutPage() {

  return (
    <main className="min-h-screen bg-background pb-16">
      <AboutHeroSection
        word="RK AUTO CENTER"
        mainImageSrc="/about-1.jpg"
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
              { value: "10+", label: "Years Experience" },
              { value: "500+", label: "Premium Cars Sold" },
              { value: "98%", label: "Customer Satisfaction" },
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

      {/* ── CLIENT GALLERY ───────────────────────────────────────────── */}
      <ClientGallerySection />

      {/* ── GOOGLE REVIEWS ──────────────────────────────────────────── */}
      <GoogleReviewsEmbed />

      {/* ── LUXURY CTA ────────────────────────────────────────────── */}
      <AboutCTA />
    </main>
  );
}
