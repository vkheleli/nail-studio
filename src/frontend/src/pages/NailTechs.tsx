import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, MapPin, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { BookingModal } from "../components/BookingModal";
import { type NailTech, useNailTechs } from "../hooks/useNailTechs";

// Town badge color mapping
const townColors: Record<string, string> = {
  Soweto: "bg-primary/15 text-primary border-primary/30",
  Vaal: "bg-accent/15 text-accent border-accent/30",
  Ficksburg: "bg-secondary text-secondary-foreground border-border",
};

// Avatar initials bg per tech
const avatarBg: Record<number, string> = {
  1: "bg-primary",
  2: "bg-accent",
  3: "bg-muted-foreground",
};

interface TechCardProps {
  tech: NailTech;
  index: number;
  onBook: (tech: NailTech) => void;
}

function TechCard({ tech, index, onBook }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`tech.card.${index + 1}`}
    >
      <Card className="bg-card border border-border rounded-2xl overflow-hidden surface-card hover:surface-elevated transition-smooth group h-full flex flex-col">
        {/* Card top accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary/50" />

        <CardContent className="p-6 flex flex-col gap-5 flex-1">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center text-xl font-display font-semibold text-primary-foreground shadow-sm flex-shrink-0",
                avatarBg[tech.id] ?? "bg-primary",
              )}
              aria-hidden
            >
              {tech.name[0]}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold text-foreground leading-tight">
                {tech.name}
              </h3>
              <Badge
                className={cn(
                  "mt-1 text-xs font-medium border rounded-full px-2.5 py-0.5",
                  townColors[tech.town] ?? "bg-muted text-muted-foreground",
                )}
                data-ocid={`tech.town.badge.${index + 1}`}
              >
                <MapPin className="w-2.5 h-2.5 mr-1" />
                {tech.town}
              </Badge>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary/60" />
            <span className="leading-snug">{tech.address}</span>
          </div>

          {/* Specialties */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <Star className="w-3 h-3 text-accent" />
              Specialties
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tech.specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="rounded-full text-xs font-medium px-2.5 py-0.5 bg-secondary text-secondary-foreground border border-border/60"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-2">
            <Button
              className="w-full shimmer-accent text-accent-foreground font-semibold rounded-xl py-2.5 group-hover:scale-[1.02] transition-smooth"
              onClick={() => onBook(tech)}
              data-ocid={`tech.book_button.${index + 1}`}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function NailTechsPage() {
  const { data: techs } = useNailTechs();
  const [selectedTech, setSelectedTech] = useState<NailTech | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBook = (tech: NailTech) => {
    setSelectedTech(tech);
    setBookingOpen(true);
  };

  return (
    <div
      className="flex flex-col min-h-[calc(100vh-4rem)]"
      data-ocid="nail-techs.page"
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        data-ocid="nail-techs.hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/nail-techs-hero.dim_1200x400.jpg')",
          }}
          aria-hidden
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-5">
              <Sparkles className="w-3 h-3" />3 Locations · 3 Experts
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-4">
              Meet Our Nail
              <br />
              <span className="text-primary">Technicians</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Three talented professionals across Soweto, Vaal, and Ficksburg —
              ready to create your perfect look.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards grid */}
      <section
        className="bg-background flex-1"
        data-ocid="nail-techs.list.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {techs.map((tech, i) => (
              <TechCard
                key={tech.id}
                tech={tech}
                index={i}
                onBook={handleBook}
              />
            ))}
          </div>

          {/* Callout note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-12 flex items-center justify-center gap-2"
          >
            <CalendarDays className="w-4 h-4 text-primary/60" />
            All appointment requests are subject to admin confirmation — you'll
            receive a follow-up via email.
          </motion.p>
        </div>
      </section>

      {bookingOpen && selectedTech && (
        <BookingModal
          tech={{
            id: String(selectedTech.id),
            name: selectedTech.name,
            location: `${selectedTech.town} — ${selectedTech.address}`,
            services: selectedTech.specialties,
          }}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  );
}
