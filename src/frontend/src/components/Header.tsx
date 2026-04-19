import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Our Techs", href: "/nail-techs" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      // If already on home page, scroll directly; otherwise navigate then scroll
      if (router.state.location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        void router.navigate({ to: "/" }).then(() => {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        });
      }
    }
  };

  return (
    <header
      data-ocid="header-nav"
      className={cn(
        "sticky top-0 z-50 w-full transition-smooth",
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-card border-b border-border/60",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="header-logo"
        >
          <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
            Majestic Nails
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all hover:after:w-full"
                data-ocid={`header-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-primary after:transition-all hover:after:w-full"
                activeProps={{ className: "text-foreground after:w-full" }}
                data-ocid={`header-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link to="/admin">
            <Button
              variant="outline"
              size="sm"
              className="ml-2 border-primary/40 text-primary hover:bg-primary/10 hover:text-primary font-medium"
              data-ocid="admin-login-btn"
            >
              Admin Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                data-ocid="mobile-menu-btn"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <span className="font-display text-base font-semibold text-foreground">
                    Majestic Nails
                  </span>
                </div>
                <nav
                  className="flex flex-col gap-1 p-4 flex-1"
                  aria-label="Mobile navigation"
                >
                  {navLinks.map((link) =>
                    link.href.startsWith("/#") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className="px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        data-ocid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        activeProps={{ className: "text-foreground bg-muted" }}
                        data-ocid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link to="/admin" onClick={() => setMobileOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary/40 text-primary hover:bg-primary/10"
                        data-ocid="mobile-admin-btn"
                      >
                        Admin Login
                      </Button>
                    </Link>
                  </div>
                </nav>
                <div className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Majestic Beauty & Nails Bar
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
