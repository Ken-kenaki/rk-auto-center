import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visit RK Auto Center — Showroom Location, Hours & Contact",
  description:
    "Find RK Auto Center in Kathmandu, Nepal. View our showroom location on Google Maps, business hours, phone numbers, and directions.",
};

export default function VisitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
