"use client";

import Script from "next/script";

export function GoogleReviewsEmbed() {
  return (
    <section
      id="google-reviews"
      className="py-16 md:py-24 px-6 md:px-12"
      style={{ background: "var(--color-surface-container-lowest, #fafafa)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            What People Say
          </p>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
          >
            Google Reviews
          </h2>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div
          className="elfsight-app-11f83572-ec17-4de9-9c65-d784943151cb"
          data-elfsight-app-lazy
        />
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}
