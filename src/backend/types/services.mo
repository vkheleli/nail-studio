import Common "common";

module {
  public type ServiceType = {
    id : Common.ServiceTypeId;
    name : Text;
    description : Text;
    slug : Text;
  };
};
