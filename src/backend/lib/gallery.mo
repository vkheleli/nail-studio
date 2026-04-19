import List "mo:core/List";
import Time "mo:core/Time";
import Storage "mo:caffeineai-object-storage/Storage";
import Common "../types/common";
import GalleryTypes "../types/gallery";

module {
  public type PortfolioImage = GalleryTypes.PortfolioImage;

  public func listImages(images : List.List<PortfolioImage>) : [PortfolioImage] {
    images.toArray();
  };

  public func listImagesByServiceType(images : List.List<PortfolioImage>, serviceTypeId : Common.ServiceTypeId) : [PortfolioImage] {
    images.filter(func(img) { img.serviceTypeId == serviceTypeId }).toArray();
  };

  public func addImage(images : List.List<PortfolioImage>, title : Text, serviceTypeId : Common.ServiceTypeId, image : Storage.ExternalBlob) : PortfolioImage {
    let img : PortfolioImage = {
      id = images.size() + 1;
      title;
      serviceTypeId;
      image;
      createdAt = Time.now();
    };
    images.add(img);
    img;
  };

  public func deleteImage(images : List.List<PortfolioImage>, id : Common.ImageId) : Bool {
    let sizeBefore = images.size();
    let filtered = images.filter(func(img) { img.id != id });
    images.clear();
    images.append(filtered);
    images.size() < sizeBefore;
  };
};
