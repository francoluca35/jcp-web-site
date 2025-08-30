import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";  
import { ModernCatalog } from "./components/ModernCatalog";
import { PartsAndServicesSection } from "./components/PartsAndServicesSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <main>
        <HeroSection />
        <ModernCatalog />
        <PartsAndServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}