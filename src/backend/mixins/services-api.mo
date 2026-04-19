import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ServicesLib "../lib/services";
import Common "../types/common";
import ServicesTypes "../types/services";

mixin (
  accessControlState : AccessControl.AccessControlState,
  serviceTypes : List.List<ServicesTypes.ServiceType>,
) {
  public query func listServices() : async [ServicesTypes.ServiceType] {
    ServicesLib.listServiceTypes(serviceTypes);
  };

  public query func getService(id : Common.ServiceTypeId) : async ?ServicesTypes.ServiceType {
    ServicesLib.getServiceType(serviceTypes, id);
  };

  public shared ({ caller }) func addService(name : Text, description : Text, slug : Text) : async ServicesTypes.ServiceType {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };
    let service = ServicesLib.addServiceType(serviceTypes, name, description, slug);
    service;
  };

  public shared ({ caller }) func updateService(id : Common.ServiceTypeId, name : Text, description : Text, slug : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    ServicesLib.updateServiceType(serviceTypes, id, name, description, slug);
  };

  public shared ({ caller }) func deleteService(id : Common.ServiceTypeId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    ServicesLib.deleteServiceType(serviceTypes, id);
  };
};
