import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RK Auto Mobiles — Premium Automotive Marketplace",
  description:
    "Browse, buy, sell and compare premium vehicles at RK Auto Mobiles. Explore our curated collection of high-performance cars.",
  keywords: "cars, buy car, sell car, premium automotive, luxury vehicles, RK Auto",
  authors: [{ name: "RK Auto Mobiles" }],
  openGraph: {
    title: "RK Auto Mobiles",
    description: "Premium automotive marketplace for high-quality vehicles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
