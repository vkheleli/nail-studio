import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import ContactTypes "../types/contact";

module {
  public type ContactInfo = ContactTypes.ContactInfo;
  public type ContactMessage = ContactTypes.ContactMessage;

  public func submitMessage(messages : List.List<ContactMessage>, name : Text, email : Text, message : Text, preferredService : Text) : ContactMessage {
    let msg : ContactMessage = {
      id = messages.size() + 1;
      name;
      email;
      message;
      preferredService;
      createdAt = Time.now();
    };
    messages.add(msg);
    msg;
  };

  public func listMessages(messages : List.List<ContactMessage>) : [ContactMessage] {
    messages.toArray();
  };
};
