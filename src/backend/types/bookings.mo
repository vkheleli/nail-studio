import CommonTypes "common";

module {
  public type BookingId = Nat;
  public type TechId = Nat;

  public type BookingStatus = {
    #Pending;
    #Confirmed;
    #Rescheduled;
    #Cancelled;
    #Completed;
  };

  public type NailTech = {
    id : TechId;
    name : Text;
    town : Text;
    address : Text;
    specialties : [Text];
  };

  // Internal booking record — stores both user-requested and admin-confirmed date/time
  public type Booking = {
    id : BookingId;
    techId : TechId;
    techName : Text;
    serviceType : Text;
    customerName : Text;
    customerPhone : Text;
    notes : ?Text;
    // User-requested date and time
    requestedDate : Text;
    requestedTime : Text;
    // Admin-confirmed date and time (set when admin confirms or reschedules)
    confirmedDate : ?Text;
    confirmedTime : ?Text;
    status : BookingStatus;
    adminNotes : ?Text;
    cancellationReason : ?Text;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  // Public-facing booking summary (shared type safe)
  public type BookingView = {
    id : BookingId;
    techId : TechId;
    techName : Text;
    serviceType : Text;
    customerName : Text;
    customerPhone : Text;
    notes : ?Text;
    requestedDate : Text;
    requestedTime : Text;
    confirmedDate : ?Text;
    confirmedTime : ?Text;
    status : BookingStatus;
    adminNotes : ?Text;
    cancellationReason : ?Text;
    createdAt : CommonTypes.Timestamp;
    updatedAt : CommonTypes.Timestamp;
  };

  // Input type for creating a booking
  public type CreateBookingRequest = {
    techId : TechId;
    serviceType : Text;
    requestedDate : Text;
    requestedTime : Text;
    customerName : Text;
    customerPhone : Text;
    notes : ?Text;
  };

  // Input type for admin reschedule
  public type RescheduleRequest = {
    bookingId : BookingId;
    newDate : Text;
    newTime : Text;
    adminNotes : ?Text;
  };
};
