import type { ServiceType, PortfolioImage, ContactMessage, ContactInfo } from "../backend";
import { ExternalBlob, UserRole } from "../backend";
import type { BookingView } from "../hooks/useBookings";

const sampleServices: ServiceType[] = [
  { id: BigInt(1), name: "Gel Nails", slug: "gel-nails", description: "Long-lasting gel polish that cures under UV light. Keeps nails shiny and chip-free for up to 3 weeks." },
  { id: BigInt(2), name: "Acrylic Nails", slug: "acrylic-nails", description: "Durable acrylic extensions sculpted to any length and shape. Perfect for nail art and added strength." },
  { id: BigInt(3), name: "Nail Art", slug: "nail-art", description: "Custom hand-painted designs, gems, and foils. From minimalist to elaborate — every nail tells a story." },
  { id: BigInt(4), name: "Pedicures", slug: "pedicures", description: "Relaxing foot soak, exfoliation, and polish. Leave with soft, beautiful feet and perfectly painted toes." },
  { id: BigInt(5), name: "Gel-X", slug: "gel-x", description: "Soft gel extensions applied with nail forms for a natural look and feel. No monomer, no harsh chemicals." },
];

const placeholderImage = ExternalBlob.fromURL("https://placehold.co/600x400/f0d9d9/c084a0?text=Nail+Art");

const sampleGallery: PortfolioImage[] = [
  { id: BigInt(1), title: "Rose Gold Gel Set", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(1) },
  { id: BigInt(2), title: "French Tip Acrylic", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(2) },
  { id: BigInt(3), title: "Floral Nail Art", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(3) },
  { id: BigInt(4), title: "Classic Pedicure", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(4) },
  { id: BigInt(5), title: "Gel-X Extensions", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(5) },
  { id: BigInt(6), title: "Ombre Gel Nails", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(1) },
];

const sampleContactInfo: ContactInfo = {
  phone: "(555) 123-4567",
  email: "hello@nailtechstudio.com",
  address: "123 Beauty Lane, Glam City, CA 90210",
  hours: "Mon–Sat 9am–7pm, Sun 10am–5pm",
  bookingUrl: "https://nailtechstudio.com/book",
};

const sampleMessages: ContactMessage[] = [
  { id: BigInt(1), name: "Jane Smith", email: "jane@example.com", message: "I'd love to book a gel manicure!", preferredService: "Gel Nails", createdAt: BigInt(Date.now()) },
  { id: BigInt(2), name: "Emily Rose", email: "emily@example.com", message: "Do you have any openings this weekend?", preferredService: "Nail Art", createdAt: BigInt(Date.now()) },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockBackend: any = {
  // Object storage stubs
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "GET", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async () => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,

  // Domain methods
  addGalleryItem: async (title: string, serviceTypeId: bigint, image: ExternalBlob): Promise<PortfolioImage> => ({
    id: BigInt(sampleGallery.length + 1),
    title,
    createdAt: BigInt(Date.now()),
    image,
    serviceTypeId,
  }),
  addService: async (name: string, description: string, slug: string): Promise<ServiceType> => ({
    id: BigInt(sampleServices.length + 1),
    name,
    slug,
    description,
  }),
  assignCallerUserRole: async () => undefined,
  deleteGalleryItem: async () => true,
  deleteService: async () => true,
  getCallerUserRole: async () => UserRole.admin,
  getContactInfo: async () => sampleContactInfo,
  getGalleryItem: async (id: bigint) => sampleGallery.find((img) => img.id === id) ?? null,
  getService: async (id: bigint) => sampleServices.find((s) => s.id === id) ?? null,
  isCallerAdmin: async () => true,
  listContacts: async () => sampleMessages,
  listGalleryItems: async () => sampleGallery,
  listGalleryItemsByService: async (serviceTypeId: bigint) => sampleGallery.filter((img) => img.serviceTypeId === serviceTypeId),
  listServices: async () => sampleServices,
  setContactInfo: async () => undefined,
  submitContact: async (name: string, email: string, message: string, preferredService: string): Promise<ContactMessage> => ({
    id: BigInt(sampleMessages.length + 1),
    name,
    email,
    message,
    preferredService,
    createdAt: BigInt(Date.now()),
  }),
  updateService: async () => true,

  // Booking methods (cast — not yet in bindgen schema)
  submitBooking: async (req: {
    techId: string;
    serviceType: string;
    requestedDate: string;
    requestedTime: string;
    customerName: string;
    customerPhone: string;
    notes?: string;
  }): Promise<BookingView> => ({
    id: `booking-${Date.now()}`,
    techId: req.techId,
    techName: req.techId === "florah" ? "Florah" : req.techId === "christy" ? "Christy" : "Jack",
    serviceType: req.serviceType,
    requestedDate: req.requestedDate,
    requestedTime: req.requestedTime,
    customerName: req.customerName,
    customerPhone: req.customerPhone,
    notes: req.notes,
    status: "Pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }),
  listBookings: async (statusFilter?: string): Promise<BookingView[]> => {
    const all: BookingView[] = [
      {
        id: "bk-001",
        techId: "florah",
        techName: "Florah",
        serviceType: "Acrylic",
        requestedDate: "2026-04-25",
        requestedTime: "10:00",
        customerName: "Nomsa Dlamini",
        customerPhone: "+27 81 234 5678",
        notes: "Would love a floral design",
        status: "Pending",
        createdAt: Date.now() - 3600000,
        updatedAt: Date.now() - 3600000,
      },
      {
        id: "bk-002",
        techId: "christy",
        techName: "Christy",
        serviceType: "Gel",
        requestedDate: "2026-04-26",
        requestedTime: "14:00",
        confirmedDate: "2026-04-26",
        confirmedTime: "14:30",
        customerName: "Thandi Mokoena",
        customerPhone: "+27 72 987 6543",
        status: "Confirmed",
        adminNotes: "See you at 2:30pm!",
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 3600000,
      },
      {
        id: "bk-003",
        techId: "jack",
        techName: "Jack",
        serviceType: "Rubber Base Gel",
        requestedDate: "2026-04-20",
        requestedTime: "11:00",
        customerName: "Lerato Sithole",
        customerPhone: "+27 63 111 2233",
        status: "Cancelled",
        cancellationReason: "Tech unavailable on that date",
        createdAt: Date.now() - 172800000,
        updatedAt: Date.now() - 86400000,
      },
    ];
    if (!statusFilter || statusFilter === "All") return all;
    return all.filter((b) => b.status === statusFilter);
  },
  getBooking: async (bookingId: string): Promise<BookingView | null> => null,
  confirmBooking: async (bookingId: string, adminNotes?: string): Promise<BookingView | null> => null,
  rescheduleBooking: async (req: { bookingId: string; newDate: string; newTime: string; adminNotes?: string }): Promise<BookingView | null> => null,
  cancelBooking: async (bookingId: string, reason?: string): Promise<BookingView | null> => null,
  completeBooking: async (bookingId: string, adminNotes?: string): Promise<BookingView | null> => null,
};
