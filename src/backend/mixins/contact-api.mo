import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ContactLib "../lib/contact";
import ContactTypes "../types/contact";

// contactInfoHolder is a List<ContactInfo> used as a mutable single-value cell.
// Use contactInfoHolder.at(0) to read and mapInPlace to update.
mixin (
  accessControlState : AccessControl.AccessControlState,
  contactInfoHolder : List.List<ContactTypes.ContactInfo>,
  contactMessages : List.List<ContactTypes.ContactMessage>,
) {
  public query func getContactInfo() : async ContactTypes.ContactInfo {
    switch (contactInfoHolder.first()) {
      case (?info) { info };
      case null { Runtime.trap("Contact info not initialized") };
    };
  };

  public shared ({ caller }) func setContactInfo(info : ContactTypes.ContactInfo) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update contact info");
    };
    if (contactInfoHolder.size() == 0) {
      contactInfoHolder.add(info);
    } else {
      contactInfoHolder.mapInPlace(func(_) { info });
    };
  };

  public shared func submitContact(name : Text, email : Text, message : Text, preferredService : Text) : async ContactTypes.ContactMessage {
    let msg = ContactLib.submitMessage(contactMessages, name, email, message, preferredService);
    msg;
  };

  public shared ({ caller }) func listContacts() : async [ContactTypes.ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    ContactLib.listMessages(contactMessages);
  };
};
