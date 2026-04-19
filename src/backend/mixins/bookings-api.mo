import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import BookingsLib "../lib/bookings";
import Types "../types/bookings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  bookings : List.List<Types.Booking>,
  nailTechs : List.List<Types.NailTech>,
  nextBookingId : { var value : Nat },
) {
  // ── Nail Tech browsing (public) ──────────────────────────────────────────

  /// List all nail techs with their locations and specialties
  public query func listNailTechs() : async [Types.NailTech] {
    BookingsLib.listNailTechs(nailTechs);
  };

  /// Get a single nail tech by ID
  public query func getNailTech(techId : Types.TechId) : async ?Types.NailTech {
    BookingsLib.getNailTech(nailTechs, techId);
  };

  // ── User booking flow (public) ───────────────────────────────────────────

  /// Submit a booking request — returns the new booking with Pending status
  public shared func submitBooking(req : Types.CreateBookingRequest) : async Types.BookingView {
    let techName = switch (BookingsLib.getNailTech(nailTechs, req.techId)) {
      case (?t) t.name;
      case null Runtime.trap("Nail tech not found");
    };
    let id = nextBookingId.value;
    nextBookingId.value += 1;
    BookingsLib.createBooking(bookings, id, techName, req);
  };

  /// Retrieve a booking by ID (no auth required — ID acts as lookup token)
  public query func getBooking(bookingId : Types.BookingId) : async ?Types.BookingView {
    BookingsLib.getBooking(bookings, bookingId);
  };

  // ── Admin booking management (admin only) ───────────────────────────────

  /// List all bookings, optionally filtered by status
  public shared query ({ caller }) func listBookings(statusFilter : ?Types.BookingStatus) : async [Types.BookingView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all bookings");
    };
    BookingsLib.listBookings(bookings, statusFilter);
  };

  /// Admin confirms a booking — locks requested date/time as confirmed date/time
  public shared ({ caller }) func confirmBooking(bookingId : Types.BookingId, adminNotes : ?Text) : async ?Types.BookingView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can confirm bookings");
    };
    BookingsLib.confirmBooking(bookings, bookingId, adminNotes);
  };

  /// Admin reschedules a booking — sets new confirmed date/time, status -> Rescheduled
  public shared ({ caller }) func rescheduleBooking(req : Types.RescheduleRequest) : async ?Types.BookingView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reschedule bookings");
    };
    BookingsLib.rescheduleBooking(bookings, req);
  };

  /// Admin cancels a booking with optional reason
  public shared ({ caller }) func cancelBooking(bookingId : Types.BookingId, reason : ?Text) : async ?Types.BookingView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can cancel bookings");
    };
    BookingsLib.cancelBooking(bookings, bookingId, reason);
  };

  /// Admin marks a booking as completed
  public shared ({ caller }) func completeBooking(bookingId : Types.BookingId, adminNotes : ?Text) : async ?Types.BookingView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can complete bookings");
    };
    BookingsLib.completeBooking(bookings, bookingId, adminNotes);
  };
};
