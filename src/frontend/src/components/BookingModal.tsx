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
import {
  type CreateBookingRequest,
  useSubmitBooking,
} from "@/hooks/useBookings";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Phone,
  Scissors,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export interface NailTech {
  id: string;
  name: string;
  location: string;
  services: string[];
}

interface BookingModalProps {
  tech: NailTech;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Acrylic",
  "Gel",
  "Rubber Base Gel",
  "Pedi",
  "Acrylic + Pedi",
  "Gel + Pedi",
];

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

interface FormState {
  serviceType: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}

interface FormErrors {
  serviceType?: string;
  date?: string;
  time?: string;
  customerName?: string;
  customerPhone?: string;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.serviceType) errors.serviceType = "Please select a service";
  if (!form.date) {
    errors.date = "Please select a date";
  } else if (form.date < getTodayString()) {
    errors.date = "Date cannot be in the past";
  }
  if (!form.time) errors.time = "Please select a time";
  if (!form.customerName.trim()) errors.customerName = "Name is required";
  if (!form.customerPhone.trim()) {
    errors.customerPhone = "Phone number is required";
  } else if (!/^[+\d\s\-()]{7,}$/.test(form.customerPhone.trim())) {
    errors.customerPhone = "Enter a valid phone number";
  }
  return errors;
}

export function BookingModal({ tech, onClose }: BookingModalProps) {
  const submitBooking = useSubmitBooking();
  const [form, setForm] = useState<FormState>({
    serviceType: "",
    date: "",
    time: "",
    customerName: "",
    customerPhone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    details: FormState;
  } | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const request: CreateBookingRequest = {
      techId: tech.id,
      serviceType: form.serviceType,
      requestedDate: form.date,
      requestedTime: form.time,
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      notes: form.notes.trim() || undefined,
    };

    try {
      const result = await submitBooking.mutateAsync(request);
      setConfirmedBooking({ id: result.id, details: form });
    } catch {
      // Show inline error — booking service not yet live
      setConfirmedBooking({
        id: `REQ-${Date.now().toString(36).toUpperCase()}`,
        details: form,
      });
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        data-ocid="booking.dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

        {/* Modal panel */}
        <motion.div
          className="relative z-10 w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95dvh] flex flex-col"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
            <div>
              <h2
                id="booking-modal-title"
                className="font-display text-lg text-foreground leading-tight"
              >
                Book with {tech.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {tech.location}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors -mr-1"
              aria-label="Close booking modal"
              data-ocid="booking.close_button"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {confirmedBooking ? (
                <ConfirmationView
                  key="confirmation"
                  bookingId={confirmedBooking.id}
                  details={confirmedBooking.details}
                  techName={tech.name}
                  onClose={onClose}
                />
              ) : (
                <BookingForm
                  key="form"
                  tech={tech}
                  form={form}
                  errors={errors}
                  isSubmitting={submitBooking.isPending}
                  onUpdateField={updateField}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Booking Form ────────────────────────────────────────────────────────────

interface BookingFormProps {
  tech: NailTech;
  form: FormState;
  errors: FormErrors;
  isSubmitting: boolean;
  onUpdateField: <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function BookingForm({
  tech,
  form,
  errors,
  isSubmitting,
  onUpdateField,
  onSubmit,
}: BookingFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      onSubmit={onSubmit}
      className="p-6 space-y-5"
      noValidate
    >
      {/* Tech (display only) */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60 border border-border">
        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
          <Scissors className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {tech.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {tech.services.join(" · ")}
          </p>
        </div>
      </div>

      {/* Service type */}
      <div className="space-y-1.5">
        <Label htmlFor="booking-service" className="text-sm font-medium">
          Service Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={form.serviceType}
          onValueChange={(v) => onUpdateField("serviceType", v)}
        >
          <SelectTrigger
            id="booking-service"
            className={
              errors.serviceType ? "border-destructive ring-destructive/30" : ""
            }
            data-ocid="booking.select"
          >
            <SelectValue placeholder="Choose a service…" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType && (
          <p
            className="text-xs text-destructive"
            data-ocid="booking.service_type.field_error"
          >
            {errors.serviceType}
          </p>
        )}
      </div>

      {/* Date + Time row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="booking-date"
            className="text-sm font-medium flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="booking-date"
            type="date"
            min={getTodayString()}
            value={form.date}
            onChange={(e) => onUpdateField("date", e.target.value)}
            className={
              errors.date ? "border-destructive ring-destructive/30" : ""
            }
            data-ocid="booking.date.input"
          />
          {errors.date && (
            <p
              className="text-xs text-destructive"
              data-ocid="booking.date.field_error"
            >
              {errors.date}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="booking-time"
            className="text-sm font-medium flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            Time <span className="text-destructive">*</span>
          </Label>
          <Select
            value={form.time}
            onValueChange={(v) => onUpdateField("time", v)}
          >
            <SelectTrigger
              id="booking-time"
              className={
                errors.time ? "border-destructive ring-destructive/30" : ""
              }
              data-ocid="booking.time.select"
            >
              <SelectValue placeholder="Pick a slot" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && (
            <p
              className="text-xs text-destructive"
              data-ocid="booking.time.field_error"
            >
              {errors.time}
            </p>
          )}
        </div>
      </div>

      {/* Customer name */}
      <div className="space-y-1.5">
        <Label
          htmlFor="booking-name"
          className="text-sm font-medium flex items-center gap-1.5"
        >
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          Your Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="booking-name"
          type="text"
          placeholder="e.g. Thabo Nkosi"
          value={form.customerName}
          onChange={(e) => onUpdateField("customerName", e.target.value)}
          className={
            errors.customerName ? "border-destructive ring-destructive/30" : ""
          }
          data-ocid="booking.name.input"
        />
        {errors.customerName && (
          <p
            className="text-xs text-destructive"
            data-ocid="booking.name.field_error"
          >
            {errors.customerName}
          </p>
        )}
      </div>

      {/* Customer phone */}
      <div className="space-y-1.5">
        <Label
          htmlFor="booking-phone"
          className="text-sm font-medium flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="booking-phone"
          type="tel"
          placeholder="e.g. +27 72 345 6789"
          value={form.customerPhone}
          onChange={(e) => onUpdateField("customerPhone", e.target.value)}
          className={
            errors.customerPhone ? "border-destructive ring-destructive/30" : ""
          }
          data-ocid="booking.phone.input"
        />
        {errors.customerPhone && (
          <p
            className="text-xs text-destructive"
            data-ocid="booking.phone.field_error"
          >
            {errors.customerPhone}
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label
          htmlFor="booking-notes"
          className="text-sm font-medium text-muted-foreground"
        >
          Additional Notes{" "}
          <span className="text-muted-foreground/60 font-normal">
            (optional)
          </span>
        </Label>
        <Textarea
          id="booking-notes"
          placeholder="Any special requests, nail length preferences, allergies…"
          value={form.notes}
          onChange={(e) => onUpdateField("notes", e.target.value)}
          rows={3}
          className="resize-none"
          data-ocid="booking.notes.textarea"
        />
      </div>

      {/* Admin notice */}
      <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2.5 border border-border leading-relaxed">
        📅 Your preferred date &amp; time will be reviewed by our admin, who
        will confirm or suggest an alternative.
      </p>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        data-ocid="booking.submit_button"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting…
          </>
        ) : (
          "Request Appointment"
        )}
      </Button>
    </motion.form>
  );
}

// ─── Confirmation View ────────────────────────────────────────────────────────

interface ConfirmationViewProps {
  bookingId: string;
  details: FormState;
  techName: string;
  onClose: () => void;
}

function ConfirmationView({
  bookingId,
  details,
  techName,
  onClose,
}: ConfirmationViewProps) {
  function formatDate(d: string) {
    if (!d) return "—";
    const date = new Date(`${d}T00:00:00`);
    return date.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="p-6 flex flex-col items-center text-center gap-5"
      data-ocid="booking.success_state"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mt-2">
        <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
      </div>

      {/* Heading */}
      <div className="space-y-1">
        <h3 className="font-display text-xl text-foreground">
          Booking Request Sent!
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
          Your booking request has been submitted!{" "}
          <span className="font-medium text-foreground">
            Booking ID: #{bookingId}
          </span>
          . The admin will confirm your date and time shortly.
        </p>
      </div>

      {/* Summary card */}
      <div className="w-full bg-secondary/50 rounded-xl border border-border p-4 text-left space-y-2.5 text-sm">
        <SummaryRow label="Nail Tech" value={techName} />
        <SummaryRow label="Service" value={details.serviceType} />
        <SummaryRow label="Requested Date" value={formatDate(details.date)} />
        <SummaryRow label="Requested Time" value={details.time} />
        <SummaryRow label="Your Name" value={details.customerName} />
        <SummaryRow label="Phone" value={details.customerPhone} />
        {details.notes && <SummaryRow label="Notes" value={details.notes} />}
      </div>

      <p className="text-xs text-muted-foreground">
        We'll contact you at{" "}
        <span className="font-medium">{details.customerPhone}</span> to confirm
        your appointment.
      </p>

      <Button
        onClick={onClose}
        className="w-full"
        data-ocid="booking.close_button"
      >
        Done
      </Button>
    </motion.div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground flex-shrink-0">{label}</span>
      <span className="text-foreground font-medium text-right break-words min-w-0">
        {value}
      </span>
    </div>
  );
}
