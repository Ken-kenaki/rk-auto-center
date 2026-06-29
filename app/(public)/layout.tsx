import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { CompareProvider } from "@/context/CompareContext";
import { ContactProvider } from "@/context/ContactContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactProvider>
      <CompareProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactModal />
      </CompareProvider>
    </ContactProvider>
  );
}
