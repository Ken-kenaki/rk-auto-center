import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service — RK Auto Mobiles",
  description:
    "Read the Terms of Service for RK Auto Mobiles. Understand your rights and responsibilities when using our platform.",
};

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the RK Auto Mobiles website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our platform.",
      "We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms. We will notify users of significant changes via a prominent notice on our website.",
    ],
  },
  {
    id: "use-of-service",
    title: "Use of Our Services",
    content: [
      "RK Auto Mobiles provides an online marketplace for buying and selling vehicles in Nepal. By using our services, you agree to:",
      "**Lawful Use:** Use the platform only for lawful purposes and in accordance with these Terms. You must not use our services in any way that violates applicable local, national, or international laws.",
      "**Accurate Information:** Provide truthful, accurate, and complete information in all listings, inquiries, and communications. Misrepresentation of vehicle details or personal information is strictly prohibited.",
      "**Non-Interference:** Not disrupt, damage, or impair the functionality of our platform, servers, or networks.",
      "**No Unauthorized Access:** Not attempt to gain unauthorized access to any part of our platform or other users' accounts.",
    ],
  },
  {
    id: "vehicle-listings",
    title: "Vehicle Listings",
    content: [
      "When listing a vehicle on our platform, you agree to the following:",
      "**Ownership Verification:** You must be the legal owner of the vehicle or have explicit authorization from the owner to list it for sale.",
      "**Accurate Descriptions:** All vehicle details, including make, model, year, mileage, condition, and pricing, must be accurate and not misleading.",
      "**Legal Compliance:** The vehicle must not be stolen, have any undisclosed liens, or be subject to any legal restrictions that would prevent its sale.",
      "**Photographs:** Images submitted with listings must be genuine photographs of the actual vehicle being listed. Stock images or photos from other sources are not permitted.",
      "RK Auto Mobiles reserves the right to remove any listing that violates these terms or that we deem inappropriate, without prior notice.",
    ],
  },
  {
    id: "transactions",
    title: "Transactions & Payments",
    content: [
      "RK Auto Mobiles acts as a marketplace facilitator and is not a party to any transaction between buyers and sellers. We do not handle payments, hold funds in escrow, or guarantee the completion of any sale.",
      "**Buyer Responsibility:** Buyers are responsible for independently verifying all vehicle details, conducting test drives, and performing due diligence before completing a purchase.",
      "**Seller Responsibility:** Sellers are responsible for ensuring all documentation (ownership transfer, tax clearance, etc.) is in order before completing a sale.",
      "**Disputes:** In the event of a dispute between a buyer and seller, RK Auto Mobiles may provide assistance but is not obligated to mediate or resolve the dispute.",
      "We strongly recommend both parties conduct all transactions in person and through secure, traceable payment methods.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "All content on the RK Auto Mobiles platform — including but not limited to text, graphics, logos, icons, images, and software — is the exclusive property of RK Auto Mobiles or its content suppliers and is protected by applicable intellectual property laws.",
      "**User Content:** By submitting content (such as vehicle listings, photos, or reviews), you grant RK Auto Mobiles a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content for the purpose of operating and promoting our services.",
      "**Restrictions:** You may not copy, reproduce, modify, distribute, or create derivative works from any content on our platform without explicit written permission from RK Auto Mobiles.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers & Limitation of Liability",
    content: [
      "**Platform Availability:** We strive to maintain platform availability but cannot guarantee uninterrupted access. We are not liable for any downtime or technical issues.",
      "**No Warranty on Listings:** RK Auto Mobiles does not warrant or guarantee the accuracy, completeness, or quality of any vehicle listing posted by users. All listings are provided by third-party sellers.",
      "**Limitation of Liability:** To the maximum extent permitted by applicable law, RK Auto Mobiles shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our platform, even if advised of the possibility of such damages.",
      "**Third-Party Services:** We are not responsible for the content, practices, or policies of any third-party websites linked from our platform.",
    ],
  },
  {
    id: "prohibited-activities",
    title: "Prohibited Activities",
    content: [
      "The following activities are strictly prohibited on the RK Auto Mobiles platform:",
      "**Fraudulent Listings:** Posting false, misleading, or fraudulent vehicle listings.",
      "**Spam & Unsolicited Communications:** Sending unsolicited messages, advertisements, or promotional content to other users.",
      "**Price Manipulation:** Artificially inflating or deflating vehicle prices to manipulate the market.",
      "**Harassment:** Harassing, threatening, or abusing other users of the platform.",
      "**Data Scraping:** Using automated tools to scrape, collect, or harvest data from our platform without authorization.",
      "Violation of these prohibitions may result in immediate account suspension or termination, and may be reported to relevant authorities.",
    ],
  },
  {
    id: "termination",
    title: "Account Termination",
    content: [
      "RK Auto Mobiles reserves the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe:",
      "Violates these Terms of Service or any applicable laws and regulations.",
      "Is harmful to other users, third parties, or the interests of RK Auto Mobiles.",
      "Creates liability for us or our partners.",
      "Upon termination, your right to use the platform ceases immediately. Provisions of these Terms that by their nature should survive termination shall continue to apply.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms or your use of our platform shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.",
      "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
];

function renderContent(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold" style={{ color: "var(--color-on-background)" }}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function TermsOfServicePage() {
  const lastUpdated = "July 8, 2026";

  return (
    <main className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden border-b"
        style={{ background: "var(--color-surface-container-low)", borderColor: "var(--color-surface-container-high)" }}
      >
        {/* Background layers */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(245,158,11,0.07)" }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(186,0,19,0.05)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tos-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#191c1e" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tos-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image side */}
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl order-2 md:order-1">
              <Image
                src="/terms-hero.png"
                alt="Terms of service legal document illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Text side */}
            <div className="order-1 md:order-2">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.25)", color: "#b45309" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#d97706" }} />
                Legal Document
              </div>
              <h1
                className="text-4xl sm:text-5xl font-black mb-5 leading-tight"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
              >
                Terms of{" "}
                <span style={{ color: "#d97706" }}>Service</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-500">
                Please read these terms carefully before using RK Auto Mobiles. By using our platform,
                you agree to these terms and conditions.
              </p>
              <p className="text-sm text-gray-400">
                Last updated:{" "}
                <span className="font-medium" style={{ color: "var(--color-on-surface)" }}>{lastUpdated}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Intro card */}
          <div
            className="rounded-2xl border p-6 md:p-8 mb-12"
            style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-surface-container-high)" }}
          >
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Welcome to <span className="font-semibold" style={{ color: "#d97706" }}>RK Auto Mobiles</span>. These
              Terms of Service govern your use of our website located at{" "}
              <span className="font-semibold" style={{ color: "var(--color-primary)" }}>rkautomobiles.com</span> and all
              related services. These terms constitute a legally binding agreement between you and
              RK Auto Mobiles. If you are using our services on behalf of an organization, you
              represent that you have the authority to bind that organization to these terms.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                className="rounded-2xl border transition-all duration-300 p-6 md:p-8 hover:shadow-md"
                style={{ background: "var(--color-surface-container-lowest)", borderColor: "var(--color-outline-variant)" }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#b45309" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="text-xl md:text-2xl font-bold"
                    style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
                  >
                    {section.title}
                  </h2>
                </div>
                <div className="ml-12 space-y-3">
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx} className="text-gray-500 leading-relaxed text-sm md:text-base">
                      {renderContent(para)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div
            className="mt-14 rounded-2xl border p-8 md:p-10 text-center"
            style={{ background: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}
          >
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              Questions About Our Terms?
            </h3>
            <p className="text-gray-500 text-sm mb-7 max-w-lg mx-auto">
              If you have any questions or need clarification about these Terms of Service, please
              contact our team. We're happy to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:rk960511@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "var(--color-primary)" }}
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                rk960511@gmail.com
              </a>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:shadow-sm"
                style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}
              >
                View Privacy Policy
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
