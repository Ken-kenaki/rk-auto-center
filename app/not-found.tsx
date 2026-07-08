import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-6" style={{ background: "var(--color-background)" }}>
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text / Info Column */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-widest mb-6"
                style={{
                  background: "rgba(186,0,19,0.08)",
                  borderColor: "rgba(186,0,19,0.2)",
                  color: "var(--color-primary)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: "var(--color-primary)" }} />
                Error 404
              </div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight"
                style={{ fontFamily: "Hanken Grotesk", color: "var(--color-on-background)" }}
              >
                You've Drifted <br />
                <span style={{ color: "var(--color-primary)" }}>Off Course.</span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-gray-500 max-w-md">
                The road you're looking for doesn't exist, has been redirected, or has been temporarily taken offline.
              </p>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-surface-tint))",
                }}
              >
                <span className="material-symbols-outlined text-[18px]">home</span>
                Back to Showroom
              </Link>
              <Link
                href="/buy"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-gray-700 border hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
                style={{
                  borderColor: "var(--color-outline-variant)",
                }}
              >
                <span className="material-symbols-outlined text-[18px]">directions_car</span>
                Browse Inventory
              </Link>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400 font-medium">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link>
              <Link href="/privacy-policy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-red-600 transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Graphic / Image Column */}
          <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-100/50 bg-gray-50">
            <Image
              src="/404-hero.png"
              alt="Lost sports car on road at night representing 404 page"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
