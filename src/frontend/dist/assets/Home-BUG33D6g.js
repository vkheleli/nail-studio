import { c as createLucideIcon, u as useSubmitContactMessage, r as reactExports, j as jsxRuntimeExports, B as Button, a as useContactInfo, P as Phone, M as Mail, b as MapPin, C as Clock, d as cn, S as Skeleton, R as Root, e as Content, f as Close, X, T as Title, g as Portal, O as Overlay } from "./index-C_6JvaI4.js";
import { L as Label, I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Textarea, B as Badge } from "./badge-Dt4fKIIr.js";
import { u as useServiceTypes, a as ue, b as useGallery, c as useGalleryByService } from "./useGallery-D6MW_Beo.js";
import { m as motion } from "./proxy-CWHNj8an.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const DEFAULT_SERVICES = [
  "Gel Nails",
  "Acrylics",
  "Nail Art",
  "Pedicures",
  "Gel-X",
  "Other"
];
function ContactForm() {
  const submit = useSubmitContactMessage();
  const { data: services } = useServiceTypes();
  const serviceOptions = services && services.length > 0 ? services.map((s) => s.name) : DEFAULT_SERVICES;
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: "",
    preferredService: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (!form.preferredService)
      newErrors.preferredService = "Please select a service";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submit.mutateAsync(form);
      ue.success("Message sent!", {
        description: "We'll get back to you within 24 hours."
      });
      setForm({ name: "", email: "", message: "", preferredService: "" });
      setErrors({});
    } catch {
      ue.error("Failed to send", {
        description: "Please try again or call us directly."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-5",
      noValidate: true,
      "data-ocid": "contact-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "contact-name",
                placeholder: "Jane Smith",
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                onBlur: () => !form.name.trim() && setErrors((e) => ({ ...e, name: "Name is required" })),
                "aria-invalid": !!errors.name,
                "data-ocid": "contact-name-input",
                className: errors.name ? "border-destructive focus-visible:ring-destructive/30" : ""
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-email", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "contact-email",
                type: "email",
                placeholder: "jane@example.com",
                value: form.email,
                onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                onBlur: () => {
                  if (!form.email.trim())
                    setErrors((e) => ({ ...e, email: "Email is required" }));
                },
                "aria-invalid": !!errors.email,
                "data-ocid": "contact-email-input",
                className: errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""
              }
            ),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-service", children: "Preferred Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.preferredService,
              onValueChange: (v) => {
                setForm((f) => ({ ...f, preferredService: v }));
                setErrors((e) => ({ ...e, preferredService: void 0 }));
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "contact-service",
                    "data-ocid": "contact-service-select",
                    className: errors.preferredService ? "border-destructive" : "",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a service…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: serviceOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
              ]
            }
          ),
          errors.preferredService && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.preferredService })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-message", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "contact-message",
              placeholder: "Tell us about the look you have in mind, preferred appointment date, or any questions…",
              rows: 5,
              value: form.message,
              onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })),
              onBlur: () => !form.message.trim() && setErrors((e) => ({ ...e, message: "Message is required" })),
              "aria-invalid": !!errors.message,
              "data-ocid": "contact-message-input",
              className: errors.message ? "border-destructive focus-visible:ring-destructive/30" : ""
            }
          ),
          errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            disabled: submit.isPending,
            "data-ocid": "contact-submit-btn",
            className: "w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium group transition-smooth",
            children: submit.isPending ? "Sending…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Send Message",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" })
            ] })
          }
        )
      ]
    }
  );
}
const FALLBACK = {
  phone: "+1 (555) 234-5678",
  email: "hello@auroranails.com",
  address: "2255 Blossom Avenue, Suite 12, Los Angeles, CA 90028",
  hours: "Tue–Sat: 9am–7pm · Sun: 10am–5pm",
  bookingUrl: "#contact"
};
const contactItems = (info) => [
  {
    icon: Phone,
    label: "Phone",
    value: info.phone,
    href: `tel:${info.phone.replace(/\D/g, "")}`
  },
  {
    icon: Mail,
    label: "Email",
    value: info.email,
    href: `mailto:${info.email}`
  },
  {
    icon: MapPin,
    label: "Address",
    value: info.address,
    href: `https://maps.google.com?q=${encodeURIComponent(info.address)}`
  },
  {
    icon: Clock,
    label: "Hours",
    value: info.hours,
    href: null
  }
];
function ContactSection() {
  const { data: rawInfo } = useContactInfo();
  const info = rawInfo ? {
    phone: rawInfo.phone || FALLBACK.phone,
    email: rawInfo.email || FALLBACK.email,
    address: rawInfo.address || FALLBACK.address,
    hours: rawInfo.hours || FALLBACK.hours,
    bookingUrl: rawInfo.bookingUrl || FALLBACK.bookingUrl
  } : FALLBACK;
  const items = contactItems(info);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "py-20 bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight", children: "Book Your Appointment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed", children: "Ready to treat yourself? Reach out to schedule a session or ask us anything — we love hearing from you." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-10 lg:gap-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.55 },
          className: "lg:col-span-2 flex flex-col gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl p-7 border border-border surface-card space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: "Contact Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", "data-ocid": "contact-info-list", children: items.map(({ icon: Icon, label, value, href }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5", children: label }),
                  href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href,
                      target: href.startsWith("http") ? "_blank" : void 0,
                      rel: href.startsWith("http") ? "noopener noreferrer" : void 0,
                      className: "text-sm text-foreground hover:text-primary transition-colors break-words",
                      children: value
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground break-words", children: value })
                ] })
              ] }, label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary rounded-3xl p-7 text-primary-foreground shimmer-accent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-2", children: "Ready to Book?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mb-5 leading-relaxed", children: "Use our online booking system to schedule your appointment at a time that works for you." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "secondary",
                  size: "lg",
                  "data-ocid": "contact-book-cta",
                  className: "bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border border-primary-foreground/30 font-medium group transition-smooth w-full",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: info.bookingUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: [
                        "Book Online",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" })
                      ]
                    }
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay: 0.1 },
          className: "lg:col-span-3 bg-card rounded-3xl p-7 sm:p-10 border border-border surface-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-6", children: "Send Us a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, {})
          ]
        }
      )
    ] })
  ] }) });
}
function GalleryImage({ image, index, onClick }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const src = image.image.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, scale: 0.96 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.4, delay: index % 6 * 0.06 },
      className: "group relative overflow-hidden rounded-2xl cursor-pointer bg-muted surface-card w-full text-left",
      onClick,
      "data-ocid": `gallery-image-${image.id.toString()}`,
      "aria-label": `View ${image.title}`,
      children: [
        !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-square rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: image.title,
            loading: "lazy",
            onLoad: () => setLoaded(true),
            className: cn(
              "w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105",
              loaded ? "opacity-100" : "opacity-0 absolute inset-0"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground text-sm font-medium truncate", children: image.title }) })
      ]
    }
  );
}
function GalleryImageSkeleton({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-2xl overflow-hidden bg-muted animate-pulse",
        index % 5 === 0 ? "aspect-[3/4]" : "aspect-square"
      )
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate
}) {
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, hasPrev, hasNext, onNavigate]);
  if (!image) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-4xl w-full p-0 overflow-hidden bg-foreground border-0 shadow-2xl",
      "data-ocid": "lightbox-dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: image.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onClose,
            "aria-label": "Close lightbox",
            "data-ocid": "lightbox-close",
            className: "absolute top-3 right-3 z-20 bg-foreground/60 hover:bg-foreground/80 text-primary-foreground rounded-full w-9 h-9",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
          hasPrev && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => onNavigate(currentIndex - 1),
              "aria-label": "Previous image",
              "data-ocid": "lightbox-prev",
              className: "absolute left-3 z-20 bg-foreground/60 hover:bg-foreground/80 text-primary-foreground rounded-full w-9 h-9",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image.image.getDirectURL(),
              alt: image.title,
              className: "w-full max-h-[80vh] object-contain"
            }
          ),
          hasNext && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => onNavigate(currentIndex + 1),
              "aria-label": "Next image",
              "data-ocid": "lightbox-next",
              className: "absolute right-3 z-20 bg-foreground/60 hover:bg-foreground/80 text-primary-foreground rounded-full w-9 h-9",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-foreground/95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground font-medium text-sm", children: image.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/50 text-xs mt-0.5", children: [
            currentIndex + 1,
            " / ",
            images.length
          ] })
        ] })
      ]
    }
  ) });
}
const SAMPLE_GALLERY = [
  {
    id: 1n,
    title: "Rose Gel Manicure",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 1n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-gel-nails.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function() {
        return this;
      }
    }
  },
  {
    id: 2n,
    title: "Classic Acrylics",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 2n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-acrylics.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function() {
        return this;
      }
    }
  },
  {
    id: 3n,
    title: "Floral Nail Art",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 3n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-nail-art.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function() {
        return this;
      }
    }
  },
  {
    id: 4n,
    title: "Spa Pedicure",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 4n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-pedicure.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function() {
        return this;
      }
    }
  },
  {
    id: 5n,
    title: "Gel-X French Tips",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 5n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-gelx.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function() {
        return this;
      }
    }
  },
  {
    id: 6n,
    title: "Marble Nail Design",
    createdAt: BigInt(Date.now()),
    serviceTypeId: 3n,
    image: {
      getDirectURL: () => "/assets/generated/gallery-marble.dim_600x600.jpg",
      getBytes: async () => new Uint8Array(),
      withUploadProgress: function() {
        return this;
      }
    }
  }
];
function GalleryContent({ activeServiceId }) {
  const allQuery = useGallery();
  const byServiceQuery = useGalleryByService(activeServiceId ?? 0n);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const isFiltered = activeServiceId !== null;
  const query = isFiltered ? byServiceQuery : allQuery;
  const isLoading = query.isLoading;
  const rawImages = query.data ?? [];
  const filteredSample = isFiltered ? SAMPLE_GALLERY.filter((i) => i.serviceTypeId === activeServiceId) : SAMPLE_GALLERY;
  const displayImages = rawImages.length > 0 ? rawImages : filteredSample.length > 0 ? filteredSample : SAMPLE_GALLERY;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery-grid", "data-ocid": "gallery-loading", children: Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryImageSkeleton, { index: i }, key)) }) : displayImages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "gallery-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-5", children: "💅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "No designs yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-sm", children: "Check back soon — our artists are working on something beautiful!" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery-grid", "data-ocid": "gallery-grid", children: displayImages.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      GalleryImage,
      {
        image,
        index,
        onClick: () => setLightboxIndex(index)
      },
      image.id.toString()
    )) }),
    lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageLightbox,
      {
        images: displayImages,
        currentIndex: lightboxIndex,
        onClose: () => setLightboxIndex(null),
        onNavigate: setLightboxIndex
      }
    )
  ] });
}
function GallerySection({ activeServiceId }) {
  var _a;
  const { data: services } = useServiceTypes();
  const activeLabel = activeServiceId !== null ? ((_a = services == null ? void 0 : services.find((s) => s.id === activeServiceId)) == null ? void 0 : _a.name) ?? "Filtered" : "All Designs";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "gallery", className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3", children: "Our Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight", children: "Portfolio Gallery" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Showing:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20", children: activeLabel })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryContent, { activeServiceId })
  ] }) });
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "home", className: "w-full", "aria-label": "Hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: "/assets/tistalogo.jpeg",
      alt: "Majestic Beauty & Nails Bar",
      className: "w-full block",
      style: { display: "block" }
    }
  ) });
}
const SERVICE_ICONS = {
  "gel-nails": "💅",
  acrylics: "✨",
  "nail-art": "🎨",
  pedicures: "🌸",
  "gel-x": "💎",
  "french-tips": "🤍"
};
const SERVICE_COLORS = [
  "from-primary/10 to-primary/5",
  "from-accent/10 to-accent/5",
  "from-secondary to-secondary/60",
  "from-primary/8 to-accent/8",
  "from-accent/12 to-primary/8"
];
function ServiceCard({
  service,
  isActive,
  onClick,
  index
}) {
  const icon = SERVICE_ICONS[service.slug] ?? "💅";
  const gradientClass = SERVICE_COLORS[index % SERVICE_COLORS.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      onClick,
      "data-ocid": `service-card-${service.slug}`,
      className: cn(
        "group relative flex flex-col items-start gap-3 p-5 rounded-2xl border text-left transition-smooth cursor-pointer w-full",
        isActive ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-md" : "border-border bg-card hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
      ),
      "aria-pressed": isActive,
      children: [
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl ring-2 ring-primary/30 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br transition-smooth",
              isActive ? "from-primary/20 to-primary/10" : gradientClass
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-hidden": "true", children: icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-tight", children: service.name }),
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-0 shrink-0",
                children: "Active"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-2", children: service.description })
        ] })
      ]
    }
  );
}
function ServiceCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 rounded bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full rounded bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3/4 rounded bg-muted" })
    ] })
  ] });
}
const FALLBACK_SERVICES = [
  {
    id: 1n,
    name: "Gel Nails",
    slug: "gel-nails",
    description: "Long-lasting gel manicures with a flawless glossy finish that won't chip for weeks."
  },
  {
    id: 2n,
    name: "Acrylics",
    slug: "acrylics",
    description: "Durable acrylic extensions in any length or shape, perfect for a dramatic look."
  },
  {
    id: 3n,
    name: "Nail Art",
    slug: "nail-art",
    description: "Bespoke nail art designs from minimalist to intricate — your nails, your story."
  },
  {
    id: 4n,
    name: "Pedicures",
    slug: "pedicures",
    description: "Indulgent pedicure treatments that leave your feet silky soft and beautifully polished."
  },
  {
    id: 5n,
    name: "Gel-X",
    slug: "gel-x",
    description: "Soft-gel extensions that look natural and feel lightweight, lasting up to 3 weeks."
  }
];
function ServicesSection({
  activeServiceId,
  onServiceSelect
}) {
  const { data: services, isLoading } = useServiceTypes();
  const scrollRef = reactExports.useRef(null);
  const displayServices = services && services.length > 0 ? services : FALLBACK_SERVICES;
  const scrollCards = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "py-20 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3", children: "Our Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight", children: "Premium Nail Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed", children: "From everyday elegance to special occasion artistry — we have a service for every occasion." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => scrollCards("left"),
          "aria-label": "Scroll left",
          className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-3 bg-card border border-border shadow-md hidden sm:flex hover:bg-card/90 transition-smooth",
          "data-ocid": "services-scroll-left",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: scrollRef,
          className: "flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory",
          style: { scrollbarWidth: "none", msOverflowStyle: "none" },
          "data-ocid": "services-scroll-container",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onServiceSelect(null),
                "data-ocid": "service-filter-all",
                className: `flex-shrink-0 snap-start flex flex-col items-start gap-3 p-5 rounded-2xl border text-left transition-smooth cursor-pointer w-52 sm:w-60 ${activeServiceId === null ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-md" : "border-border bg-card hover:border-primary/40 hover:shadow-md"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-muted to-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": "All", children: "🌟" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground", children: "All Designs" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Browse the full gallery" })
                  ] })
                ]
              }
            ),
            isLoading ? Array.from({ length: 5 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-shrink-0 snap-start w-52 sm:w-60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCardSkeleton, {})
              },
              key
            )) : displayServices.map((service, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-shrink-0 snap-start w-52 sm:w-60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ServiceCard,
                  {
                    service,
                    isActive: activeServiceId === service.id,
                    onClick: () => onServiceSelect(
                      activeServiceId === service.id ? null : service.id
                    ),
                    index
                  }
                )
              },
              service.id.toString()
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => scrollCards("right"),
          "aria-label": "Scroll right",
          className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-3 bg-card border border-border shadow-md hidden sm:flex hover:bg-card/90 transition-smooth",
          "data-ocid": "services-scroll-right",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
        }
      )
    ] })
  ] }) });
}
function Home() {
  const [activeServiceId, setActiveServiceId] = reactExports.useState(
    null
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServicesSection,
      {
        activeServiceId,
        onServiceSelect: setActiveServiceId
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySection, { activeServiceId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, {})
  ] });
}
export {
  Home as default
};
