import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactMessage } from "../hooks/useContactInfo";
import { useServiceTypes } from "../hooks/useServiceTypes";

interface FormState {
  name: string;
  email: string;
  message: string;
  preferredService: string;
}

const DEFAULT_SERVICES = [
  "Gel Nails",
  "Acrylics",
  "Nail Art",
  "Pedicures",
  "Gel-X",
  "Other",
];

export function ContactForm() {
  const submit = useSubmitContactMessage();
  const { data: services } = useServiceTypes();
  const serviceOptions =
    services && services.length > 0
      ? services.map((s) => s.name)
      : DEFAULT_SERVICES;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    preferredService: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submit.mutateAsync(form);
      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours.",
      });
      setForm({ name: "", email: "", message: "", preferredService: "" });
      setErrors({});
    } catch {
      toast.error("Failed to send", {
        description: "Please try again or call us directly.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
      data-ocid="contact-form"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Full Name</Label>
          <Input
            id="contact-name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            onBlur={() =>
              !form.name.trim() &&
              setErrors((e) => ({ ...e, name: "Name is required" }))
            }
            aria-invalid={!!errors.name}
            data-ocid="contact-name-input"
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive/30"
                : ""
            }
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Email Address</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            onBlur={() => {
              if (!form.email.trim())
                setErrors((e) => ({ ...e, email: "Email is required" }));
            }}
            aria-invalid={!!errors.email}
            data-ocid="contact-email-input"
            className={
              errors.email
                ? "border-destructive focus-visible:ring-destructive/30"
                : ""
            }
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-service">Preferred Service</Label>
        <Select
          value={form.preferredService}
          onValueChange={(v) => {
            setForm((f) => ({ ...f, preferredService: v }));
            setErrors((e) => ({ ...e, preferredService: undefined }));
          }}
        >
          <SelectTrigger
            id="contact-service"
            data-ocid="contact-service-select"
            className={errors.preferredService ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a service…" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.preferredService && (
          <p className="text-xs text-destructive">{errors.preferredService}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about the look you have in mind, preferred appointment date, or any questions…"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          onBlur={() =>
            !form.message.trim() &&
            setErrors((e) => ({ ...e, message: "Message is required" }))
          }
          aria-invalid={!!errors.message}
          data-ocid="contact-message-input"
          className={
            errors.message
              ? "border-destructive focus-visible:ring-destructive/30"
              : ""
          }
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submit.isPending}
        data-ocid="contact-submit-btn"
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium group transition-smooth"
      >
        {submit.isPending ? (
          "Sending…"
        ) : (
          <>
            Send Message
            <Send className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
}
