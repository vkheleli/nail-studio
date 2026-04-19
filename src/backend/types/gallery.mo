import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type PortfolioImage = {
    id : Common.ImageId;
    title : Text;
    serviceTypeId : Common.ServiceTypeId;
    image : Storage.ExternalBlob;
    createdAt : Common.Timestamp;
  };
};
