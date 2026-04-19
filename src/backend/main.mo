import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ServicesTypes "types/services";
import GalleryTypes "types/gallery";
import ContactTypes "types/contact";
import ServicesLib "lib/services";
import ServicesMixin "mixins/services-api";
import GalleryMixin "mixins/gallery-api";
import ContactMixin "mixins/contact-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Service types state — seeded with 5 sample services on first run
  let serviceTypes = List.empty<ServicesTypes.ServiceType>();
  ignore ServicesLib.seedSampleServices(serviceTypes, 1);

  // Gallery state
  let images = List.empty<GalleryTypes.PortfolioImage>();

  // Contact info as a single-element list (mutable cell pattern)
  let contactInfoHolder = List.singleton<ContactTypes.ContactInfo>({
    phone = "(555) 123-4567";
    email = "hello@nailtechstudio.com";
    address = "123 Beauty Lane, Glam City, CA 90210";
    hours = "Mon–Sat 9am–7pm, Sun 10am–5pm";
    bookingUrl = "https://nailtechstudio.com/book";
  });
  let contactMessages = List.empty<ContactTypes.ContactMessage>();

  // Include domain mixins
  include ServicesMixin(accessControlState, serviceTypes);
  include GalleryMixin(accessControlState, images);
  include ContactMixin(accessControlState, contactInfoHolder, contactMessages);
};
