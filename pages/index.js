import Head from 'next/head'
import { Header } from "../components/Header"
import { HeroSection } from "../components/HeroSection"
import { ModernCatalog } from "../components/ModernCatalog"
import { PartsAndServicesSection } from "../components/PartsAndServicesSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import { FloatingBar } from "../components/FloatingBar"

export default function Home() {
  return (
    <>
      <Head>
        <title>JCP - Maquinaria Industrial para Panaderías</title>
        <meta name="description" content="Líderes en maquinaria industrial para panaderías. Hornos, amasadoras, repuestos y servicio técnico 24/7. Más de 20 años de experiencia." />
        <meta name="keywords" content="maquinaria panadería, hornos industriales, amasadoras,sobadoras, repuestos panadería, servicio técnico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]">
        <Header />
        <main>
          <HeroSection />
          <ModernCatalog />
          <PartsAndServicesSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingBar />
      </div>
    </>
  )
}