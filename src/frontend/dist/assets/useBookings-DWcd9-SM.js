import { c as createLucideIcon, z as useActor, A as useQuery, F as useMutation, D as useQueryClient, G as createActor } from "./index-C_6JvaI4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
const Scissors = createLucideIcon("scissors", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const BOOKINGS_KEY = ["bookings"];
function useSubmitBooking() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (request) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      if (typeof a.submitBooking !== "function") {
        throw new Error(
          "Booking service is not yet available. Please try again shortly."
        );
      }
      return a.submitBooking(request);
    }
  });
}
function useListBookings(statusFilter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: [...BOOKINGS_KEY, statusFilter ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor;
      if (typeof a.listBookings !== "function") return [];
      return a.listBookings(statusFilter);
    },
    enabled: !!actor && !isFetching
  });
}
function useConfirmBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, adminNotes }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      if (typeof a.confirmBooking !== "function")
        throw new Error("confirmBooking not available");
      return a.confirmBooking(bookingId, adminNotes);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY })
  });
}
function useRescheduleBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      if (typeof a.rescheduleBooking !== "function")
        throw new Error("rescheduleBooking not available");
      return a.rescheduleBooking(req);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY })
  });
}
function useCancelBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, reason }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      if (typeof a.cancelBooking !== "function")
        throw new Error("cancelBooking not available");
      return a.cancelBooking(bookingId, reason);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY })
  });
}
function useCompleteBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, adminNotes }) => {
      if (!actor) throw new Error("Actor not available");
      const a = actor;
      if (typeof a.completeBooking !== "function")
        throw new Error("completeBooking not available");
      return a.completeBooking(bookingId, adminNotes);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY })
  });
}
export {
  Calendar as C,
  Scissors as S,
  User as U,
  useCompleteBooking as a,
  useConfirmBooking as b,
  useRescheduleBooking as c,
  useCancelBooking as d,
  useSubmitBooking as e,
  useListBookings as u
};
