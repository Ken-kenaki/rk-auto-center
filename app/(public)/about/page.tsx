import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/AboutHeroSection";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";
import { FadeImage } from "@/components/fade-image";
import AboutCTA from "@/components/AboutCTA";
import { ClientGallerySection } from "@/components/ClientGallerySection";
import { GoogleReviewsEmbed } from "@/components/GoogleReviewsEmbed";
import { fetchAboutPageData } from "@/lib/pages-server";

export const metadata: Metadata = {
  title: "About Us — RK Auto Center",
  description: "Learn more about the legacy, philosophy, and client stories of RK Auto Center.",
};

export default async function AboutPage() {
  const aboutData = await fetchAboutPageData();

  return (
    <main className="min-h-screen bg-background pb-16">
      <AboutHeroSection
        word={aboutData.heroWord}
        mainImageSrc={aboutData.heroMainImage}
        sideImages={aboutData.heroSideImages}
        tagline={
          <span dangerouslySetInnerHTML={{ __html: aboutData.heroTagline }} />
        }
      />

      {/* ── COMPANY PROFILE ─────────────────────────────────────────── */}
      <section id="company-profile" className="py-16 md:py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollRevealSection direction="left">
            <p className="text-xs font-bold uppercase tracking-widest mb-3 md:mb-4" style={{ color: "var(--color-primary)" }}>
              {aboutData.profile.tag}
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 md:mb-8 leading-tight"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              {aboutData.profile.title}
            </h2>
            <ScrollRevealText text={aboutData.profile.text} />
          </ScrollRevealSection>

          <ScrollRevealSection direction="right" delay={200}>
            <div className="relative h-64 sm:h-80 md:h-[480px] w-full rounded-3xl overflow-hidden group shadow-xl">
              <FadeImage
                src={aboutData.profile.image}
                alt={aboutData.profile.title}
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
              {aboutData.whyUs.tag}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 md:mb-6"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              {aboutData.whyUs.title}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              {aboutData.whyUs.text}
            </p>
          </ScrollRevealSection>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-12 mb-14 md:mb-20">
            {aboutData.whyUs.cards.map((card, idx) => (
              <ScrollRevealSection key={idx} direction={idx % 2 === 0 ? "left" : "right"} delay={idx * 150}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group mb-4 md:mb-6 shadow-md">
                  <FadeImage
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                </div>
                <h4
                  className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
                  style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-surface)" }}
                >
                  {card.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {card.text}
                </p>
              </ScrollRevealSection>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-10 md:pt-12 border-t border-gray-100">
            {aboutData.whyUs.stats.map((stat, idx) => (
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
