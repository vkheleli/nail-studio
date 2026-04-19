import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import GalleryLib "../lib/gallery";
import Common "../types/common";
import GalleryTypes "../types/gallery";

mixin (
  accessControlState : AccessControl.AccessControlState,
  images : List.List<GalleryTypes.PortfolioImage>,
) {
  public query func listGalleryItems() : async [GalleryTypes.PortfolioImage] {
    GalleryLib.listImages(images);
  };

  public query func getGalleryItem(id : Common.ImageId) : async ?GalleryTypes.PortfolioImage {
    images.find(func(img) { img.id == id });
  };

  public query func listGalleryItemsByService(serviceTypeId : Common.ServiceTypeId) : async [GalleryTypes.PortfolioImage] {
    GalleryLib.listImagesByServiceType(images, serviceTypeId);
  };

  public shared ({ caller }) func addGalleryItem(title : Text, serviceTypeId : Common.ServiceTypeId, image : Storage.ExternalBlob) : async GalleryTypes.PortfolioImage {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    let img = GalleryLib.addImage(images, title, serviceTypeId, image);
    img;
  };

  public shared ({ caller }) func deleteGalleryItem(id : Common.ImageId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    GalleryLib.deleteImage(images, id);
  };
};
