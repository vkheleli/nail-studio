import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-foreground"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-nails.dim_1600x900.jpg"
          alt="Aurora Nails hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-foreground text-xs font-medium tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Premium Nail Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] tracking-tight mb-5"
          >
            Artistry on Your{" "}
            <span className="text-primary italic">Fingertips</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-primary-foreground/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-md"
          >
            Discover curated nail designs and premium services crafted with love
            and precision. Your beauty, our canvas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              size="lg"
              data-ocid="hero-book-cta"
              onClick={() => scrollTo("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-7 py-3 shadow-lg transition-smooth group"
            >
              Book Appointment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero-gallery-cta"
              onClick={() => scrollTo("gallery")}
              className="border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-medium px-7 py-3 transition-smooth"
            >
              View Gallery
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-primary-foreground/50 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="w-px h-8 bg-gradient-to-b from-primary-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
