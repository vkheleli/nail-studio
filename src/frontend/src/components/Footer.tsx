import { Separator } from "@/components/ui/separator";
import { Clock, Heart, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiPinterest, SiTiktok } from "react-icons/si";
import { useContactInfo } from "../hooks/useContactInfo";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/auroranails",
    Icon: SiInstagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/auroranails",
    Icon: SiFacebook,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/auroranails",
    Icon: SiPinterest,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@auroranails",
    Icon: SiTiktok,
  },
];

export function Footer() {
  const { data: contactInfo } = useContactInfo();

  const phone = contactInfo?.phone ?? "+1 (555) 234-5678";
  const email = contactInfo?.email ?? "hello@auroranails.com";
  const address =
    contactInfo?.address ??
    "2255 Blossom Avenue, Suite 12, Los Angeles, CA 90028";
  const hours = contactInfo?.hours ?? "Tue–Sat: 9am–7pm · Sun: 10am–5pm";

  return (
    <footer
      className="bg-primary text-primary-foreground mt-auto"
      data-ocid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold tracking-wide">
              Aurora Nails
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Artistry on your fingertips. Premium nail services crafted with
              love and precision.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/30 transition-smooth"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-semibold">Contact</h4>
            <ul className="space-y-2.5" data-ocid="footer-contact-info">
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary-foreground transition-colors underline-offset-2 hover:underline"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>

          {/* Links column */}
          <div className="space-y-3">
            <h4 className="font-display text-base font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {[
                { label: "Our Services", href: "/#services" },
                { label: "Portfolio Gallery", href: "/#gallery" },
                { label: "Contact Us", href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = href.slice(2);
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-primary-foreground transition-colors hover:underline underline-offset-2"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Aurora Nails. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 fill-current text-primary-foreground/80" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground transition-colors underline-offset-2 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
