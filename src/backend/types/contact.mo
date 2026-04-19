import Common "common";

module {
  public type ContactInfo = {
    phone : Text;
    email : Text;
    address : Text;
    hours : Text;
    bookingUrl : Text;
  };

  public type ContactMessage = {
    id : Common.MessageId;
    name : Text;
    email : Text;
    message : Text;
    preferredService : Text;
    createdAt : Common.Timestamp;
  };
};
