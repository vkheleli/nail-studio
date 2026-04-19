import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarCheck,
  CalendarClock,
  Check,
  ChevronDown,
  Phone,
  Scissors,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { BookingStatus, BookingView } from "../../hooks/useBookings";
import {
  useCancelBooking,
  useCompleteBooking,
  useConfirmBooking,
  useListBookings,
  useRescheduleBooking,
} from "../../hooks/useBookings";

// ── Helpers ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  Pending: {
    label: "Pending",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  Confirmed: {
    label: "Confirmed",
    className: "bg-accent/10 text-accent border-accent/20",
  },
  Rescheduled: {
    label: "Rescheduled",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  Cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  Completed: {
    label: "Completed",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const TECHS = ["All", "Florah", "Christy", "Jack"] as const;
const STATUSES = [
  "All",
  "Pending",
  "Confirmed",
  "Rescheduled",
  "Cancelled",
  "Completed",
] as const;

type TechFilter = (typeof TECHS)[number];
type StatusFilter = (typeof STATUSES)[number];

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body font-medium border ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

// ── Inline Action Forms ────────────────────────────────────────────────────

interface ConfirmFormProps {
  bookingId: string;
  onDone: () => void;
}

function ConfirmForm({ bookingId, onDone }: ConfirmFormProps) {
  const confirm = useConfirmBooking();
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirm.mutateAsync({ bookingId, adminNotes: notes || undefined });
      toast.success("Booking confirmed");
      onDone();
    } catch {
      toast.error("Failed to confirm booking");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 bg-accent/5 border border-accent/20 rounded-xl p-4 space-y-3"
      data-ocid="confirm-booking-form"
    >
      <p className="text-sm font-body font-medium text-accent">
        Confirm this booking
      </p>
      <div className="space-y-1.5">
        <Label htmlFor={`confirm-notes-${bookingId}`} className="text-xs">
          Admin note (optional)
        </Label>
        <Input
          id={`confirm-notes-${bookingId}`}
          data-ocid="confirm-notes-input"
          placeholder="e.g. See you at 10am sharp!"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          disabled={confirm.isPending}
          className="gap-1.5"
          data-ocid="confirm-submit-button"
        >
          <Check className="w-3.5 h-3.5" />
          {confirm.isPending ? "Confirming…" : "Confirm"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onDone}
          data-ocid="confirm-cancel-button"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </Button>
      </div>
    </form>
  );
}

interface RescheduleFormProps {
  bookingId: string;
  onDone: () => void;
}

function RescheduleForm({ bookingId, onDone }: RescheduleFormProps) {
  const reschedule = useRescheduleBooking();
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      toast.error("Please select a new date and time");
      return;
    }
    try {
      await reschedule.mutateAsync({
        bookingId,
        newDate,
        newTime,
        adminNotes: adminNotes || undefined,
      });
      toast.success("Booking rescheduled");
      onDone();
    } catch {
      toast.error("Failed to reschedule booking");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 bg-secondary/60 border border-border rounded-xl p-4 space-y-3"
      data-ocid="reschedule-booking-form"
    >
      <p className="text-sm font-body font-medium text-foreground">
        Reschedule booking
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`new-date-${bookingId}`} className="text-xs">
            New Date
          </Label>
          <Input
            id={`new-date-${bookingId}`}
            type="date"
            data-ocid="reschedule-date-input"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`new-time-${bookingId}`} className="text-xs">
            New Time
          </Label>
          <Input
            id={`new-time-${bookingId}`}
            type="time"
            data-ocid="reschedule-time-input"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`reschedule-notes-${bookingId}`} className="text-xs">
          Note for client (optional)
        </Label>
        <Input
          id={`reschedule-notes-${bookingId}`}
          data-ocid="reschedule-notes-input"
          placeholder="Reason for rescheduling…"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          className="h-8 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          disabled={reschedule.isPending}
          className="gap-1.5"
          data-ocid="reschedule-submit-button"
        >
          <CalendarClock className="w-3.5 h-3.5" />
          {reschedule.isPending ? "Saving…" : "Reschedule"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onDone}
          data-ocid="reschedule-cancel-button"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </Button>
      </div>
    </form>
  );
}

interface CancelFormProps {
  bookingId: string;
  onDone: () => void;
}

function CancelForm({ bookingId, onDone }: CancelFormProps) {
  const cancel = useCancelBooking();
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cancel.mutateAsync({ bookingId, reason: reason || undefined });
      toast.success("Booking cancelled");
      onDone();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-3"
      data-ocid="cancel-booking-form"
    >
      <p className="text-sm font-body font-medium text-destructive">
        Cancel this booking
      </p>
      <div className="space-y-1.5">
        <Label htmlFor={`cancel-reason-${bookingId}`} className="text-xs">
          Cancellation reason (optional)
        </Label>
        <Textarea
          id={`cancel-reason-${bookingId}`}
          data-ocid="cancel-reason-input"
          placeholder="e.g. Slot no longer available…"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={2}
          className="text-sm resize-none"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          variant="destructive"
          disabled={cancel.isPending}
          className="gap-1.5"
          data-ocid="cancel-confirm-button"
        >
          <XCircle className="w-3.5 h-3.5" />
          {cancel.isPending ? "Cancelling…" : "Cancel Booking"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onDone}
          data-ocid="cancel-abort-button"
        >
          <X className="w-3.5 h-3.5" /> Go Back
        </Button>
      </div>
    </form>
  );
}

// ── Booking Card ────────────────────────────────────────────────────────────

type ActiveAction = "confirm" | "reschedule" | "cancel" | null;

function BookingCard({
  booking,
  index,
}: {
  booking: BookingView;
  index: number;
}) {
  const complete = useCompleteBooking();
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);

  const toggle = (action: ActiveAction) =>
    setActiveAction((prev) => (prev === action ? null : action));

  const handleComplete = async () => {
    try {
      await complete.mutateAsync({ bookingId: booking.id });
      toast.success("Booking marked as complete");
    } catch {
      toast.error("Failed to mark complete");
    }
  };

  const isPending = booking.status === "Pending";
  const isConfirmed =
    booking.status === "Confirmed" || booking.status === "Rescheduled";
  const isDone =
    booking.status === "Cancelled" || booking.status === "Completed";

  const confirmedDateTime =
    booking.confirmedDate && booking.confirmedTime
      ? `${booking.confirmedDate} at ${booking.confirmedTime}`
      : null;

  return (
    <div
      data-ocid={`booking.item.${index}`}
      className="bg-card border border-border rounded-xl p-5 shadow-subtle hover:border-primary/20 transition-smooth space-y-4"
    >
      {/* Top Row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-base text-foreground truncate">
              {booking.customerName}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-xs font-body">
                {booking.customerPhone}
              </span>
            </div>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="space-y-0.5">
          <p className="text-muted-foreground text-xs font-body uppercase tracking-wide">
            Tech
          </p>
          <div className="flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-accent" />
            <span className="text-foreground text-sm font-body font-medium">
              {booking.techName}
            </span>
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-muted-foreground text-xs font-body uppercase tracking-wide">
            Service
          </p>
          <span className="text-foreground text-sm font-body">
            {booking.serviceType}
          </span>
        </div>
        <div className="space-y-0.5 col-span-2 sm:col-span-1">
          <p className="text-muted-foreground text-xs font-body uppercase tracking-wide">
            Requested
          </p>
          <span className="text-foreground text-sm font-body">
            {booking.requestedDate} · {booking.requestedTime}
          </span>
        </div>
      </div>

      {confirmedDateTime && (
        <div className="flex items-center gap-2 bg-accent/5 border border-accent/20 rounded-lg px-3 py-2">
          <CalendarCheck className="w-3.5 h-3.5 text-accent shrink-0" />
          <span className="text-accent text-xs font-body">
            Confirmed for {confirmedDateTime}
          </span>
        </div>
      )}

      {booking.notes && (
        <p className="text-muted-foreground text-xs font-body italic bg-muted/40 rounded-lg px-3 py-2 leading-relaxed">
          "{booking.notes}"
        </p>
      )}

      {booking.adminNotes && (
        <p className="text-xs font-body text-accent bg-accent/5 border border-accent/10 rounded-lg px-3 py-2">
          <span className="font-medium">Admin note:</span> {booking.adminNotes}
        </p>
      )}

      {booking.cancellationReason && (
        <p className="text-xs font-body text-destructive bg-destructive/5 border border-destructive/10 rounded-lg px-3 py-2">
          <span className="font-medium">Cancelled:</span>{" "}
          {booking.cancellationReason}
        </p>
      )}

      {/* Actions */}
      {!isDone && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
          {isPending && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => toggle("confirm")}
              className="gap-1.5 text-accent border-accent/30 hover:bg-accent/5"
              data-ocid={`booking.confirm_button.${index}`}
            >
              <Check className="w-3.5 h-3.5" />
              Confirm
              <ChevronDown
                className={`w-3 h-3 transition-transform ${activeAction === "confirm" ? "rotate-180" : ""}`}
              />
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggle("reschedule")}
            className="gap-1.5"
            data-ocid={`booking.reschedule_button.${index}`}
          >
            <CalendarClock className="w-3.5 h-3.5" />
            Reschedule
            <ChevronDown
              className={`w-3 h-3 transition-transform ${activeAction === "reschedule" ? "rotate-180" : ""}`}
            />
          </Button>
          {isConfirmed && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleComplete}
              disabled={complete.isPending}
              className="gap-1.5 text-muted-foreground"
              data-ocid={`booking.complete_button.${index}`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              {complete.isPending ? "Saving…" : "Mark Complete"}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggle("cancel")}
            className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 ml-auto"
            data-ocid={`booking.cancel_button.${index}`}
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel
            <ChevronDown
              className={`w-3 h-3 transition-transform ${activeAction === "cancel" ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      )}

      {/* Inline Forms */}
      {activeAction === "confirm" && (
        <ConfirmForm
          bookingId={booking.id}
          onDone={() => setActiveAction(null)}
        />
      )}
      {activeAction === "reschedule" && (
        <RescheduleForm
          bookingId={booking.id}
          onDone={() => setActiveAction(null)}
        />
      )}
      {activeAction === "cancel" && (
        <CancelForm
          bookingId={booking.id}
          onDone={() => setActiveAction(null)}
        />
      )}
    </div>
  );
}

// ── Main Tab ────────────────────────────────────────────────────────────────

export function AdminBookingsTab() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [techFilter, setTechFilter] = useState<TechFilter>("All");

  const { data: bookings, isLoading } = useListBookings(
    statusFilter === "All" ? undefined : statusFilter,
  );

  const filtered = (bookings ?? []).filter(
    (b) => techFilter === "All" || b.techName === techFilter,
  );

  const pendingCount = (bookings ?? []).filter(
    (b) => b.status === "Pending",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-foreground">All Bookings</h2>
          <p className="text-muted-foreground text-sm font-body mt-0.5">
            Review and manage appointment requests
          </p>
        </div>
        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-body font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {pendingCount} pending
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-muted/40 border border-border rounded-xl p-4">
        <div className="space-y-1 min-w-0">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">
            Status
          </Label>
          <div
            className="flex flex-wrap gap-1.5"
            data-ocid="booking.status-filter"
          >
            {STATUSES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setStatusFilter(s)}
                data-ocid={`booking.filter.${s.toLowerCase()}`}
                className={`px-3 py-1 rounded-full text-xs font-body font-medium border transition-smooth ${
                  statusFilter === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1 ml-auto">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">
            Tech
          </Label>
          <div
            className="flex flex-wrap gap-1.5"
            data-ocid="booking.tech-filter"
          >
            {TECHS.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTechFilter(t)}
                data-ocid={`booking.filter.tech.${t.toLowerCase()}`}
                className={`px-3 py-1 rounded-full text-xs font-body font-medium border transition-smooth ${
                  techFilter === t
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          data-ocid="booking.empty_state"
          className="bg-muted/40 border border-dashed border-border rounded-xl p-12 text-center space-y-3"
        >
          <CalendarCheck className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground font-body">
            {bookings?.length === 0
              ? "No bookings yet — they'll appear here once clients request appointments."
              : "No bookings match the selected filters."}
          </p>
          {bookings && bookings.length > 0 && statusFilter !== "All" && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter("All");
                setTechFilter("All");
              }}
              className="text-primary text-sm font-body hover:underline"
              data-ocid="booking.clear-filters-button"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking, i) => (
            <BookingCard key={booking.id} booking={booking} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
