import List "mo:core/List";
import Common "../types/common";
import ServicesTypes "../types/services";

module {
  public type ServiceType = ServicesTypes.ServiceType;

  public func listServiceTypes(serviceTypes : List.List<ServiceType>) : [ServiceType] {
    serviceTypes.toArray();
  };

  public func getServiceType(serviceTypes : List.List<ServiceType>, id : Common.ServiceTypeId) : ?ServiceType {
    serviceTypes.find(func(s) { s.id == id });
  };

  public func addServiceType(serviceTypes : List.List<ServiceType>, name : Text, description : Text, slug : Text) : ServiceType {
    let service : ServiceType = { id = serviceTypes.size() + 1; name; description; slug };
    serviceTypes.add(service);
    service;
  };

  public func updateServiceType(serviceTypes : List.List<ServiceType>, id : Common.ServiceTypeId, name : Text, description : Text, slug : Text) : Bool {
    var found = false;
    serviceTypes.mapInPlace(
      func(s) {
        if (s.id == id) {
          found := true;
          { s with name; description; slug };
        } else { s };
      }
    );
    found;
  };

  public func deleteServiceType(serviceTypes : List.List<ServiceType>, id : Common.ServiceTypeId) : Bool {
    let sizeBefore = serviceTypes.size();
    let filtered = serviceTypes.filter(func(s) { s.id != id });
    serviceTypes.clear();
    serviceTypes.append(filtered);
    serviceTypes.size() < sizeBefore;
  };

  // Seed 5 sample nail service types
  public func seedSampleServices(serviceTypes : List.List<ServiceType>, nextId : Nat) : Nat {
    if (serviceTypes.size() > 0) { return nextId };
    let samples : [(Text, Text, Text)] = [
      ("Gel Nails", "Long-lasting gel polish that cures under UV light. Keeps nails shiny and chip-free for up to 3 weeks.", "gel-nails"),
      ("Acrylic Nails", "Durable acrylic extensions sculpted to any length and shape. Perfect for nail art and added strength.", "acrylic-nails"),
      ("Nail Art", "Custom hand-painted designs, gems, and foils. From minimalist to elaborate — every nail tells a story.", "nail-art"),
      ("Pedicures", "Relaxing foot soak, exfoliation, and polish. Leave with soft, beautiful feet and perfectly painted toes.", "pedicures"),
      ("Gel-X", "Soft gel extensions applied with nail forms for a natural look and feel. No monomer, no harsh chemicals.", "gel-x"),
    ];
    var id = nextId;
    for ((name, description, slug) in samples.vals()) {
      serviceTypes.add({ id; name; description; slug });
      id += 1;
    };
    id;
  };
};
