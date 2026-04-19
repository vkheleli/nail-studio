import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/bookings";

module {
  // Seed nail tech profiles (static data — 3 techs)
  public func seedNailTechs(techs : List.List<Types.NailTech>) : () {
    if (not techs.isEmpty()) return;
    techs.add({ id = 1; name = "Florah"; town = "Soweto"; address = "15489 Aluminum Street, Protea Glen, Soweto, 1818"; specialties = ["Acrylic", "Gel", "Pedi"] });
    techs.add({ id = 2; name = "Christy"; town = "Vaal"; address = "12 Voortrekker Street, Vereeniging, 1939"; specialties = ["Gel", "Rubber Base Gel", "Pedi"] });
    techs.add({ id = 3; name = "Jack"; town = "Ficksburg"; address = "73 Promed Fontein Street, Ficksburg, 9730"; specialties = ["Acrylic", "Rubber Base Gel", "Pedi"] });
  };

  // List all nail techs
  public func listNailTechs(techs : List.List<Types.NailTech>) : [Types.NailTech] {
    techs.toArray();
  };

  // Get nail tech by id
  public func getNailTech(techs : List.List<Types.NailTech>, techId : Types.TechId) : ?Types.NailTech {
    techs.find(func(t) { t.id == techId });
  };

  // Create a new booking (status = Pending)
  public func createBooking(
    bookings : List.List<Types.Booking>,
    nextId : Nat,
    techName : Text,
    req : Types.CreateBookingRequest,
  ) : Types.BookingView {
    let now = Time.now();
    let booking : Types.Booking = {
      id = nextId;
      techId = req.techId;
      techName = techName;
      serviceType = req.serviceType;
      customerName = req.customerName;
      customerPhone = req.customerPhone;
      notes = req.notes;
      requestedDate = req.requestedDate;
      requestedTime = req.requestedTime;
      confirmedDate = null;
      confirmedTime = null;
      status = #Pending;
      adminNotes = null;
      cancellationReason = null;
      createdAt = now;
      updatedAt = now;
    };
    bookings.add(booking);
    toView(booking);
  };

  // Get a booking by ID (no auth required)
  public func getBooking(bookings : List.List<Types.Booking>, bookingId : Types.BookingId) : ?Types.BookingView {
    switch (bookings.find(func(b) { b.id == bookingId })) {
      case (?b) ?toView(b);
      case null null;
    };
  };

  // List all bookings, optionally filtered by status
  public func listBookings(bookings : List.List<Types.Booking>, statusFilter : ?Types.BookingStatus) : [Types.BookingView] {
    let filtered = switch (statusFilter) {
      case (?s) bookings.filter(func(b) { b.status == s });
      case null bookings.clone();
    };
    filtered.map<Types.Booking, Types.BookingView>(func(b) { toView(b) }).toArray();
  };

  // Admin: confirm a booking (locks requested date/time as confirmed)
  public func confirmBooking(bookings : List.List<Types.Booking>, bookingId : Types.BookingId, adminNotes : ?Text) : ?Types.BookingView {
    var result : ?Types.BookingView = null;
    bookings.mapInPlace(func(b) {
      if (b.id == bookingId) {
        let updated = {
          b with
          status = #Confirmed;
          confirmedDate = ?b.requestedDate;
          confirmedTime = ?b.requestedTime;
          adminNotes = adminNotes;
          updatedAt = Time.now();
        };
        result := ?toView(updated);
        updated;
      } else b;
    });
    result;
  };

  // Admin: reschedule a booking (sets new confirmed date/time, status -> Rescheduled)
  public func rescheduleBooking(bookings : List.List<Types.Booking>, req : Types.RescheduleRequest) : ?Types.BookingView {
    var result : ?Types.BookingView = null;
    bookings.mapInPlace(func(b) {
      if (b.id == req.bookingId) {
        let updated = {
          b with
          status = #Rescheduled;
          confirmedDate = ?req.newDate;
          confirmedTime = ?req.newTime;
          adminNotes = req.adminNotes;
          updatedAt = Time.now();
        };
        result := ?toView(updated);
        updated;
      } else b;
    });
    result;
  };

  // Admin: cancel a booking with optional reason
  public func cancelBooking(bookings : List.List<Types.Booking>, bookingId : Types.BookingId, reason : ?Text) : ?Types.BookingView {
    var result : ?Types.BookingView = null;
    bookings.mapInPlace(func(b) {
      if (b.id == bookingId) {
        let updated = {
          b with
          status = #Cancelled;
          cancellationReason = reason;
          updatedAt = Time.now();
        };
        result := ?toView(updated);
        updated;
      } else b;
    });
    result;
  };

  // Admin: mark a booking as completed
  public func completeBooking(bookings : List.List<Types.Booking>, bookingId : Types.BookingId, adminNotes : ?Text) : ?Types.BookingView {
    var result : ?Types.BookingView = null;
    bookings.mapInPlace(func(b) {
      if (b.id == bookingId) {
        let updated = {
          b with
          status = #Completed;
          adminNotes = adminNotes;
          updatedAt = Time.now();
        };
        result := ?toView(updated);
        updated;
      } else b;
    });
    result;
  };

  // Convert internal Booking to shared BookingView
  public func toView(booking : Types.Booking) : Types.BookingView {
    {
      id = booking.id;
      techId = booking.techId;
      techName = booking.techName;
      serviceType = booking.serviceType;
      customerName = booking.customerName;
      customerPhone = booking.customerPhone;
      notes = booking.notes;
      requestedDate = booking.requestedDate;
      requestedTime = booking.requestedTime;
      confirmedDate = booking.confirmedDate;
      confirmedTime = booking.confirmedTime;
      status = booking.status;
      adminNotes = booking.adminNotes;
      cancellationReason = booking.cancellationReason;
      createdAt = booking.createdAt;
      updatedAt = booking.updatedAt;
    };
  };
};
