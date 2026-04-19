import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useServiceTypes } from "../hooks/useServiceTypes";
import type { ServiceTypeId } from "../types";
import { ServiceCard, ServiceCardSkeleton } from "./ServiceCard";

const FALLBACK_SERVICES = [
  {
    id: 1n as ServiceTypeId,
    name: "Gel Nails",
    slug: "gel-nails",
    description:
      "Long-lasting gel manicures with a flawless glossy finish that won't chip for weeks.",
  },
  {
    id: 2n as ServiceTypeId,
    name: "Acrylics",
    slug: "acrylics",
    description:
      "Durable acrylic extensions in any length or shape, perfect for a dramatic look.",
  },
  {
    id: 3n as ServiceTypeId,
    name: "Nail Art",
    slug: "nail-art",
    description:
      "Bespoke nail art designs from minimalist to intricate — your nails, your story.",
  },
  {
    id: 4n as ServiceTypeId,
    name: "Pedicures",
    slug: "pedicures",
    description:
      "Indulgent pedicure treatments that leave your feet silky soft and beautifully polished.",
  },
  {
    id: 5n as ServiceTypeId,
    name: "Gel-X",
    slug: "gel-x",
    description:
      "Soft-gel extensions that look natural and feel lightweight, lasting up to 3 weeks.",
  },
];

interface ServicesSectionProps {
  activeServiceId: ServiceTypeId | null;
  onServiceSelect: (id: ServiceTypeId | null) => void;
}

export function ServicesSection({
  activeServiceId,
  onServiceSelect,
}: ServicesSectionProps) {
  const { data: services, isLoading } = useServiceTypes();
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayServices =
    services && services.length > 0 ? services : FALLBACK_SERVICES;

  const scrollCards = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="py-20 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Our Services
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Premium Nail Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            From everyday elegance to special occasion artistry — we have a
            service for every occasion.
          </p>
        </motion.div>

        {/* Cards with scroll arrows */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollCards("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-3 bg-card border border-border shadow-md hidden sm:flex hover:bg-card/90 transition-smooth"
            data-ocid="services-scroll-left"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            data-ocid="services-scroll-container"
          >
            {/* "All" filter card */}
            <button
              type="button"
              onClick={() => onServiceSelect(null)}
              data-ocid="service-filter-all"
              className={`flex-shrink-0 snap-start flex flex-col items-start gap-3 p-5 rounded-2xl border text-left transition-smooth cursor-pointer w-52 sm:w-60 ${
                activeServiceId === null
                  ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-muted to-muted/60">
                <span role="img" aria-label="All">
                  🌟
                </span>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  All Designs
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse the full gallery
                </p>
              </div>
            </button>

            {isLoading
              ? Array.from({ length: 5 }, (_, i) => `skel-${i}`).map((key) => (
                  <div
                    key={key}
                    className="flex-shrink-0 snap-start w-52 sm:w-60"
                  >
                    <ServiceCardSkeleton />
                  </div>
                ))
              : displayServices.map((service, index) => (
                  <div
                    key={service.id.toString()}
                    className="flex-shrink-0 snap-start w-52 sm:w-60"
                  >
                    <ServiceCard
                      service={service}
                      isActive={activeServiceId === service.id}
                      onClick={() =>
                        onServiceSelect(
                          activeServiceId === service.id ? null : service.id,
                        )
                      }
                      index={index}
                    />
                  </div>
                ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollCards("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-3 bg-card border border-border shadow-md hidden sm:flex hover:bg-card/90 transition-smooth"
            data-ocid="services-scroll-right"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
