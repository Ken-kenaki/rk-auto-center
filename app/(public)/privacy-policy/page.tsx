import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy — RK Auto Mobiles",
  description:
    "Read the Privacy Policy of RK Auto Mobiles. Learn how we collect, use, and protect your personal information.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "When you use our platform, we may collect the following types of information:",
      "**Personal Identification Information:** Name, email address, phone number, and other contact details you voluntarily provide when submitting inquiries, registering an account, or listing a vehicle.",
      "**Vehicle Information:** Details about cars you list for sale, including make, model, year, price, mileage, and photographs.",
      "**Usage Data:** Information about how you interact with our website, including pages visited, time spent, browser type, device information, and IP address.",
      "**Communication Data:** Messages and inquiries you send through our contact forms or directly to our team.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      "We use the information we collect for the following purposes:",
      "**Service Delivery:** To process your vehicle listings, inquiries, and facilitate connections between buyers and sellers.",
      "**Communication:** To respond to your questions, send booking confirmations, and provide customer support.",
      "**Platform Improvement:** To analyze usage patterns and improve the functionality, performance, and user experience of our platform.",
      "**Marketing (with consent):** To send promotional offers and newsletters if you have opted in. You may unsubscribe at any time.",
      "**Legal Compliance:** To comply with applicable laws, regulations, and legal processes.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Disclosure",
    content: [
      "We respect your privacy and do not sell your personal information to third parties. We may share your information only in the following limited circumstances:",
      "**Service Providers:** With trusted third-party vendors who assist us in operating our website and services (e.g., cloud hosting, analytics), bound by confidentiality agreements.",
      "**Business Transactions:** In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.",
      "**Legal Requirements:** When required by law, court order, or government authority to disclose information.",
      "**Safety & Security:** To protect the rights, property, or safety of RK Auto Mobiles, our users, or the public.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These include:",
      "**Encryption:** All data transmissions are secured using SSL/TLS encryption.",
      "**Access Controls:** Only authorized personnel have access to personal data, and they are bound by confidentiality obligations.",
      "**Regular Audits:** We regularly review our security practices and update them to address emerging threats.",
      "Despite our best efforts, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our platform:",
      "**Essential Cookies:** Required for the website to function properly, such as maintaining your session state.",
      "**Analytics Cookies:** Help us understand how visitors interact with our site (e.g., Google Analytics).",
      "**Preference Cookies:** Remember your settings and preferences for future visits.",
      "You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect site functionality.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      "You have the following rights regarding your personal data:",
      "**Access:** Request a copy of the personal information we hold about you.",
      "**Correction:** Request correction of inaccurate or incomplete data.",
      "**Deletion:** Request deletion of your personal data, subject to legal obligations.",
      "**Objection:** Object to the processing of your data for certain purposes.",
      "**Portability:** Request transfer of your data to another service provider.",
      "To exercise any of these rights, please contact us at rk960511@gmail.com.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently. This Privacy Policy applies only to information collected through RK Auto Mobiles' platform.",
    ],
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of significant changes by posting a prominent notice on our website or by contacting you directly.",
      "Continued use of our platform after any changes constitutes your acceptance of the updated policy. The effective date at the top of this page will always reflect the most recent revision.",
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

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 8, 2026";

  return (
    <main className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden border-b"
        style={{ background: "var(--color-surface-container-low)", borderColor: "var(--color-surface-container-high)" }}
      >
        {/* Background layers */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(186,0,19,0.07)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(83,83,180,0.05)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pp-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#191c1e" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pp-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text side */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background: "rgba(186,0,19,0.08)", borderColor: "rgba(186,0,19,0.2)", color: "var(--color-primary)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-primary)" }} />
                Legal Document
              </div>
              <h1
                className="text-4xl sm:text-5xl font-black mb-5 leading-tight"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
              >
                Privacy{" "}
                <span style={{ color: "var(--color-primary)" }}>Policy</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-500">
                Your privacy matters to us. This policy explains how RK Auto Mobiles collects, uses,
                and protects your personal information.
              </p>
              <p className="text-sm text-gray-400">
                Last updated:{" "}
                <span className="font-medium" style={{ color: "var(--color-on-surface)" }}>{lastUpdated}</span>
              </p>
            </div>
            {/* Image side */}
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/privacy-hero.png"
                alt="Privacy and data security illustration"
                fill
                className="object-cover"
                priority
              />
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
              RK Auto Mobiles ("we," "our," or "us") is committed to protecting your personal
              information and your right to privacy. This Privacy Policy applies to all information
              collected through our website{" "}
              <span className="font-semibold" style={{ color: "var(--color-primary)" }}>rkautomobiles.com</span> and any related
              services, sales, marketing, or events. Please read this policy carefully to understand
              our practices.
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
                    style={{ background: "rgba(186,0,19,0.1)", border: "1px solid rgba(186,0,19,0.2)", color: "var(--color-primary)" }}
                  >
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
            style={{ background: "rgba(186,0,19,0.05)", borderColor: "rgba(186,0,19,0.15)" }}
          >
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
            >
              Questions About Our Privacy Policy?
            </h3>
            <p className="text-gray-500 text-sm mb-7 max-w-lg mx-auto">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how
              we handle your data, please don't hesitate to reach out.
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
                href="/terms-of-service"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:shadow-sm"
                style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}
              >
                View Terms of Service
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
