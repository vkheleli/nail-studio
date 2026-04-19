import { useState } from "react";
import { ContactSection } from "../components/ContactSection";
import { GallerySection } from "../components/GallerySection";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import type { ServiceTypeId } from "../types";

export default function Home() {
  const [activeServiceId, setActiveServiceId] = useState<ServiceTypeId | null>(
    null,
  );

  return (
    <>
      <HeroSection />
      <ServicesSection
        activeServiceId={activeServiceId}
        onServiceSelect={setActiveServiceId}
      />
      <GallerySection activeServiceId={activeServiceId} />
      <ContactSection />
    </>
  );
}
