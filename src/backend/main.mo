import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ServicesTypes "types/services";
import GalleryTypes "types/gallery";
import ContactTypes "types/contact";
import BookingsTypes "types/bookings";
import ServicesLib "lib/services";
import BookingsLib "lib/bookings";
import ServicesMixin "mixins/services-api";
import GalleryMixin "mixins/gallery-api";
import ContactMixin "mixins/contact-api";
import BookingsMixin "mixins/bookings-api";

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

  // Bookings state
  let nailTechs = List.empty<BookingsTypes.NailTech>();
  let bookings = List.empty<BookingsTypes.Booking>();
  let nextBookingId = { var value : Nat = 0 };

  // Seed nail techs on first deploy
  BookingsLib.seedNailTechs(nailTechs);

  // Include domain mixins
  include ServicesMixin(accessControlState, serviceTypes);
  include GalleryMixin(accessControlState, images);
  include ContactMixin(accessControlState, contactInfoHolder, contactMessages);
  include BookingsMixin(accessControlState, bookings, nailTechs, nextBookingId);
};
