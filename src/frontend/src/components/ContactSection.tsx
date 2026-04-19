import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useContactInfo } from "../hooks/useContactInfo";
import { ContactForm } from "./ContactForm";

const FALLBACK = {
  phone: "+1 (555) 234-5678",
  email: "hello@auroranails.com",
  address: "2255 Blossom Avenue, Suite 12, Los Angeles, CA 90028",
  hours: "Tue–Sat: 9am–7pm · Sun: 10am–5pm",
  bookingUrl: "#contact",
};

const contactItems = (info: typeof FALLBACK) => [
  {
    icon: Phone,
    label: "Phone",
    value: info.phone,
    href: `tel:${info.phone.replace(/\D/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: info.email,
    href: `mailto:${info.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: info.address,
    href: `https://maps.google.com?q=${encodeURIComponent(info.address)}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: info.hours,
    href: null,
  },
];

export function ContactSection() {
  const { data: rawInfo } = useContactInfo();
  const info = rawInfo
    ? {
        phone: rawInfo.phone || FALLBACK.phone,
        email: rawInfo.email || FALLBACK.email,
        address: rawInfo.address || FALLBACK.address,
        hours: rawInfo.hours || FALLBACK.hours,
        bookingUrl: rawInfo.bookingUrl || FALLBACK.bookingUrl,
      }
    : FALLBACK;

  const items = contactItems(info);

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Book Your Appointment
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Ready to treat yourself? Reach out to schedule a session or ask us
            anything — we love hearing from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: contact info + booking CTA */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-card rounded-3xl p-7 border border-border surface-card space-y-5">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Contact Information
              </h3>
              <ul className="space-y-4" data-ocid="contact-info-list">
                {items.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-foreground hover:text-primary transition-colors break-words"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground break-words">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking CTA card */}
            <div className="bg-primary rounded-3xl p-7 text-primary-foreground shimmer-accent">
              <h3 className="font-display text-xl font-semibold mb-2">
                Ready to Book?
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-5 leading-relaxed">
                Use our online booking system to schedule your appointment at a
                time that works for you.
              </p>
              <Button
                asChild
                variant="secondary"
                size="lg"
                data-ocid="contact-book-cta"
                className="bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border border-primary-foreground/30 font-medium group transition-smooth w-full"
              >
                <a
                  href={info.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Online
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3 bg-card rounded-3xl p-7 sm:p-10 border border-border surface-card"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Send Us a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
