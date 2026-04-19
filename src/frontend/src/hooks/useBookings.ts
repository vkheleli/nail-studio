import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Rescheduled"
  | "Cancelled"
  | "Completed";

export interface CreateBookingRequest {
  techId: string;
  serviceType: string;
  requestedDate: string;
  requestedTime: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
}

export interface BookingView {
  id: string;
  techId: string;
  techName: string;
  serviceType: string;
  requestedDate: string;
  requestedTime: string;
  confirmedDate?: string;
  confirmedTime?: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: BookingStatus;
  adminNotes?: string;
  cancellationReason?: string;
  createdAt: number;
  updatedAt: number;
}

export interface RescheduleRequest {
  bookingId: string;
  newDate: string;
  newTime: string;
  adminNotes?: string;
}

// The actor interface may not yet expose booking methods — we access them via
// a cast until bindgen regenerates. If the method is absent the mutation throws
// and the UI shows an error, which is the correct fallback behaviour.
type ActorWithBookings = {
  submitBooking: (req: CreateBookingRequest) => Promise<BookingView>;
  getBooking: (bookingId: string) => Promise<BookingView | null>;
  listBookings: (statusFilter?: string) => Promise<BookingView[]>;
  confirmBooking: (
    bookingId: string,
    adminNotes?: string,
  ) => Promise<BookingView | null>;
  rescheduleBooking: (req: RescheduleRequest) => Promise<BookingView | null>;
  cancelBooking: (
    bookingId: string,
    reason?: string,
  ) => Promise<BookingView | null>;
  completeBooking: (
    bookingId: string,
    adminNotes?: string,
  ) => Promise<BookingView | null>;
};

const BOOKINGS_KEY = ["bookings"];

export function useSubmitBooking() {
  const { actor } = useActor(createActor);

  return useMutation<BookingView, Error, CreateBookingRequest>({
    mutationFn: async (request: CreateBookingRequest) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.submitBooking !== "function") {
        throw new Error(
          "Booking service is not yet available. Please try again shortly.",
        );
      }
      return a.submitBooking(request);
    },
  });
}

export function useGetBooking(bookingId: string | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BookingView | null>({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      if (!actor || !bookingId) return null;
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.getBooking !== "function") return null;
      return a.getBooking(bookingId);
    },
    enabled: !!actor && !isFetching && !!bookingId,
  });
}

export function useListBookings(statusFilter?: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BookingView[]>({
    queryKey: [...BOOKINGS_KEY, statusFilter ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.listBookings !== "function") return [];
      return a.listBookings(statusFilter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useConfirmBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    BookingView | null,
    Error,
    { bookingId: string; adminNotes?: string }
  >({
    mutationFn: async ({ bookingId, adminNotes }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.confirmBooking !== "function")
        throw new Error("confirmBooking not available");
      return a.confirmBooking(bookingId, adminNotes);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY }),
  });
}

export function useRescheduleBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<BookingView | null, Error, RescheduleRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.rescheduleBooking !== "function")
        throw new Error("rescheduleBooking not available");
      return a.rescheduleBooking(req);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY }),
  });
}

export function useCancelBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    BookingView | null,
    Error,
    { bookingId: string; reason?: string }
  >({
    mutationFn: async ({ bookingId, reason }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.cancelBooking !== "function")
        throw new Error("cancelBooking not available");
      return a.cancelBooking(bookingId, reason);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY }),
  });
}

export function useCompleteBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    BookingView | null,
    Error,
    { bookingId: string; adminNotes?: string }
  >({
    mutationFn: async ({ bookingId, adminNotes }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor as unknown as ActorWithBookings;
      if (typeof a.completeBooking !== "function")
        throw new Error("completeBooking not available");
      return a.completeBooking(bookingId, adminNotes);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY }),
  });
}
